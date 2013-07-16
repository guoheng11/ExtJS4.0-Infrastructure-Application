Ext.define('CookBook.view.requirements.ViewReqConfigurationFile', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewReqConfigurationFile',

    title: 'Configuration File',
    //collapsible: true,
    //collapseFirst: true,
    collapsed: true,

    store: 'ConfigFileRequirements',

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
        flex: 2,
        editor: {
            xtype: 'combobox',
            store: 'ConfigurationFiles',
            multiSelect: false,
            displayField: 'name',
            valueField: 'name',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/resources/themes/images/gray/grid/page-next.gif',
            tooltip: 'click to propagate name to other columns',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex).get('name');
                grid.getStore().getAt(rowIndex).set('filename', rec + '.tin');
            }
        }]
    }, {
        header: '.tin/.dd.xml/.xsd File',
        dataIndex: 'filename',
        editor: {
            xtype: 'textfield'
        },
        flex: 2
    }, {
        header: 'Instructions .txt',
        dataIndex: 'instructions',
        editor: {
            xtype: 'textfield'
        },
        flex: 2
    }, {
        header: 'Notes',
        dataIndex: 'notes',
        editor: {
            xtype: 'textarea'
        },
        flex: 2
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
            openConfigurationFileEditor();
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
    ]
});