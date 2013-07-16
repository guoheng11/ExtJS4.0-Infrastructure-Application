Ext.define('CookBook.view.requirements.ViewReqTable', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewReqTable',

    title: 'Table',
    //collapsible: true,
    //collapseFirst: true,
    collapsed: true,

    store: 'TableRequirements',

    columns: [{
        header: 'New?',
        dataIndex: 'new',
        width: 50,
        editor: {
            xtype: 'combobox',
            store: {
                fields: ['new'],
                data: [{
                    'new': 'true'
                }, {
                    'new': 'false'
                }]
            },
            multiSelect: false,
            displayField: 'new',
            valueField: 'new',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'Name',
        dataIndex: 'name',
        flex: 1,
        editor: {
            xtype: 'combobox',
            store: 'ExtdbTables',
            multiSelect: false,
            displayField: 'name',
            valueField: 'name',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local',
            listeners: {
                blur: function() {
                    var theStore = GLOBAL_currentController.getStore("ExtdbTables");
                    var theStoreIndex = theStore.find('name', this.getValue());
                    if (theStoreIndex != undefined && theStoreIndex != -1 && theStoreIndex != null) {
                        var theStoreType = theStore.getAt(theStoreIndex).get('type');
                        var fieldValue = this.getValue();
                        Ext.Function.defer(populateTableType, 250, this, [theStoreType, fieldValue]);
                    }
                }
            }
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/resources/themes/images/gray/grid/page-next.gif',
            tooltip: 'click to propagate name to other columns',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex).get('name');
                grid.getStore().getAt(rowIndex).set('xls_csv_file', rec + '.xls/.csv');
            }
        }]
    }, {
        header: '.xls/.csv File',
        dataIndex: 'xls_csv_file',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/resources/themes/images/gray/grid/page-next.gif',
            tooltip: 'click to propagate name to other columns',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex).get('name');
                grid.getStore().getAt(rowIndex).set('def_file', rec + '_def.csv');
            }
        }]
    }, {
        header: 'def.csv File',
        dataIndex: 'def_file',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/resources/themes/images/gray/grid/page-next.gif',
            tooltip: 'click to propagate name to other columns',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex).get('name');
                grid.getStore().getAt(rowIndex).set('etm_file', rec + '.etm');
            }
        }]
    }, {
        header: '.etm File',
        dataIndex: 'etm_file',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: 'Table Type',
        dataIndex: 'table_type',
        flex: 1,
        editor: {
            xtype: 'combobox',
            store: {
                fields: ['table_type'],
                data: [{
                    'table_type': 'db40'
                }, {
                    'table_type': 'db40b'
                }, {
                    'table_type': 'db40bl'
                }, {
                    'table_type': 'dbn'
                }]
            },
            multiSelect: false,
            displayField: 'table_type',
            valueField: 'table_type',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'UAT Load',
        dataIndex: 'uat_load',
        editor: {
            xtype: 'textfield'
        },
        flex: 1
    }, {
        header: 'PROD Load',
        dataIndex: 'prod_load',
        editor: {
            xtype: 'textfield'
        },
        flex: 1
    }, {
        header: 'Notes',
        dataIndex: 'notes',
        editor: {
            xtype: 'textarea'
        },
        flex: 1
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex) {
                if (GLOBAL_readonly) {
                    return;
                }
                if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                    return;
                }
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
            }
        }]
    }],
    selType: 'cellmodel',
    plugins: [
    Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    tools: [{
        type: 'gear',
        tooltip: 'Open the editor utility',
        handler: function(event, toolEl, panel) {
            openExtdbTableEditor();
        }
    }, {
        type: 'plus',
        tooltip: 'Add another entry to this table',
        handler: function(event, toolEl, panel) {
            if (GLOBAL_readonly) {
                return;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                return;
            }
            var gridPanel = panel.up();
            if (gridPanel.collapsed) {
                gridPanel.expand(true);
            }
            gridPanel.getStore().add({
                project_id: GLOBAL_currentProjectOpenProjectID
            }); //add an empty row
        }
    }
    /*,{
     type: 'refresh',
     handler: function(event, toolEl, panel) {
     var gridPanel = panel.up();
     gridPanel.getStore().sync();
     }
     }*/
    ],
    listeners: {

    }

});

function populateTableType(theStoreType, fieldValue) {
    var reqGridStore = Ext.ComponentQuery.query('viewReqTable')[0].getStore();
    var reqGridStoreIndex = reqGridStore.find('name', fieldValue);
    reqGridStore.getAt(reqGridStoreIndex).set('table_type', theStoreType);
}