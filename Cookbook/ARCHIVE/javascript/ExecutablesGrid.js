ExecutablesGrid = Ext.extend(Ext.grid.GridPanel, {
	myOwner: '',
	fp: '',
	win: '',
	
    initComponent:function() {
	    var eto = this;
	    
		var ArrayExeTypes = [
		    ['Engine'],
		    ['Scraper'],
		    ['Backoffice'],
		    ['Manager']
		];
		var storeExeTypes = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'value', type: 'string'}
		    ],
	        data : ArrayExeTypes
	    });
    
		var comboExeTypes = new Ext.form.ComboBox({
			name: 'exe_type',
	        store: storeExeTypes,
	        fieldLabel: 'Executable Type',
	        displayField:'value',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        forceSelection: false,
	        triggerAction: 'all',
	        selectOnFocus:true
	    });
		this.fp = new Ext.FormPanel({
	        width: 600,
	        frame: true,
	        autoHeight: true,
	        bodyStyle: 'padding: 10px 10px 0 10px;',
	        labelWidth: 150,
	        defaults: {
	            anchor: '95%',
	            allowBlank: false,
	            msgTarget: 'side'
	        },
	        items: [{
	            xtype: 'textfield',
	            fieldLabel: 'Executable Name',
	            name: 'exe_name'
	        },comboExeTypes],
	        buttons: [{
	            text: 'Upload',
	            handler: function(){
	                if(eto.fp.getForm().isValid()){
		                var thisForm = eto.fp.getForm();
		                thisForm.submit({
		                    url: 'AddExecutable.ashx',
		                    success: function(fp, o) {
			                    eto.win.hide();
			                    eto.fp.getForm().reset();
			                    eto.getStore().reload();
		                        //Ext.Msg.alert('Success', 'Done');
		                    },
		                    failure: function(fp, o) {
			                    Ext.Msg.alert('Failure', 'Addition Failed');
		                    }
		                });
	                }
	            }
	        },{
	            text: 'Reset',
	            handler: function(){
	                eto.fp.getForm().reset();
	            }
	        }]
	    });

        this.win = new Ext.Window({
	        id: 'promptAddExe-'+this.projectId,
            title: 'Adding Executable',
            closeAction: 'hide',
            width: 600,
            height: 140,
            layout: 'form',
            hidden: true,
            items: [eto.fp]
        });
        
		var newExecutableHandler = function(button, event) {
	    	if(event) {
		    	eto.win.show();
    		}
		};
	    var liveSearchExeHandler = function(field, event) {
	    	if(event) {
		    	eto.findName(field.getValue(), eto);
    		}
		};
		
		var addExeToProjHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	eto.myOwner.addExecutable(selectedRecord.get('exe_name'),selectedRecord.get('exe_type'));
    		}
		};
		
		var deleteHandler = function(button, event) {
	    	if(event) {
		    	eto.onDeleteExe(eto);
    		}
		};
		var executableStore = new Ext.data.Store({
			id: 'executableStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetExecutables.ashx', // File to connect to
				method: 'GET'
			}),
			//baseParams:{"biz_id": "1"}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'exe_name', type: "string", mapping: 'exe_name'},
				{name: 'exe_type', type: "string", mapping: 'exe_type'}
			])
		});
		executableStore.load();
		
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    this.on('rowdblclick', this.onRowDblClick, this);
	    this.on('activate', this.onActivated, this);
	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
		
	    var liveSearchByExeName = new Ext.form.TextField({
		    emptyText: 'Filter by name...',
		    enableKeyEvents: true,
		    width: 130
	    });
		liveSearchByExeName.on('keyup', liveSearchExeHandler);
	    this.deleteButton = new Ext.Button({  
	        text:'Delete',
            tooltip:'Delete Selected Executable',
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
            handler: addExeToProjHandler
        });
	    Ext.apply(this, {
		    store: executableStore,
		    collapsable: true,
		    style: 'margin: 10',
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            {id:'exe_name',header: "Executable Name", width: 40, dataIndex: 'exe_name'},
		            {header: "Executable Type", width: 40, dataIndex: 'exe_type'}
	        	]
			}),
			sm: sm1,
			
			// inline toolbars
	        tbar: [{
		        text:'New',
	            tooltip:'Create New Executable',
	            iconCls:'add',
	            disabled:false,
	            handler: newExecutableHandler
	        },this.deleteButton,{
		    	xtype: 'tbspacer',
		    	width: '5'
	    	},this.addButton,'->', liveSearchByExeName,{
		    	xtype: 'tbspacer',
		    	width: '10'
	    	}],
	        viewConfig: {
	            forceFit:true
	        },
	        autoWidth: true,
	        // set width and it will forceFit to it
	        width: 400,
	        //autoHeight: true,
        	height:900,
	        stripeRows: true,
	        collapsible: false,
	        animCollapse: false,
	        frame:true,
	        title: 'USAN Executables',
	        iconCls: 'icon-grid'
		});
	    
    	ExecutablesGrid.superclass.initComponent.call(this);
    },
	constructor: function(owner) {
		this.myOwner = owner;
		ExecutablesGrid.superclass.constructor.call(this);
    },
    onRowDblClick: function(g, rowIndex, e) {
	    var selectedRecord = g.getStore().getAt(rowIndex);
	    this.myOwner.addExecutable(selectedRecord.get('exe_name'),selectedRecord.get('exe_type'));
    },
    onCreateApp: function() {
	    
    },
    onDeleteExe: function() {
	    var eto = this;
	    var selectedRecord = this.getSelectionModel().getSelected();
    	var conn = new Ext.data.Connection();
		conn.request({
		    url: 'DeleteExecutable.ashx',
		    method: 'POST',
		    params: {"exe_name": selectedRecord.get("exe_name")},
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
				    		Ext.Msg.alert('Deletion Failed', 'Executable could not be deleted. May be it is tied to a project?');
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
    },
    
    onRowDeselect: function(sm, rowIndex, r){        
        this.addButton.disable();
        this.deleteButton.disable();
    },
    onActivated: function(){        
        this.getStore().reload();
    },
    
    refresh: function() {
	    var store = this.getStore();
	    store.reload();
    },
    findName: function(executableName) {
	    var store = this.getStore();
	    store.baseParams.exe_name = executableName;
	    store.reload();
    },
    resetStore: function() {
	    var store = this.getStore();
	    store.baseParams.exe_name = "";
	    store.reload();
    }

});