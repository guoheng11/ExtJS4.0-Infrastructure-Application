ApplicationsFrame = Ext.extend(Ext.Panel, {
	projectId: '',
	projectAppsGrid:'',
	appsGrid:'',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
		this.appsGrid = new ApplicationGrid(this);
	    this.projectAppsGrid = new ProjectAppsGrid(this.projectId);
	    
	    Ext.apply(this, {
		    closable:true,
		    bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            title:'Applications',
            layout:'table',
            layoutConfig: {columns:2},
	        items: [this.projectAppsGrid,this.appsGrid]
		});
    	
		ApplicationsFrame.superclass.initComponent.call(this);
		
		this.forceClose = false;
		this.originalValue = "";
		this.projectAppsGrid.on('contentLoaded', function() {
			eto.originalValue = eto.projectAppsGrid.getValueObject();
		});
		this.on('beforeclose', function() {
	    	if(!this.forceClose) {
		    	var newValue = eto.projectAppsGrid.getValueObject();
		    	var str1 = Ext.encode(eto.originalValue);
		    	var str2 = Ext.encode(newValue);
		    	if(str1 != str2) {
			    	// lol stole it from example
					Ext.Msg.show({
					   title:'Save Changes?',
					   msg: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
					   buttons: Ext.Msg.YESNOCANCEL,
					   fn: function(buttonId) {
						   if(buttonId == "yes") {
							   eto.forceClose = true;
							   eto.projectAppsGrid.submitApps(true);
							   eto.tabContainer.remove(eto);
						   } else if(buttonId == "no") {
							   eto.forceClose = true;
							   eto.tabContainer.remove(eto);
						   }
					   }, 
					   icon: Ext.MessageBox.QUESTION
					});
					return false;
				}
			}
			return true;
		});
    },
    
    constructor: function(tabCont,projId) {
		this.projectId = projId;
		this.tabContainer = tabCont;
		ApplicationsFrame.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	return objectToSend;
	},
	addApplication: function(text,appType) {
		this.projectAppsGrid.addNew(text,appType);
    },
    notifyTypeChange: function(appName, appType) {
	    this.projectAppsGrid.notifyTypeChange(appName, appType);
    }
});

ProjectAppsGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	projectId: '',

	initComponent:function() {
		var eto = this;
	    var projectApplicationStore = new Ext.data.Store({
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
				{name: 'note', type: "string", mapping: 'note'},
				{name: 'new_ingredient', type: "boolean", mapping: 'new_ingredient'},
				{name: 'app_name', type: "string", mapping: 'app_name'},
				{name: 'app_type', type: "string", mapping: 'app_type'},
				{name: 'parm_updated', type: "boolean", mapping: 'parm_updated'},
				{name: 'cell_list_updated', type: "boolean", mapping: 'cell_list_updated'},
				{name: 'service_id', type: "string", mapping: 'service_id'}
			])

		});
		projectApplicationStore.on('load', function() {
			eto.fireEvent('contentLoaded', this);
		});
		// summary will use activate to load stores
		if(!this.readOnly) {
			projectApplicationStore.load();
		}

		var sm2 = new Ext.grid.RowSelectionModel({singleSelect:true});
		
		this.removeAppButton = new Ext.Button({
            text: 'Remove',
            iconCls: 'remove',
            disabled: true
        });
        
        var saveAppsHandler = function(button, event) {
	    	if(event) {
		        eto.submitApps(false);
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
			    arg2.attr = 'ext:qtip="'+val+'" ext:qtitle="App Note"';
	            return domMarkup;
	        }
	        return val;
	    }
	    Ext.apply(this, {
	        store: projectApplicationStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm2,
	        tbar: (!this.readOnly) ? [{
	            text: 'Save',
	            iconCls: 'save',
	            handler : saveAppsHandler
            },'-',
            this.removeAppButton
            ] : null,
	        columns: [{
	                header: "Application Name",
	                width: 170,
	                sortable: true,
	                dataIndex: 'app_name',
	                hideable: false
	            },{
	                header: "App Type",
	                width: 60,
	                sortable: true,
	                dataIndex: 'app_type',
	                hideable: true
	            },{
	                header: "New APP?",
	                width: 70,
	                sortable: true,
	                dataIndex: 'new_ingredient',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Parameter File Updated?",
	                width: 130,
	                sortable: true,
	                dataIndex: 'parm_updated',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Cell Listing Updated?",
	                width: 120,
	                sortable: true,
	                dataIndex: 'cell_list_updated',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Service ID",
	                width: 148,
	                sortable: true,
	                dataIndex: 'service_id',
	                editor: new Ext.form.TextField({
		           	})
	            },{
		            header: "Note",
		            width: 40,
		            dataIndex: 'note',
		            renderer: noteRenderer
	            }
	        ],
	        height: "auto",
	        width: 750,
	        autoHeight: true,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Applications'
	    });
	    ProjectAppsGrid.superclass.initComponent.call(this);
	    this.addEvents('contentLoaded');
	    
	    sm2.on('rowselect', function() {eto.removeAppButton.enable();});
	    sm2.on('rowdeselect', function() {eto.removeAppButton.disable();});
	    
	    this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    if(!eto.readOnly) {
			    var record = grid.getStore().getAt(rowIndex);  // Get the Record
			    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
			    // group_name cannot be changed
			    if(fieldName == "new_ingredient" || fieldName == "parm_updated" || fieldName == "cell_list_updated") {
			    	var data = record.get(fieldName);
				    if(data == true) {
					    record.set(fieldName, false);
				    } else {
					    record.set(fieldName, true);
				    }
		    	} else if(fieldName == "note") {
			    	if(record.get("ingredient_id") >= 0 && record.get("ingredient_id") != "") {
				    	Ext.Msg.prompt('Enter Note', 'Note:', function(btn, text){
						    if (btn == 'ok'){
						        record.set("note", text);
						    }
						}, this, true, record.get("note"));
					} else {
						Ext.Msg.alert('Apology', "Sorry, but you need to save this ingredient entry first =\)" );
					}
				}
			    //Ext.Msg.alert('Activation','Data: ' + data);
		    }
	    });
	    
	    var removeAppHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	eto.getStore().remove(selectedRecord);
		    	button.disable();
    		}
		};
	    this.removeAppButton.on('click', removeAppHandler);
	},
    
    constructor: function(projId,readOnly) {
		this.projectId = projId;
		if(readOnly) {
			this.readOnly = true;
		} else {
			this.readOnly = false;
		}
		ProjectAppsGrid.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var objectToSend = new Object();
	    var ingredientLists = new Array();
	    var gridStore = this.getStore();
	    var count = gridStore.getCount();
	    for(var c = 0; c < count; c++) {
	    	var rec = gridStore.getAt(c);
	    	ingredientLists[c] = rec.data;
	    	ingredientLists[c].app_type = null;
    	}
    	ingredientLists = Ext.encode(ingredientLists)
    	objectToSend.ingredient_list = ingredientLists;
    	objectToSend.project_id = this.projectId;
    	return objectToSend;
	},
    submitApps: function(skipReload) {
	    var eto = this;
	    var objectToSend = this.getValueObject();
	    var gridStore = this.getStore();
    	Ext.Ajax.request({
			url: 'UpdateProjectApps.ashx',
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
				    	if(skipReload == false) {
				    		gridStore.reload();
			    		}
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
	},
    addNew: function(text,appType) {
	    var indexo = this.getStore().find('app_name', text);
	    if(indexo < 0) {
		    var NewApplication = Ext.data.Record.create([
		    	{name: 'ingredient_id', type: 'int'},
	            {name: 'new_ingredient', type: 'boolean'},
	            {name: 'app_name', type: 'string'},
	            {name: 'app_type', type: 'string'},
	            {name: 'parm_updated', type: 'boolean'},
	            {name: 'service_id', type: 'string'},
	            {name: 'cell_list_updated', type: 'boolean'}	            
	      	]);
		    var p = new NewApplication({
	            ingredient_id: '',
	            new_ingredient: false,
	            app_name: text,
	            parm_updated: false,
	            service_id: '',
	            app_type: appType,
	            cell_list_updated: false
	        },text);
	        this.stopEditing();
	        this.getStore().insert(0, p);
	        this.startEditing(0, 0);
        }
    },
    notifyTypeChange: function(appName, appType) {
	    var i = this.getStore().find('app_name', appName);
	    if(i >= 0) {
		    var rec = this.getStore().getAt(i);
		    rec.set("app_type", appType);
	    }
    }
});