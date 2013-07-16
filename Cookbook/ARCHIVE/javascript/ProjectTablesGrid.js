Ext.namespace('Cookbook.View');

TablesFrame = Ext.extend(Ext.Panel, {
	projectId: '',
	projectTablesGrid:'',
	tablesGrid:'',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
		this.tablesGrid = new TablesGrid(this);
	    this.projectTablesGrid = new ProjectTablesGrid(this.projectId);
	    
	    Ext.apply(this, {
		    closable:true,
		    bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            title:'Tables',
            layout:'table',
            layoutConfig: {columns:2},
	        items: [this.projectTablesGrid,this.tablesGrid]
		});
    	
		TablesFrame.superclass.initComponent.call(this);
		
		this.forceClose = false;
		this.originalValue = "";
		this.projectTablesGrid.on('contentLoaded', function() {
			eto.originalValue = eto.projectTablesGrid.getValueObject();
		});
		this.on('beforeclose', function() {
	    	if(!this.forceClose) {
		    	var newValue = eto.projectTablesGrid.getValueObject();
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
							   eto.projectTablesGrid.submitTables(true);
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
		TablesFrame.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	return objectToSend;
	},
	addTable: function(name,type) {
		this.projectTablesGrid.addNew(name,type,this.projectTablesGrid);
    }
});

ProjectTablesGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	projectId: '',

	initComponent:function() {
		var eto = this;
	    var projectTableStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectTables.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId},
			reader: new Ext.data.JsonReader({   
				root: 'rows',
				totalProperty: 'total',
				id: 'ingredient_id'
			}, [
				{name: 'ingredient_id', type: "int", mapping: 'ingredient_id'},
				{name: 'new_ingredient', type: "boolean", mapping: 'new_ingredient'},
				{name: 'table_name', type: "string", mapping: 'table_name'},
				{name: 'table_type', type: "string", mapping: 'table_type'},
				{name: 'def_updated', type: "boolean", mapping: 'def_updated'},
				{name: 'meta_updated', type: "boolean", mapping: 'meta_updated'},
				{name: 'note', type: "string", mapping: 'note'},
				{name: 'usan_uat_load', type: "boolean", mapping: 'usan_uat_load'},
				{name: 'usan_prod_load', type: "boolean", mapping: 'usan_prod_load'}
			])

		});
		projectTableStore.on('load', function() {
			eto.fireEvent('contentLoaded', this);
		});
		// summary will use activate to load stores
		if(!this.readOnly) {
			projectTableStore.load();
		}

		var sm2 = new Ext.grid.RowSelectionModel({singleSelect:true});
		
		this.removeTableButton = new Ext.Button({
            text: 'Remove',
            iconCls: 'remove',
            disabled: true
        });
        
        var saveTablesHandler = function(button, event) {
	    	if(event) {
		        eto.submitTables(false);
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
			    arg2.attr = 'ext:qtip="'+val+'" ext:qtitle="Table Note"';
	            return domMarkup;
	        }
	        return val;
	    }
	    Ext.apply(this, {
	        store: projectTableStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm2,
	        tbar: (!this.readOnly) ? [{
	            text: 'Save',
	            iconCls: 'save',
	            handler : saveTablesHandler
            },'-',
            this.removeTableButton
            ] : null,
	        columns: [{
	                header: "Table Name",
	                width: 200,
	                sortable: true,
	                dataIndex: 'table_name',
	                hideable: false
	            },{
	                header: "Table Type",
	                width: 75,
	                sortable: true,
	                dataIndex: 'table_type',
	                hideable: false
	            },{
	                header: "New Table?",
	                width: 75,
	                sortable: true,
	                dataIndex: 'new_ingredient',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Def Updated?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'def_updated',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Meta Updated?",
	                width: 80,
	                sortable: true,
	                dataIndex: 'meta_updated',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Usan UAT Load?",
	                width: 95,
	                sortable: true,
	                dataIndex: 'usan_uat_load',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
	                header: "Usan PROD Load?",
	                width: 100,
	                sortable: true,
	                dataIndex: 'usan_prod_load',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
		            header: "Note",
		            width: 40,
		            dataIndex: 'note',
		            renderer: noteRenderer
	            }
	        ],
	        height: 'auto',
	        autoHeight: true,
	        width: 750,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Tables'
	    });
	    ProjectTablesGrid.superclass.initComponent.call(this);
	    this.addEvents('contentLoaded');
	    
	    sm2.on('rowselect', function() {eto.removeTableButton.enable();});
	    sm2.on('rowdeselect', function() {eto.removeTableButton.disable();});
	    
	    this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    if(!eto.readOnly) {
			    var record = grid.getStore().getAt(rowIndex);  // Get the Record
			    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
			    // group_name cannot be changed
			    if(fieldName == "new_ingredient" || fieldName == "def_updated" || fieldName == "meta_updated" || fieldName == "usan_uat_load"|| fieldName == "usan_prod_load") {
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
	    
	    var removeTableHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	eto.getStore().remove(selectedRecord);
		    	button.disable();
    		}
		};
	    this.removeTableButton.on('click', removeTableHandler);
	},
    
    constructor: function(projId, readOnly) {
		this.projectId = projId;
		if(readOnly) {
			this.readOnly = true;
		} else {
			this.readOnly = false;
		}
		ProjectTablesGrid.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var objectToSend = new Object();
	    var ingredientLists = new Array();
	    var gridStore = this.getStore();
	    var count = gridStore.getCount();
	    for(var c = 0; c < count; c++) {
	    	var rec = gridStore.getAt(c);
	    	ingredientLists[c] = rec.data;
    	}
    	ingredientLists = Ext.encode(ingredientLists)
    	objectToSend.ingredient_list = ingredientLists;
    	objectToSend.project_id = this.projectId;
    	return objectToSend;
	},
    submitTables: function(skipReload) {
	    var eto = this;
	    var objectToSend = this.getValueObject();
	    var gridStore = this.getStore();
    	Ext.Ajax.request({
			url: 'UpdateProjectTables.ashx',
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
    addNew: function(name, type) {
	    var indexo = this.getStore().find('table_name', name);
	    if(indexo < 0) {
		    var NewTable = Ext.data.Record.create([
		    	{name: 'ingredient_id', type: 'int'},
	            {name: 'new_ingredient', type: 'boolean', mapping: 'new_ingredient'},
	            {name: 'table_name', type: 'string'},
	            {name: 'table_type', type: 'string'},
	            {name: 'def_updated', type: 'boolean'},
	            {name: 'meta_updated', type: 'boolean'},
	            {name: 'usan_uat_load', type: 'boolean'},
	            {name: 'usan_prod_load', type: 'boolean'}
	      	]);
		    var p = new NewTable({
	            ingredient_id: '',
	            new_ingredient: false,
	            table_name: name,
	            table_type: type,
	            def_updated: false,
	            meta_updated: false,
	            usan_uat_load: false,
	            usan_prod_load: false
	        },name);
	        this.stopEditing();
	        this.getStore().insert(0, p);
	        this.startEditing(0, 0);
        }
    }
});