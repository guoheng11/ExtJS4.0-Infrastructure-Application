RoutingGrid = Ext.extend(Ext.Panel, {
	initComponent:function() {
		var eto = this;
		var grid = new RoutingRealGrid(this.projectId);
		Ext.apply(this, {
			closable: true,
	        title: 'Routing & Traffic',
			items: grid
		});
		RoutingGrid.superclass.initComponent.call(this);
	},
	constructor: function(tabCont,projId) {
		this.projectId = projId;
		RoutingGrid.superclass.constructor.call(this);
	}
});

RoutingRealGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	projectId: '',
	removeRouteButton: '',

	initComponent:function() {
		var eto = this;
		var projectApplicationStore = new Ext.data.Store({
			id: 'projectApplicationStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectApps.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId},
			reader: new Ext.data.JsonReader({   
				root: 'rows',
				totalProperty: 'total',
				id: 'ingredient_id'
			}, [
				{name: 'ingredient_id', type: "int", mapping: 'ingredient_id'},
				{name: 'new', type: "boolean", mapping: 'new'},
				{name: 'app_name', type: "string", mapping: 'app_name'},
				{name: 'parm_updated', type: "boolean", mapping: 'parm_updated'},
				{name: 'service_id', type: "string", mapping: 'service_id'}
			])
		});
		
		projectApplicationStore.load();
		
	    var routingStore = new Ext.data.Store({
			id: 'projectApplicationStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetRouting.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId},
			reader: new Ext.data.JsonReader({   
				root: 'rows',
				totalProperty: 'total',
				id: 'routing_id'
			}, [
				{name: 'routing_id', type: "int", mapping: 'routing_id'},
				{name: 'dnis', type: "string", mapping: 'dnis'},
				{name: 'dnis_alias', type: "string", mapping: 'dnis_alias'},
				{name: 'routing_type', type: "string", mapping: 'routing_type'},
				{name: 'description', type: "string", mapping: 'description'},
				{name: 'product', type: "string", mapping: 'product'},
				{name: 'division', type: "string", mapping: 'division'},
				{name: 'platform', type: "string", mapping: 'platform'},
				{name: 'label', type: "string", mapping: 'label'},
				{name: 'note', type: "string", mapping: 'note'},
				{name: 'route_from_app', type: "string", mapping: 'route_from_app'},
				{name: 'route_to_app', type: "string", mapping: 'route_to_app'},
				{name: 'routing_rtg', type: "string", mapping: 'routing_rtg'},
				{name: 'routing2_tin', type: "string", mapping: 'routing2_tin'},
				{name: 'dap_update', type: "string", mapping: 'dap_update'},
				{name: 'dnis', type: "string", mapping: 'dnis'},
				{name: 'new_division', type: "boolean", mapping: 'new_division'},
				{name: 'new_product', type: "boolean", mapping: 'new_product'},
				{name: 'new_dnis', type: "boolean", mapping: 'new_dnis'},
				{name: 'traffic', type: "boolean", mapping: 'traffic'},
				{name: 'consolidation', type: "boolean", mapping: 'consolidation'}
			])
		});
		
		routingStore.load();
		routingStore.on('load', function() {
			eto.removeRouteButton.disable();
		});
		
		var sm2 = new Ext.grid.CellSelectionModel(/*{singleSelect:true}*/);
		
		this.removeRouteButton = new Ext.Button({
            text: 'Remove',
            iconCls: 'remove',
            disabled: true
        });
        
        var saveAppsHandler = function(button, event) {
	    	if(event) {
		        eto.submitApps(eto);
    		}
		};
		
		var addRouteHandler = function(button, event) {
	    	if(event) {
		        eto.addNew(eto);
    		}
		};
		
		var ArrayYesNo = [
		    ['Yes',true],
		    ['No',false]
		];
		var storeYesNo = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'boolString', type: 'string'},
		       {name: 'bool', type: 'boolean'}
		    ],
	        data : ArrayYesNo
	    });
    
		var comboYesNo = new Ext.form.ComboBox({
	        store: storeYesNo,
	        displayField:'boolString',
	        valueField: 'bool',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'yes/no',
	        selectOnFocus:true
	    });
	    
	    var ArrayDescription = [
		    ['Inbound 800#'],
		    ['Outbound 800#']
		];
		var storeDescription = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'value', type: 'string'}
		    ],
	        data : ArrayDescription
	    });
    
		var comboDescription = new Ext.form.ComboBox({
	        store: storeDescription,
	        displayField:'value',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        forceSelection: false,
	        triggerAction: 'all',
	        emptyText:'choose...',
	        selectOnFocus:true
	    });
	    
	    var PlatformDescription = [
		    ['SIVR'],
		    ['NIVR']
		];
		var storePlatform = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'value', type: 'string'}
		    ],
	        data : PlatformDescription
	    });
    
		var comboPlatform = new Ext.form.ComboBox({
	        store: storePlatform,
	        displayField:'value',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        forceSelection: false,
	        triggerAction: 'all',
	        emptyText:'choose...',
	        selectOnFocus:true
	    });
	    
	    var RTypeDescription = [
		    ['Add'],
		    ['Update'],
		    ['Delete']
		];
		var storeRType = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'value', type: 'string'}
		    ],
	        data : RTypeDescription
	    });
    
		var comboRType = new Ext.form.ComboBox({
	        store: storeRType,
	        displayField:'value',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        forceSelection: false,
	        triggerAction: 'all',
	        emptyText:'choose...',
	        selectOnFocus:true
	    });
	    
	    var comboApps = new Ext.form.ComboBox({
	        store: projectApplicationStore,
	        displayField:'app_name',
	        valueField: 'app_name',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'',
	        selectOnFocus:true
	    });
	    
		function boolRenderer(val){
	        if(val){
	            return '<span style="color:green;">' + "YES" + '</span>';
	        } else {
	            return '<span style="font-weight:bold; color:red;">' + "NO" + '</span>';
	        }
	        return val;
	    }
	    
	    function noteRenderer(val, arg2, arg3, arg4){
	        if(val){
			    var domMarkup = '<div style="font-weight:bold; color:orange;">' + "NOTE" + '</div>';
			    arg2.attr = 'ext:qtip="'+val+'" ext:qtitle="Routing Note"';
	            return domMarkup;
	        }
	        return val;
	    }
	    
	    function dnisRenderer(val){
	        if(val.length >= 3) {
	            val = val.substring(0,3)+ '-' +val.substring(3);
	        }
	        if(val.length >= 7) {
	            val = val.substring(0,7)+ '-' +val.substring(7);
	        }
	        return val;
	    }
	    
	    Ext.apply(this, {
	        store: routingStore,
	        border: false,
	        sm: sm2,
	        tbar: [{
	            text: 'Save',
	            iconCls: 'save',
	            handler : saveAppsHandler
            },'-', {
	            text: 'Add New',
	            iconCls: 'add',
	            handler : addRouteHandler
            }, this.removeRouteButton
            ],
	        columns: [{
	                header: "Traffic?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'traffic',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
		            header: "Note",
		            width: 40,
		            dataIndex: 'note',
		            renderer: noteRenderer
	            }, {
	                header: "DNIS",
	                width: 100,
	                sortable: true,
	                dataIndex: 'dnis',
	                hideable: false,
	                renderer: dnisRenderer,
	                editor: new Ext.form.TextField({
		                regex: /^\d{10}$/,
		                listeners: {
							'change': function (field, newValue, oldValue) {
								var selectedCoords = eto.getSelectionModel().getSelectedCell();
						    	var selectedRecord = eto.getStore().getAt(selectedCoords[0]);
						    	var routeApp = selectedRecord.get('route_to_app');
						    	if(routeApp.length > 0 && newValue.length == 10) {
							    	var currRTG = selectedRecord.get('routing_rtg');
							    	if(currRTG.length == 0) {
							    		var newRTG = newValue.substring(3) + '=' + routeApp;
							    		selectedRecord.set('routing_rtg', newRTG);
						    		} else {
							    		var oldRTG = oldValue.substring(3) + '=' + routeApp;
							    		if(oldRTG == currRTG) {
								    		var newRTG = newValue.substring(3) + '=' + routeApp;
							    			selectedRecord.set('routing_rtg', newRTG);
						    			}
					    			}
					    		}
							}
						}
		           	})
	            },{
	                header: "ALIAS",
	                width: 100,
	                sortable: true,
	                dataIndex: 'dnis_alias',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Routing Type",
	                width: 100,
	                sortable: true,
	                dataIndex: 'routing_type',
	                editor: comboRType
	            },{
	                header: "Description",
	                width: 100,
	                sortable: true,
	                dataIndex: 'description',
	                editor: comboDescription
	            },{
	                header: "Product",
	                width: 100,
	                sortable: true,
	                dataIndex: 'product',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Division",
	                width: 100,
	                sortable: true,
	                dataIndex: 'division',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Platform",
	                width: 100,
	                sortable: true,
	                dataIndex: 'platform',
	                editor: comboPlatform
	            },{
	                header: "Label",
	                width: 100,
	                sortable: true,
	                dataIndex: 'label',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Route from APP",
	                width: 100,
	                sortable: true,
	                dataIndex: 'route_from_app',
	                editor: comboApps
	            },{
	                header: "Route to APP",
	                width: 100,
	                sortable: true,
	                dataIndex: 'route_to_app',
	                editor: new Ext.form.ComboBox({
				        store: projectApplicationStore,
				        displayField:'app_name',
				        valueField: 'app_name',
				        typeAhead: true,
				        mode: 'local',
				        editable: 'false',
				        forceSelection: true,
				        triggerAction: 'all',
				        emptyText:'',
				        selectOnFocus:true,
		                listeners: {
							'change': function (field, newValue, oldValue) {
								var selectedCoords = eto.getSelectionModel().getSelectedCell();
						    	var selectedRecord = eto.getStore().getAt(selectedCoords[0]);
						    	var dnisValue = selectedRecord.get('dnis');
						    	if(newValue.length > 0 && dnisValue.length == 10) {
							    	var currRTG = selectedRecord.get('routing_rtg');
							    	if(currRTG.length == 0) {
							    		var newRTG = dnisValue.substring(3) + '=' + newValue;
							    		selectedRecord.set('routing_rtg', newRTG);
						    		} else {
							    		var oldRTG = dnisValue.substring(3) + '=' + oldValue;
							    		if(oldRTG == currRTG) {
								    		var newRTG = dnisValue.substring(3) + '=' + newValue;
							    			selectedRecord.set('routing_rtg', newRTG);
						    			}
					    			}
					    		}
							}
						}
					})
	            },{
	                header: "Routing RTG",
	                width: 100,
	                sortable: true,
	                dataIndex: 'routing_rtg',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Routing 2 TIN",
	                width: 100,
	                sortable: true,
	                dataIndex: 'routing2_tin',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "DAP Update",
	                width: 100,
	                sortable: true,
	                dataIndex: 'dap_update',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "New Division?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'new_division',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "New Product?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'new_product',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "New DNIS?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'new_dnis',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Consolidation?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'consolidation',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            }
	        ],
	        autoHeight: true,
	        listeners: {
		        resize: {
		            fn: function(el) {
		                if (el.getInnerHeight() < 250) {
		                    el.autoHeight = false;
		                    el.setHeight(250);
		                } else {
			                el.autoHeight = true;
		                }
		            }
		        }
		    },
		    viewConfig: {
	            //forceFit:true
	        },
	        width: 1800,
	        autoScroll: true,
	        stripeRows: true,
	        collapsible: false,
	        animCollapse: false
	    });
	    RoutingRealGrid.superclass.initComponent.call(this);
	    
	    sm2.on('cellselect', function() {eto.removeRouteButton.enable();});
	    //sm2.on('rowdeselect', function() {eto.removeRouteButton.disable();});
	    
	    this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    var record = grid.getStore().getAt(rowIndex);  // Get the Record
		    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
		    // group_name cannot be changed
		    if(fieldName == "new_division" || fieldName == "new_product" || fieldName == "new_dnis" || fieldName == "traffic" || fieldName == "consolidation") {
		    	var data = record.get(fieldName);
			    if(data == true) {
				    record.set(fieldName, false);
			    } else {
				    record.set(fieldName, true);
			    }
	    	} else if(fieldName == "note") {
		    	if(record.get("routing_id") >= 0) {
			    	Ext.Msg.prompt('Enter Note', 'Note:', function(btn, text){
					    if (btn == 'ok'){
					        record.set("note", text);
					    }
					}, this, true, record.get("note"));
				} else {
					Ext.Msg.alert('Apology', "Sorry, but you need to save this routing entry first =\)" );
				}
			}
			    	
		    //Ext.Msg.alert('Activation','Data: ' + data);
	    });
	    var removeRouteHandler = function(button, event) {
	    	if(event) {
		    	var selectedCoords = eto.getSelectionModel().getSelectedCell();
		    	var selectedRecord = eto.getStore().getAt(selectedCoords[0]);
		    	if(selectedRecord.get("routing_id") >= 0) {
			    	Ext.MessageBox.confirm('Delete Routing?', 'Are you sure you want to delete routing with DNIS:\"' + selectedRecord.get("dnis") + '\"?', function(btn) {
			        	if(btn == "yes") {
					    	Ext.Ajax.request({
								url: 'DeleteRouting.ashx',
							    method: 'POST',
							    params: {"routing_id": selectedRecord.get("routing_id")},
							    failure: function() {
								    Ext.MessageBox.alert('Error','Submission Error');
							    },
							    success: function(response, opts) {
								    var jsonResponse = Ext.util.JSON.decode(response.responseText);
								    if(jsonResponse.success != null) {
								    	if(jsonResponse.success) {
									    	Ext.MessageBox.alert('Success','Routing Deleted');
									    	eto.getStore().remove(selectedRecord);
									    	button.disable();
							    		} else if(!jsonResponse.success) {
									    	if(jsonResponse.rows) {
									    		Ext.Msg.alert('Failed', 'Deletion Failed');
								    		}
							    		}
									} else {
							    		Ext.Msg.alert('Failed', 'Deletio Failed. No Success Flag.');
						    		}
							    }
							});
						}
					});
				} else {
					eto.getStore().remove(selectedRecord);
					button.disable();
				}
    		}
		};
	    this.removeRouteButton.on('click', removeRouteHandler);
	},
    constructor: function(projId) {
		this.projectId = projId;
		RoutingRealGrid.superclass.constructor.call(this);
	},
    submitApps: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    var ingredientLists = new Array();
	    var gridStore = this.getStore();
	    var count = gridStore.getCount();
	    var validCount = 0;
	    for(var c = 0; c < count; c++) {
	    	var rec = gridStore.getAt(c);
	    	if(rec.get('dnis') != '') {
	    		ingredientLists[validCount] = rec.data;
	    		validCount++;
    		}
    	}
    	if(validCount == count) {
	    	ingredientLists = Ext.encode(ingredientLists)
	    	objectToSend.routing_entries = ingredientLists;
	    	objectToSend.project_id = this.projectId;
	    	Ext.Ajax.request({
				url: 'UpdateRouting.ashx',
			    method: 'POST',
			    params: objectToSend,
			    failure: function() {
				    Ext.MessageBox.alert('Error','Submission Error');
			    },
			    success: function(response, opts) {
				    var jsonResponse = Ext.util.JSON.decode(response.responseText);
				    if(jsonResponse.success != null) {
				    	if(jsonResponse.success) {
					    	Ext.MessageBox.alert('Success','Submission Successfull');
					    	gridStore.reload();
			    		} else if(!jsonResponse.success) {
					    	if(jsonResponse.rows) {
					    		Ext.Msg.alert('Failed', 'Submission Failed');
				    		}
			    		}
					} else {
			    		Ext.Msg.alert('Failed', 'Submission Failed. No Success Flag.');
		    		}
			    }
			});
		} else {
			Ext.MessageBox.alert('Missing DNIS','One of the rows you are trying to submit is missing the main DNIS entry. Please fill it out and submit again.');
		}
	},
    addNew: function() {
	    var addingIsOk = true;
	    if(this.getStore().getCount() > 0) {
		    if(this.getStore().getAt(0).get('dnis') == '') {
			    addingIsOk = false;
			    Ext.Msg.alert('Nope', 'Fill the top routing entry, please...');
	        }
        }
        if(addingIsOk) {
	        var NewRoute = Ext.data.Record.create([
		    	{name: 'routing_id', type: 'int'},
		    	{name: 'dnis', type: 'string'},
	            {name: 'dnis_alias', type: 'string'},
	            {name: 'routing_type', type: 'string'},
	            {name: 'description', type: 'string'},
	            {name: 'product', type: 'string'},
	            {name: 'division', type: 'string'},
	            {name: 'platform', type: 'string'},
	            {name: 'label', type: 'string'},
	            {name: 'route_from_app', type: 'string'},
	            {name: 'route_to_app', type: 'string'},
	            {name: 'routing_rtg', type: 'string'},
	            {name: 'routing2_tin', type: 'string'},
	            {name: 'dap_update', type: 'string'},
	            {name: 'new_division', type: 'boolean'},
	            {name: 'new_product', type: 'boolean'},
	            {name: 'new_dnis', type: 'boolean'},
	            {name: 'traffic', type: 'boolean'},
	            {name: 'consolidation', type: 'boolean'}
	      	]);
		    var p = new NewRoute({
	            dnis: '',
	            routing_rtg: '',
	            route_to_app: ''
	        });
	        this.stopEditing();
	        this.getStore().insert(0, p);
	        this.startEditing(0, 0);
        }
    }
});