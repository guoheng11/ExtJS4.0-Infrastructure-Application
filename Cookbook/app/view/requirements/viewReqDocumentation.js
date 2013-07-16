Ext.define('CookBook.view.requirements.ViewReqDocumentation', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewReqDocumentation',

    name: 'requirementsDocumentation',

    title: 'Documentation',
    //collapsible: true,
    //collapseFirst: true,
    collapsed: true,

    store: 'DocumentationRequirements',
    columns: [{
        header: 'File Name .vsd/.doc/.xls',
        dataIndex: 'filename',
        flex: 2,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: 'Latest Version',
        dataIndex: 'latest_version',
        editor: {
            xtype: 'textfield'
        },
        flex: 1
    }, {
        header: 'UAT Version',
        dataIndex: 'uat_version',
        editor: {
            xtype: 'textfield'
        },
        flex: 1
    }, {
        header: 'PROD Version',
        dataIndex: 'prod_version',
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