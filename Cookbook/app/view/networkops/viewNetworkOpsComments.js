Ext.define('CookBook.view.networkops.ViewNetworkOpsComments', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewNetworkOpsComments',
    title: 'Comments',
    collapsible: true,
    height: 150,
    items:[{
        xtype: 'textarea',
        width: 1424,
        height: 145,
        itemId: 'networkOpsCommentsArea',
        name: 'networkOpsCommentsArea'
    }
    ]
});