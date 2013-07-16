Ext.define('CookBook.view.assumptions.ViewAssumptionsProjectList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewAssumptionsProjectList',
    
    name: 'viewAssumptionsProjectList',
    
    title: 'Project Assumptions',
    //region: 'center',
    //clicksToEdit: 2,
    //loadMask: true,
    store: 'ProjectAssumptions',
    columns: [/*{
        header: 'Order',
        width: 50,
        dataIndex: 'sort_order',
        editor: {
            xtype: 'numberfield',
			minValue: 0,
			sortable: true
        }
    },*/{
        header: 'Assumption',
        width: 170,
        flex: 1,
        dataIndex: 'assumption_text',
        editor: {
            xtype: 'textarea'
        }
    }, {
        header: 'Category',
        width: 144,
        dataIndex: 'category',
        editor: {
            xtype: 'combobox',
            store: 'Categories',
            multiSelect: false,
            displayField: 'category1',
            valueField: 'category1',
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
        tooltip: 'Add a blank project assumption',
        handler: function(event, toolEl, panel){
            var gridPanel = panel.up();
            gridPanel.getStore().add({}); //add an empty row
        }
    }]
});
