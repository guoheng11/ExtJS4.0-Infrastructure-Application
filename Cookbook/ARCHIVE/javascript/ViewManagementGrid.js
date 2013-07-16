ViewManagementGrid = Ext.extend(Ext.grid.GridPanel, {
	deletedViews:'',
	
    initComponent:function() {
	    var eto = this;
	    this.deletedViews = [];
	    
	    newViewHandler = function(button, event) {
		    if(event) {
			    eto.onAddView();
		    }
	    }
	    
	    setAsDefaultHandler = function(button, event) {
		    if(event) {
			    var selectedRecord = eto.getSelectionModel().getSelected();
			    if(selectedRecord instanceof Ext.data.Record) {
				    var viewID = selectedRecord.get('view_id');
				    if(viewID > 0) {
					    var objectToSend = new Object();
					    if(button == eto.setDefaultViewButton) {
					    	objectToSend.project_view_id = viewID;
				    	} else if(button == eto.setDefaultDownloadButton) {
					    	objectToSend.download_view_id = viewID;
				    	} else {
					    	Ext.Msg.alert("Error", "What button did you press???");
				    	}
					    	
						Ext.Ajax.request({
							url: 'UpdateUserViews.ashx',
						    method: 'GET',
						    params: objectToSend,
						    failure: function() {
							    Ext.Msg.alert("Error", "Hm... that didn't work!");
						    },
						    success: function() {
							    if(button == eto.setDefaultViewButton) {
							    	permissions.project_view_id = viewID;
						    	} else if(button == eto.setDefaultDownloadButton) {
							    	permissions.download_view_id = viewID;
						    	}
						    	// fake load
						    	eto.viewResultStore.fireEvent('load', eto.viewResultStore, eto.viewResultStore.getRange(0, eto.viewResultStore.getCount()));
							    //eto.viewResultStore.reload();
							    
						    }
						});
				    } else {
					    Ext.Msg.alert("Sorry!", "Please submit this grid first. This view doesn't have an ID so technically it doesn't even exist!");
	            	}
			    }
		    }
	    }
		
		this.viewResultStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'GetViews.ashx', // File to connect to
				method: 'GET'
			}),
			//baseParams:{"column_id": "all"},
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'view_id'
			}, [
				{name: 'view_id', type: "int"},
				{name: 'view_name', type: "string"},
				{name: 'created_by', type: "string"},
				{name: 'global', type: "boolean"},
				{name: 'columns'}
			])
		});
		
		// when viewResultStore is loaded, the grid bettar have a reconfigured store
		this.viewResultStore.on('load', function(thisStore, recs) {
			var gridStore = eto.getStore();
			gridStore.removeAll();
			for(var a = 0; a < recs.length; a++) {
				var newRecord = new gridStore.recordType({
	    			view_id:recs[a].get('view_id'),
	    			view_name:recs[a].get('view_name'),
	    			global: recs[a].get('global'),
	    			created_by:recs[a].get('created_by')
				});
				var cols = recs[a].get('columns');
				if(cols instanceof Array) {
					for(var b = 0; b < cols.length; b++) {
						newRecord.set(cols[b].column_name, true);
					}
				}
				var viewString = "";
				if(newRecord.get('view_id') == permissions.project_view_id) {
					viewString = "VIEW";
				}
				if(newRecord.get('view_id') == permissions.download_view_id) {
					viewString = viewString + "DOWN";
				}
				newRecord.set('default_type', viewString);	
				newRecord.commit();
				gridStore.add(newRecord);
			}
		});
		
		var newParams = this.processViewDefinition();
		this.lookupArray = newParams.lookupArray;
		this.viewResultStore.load();
		
		var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
		
		this.deleteButton = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected View',
            iconCls:'remove',
            disabled: true,
            handler: this.onDeleteView,
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
	    
	    this.on('activate', this.onActivated, this);
	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
	    
	    this.setDefaultViewButton = new Ext.Button({
	        text:'Default View',
	        tooltip:'Set As a Default View',
            iconCls:'table',
            disabled:true,
            handler: setAsDefaultHandler
        });
        this.setDefaultDownloadButton = new Ext.Button({
	        text:'Default Download',
	        tooltip:'Set As a Default Download',
            iconCls:'save',
            disabled:true,
            handler: setAsDefaultHandler
        });
	    
	    Ext.apply(this, {
		    store: newParams.store,
	        cm: newParams.columnModel,
	        enableColumnMove: false,

			sm: sm1,

			// inline toolbars
	        tbar: [{
		        text:'New View',
	            tooltip:'Add a New View',
	            iconCls:'add',
	            disabled:false,
	            //ownerCt: this,
	            handler: newViewHandler
	        }, {xtype: 'tbspacer', width: 5},this.deleteButton,{xtype: 'tbspacer', width: 50},this.setDefaultViewButton, this.setDefaultDownloadButton, '->',this.submitButton,'-',{
		        text:'Info',
	            tooltip:'How do I use this thing?',
	            iconCls:'info',
	            disabled:false,
	            handler: function() {
		            Ext.Msg.alert("Instructions", "Welcome to the View Management Tool !<br><br>" +
		            "<b>To modify a view:</b> simply double click on the value you want to change and it will flip.<br>" +
		            "<b>To delete a view:</b> select a view and click \"Delete\" button.<br>"+
		            "<b>To create a view:</b> click the \"New\" button. Enter the name of the view, and then modify view's columns permissions.<br>"+
		            "<br>Note: your changes are not submitted until you click the \"Submit\" button.");
	            }
		            
	        },{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}],
       		
	        viewConfig: {
	            //forceFit:true
	        },
	        autoWidth: true,
	        // set width and it will forceFit to it
	        //autoHeight: true,
	        stripeRows: true,
	        //collapsible: false,
	        //animCollapse: false,
	        closable: true,
	        enableHdMenu:false,
	        title: 'View Management'
		});
		
		this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    var record = grid.getStore().getAt(rowIndex);  // Get the Record
		    var columnObject = grid.getColumnModel().getColumnById(columnIndex); // Get field name
		    var fieldName = columnObject.dataIndex;
		    // view_name cannot be changed
		    if(fieldName == "view_name") {
			    Ext.Msg.prompt('Enter View Name', 'Please enter view name:', function(btn, text){
				    if (btn == 'ok'){
				        record.set('view_name', text);
				        eto.enableSubmit(true);
				    }
				}, window, false, record.get('view_name'));
		    }
		    else if(fieldName != "view_id" && fieldName != "view_name" && fieldName != "global" && fieldName != "created_by") {
			    eto.enableSubmit(true);
		    	var data = record.get(fieldName);
			    if(data == true) {
				    record.set(fieldName, false);
			    } else {
				    record.set(fieldName, true);
			    }
		    }
	    });
	    
    	ViewManagementGrid.superclass.initComponent.call(this);
    },
    onAddView: function() {
	    var eto = this;
	    
	    Ext.Msg.show({
		    title:'New View',
		    msg:'Please enter the name of the new view:',
		    buttons: Ext.Msg.OKCANCEL,
		    width: 350,
		    icon: Ext.MessageBox.QUESTION,
		    prompt: true,
		    fn: function(btn, text) {			    
			    if (btn == 'ok' && text.length > 0) {
				    var store = eto.getStore();
				    store.newRecord = new store.recordType({
            			view_id:'unknown',
            			view_name:text,
            			global: false,
            			created_by:"YOU!"
        			});
        			store.newRecord.markDirty();
        			store.add(store.newRecord);
        			eto.enableSubmit(true);
			    }
		    }
		});
    },
    onDeleteView: function() {
	    var store = this.getStore();
	    var selectedRecord = this.getSelectionModel().getSelected();
	    var eto = this;
	    if(selectedRecord.get('global')) {
		    Ext.MessageBox.alert("ERROR", "Sorry you cannot delete global views...");
	    } else {
		    Ext.MessageBox.confirm('Delete View?', 'Are you sure you want to delete view \"' + selectedRecord.get("view_name") + '\"?', function(btn) {
	        	if(btn == "yes") {
		        	var viewID = selectedRecord.get("view_id");
		        	if(viewID > 0) {
						eto.deletedViews.push(viewID);
					}
					store.remove(selectedRecord);
					eto.enableDelete(false);
					eto.enableSubmit(true);
	        	}
		        	
	    	});
    	}
    },
    onRowSelect: function(sm, rowIndex, r){
        this.enableDelete(true);
        this.setDefaultViewButton.enable();
        this.setDefaultDownloadButton.enable();
    },
    
    onRowDeselect: function(sm, rowIndex, r){
        this.enableDelete(false);
        this.setDefaultViewButton.disable();
        this.setDefaultDownloadButton.disable();
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
	        	var deletionCount = eto.deletedViews.length;
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
	        	for(var i = 0; i < eto.deletedViews.length; i++) {
		        	var removeViewRequest = new Ext.data.Connection();
				    removeViewRequest.request({
					    url: 'DeleteView.ashx',
					    method: 'POST',
					    params: {"view_id": eto.deletedViews[i]},
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
				eto.deletedViews.length = 0;
					
	        	// Take care of modified views
	        	var errorDetected = false;
	        	for (var i = 0; i < store.getCount(); i++) {
		        	var record = store.getAt(i);
		        	if(record.dirty) {
			        	record.commit();
			        	var objectToSend = new Object();
			        	var viewID = record.get('view_id');
			        	if(viewID == "unknown") {
				        	viewID = "";
			        	}
			        	if(viewID) {
				        	objectToSend.view_id = viewID;
			        	}
			        	if(record.get('global')) {
				        	objectToSend.global = true;
			        	} else {
				        	objectToSend.global = false;
			        	}
			        	objectToSend.view_name = record.get('view_name');
			        	var columnsArray = new Array();
			        	for (var fieldName in record.data) {
				        	if(fieldName != "view_id" && fieldName != "view_name" && fieldName != "created_by") {
					        	if(record.get(fieldName) == true) {
						        	columnsArray.push(eto.lookupArray[fieldName]);
					        	}
				        	}
			        	}
			        	objectToSend.columns = Ext.encode(columnsArray);
						Ext.Ajax.request({
							url: 'UpdateView.ashx',
						    method: 'POST',
						    params: objectToSend,
						    failure: function() {
							    errorDetected = true;
							    failCounter++;
							    record.markDirty();
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
	        		Ext.Msg.alert('Error', successCount+' out of '+dirtyCount+' views were updated. '+failCount+' views failed to update!');
        		}*/
	        	eto.enableSubmit(false);
        	}
    	});
    },
    reportSubmission: function(deletionError,deletionSuccess,deletionCount,failCounter,successCounter,requestCounter) {
	    var deletionString = '';
	    if(deletionCount > 0) {
	    	if(deletionError > 0) {
		    	deletionString = "Deletion Error: "+deletionError + " view deletions failed out of " + deletionCount;
	    	} else {
		    	deletionString = "Deletion Success: Deleted all " + deletionCount + " views.";
	    	}
    	}
    	var changeString = '';
    	if(requestCounter > 0) {
	    	if(failCounter > 0) {
		    	changeString = "Update Error: "+failCounter + " views out of  " + requestCounter + " failed to change.";
	    	} else {
		    	changeString = "Update Success: Updated all " + requestCounter + " views.";
	    	}
    	}
    	var msgTitle = 'Success';
    	if(deletionError > 0 || failCounter > 0) {
	    	msgTitle = 'Error';
    	}
    	var finalString = deletionString;
    	if(finalString) {
	    	finalString = finalString + "<br><br>";
    	}
    	finalString = finalString + changeString;
	    Ext.Msg.alert(msgTitle, finalString);
	    this.viewResultStore.reload();
    },
    processViewDefinition: function() {
	    var returnObject = new Object();
	    
	    function colorBooleans(val){
	        if(val){
	            return '<span style="color:green;"><center>' + "SHOW" + '</center></span>';
	        } else {
	            return '<span style="font-weight:bold; color:red;"><center>' + "HIDE" + '</center></span>';
	        }
	        return val;
	    }
	    
	    function globalRenderer(val){
	        if(val){
	            return '<center>' + "GLOBAL" + '</center>';
	        } else {
	            return '<center>' + "Personal" + '</center>';
	        }
	        return val;
	    }
	    
	    function defRenderer (val) {
		    if(val == "VIEW") {
				return '<center><img height="16" width="16" src="images/icons/table.png"/></center>';
		    } else if(val == "DOWN") {
				return '<center><img height="16" width="16" src="images/icons/save.jpg"/></center>';
			} else if(val == "VIEWDOWN") {
				return '<center><img height="16" width="16" src="images/icons/save.jpg"/><img height="16" width="16" src="images/icons/table.png"/></center>';
			} 
			return "";
	     }
	    
	    function bolderer(val){
	    	return '<span style="text-align:center;font-weight:bold;">' + val + '</span>';
	    }
	    
	    // first lets setup column model stuffs
		var cols = [];
	    cols[0] = {header: "ID", hidden:true , dataIndex: "view_id"};
	    cols[1] = {header: "Default", renderer: defRenderer, dataIndex: "default_type", width:50};
	    cols[2] = {header: "View Name", dataIndex: "view_name", width:100};
	    cols[3] = {header: "Created By", dataIndex: "created_by", width:100};
	    cols[4] = {header: "Global", renderer: globalRenderer, dataIndex: "global", width:60};
	    
	    // second lets setup store stuffs
	    var fields = [];
	    fields[0] = {name: 'view_id', type: "int"};
	    fields[1] = {name: 'default_type', type: "string"};
	    fields[2] = {name: 'view_name', type: "string"};
	    fields[3] = {name: 'created_by', type: "string"};
	    fields[4] = {name: 'global', type: "boolean"};
	    
	    var lookupArray = new Array();
	    // lets get column names...
	    for(var a = 0; a < Cookbook.viewDefinitionStore.getCount(); a++) {
		    var columnID = Cookbook.viewDefinitionStore.getAt(a).get('column_id');
		    var columnName = Cookbook.viewDefinitionStore.getAt(a).get('column_name');
		    lookupArray[columnName] = columnID;
		    var stringObj = new String(columnName);
	        var textLength = stringObj.length*5;
	        textLength = textLength + 20;
	        if(textLength < 30) {
		        textLength = 30;
	        }
	        
        	cols[a+5] = {header: columnName, renderer: colorBooleans, dataIndex: columnName, width:textLength};
        	fields[a+5] = {name: columnName, type: "boolean"};
    	}
    	returnObject.columnModel = new Ext.grid.ColumnModel(cols);
    	returnObject.store = new Ext.data.ArrayStore({
		    fields: fields
		});
		returnObject.lookupArray = lookupArray;

    	return returnObject;
	}
});