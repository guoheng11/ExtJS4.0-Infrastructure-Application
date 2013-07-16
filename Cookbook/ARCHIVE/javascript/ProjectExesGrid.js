ExecutablesFrame = Ext.extend(Ext.Panel, {
	projectId: '',
	projectExesGrid:'',
	exesGrid:'',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
		this.exesGrid = new ExecutablesGrid(this);
	    this.projectExesGrid = new ProjectExesGrid(this.projectId);
	    
	    Ext.apply(this, {
		    closable:true,
		    bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            title:'Executables',
            layout:'table',
            layoutConfig: {columns:2},
	        items: [this.projectExesGrid,this.exesGrid]
		});
    	
		ExecutablesFrame.superclass.initComponent.call(this);
		
		this.forceClose = false;
		this.originalValue = "";
		this.projectExesGrid.on('contentLoaded', function() {
			eto.originalValue = eto.projectExesGrid.getValueObject();
		});
		this.on('beforeclose', function() {
	    	if(!this.forceClose) {
		    	var newValue = eto.projectExesGrid.getValueObject();
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
							   eto.projectExesGrid.submitExes(true);
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
		ExecutablesFrame.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	return objectToSend;
	},
	addExecutable: function(name,type) {
		this.projectExesGrid.addNew(name,type,this.projectExesGrid);
    }
});

ProjectExesGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	projectId: '',

	initComponent:function() {
		var eto = this;
	    var projectExecutableStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectExes.ashx', // File to connect to
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
				{name: 'exe_name', type: "string", mapping: 'exe_name'},
				{name: 'exe_type', type: "string", mapping: 'exe_type'}
			])

		});
		projectExecutableStore.on('load', function() {
			eto.fireEvent('contentLoaded', this);
		});
		// summary will use activate to load stores
		if(!this.readOnly) {
			projectExecutableStore.load();
		}

		var sm2 = new Ext.grid.RowSelectionModel({singleSelect:true});
		
		this.removeExeButton = new Ext.Button({
            text: 'Remove',
            iconCls: 'remove',
            disabled: true
        });
        
        var saveExesHandler = function(button, event) {
	    	if(event) {
		        eto.submitExes(false);
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
			    arg2.attr = 'ext:qtip="'+val+'" ext:qtitle="Executable Note"';
	            return domMarkup;
	        }
	        return val;
	    }
	    Ext.apply(this, {
	        store: projectExecutableStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm2,
	        tbar: (!this.readOnly) ? [{
	            text: 'Save',
	            iconCls: 'save',
	            handler : saveExesHandler
            },'-',
            this.removeExeButton
            ] : null,
	        columns: [{
	                header: "Executable Name",
	                width: 240,
	                sortable: true,
	                dataIndex: 'exe_name',
	                hideable: false
	            },{
	                header: "Executable Type",
	                width: 140,
	                sortable: true,
	                dataIndex: 'exe_type',
	                hideable: false
	            },{
	                header: "New EXE?",
	                width: 90,
	                sortable: true,
	                dataIndex: 'new_ingredient',
	                //editor: comboYesNo,
	                renderer: boolRenderer
	            },{
		            header: "Note",
		            width: 40,
		            dataIndex: 'note',
		            renderer: noteRenderer
	            }
	        ],
	        height: "auto",
	        autoHeight: true,
	        width: (this.readOnly) ? 600 : 520,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Executables'
	    });
	    ProjectExesGrid.superclass.initComponent.call(this);
	    this.addEvents('contentLoaded');
	    
	    sm2.on('rowselect', function() {eto.removeExeButton.enable();});
	    sm2.on('rowdeselect', function() {eto.removeExeButton.disable();});
	    
	    this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    var record = grid.getStore().getAt(rowIndex);  // Get the Record
		    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
		    if(!eto.readOnly) {
			    // group_name cannot be changed
			    if(fieldName == "new_ingredient") {
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
			}
		    //Ext.Msg.alert('Activation','Data: ' + data);
	    });
	    var removeExeHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	eto.getStore().remove(selectedRecord);
		    	button.disable();
    		}
		};
	    this.removeExeButton.on('click', removeExeHandler);
	},
    
    constructor: function(projId,readOnly) {
		this.projectId = projId;
		if(readOnly) {
			this.readOnly = true;
		} else {
			this.readOnly = false;
		}
		ProjectExesGrid.superclass.constructor.call(this);
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
    submitExes: function(skipReload) {
	    var eto = this;
	    var objectToSend = this.getValueObject();
	    var gridStore = this.getStore();
    	Ext.Ajax.request({
			url: 'UpdateProjectExes.ashx',
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
	    var indexo = this.getStore().find('exe_name', name);
	    if(indexo < 0) {
		    var NewExecutable = Ext.data.Record.create([
		    	{name: 'ingredient_id', type: 'int'},
	            {name: 'new_ingredient', type: 'boolean'},
	            {name: 'exe_name', type: 'string'},
	            {name: 'exe_type', type: 'string'}
	      	]);
		    var p = new NewExecutable({
	            ingredient_id: '',
	            new_ingredient: false,
	            exe_name: name,
	            exe_type: type
	        },name);
	        this.stopEditing();
	        this.getStore().insert(0, p);
	        this.startEditing(0, 0);
        }
    }
});