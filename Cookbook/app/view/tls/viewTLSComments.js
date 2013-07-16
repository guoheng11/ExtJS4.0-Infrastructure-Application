Ext.define('CookBook.view.tls.ViewTLSComments', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSComments',
    title: 'Comments',
    collapsible: true,
    height: 110,
    items:[{
        xtype: 'textarea',
        width: 1410,
        height: 100,
        itemId: 'tlsCommentsArea',
        name: 'tlsCommentsArea'
    }
    ]
});