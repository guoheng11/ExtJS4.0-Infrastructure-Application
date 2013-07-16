Ext.define('CookBook.view.deliverables.ViewDeliverablesProjectList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewDeliverablesProjectList',
    
    name: 'viewDeliverablesProjectList',
    
    title: 'Project Deliverables',
    //region: 'center',
    //clicksToEdit: 2,
    //loadMask: true,
    store: 'ProjectDeliverables',
    columns: [{
        header: 'Deliverable',
        width: 170,
        flex: 1,
        dataIndex: 'deliverable_text',
        editor: {
            xtype: 'textarea'
        }
    },    /*
     { header: 'Category', width: 144, dataIndex: 'category', editor: {
     xtype: 'combobox',
     store: 'Categories',
     multiSelect:		false,
     displayField:		'category1',
     valueField:			'category1',
     allowBlank:			true,
     matchFieldWidth:	true,
     listConfig: {
     autoHeight: true
     },
     queryMode:			'local'
     }},*/
    {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex){
                grid.getStore().removeAt(rowIndex);
            }
        }]
    }],
    selType: 'cellmodel',
    columnLines: true,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    viewConfig: {        //stripeRows: true
    },
    tools: [{
        type: 'plus',
        tooltip: 'Add a blank project deliverable',
        handler: function(event, toolEl, panel){
            var gridPanel = panel.up();
            gridPanel.getStore().add({}); //add an empty row
        }
    }]
});
