TablesGrid = Ext.extend(Ext.grid.GridPanel, {
    myOwner: '',
    oldTableType: '',
    fp: '',
    win: '',

    initComponent: function() {
        var eto = this;

        var ArrayTableTypes = [
        ['db20'],
        ['db40'],
        ['db40b'],
        ['db40bl'],
        ['dbn']
        ];
        var storeTableTypes = new Ext.data.ArrayStore({
            fields: [{
                name: 'value',
                type: 'string'
            }
            ],
            data : ArrayTableTypes
        });
		
        var comboTableTypes = new Ext.form.ComboBox({
            name: 'table_type',
            store: storeTableTypes,
            fieldLabel: 'Table Type',
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
            labelWidth: 100,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Table Name',
                name: 'table_name'
            },{
	            xtype: 'combo',
	            name: 'table_type',
	            store: storeTableTypes,
	            fieldLabel: 'Table Type',
	            displayField:'value',
	            typeAhead: true,
	            mode: 'local',
	            editable: true,
	            forceSelection: false,
	            triggerAction: 'all',
	            selectOnFocus:true
	        }],
            buttons: [{
                text: 'Upload',
                handler: function() {
                    if(eto.fp.getForm().isValid()) {
                        var thisForm = eto.fp.getForm();
                        thisForm.submit({
                            url: 'AddTable.ashx',
                            success: function(fp, o) {
                                eto.win.hide();
                                eto.fp.getForm().reset();
                                eto.getStore().reload();
                                //Ext.Msg.alert('Success', 'Done');
                            },
                            failure: function(fp, o) {
                                Ext.Msg.alert('Failure', 'Addition Failed');
                                eto.win.hide();
                            }
                        });
                    }
                }
            },{
                text: 'Reset',
                handler: function() {
                    eto.fp.getForm().reset();
                }
            }]
        });

        var tableNameTF = new Ext.form.TextField({
            width:140,
            readOnly: true,
            value: '',
            name: 'table_name',
            fieldLabel: 'Table Name'
        });

        this.editfp = new Ext.FormPanel({
            width: 600,
            frame: true,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            labelWidth: 100,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items: [tableNameTF,comboTableTypes],
            buttons: [{
                text: 'Submit Changes',
                style: 'padding-right: 10px;',
                handler: function() {
                    if(eto.editfp.getForm().isValid()) {
                        var thisForm = eto.editfp.getForm();
                        thisForm.submit({
                            url: 'UpdateTable.ashx',
                            success: function(editfp, o) {
                                eto.editWin.hide();
                                eto.editfp.getForm().reset();
                                eto.getStore().reload();
                            },
                            failure: function(editfp, o) {
                                Ext.Msg.alert('Failure', 'Edit Failed');
                                eto.editWin.hide();
                            }
                        });
                    }
                }
            }]
        });

        this.win = new Ext.Window({
            //id: 'promptAddTable-'+this.projectId,
            title: 'Adding Table',
            closeAction: 'hide',
            width: 600,
            //autoHeight: true,
            height: 140,
            layout: 'form',
            hidden: true,
            items: [eto.fp]
        });

        this.editWin = new Ext.Window({
            title: 'Editing Table',
            closeAction: 'hide',
            width: 600,
            height: 140,
            layout: 'form',
            hidden: true,
            items: [eto.editfp]
        });

        var newTableHandler = function(button, event) {
            if(event) {
                eto.win.show();
            }
        };
        var editTableHandler = function(button, event) {
            if(event) {

                var selectedRecord = eto.getSelectionModel().getSelected();

                if(selectedRecord instanceof Ext.data.Record) {
                    var tableName = selectedRecord.get('table_name');
                    var tableType = selectedRecord.get('table_type');

                    tableNameTF.setValue(tableName);
                    comboTableTypes.setValue(tableType);
                    eto.oldTableType = tableType;
                    eto.editWin.show();
                } else {
                    button.disable();
                }
            }
        };
        var liveSearchTableHandler = function(field, event) {
            if(event) {
                eto.findName(field.getValue(), eto);
            }
        };
        var addTableToProjHandler = function(button, event) {
            if(event) {
                var selectedRecord = eto.getSelectionModel().getSelected();
                if(selectedRecord instanceof Ext.data.Record) {
                    eto.myOwner.addTable(selectedRecord.get('table_name'),selectedRecord.get('table_type'));
                } else {
                    button.disable();
                }
            }
        };
        var deleteHandler = function(button, event) {
            if(event) {
                eto.onDeleteTable(eto);
            }
        };
        var tableStore = new Ext.data.Store({
            id: 'tableStore',
            proxy: new Ext.data.HttpProxy({
                url: 'GetTables.ashx', // File to connect to
                method: 'GET'
            }),
            //baseParams:{"biz_id": "1"}, // this parameter asks for listing
            reader: new Ext.data.JsonReader({
                // we tell the datastore where to get his data from
                root: 'rows',
                totalProperty: 'total'
            }, [{
                name: 'table_name',
                type: "string",
                mapping: 'table_name'
            },{
                name: 'table_type',
                type: "string",
                mapping: 'table_type'
            }
            ])
        });

        tableStore.on('load', function() {
            eto.onRowDeselect();
        });
        tableStore.load();

        var sm1 = new Ext.grid.RowSelectionModel({
            singleSelect:true
        });

        this.on('rowdblclick', this.onRowDblClick, this);
        this.on('activate', this.onActivated, this);
        sm1.on('rowselect', this.onRowSelect, this);
        sm1.on('rowdeselect', this.onRowDeselect, this);

        var liveSearchByTableName = new Ext.form.TextField({
            emptyText: 'Filter by name...',
            enableKeyEvents: true,
            width: 130
        });
        liveSearchByTableName.on('keyup', liveSearchTableHandler);

        this.deleteButton = new Ext.Button({
            text:'Delete',
            tooltip:'Delete Selected Table',
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
            handler: addTableToProjHandler
        });

        this.editButton = new Ext.Button({
            text:'Edit',
            tooltip:'Edit Table Type',
            iconCls:'edit',
            itemId: 'editTableButton',
            disabled: true,
            handler: editTableHandler
        });

        Ext.apply(this, {
            store: tableStore,
            collapsable: true,
            style: 'margin: 10',
            cm: new Ext.grid.ColumnModel({
                defaults: {
                    width: 20,
                    sortable: true
                },
                columns: [{
                    id:'exe_name',
                    header: "Table Name",
                    width: 40,
                    dataIndex: 'table_name'
                },{
                    header: "Table Type",
                    width: 40,
                    dataIndex: 'table_type'
                }
                ]
            }),
            sm: sm1,

            // inline toolbars
            tbar: [{
                text:'New',
                tooltip:'Create New Table',
                iconCls:'add',
                disabled:false,
                handler: newTableHandler
            },this.deleteButton,{
                xtype: 'tbspacer',
                width: '5'
            },this.addButton,{
                xtype: 'tbspacer',
                width: '10'
            },this.editButton,'->', liveSearchByTableName,{
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
            title: 'USAN Tables',
            iconCls: 'icon-grid'
        });
        TablesGrid.superclass.initComponent.call(this);
    },
    constructor: function(owner) {
        this.myOwner = owner;
        TablesGrid.superclass.constructor.call(this);
    },
    onRowDblClick: function(g, rowIndex, e) {
        var selectedRecord = g.getStore().getAt(rowIndex);
        this.myOwner.addTable(selectedRecord.get('table_name'),selectedRecord.get('table_type'));
    },
    onCreateApp: function() {

    },
    onDeleteTable: function() {
        var eto = this;
        var selectedRecord = this.getSelectionModel().getSelected();
        if(selectedRecord instanceof Ext.data.Record) {

            var conn = new Ext.data.Connection();
            conn.request({
                url: 'DeleteTable.ashx',
                method: 'POST',
                params: {
                    "table_name": selectedRecord.get("table_name")
                },
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
                                Ext.Msg.alert('Deletion Failed', 'Table could not be deleted. May be it is tied to a project?');
                            }
                        }
                    } else {
                        Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
                    }
                }
            });
        }
    },
    onRowSelect: function(sm, rowIndex, r) {
        this.addButton.enable();
        this.deleteButton.enable();
        this.editButton.enable();
    },
    onRowDeselect: function(sm, rowIndex, r) {
        this.addButton.disable();
        this.deleteButton.disable();
        this.editButton.disable();
    },
    onActivated: function() {
        this.getStore().reload();
    },
    refresh: function() {
        var store = this.getStore();
        store.reload();
    },
    findName: function(tableName) {
        var store = this.getStore();
        store.baseParams.table_name = tableName;
        store.reload();
    },
    resetStore: function() {
        var store = this.getStore();
        store.baseParams.table_name = "";
        store.reload();
    }
});