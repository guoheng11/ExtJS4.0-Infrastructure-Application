Ext.define('CookBook.view.changelog.ViewChangeLogMainLog', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewChangeLogMainLog',
    
    name: 'changeLogMainLog',
    
    title: 'Change Log',
    
    store: 'ChangeLogs',
    columns: [{
        header: 'User Name',
        width: 150,
        dataIndex: 'user_name'
    }, {
        header: 'Date',
        width: 80,
        dataIndex: 'date'
    }, {
        header: 'Time',
        width: 80,
        dataIndex: 'time'
    }, {
        header: 'Tab',
        width: 80,
        dataIndex: 'tab'
    }, {
        header: 'Description',
        flex: 2,
        dataIndex: 'description',
		editor: {
			xtype: 'textarea',
			readOnly: true
		}
    }],
    selType: 'cellmodel',
    columnLines: true,
    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })]
});
