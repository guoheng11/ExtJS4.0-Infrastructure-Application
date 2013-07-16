Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallRequirements', {
    extend: 'Ext.grid.Panel',
    alias:  'widget.viewBuffetProdInstallRequirements',

    name: 'buffetprodinstallRequirements',
    title: 'Buffet Requirements',
    autoScroll: true,
    //collapsible: true,
    //collapseFirst: false,
    //collapsed: false,

    /*store: 'MISDnisUpdates',*/
    store: 'BuffetProdInstallRequirements',
    columns: [{
        header: 'Associated Project(s)',
        width: 200,
        dataIndex: 'associated_projects'
    }/* removed 6-1-12 ,{
        header: 'Requirement Type',
        dataIndex: 'type',
        flex: 1
    }*/,{
        header: 'File Name',
        dataIndex: 'filename',
        flex: 1
    },{
        header: 'Notes',
        flex: 1,
        dataIndex: 'notes',
        editor: {
            xtype: 'textarea'
        }
    },{
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function (grid, rowIndex, colIndex) {
                grid.getStore().removeAt(rowIndex);
                //grid.getStore().sync();
            }
        }]
    }
    ],
    selType: 'cellmodel',
    //columnLines: true,
    plugins: [
    Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })
    ],
    tools: [/*{
        type: 'refresh',
        handler: function(event, toolEl, panel) {
            var gridPanel = panel.up();
            gridPanel.getStore().sync();
        }
    }*/]
});