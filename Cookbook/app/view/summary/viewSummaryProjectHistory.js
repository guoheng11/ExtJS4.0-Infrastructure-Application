Ext.define('CookBook.view.summary.ViewSummaryProjectHistory', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewSummaryProjectHistory',
    
    store: 'ProjectHistories',
    
    //options
    title: 'Project History',
    autoScroll: true,
    columns: [{
        header: 'Date',
        width: 100,
        xtype: 'datecolumn',
        dataIndex: 'date',
        editor: {
            xtype: 'datefield',
            format: 'm/d/y'
        }
    }, {
        header: 'User',
        width: 100,
        dataIndex: 'user_name'
    }, //can't modify this (for very clear reasons)
    {
        header: 'History',
        flex: 1,
        dataIndex: 'description',
        editor: {
            xtype: 'textarea'
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
    
    name: 'usanProjectHistory',
    
    selType: 'cellmodel',
    columnLines: true,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    viewConfig: { //stripeRows: true
}    ,
    tools: [{
        type: 'plus',
        tooltip: 'Add another history entry to this table',
        handler: function(event, toolEl, panel){
            var gridPanel = panel.up();
            gridPanel.getStore().add({
                user_name: GLOBAL_username,
                project_id: GLOBAL_currentProjectOpenProjectID,
                date: new Date()
            }); //add an empty row
        }
    }]
});

function setMostRecentProjectStatus(){
    var store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectStatuses');
    store.removeAll();
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.load({
        callback: function(){
            store.sort('date', 'DESC');
            if (store.getAt(0)) {
                if (store.getAt(0).get('type')) {
                    try {
                        var currentStatus = Ext.ComponentQuery.query('viewSummaryProjectStatus');
                        console.log(store.getAt(0).get('type'));
                        currentStatus[0].setValue(store.getAt(0).get('type'));
                    } 
                    catch (err) {
                        console.log('Error in set Most Recent Project Status (viewSummarProjectHistory.js) |' + err);
                    }
                }
                else {
                    //console.log('b');
                }
            }
            else {
                //console.log('a');
            }
        }
    });
    
}
