GroupManagementPanel = Ext.extend(Cookbook.View.uGridPanel, {
	
    initComponent:function() {
	    var eto = this;
	    eto.deletedGroups = [];
		var groupStore = new Ext.data.Store({
			id: 'groupStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetGroups.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.DynamicJsonReader({root: 'rows'})
		});
		
		var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
		
		this.deleteButton = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected Group',
            iconCls:'remove',
            disabled: true,
            handler: this.onDeleteGroup,
            scope: eto
        });
        
        this.submitButton = new Ext.Button({
	        text:'Submit',
            tooltip:'Submit Changes',
            iconCls:'submit',
            disabled:true,
            handler: this.onSubmitGrid,
            scope: eto
        });
		
		this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    var record = grid.getStore().getAt(rowIndex);  // Get the Record
		    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
		    // group_name cannot be changed
		    if(fieldName != "group_name") {
			    eto.enableSubmit(true);
		    	var data = record.get(fieldName);
			    if(data == true) {
				    record.set(fieldName, false);
			    } else {
				    record.set(fieldName, true);
			    }
	    	}
		    //Ext.Msg.alert('Activation','Data: ' + data);
	    });
		groupStore.on('load', function() {
			groupStore.recordType = groupStore.reader.recordType;
        	groupStore.fields = groupStore.recordType.prototype.fields;
			eto.reconfigure(groupStore, new Ext.grid.GroupManagementCM(groupStore));
	    });
	    
		groupStore.load();
	    this.on('activate', this.onActivated, this);
	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
	    
	    
	    Ext.apply(this, {
		    store: new Ext.data.ArrayStore({
		        fields: []
	        }),
	        cm: new Ext.grid.ColumnModel([]),
	        enableColumnMove: false,

			sm: sm1,

			// inline toolbars
	        tbar: [{
		        text:'New Group',
	            tooltip:'Add a New Permission Group',
	            iconCls:'add',
	            itemId: 'addBtn',
	            disabled:false,
	            //ownerCt: this,
	            handler: eto.onAddGroup,
	            scope: eto
	        }, '-',this.deleteButton ,'->',this.submitButton,'-',{
		        text:'Info',
	            tooltip:'How do I use this thing?',
	            iconCls:'info',
	            disabled:false,
	            handler: function() {
		            Ext.Msg.alert("Group Management Instructions", "Welcome to the Group Management Tool !<br><br>" +
		            "<b>To modify group's permissions:</b> simply double click on the value you want to change and it will flip.<br>" +
		            "<b>To delete a group:</b> select a group and click \"Delete\" button.<br>"+
		            "<b>To create a new group:</b> click the \"New\" button. Enter the name of the group, and then modify group's permissions.<br>"+
		            "<br>Note: your changes are not submitted until you click the \"Submit\" button.");
	            }
		            
	        },{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}],
       		
	        viewConfig: {
	            //forceFit:true
	        },
	        stripeRows: true,
	        enableHdMenu:false,
	        closable:true,
	        title: 'Group Permissions'
		});
	    
    	GroupManagementPanel.superclass.initComponent.call(this);
    },

    onRowDblClick: function(g, rowIndex, e) {
	    var selectedRecord = g.getStore().getAt(rowIndex);
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.get("project"));
	    Cookbook.openProjectActions(selectedRecord.get("project_id"));
        g.fireEvent('openproject', selectedRecord);
        
    },
    onAddGroup: function() {
	    var eto = this;
	    
	    Ext.Msg.show({
		    title:'Group Name',
		    msg:'Please enter the name of the new group:',
		    buttons: Ext.Msg.OKCANCEL,
		    width: 350,
		    icon: Ext.MessageBox.QUESTION,
		    prompt: true,
		    fn: function(btn, text) {			    
			    if (btn == 'ok' && text.length > 0) {
				    var store = eto.getStore();
				    store.newRecord = new store.recordType({
            			group_id:'unknown',
            			group_name:text
        			});
        			store.newRecord.markDirty();
        			store.add(store.newRecord);
        			eto.enableSubmit(true);
			    }
		    }
		});
    },
    onDeleteGroup: function() {
	    var store = this.getStore();
	    var selectedRecord = this.getSelectionModel().getSelected();
	    var eto = this;
	    Ext.MessageBox.confirm('Delete Project?', 'Are you sure you want to delete group \"' + selectedRecord.get("group_name") + '\"?', function(btn) {
        	if(btn == "yes") {
	        	var groupID = selectedRecord.get("group_id");
	        	if(groupID > 0) {
					eto.deletedGroups.push(groupID);
				}
				store.remove(selectedRecord);
				eto.enableDelete(false);
				eto.enableSubmit(true);
        	}
	        	
    	});
    },
    onRowSelect: function(sm, rowIndex, r){
        this.enableDelete(true);
    },
    
    onRowDeselect: function(sm, rowIndex, r){
        this.enableDelete(false);
    },
    onActivated: function(){        
        //
        //this.getStore().reload();
    },
    
    enableSubmit: function(enable) {
	    if(enable) {
		    this.submitButton.enable();
	    } else {
		    this.submitButton.disable();
	    }
    },
    enableDelete: function(enable) {
	    if(enable) {
		    this.deleteButton.enable();
	    } else {
		    this.deleteButton.disable();
	    }
    },
    
    onSubmitGrid: function() {
	    var eto = this;
	    Ext.MessageBox.confirm('Submit Grid?', 'Are you sure you want to submit all of your changes?', function(btn) {
        	if(btn == "yes") {
	        	var deletionError = 0;
	        	var deletionSuccess = 0;
	        	var deletionCount = eto.deletedGroups.length;
	        	var requestCounter = 0;
	        	var successCounter = 0;
	        	var failCounter = 0;
	        	
	        	var store = eto.getStore();
	        	for (var i = 0; i < store.getCount(); i++) {
		        	var record = store.getAt(i);
		        	if(record.dirty) {
			        	requestCounter++;
		        	}
	        	}
	        	// Taking care of deleted projects
	        	for(var i = 0; i < eto.deletedGroups.length; i++) {
		        	var removeGroupRequest = new Ext.data.Connection();
				    removeGroupRequest.request({
					    url: 'DeleteGroup.ashx',
					    method: 'POST',
					    params: {"group_id": eto.deletedGroups[i]},
					    failure: function(response, opts) {
					        deletionError++;
					        if((deletionError + deletionSuccess == deletionCount) && (successCounter+failCounter==requestCounter)) {
						        eto.reportSubmission(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter);
					        }
					    },
					    success: function(response, opts) {
						    var jsonResponse = Ext.util.JSON.decode(response.responseText);
						    if(jsonResponse.success != null) {
						    	if(jsonResponse.success) {
							    	deletionSuccess++;
							    	if((deletionError + deletionSuccess == deletionCount) && (successCounter+failCounter==requestCounter)) {
								        eto.reportSubmission(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter);
							        }
					    		} else if(!jsonResponse.success) {
							    	if(jsonResponse.rows) {
							    		deletionError++;
										if((deletionError + deletionSuccess == deletionCount) && (successCounter+failCounter==requestCounter)) {
									        eto.reportSubmission(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter);
								        }
						    		}
					    		}
							} else {
					    		deletionError++;
					    		if((deletionError + deletionSuccess == deletionCount) && (successCounter+failCounter==requestCounter)) {
						        	eto.reportSubmission(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter);
					        	}
				    		}
					    }
					});
				}
				eto.deletedGroups.length = 0;
					
	        	// Take care of modified projects
	        	var errorDetected = false;
	        	for (var i = 0; i < store.getCount(); i++) {
		        	var record = store.getAt(i);
		        	if(record.dirty) {
			        	record.commit();
			        	var cpyRecord = record.copy();
			        	for (var j in cpyRecord.data) {
				        	if(cpyRecord.data[j] == false) {
					        	cpyRecord.data[j] = "false";
							} else if(cpyRecord.data[j] == "unknown") {
					        	cpyRecord.data[j] = "";
							}
			        	}
						Ext.Ajax.request({
							url: 'UpdateGroup.ashx',
						    method: 'POST',
						    params: cpyRecord.data,
						    failure: function() {
							    errorDetected = true;
							    failCounter++;
							    if((deletionError + deletionSuccess == deletionCount) && (successCounter+failCounter==requestCounter)) {
						        	eto.reportSubmission(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter);
					        	}
						    },
						    success: function() {
							    successCounter++;
							    if((deletionError + deletionSuccess == deletionCount) && (successCounter+failCounter==requestCounter)) {
						        	eto.reportSubmission(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter);
					        	}
						    }
						});
					}
	        	}
	        	
	        	/*if(successCount == dirtyCount) {
	        		
        		} else {
	        		Ext.Msg.alert('Error', successCount+' out of '+dirtyCount+' groups were updated. '+failCount+' groups failed to update!');
        		}*/
	        	eto.enableSubmit(false);
	        	
				
        	}
    	});
    },
    reportSubmission: function(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter) {
	    var deletionString = '';
	    if(deletionCount > 0) {
	    	if(deletionError > 0) {
		    	deletionString = "Deletion Error: "+deletionError + " group deletions failed out of " + deletionCount;
	    	} else {
		    	deletionString = "Deletion Success: Deleted all " + deletionCount + " groups.";
	    	}
    	}
    	var changeString = '';
    	if(requestCounter > 0) {
	    	if(failCounter > 0) {
		    	changeString = "Update Error: "+failCounter + " groups out of  " + requestCounter + " failed to change.";
	    	} else {
		    	changeString = "Update Success: Updated all " + requestCounter + " groups.";
	    	}
    	}
    	var msgTitle = 'Success';
    	if(deletionError > 0 || failCounter > 0) {
	    	msgTitle = 'Error';
    	}
	    Ext.Msg.alert(msgTitle, deletionString + "<br><br>" + changeString);
	    this.getStore().reload();
    }

});