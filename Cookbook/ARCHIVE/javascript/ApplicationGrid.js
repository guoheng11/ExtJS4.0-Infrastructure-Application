ApplicationGrid = Ext.extend(Ext.grid.GridPanel, {
	myOwner: '',
	
    initComponent:function() {
	    var eto = this;
		
		var newApplicationHandler = function(button, event) {
	    	if(event) {
		    	var creatingNew = true;
				var iTypeID = "";
				var iAppName = "";
				
		    	if(button.text == "Edit") {
			    	creatingNew = false;
			    	var selectedRecord = eto.getSelectionModel().getSelected();
			    	iTypeID = selectedRecord.get('app_type_id');
			    	iAppName = selectedRecord.get('app_name');
		    	}
		    	var newApplicationName;
		    	var myCombo = new Ext.form.ComboBox({
		            width:140,
		            store: applicationTypeStore,
			        displayField:'app_type',
			        valueField: 'app_type_id',
			        //hiddenName:'biz_id',
			        fieldLabel: 'Application Type',
			        typeAhead: true,
			        mode: 'local',
			        editable: 'false',
			        forceSelection: true,
			        triggerAction: 'all',
			        emptyText:'choose type...',
			        listeners: {
				        'select': function(combo, record) {
					        myPanel.buttons[0].enable();
					        combo.secretValue = record.get('app_type_id');
				        }
			        },
			        value: iTypeID,
			        selectOnFocus:true
		        });
		        
		        var appNameTF = new Ext.form.TextField({
			        width:140,
			        readOnly: !creatingNew,
			        value: iAppName,
			        fieldLabel: 'Application Name'
		        });

				var myPanel = new Ext.FormPanel({
			        labelWidth: 120,
			        border: false,
			        width: 250,
			        height: 70,
			        //bodyStyle: "'background-color': DFE8F6",
			        style: 'padding: 5',
			        bodyStyle: "background-color:#DFE8F6;",
			        buttonAlign: "center",
			        items: [appNameTF,myCombo],
			        
			        buttons: [{
			            text: 'OK',
			            disabled: true,
			            handler: function() {
				            var conn = new Ext.data.Connection();
							conn.request({
							    url: (creatingNew) ? 'AddApplication.ashx' : 'UpdateApplication.ashx',
							    method: 'POST',
							    params: {"app_name": appNameTF.getValue(), "app_type_id": myCombo.getValue()},
							    failure: function(response, opts) {
							        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
							    },
							    success: function(response, opts) {
								    var jsonResponse = Ext.util.JSON.decode(response.responseText);
								    if(jsonResponse.success != null) {
								    	if(jsonResponse.success) {
									    	if(!creatingNew) {
										    	eto.myOwner.notifyTypeChange(appNameTF.getValue(), myCombo.getRawValue());
									    	}
									    	eto.resetStore();
									    	win.close();
				            				win.destroy();
							    		} else if(!jsonResponse.success) {
									    	if(jsonResponse.rows) {
									    		Ext.Msg.alert('Addition Failed', 'Server read the request but did not add the application.');
								    		}
							    		}
									} else {
							    		Ext.Msg.alert('Error', 'Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
						    		}
							    }
							});
			            }
			        },{
			            text: 'Cancel',
			            handler: function() {
				            win.close();
				            win.destroy();
			            }
		            }]				
				});
				
				myPanel.on('afterrender', function() {
					
				});
				
				var win = new Ext.Window({
			        //id: 'promptFileUpload-'+this.optionId,
		            title: (creatingNew) ? 'New Application' : "Modifying " + iAppName,
		            closeAction: 'close',
		            layout: 'fit',
		            height: 150,
		            width: 400,
		            hidden: true,
		            modal: true,
		            items: [myPanel]
		        });
		        win.show();
    		}
		};
	    var liveSearchAppHandler = function(field, event) {
	    	if(event) {
		    	eto.findName(field.getValue(), eto);
    		}
		};
		
		var addAppToProjHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	eto.myOwner.addApplication(selectedRecord.get('app_name'),selectedRecord.get('app_type'));
    		}
		};
		var editAppHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	//eto.myOwner.addApplication(selectedRecord.get('app_name'));
    		}
		};
		
		
		var deleteHandler = function(button, event) {
	    	if(event) {
		    	eto.onDeleteApp(eto);
    		}
		};
		var applicationTypeStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'GetAppTypes.ashx', // File to connect to
				method: 'GET'
			}),
			//baseParams:{"biz_id": "1"}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'app_type', type: "string", mapping: 'app_type'},
				{name: 'app_type_id', type: "int", mapping: 'app_type_id'} 
			])
		});
		applicationTypeStore.load();
		
		var applicationStore = new Ext.data.Store({
			id: 'applicationStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetApplications.ashx', // File to connect to
				method: 'GET'
			}),
			//baseParams:{"biz_id": "1"}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'app_name', type: "string", mapping: 'app_name'},
				{name: 'app_type', type: "string", mapping: 'app_type'},
				{name: 'app_type_id', type: "int", mapping: 'app_type_id'} 
			])
		});
		applicationStore.load();
		
		
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    this.on('rowdblclick', this.onRowDblClick, this);
	    this.on('activate', this.onActivated, this);
	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
		
	    var liveSearchByAppName = new Ext.form.TextField({
		    emptyText: 'Filter by name...',
		    enableKeyEvents: true,
		    width: 130
	    });
		liveSearchByAppName.on('keyup', liveSearchAppHandler);
		
	    this.deleteButton = new Ext.Button({  
	        text:'Delete',
            tooltip:'Delete Selected Application',
            iconCls:'remove',
            itemId: 'deleteButton',
            disabled:true,
            handler: deleteHandler
        });
        
        this.addButton = new Ext.Button({  
	        text:'Add To Project',
            tooltip:'Add to project',
            iconCls:'add',
            itemId: 'addToProjButton',
            disabled: true,
            handler: addAppToProjHandler
        });
        
        this.editButton = new Ext.Button({  
	        text:'Edit',
            tooltip:'Edit selected application...',
            iconCls:'edit',
            itemId: 'editAppButton',
            disabled: true,
            handler: newApplicationHandler
        });
	        
	    Ext.apply(this, {
		    store: applicationStore,
		    collapsable: true,
		    style: 'margin: 10',
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            {id:'app_name',header: "Application Name", width: 40, dataIndex: 'app_name'},
		            {header: "Type", width: 20, dataIndex: 'app_type'}
	        	]
			}),
			sm: sm1,
			
			// inline toolbars
	        tbar: [{
		        text:'New',
	            tooltip:'Create New Application',
	            iconCls:'add',
	            disabled:false,
	            handler: newApplicationHandler
	        },this.deleteButton,{
		    	xtype: 'tbspacer',
		    	width: '5'
	    	},this.addButton,{
		    	xtype: 'tbspacer',
		    	width: '5'
	    	},this.editButton,'->', liveSearchByAppName,{
		    	xtype: 'tbspacer',
		    	width: '10'
	    	}],
	        viewConfig: {
	            forceFit:true
	        },
	        autoWidth: true,
	        // set width and it will forceFit to it
	        width: 450,
	        //autoHeight: true,
        	height:900,
	        stripeRows: true,
	        collapsible: false,
	        animCollapse: false,
	        frame:true,
	        title: 'USAN Applications',
	        iconCls: 'icon-grid'
		});
	    
    	ApplicationGrid.superclass.initComponent.call(this);
    },
	constructor: function(owner) {
		this.myOwner = owner;
		ApplicationGrid.superclass.constructor.call(this);
    },
    onRowDblClick: function(g, rowIndex, e) {
	    var selectedRecord = g.getStore().getAt(rowIndex);
	    this.myOwner.addApplication(selectedRecord.get('app_name'),selectedRecord.get('app_type'));
    },
    onCreateApp: function() {
	    
    },
    onDeleteApp: function() {
	    var eto = this;
	    var selectedRecord = this.getSelectionModel().getSelected();
    	var conn = new Ext.data.Connection();
		conn.request({
		    url: 'DeleteApplication.ashx',
		    method: 'POST',
		    params: {"app_name": selectedRecord.get("app_name")},
		    failure: function(response, opts) {
		        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
		    },
		    success: function(response, opts) {
			    var jsonResponse = Ext.util.JSON.decode(response.responseText);
			    if(jsonResponse.success != null) {
			    	if(jsonResponse.success) {
				    	eto.getStore().reload();
    					eto.onRowDeselect();
		    		} else if(!jsonResponse.success) {
				    	if(jsonResponse.rows) {
				    		Ext.Msg.alert('Deletion Failed', 'Application could not be deleted. May be it is tied to a project?');
			    		}
		    		}
				} else {
		    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
	    		}
		    }
		});
    },
    onRowSelect: function(sm, rowIndex, r){        
        this.addButton.enable();
        this.deleteButton.enable();
        this.editButton.enable();
    },
    
    onRowDeselect: function(sm, rowIndex, r){        
        this.addButton.disable();
        this.deleteButton.disable();
        this.editButton.disable();
    },
    onActivated: function(){        
        this.getStore().reload();
    },
    
    refresh: function() {
	    var store = this.getStore();
	    store.reload();
    },
    findName: function(applicationName) {
	    var store = this.getStore();
	    store.baseParams.app_name = applicationName;
	    store.reload();
    },
    resetStore: function() {
	    var store = this.getStore();
	    store.baseParams.app_name = "";
	    store.reload();
    }

});