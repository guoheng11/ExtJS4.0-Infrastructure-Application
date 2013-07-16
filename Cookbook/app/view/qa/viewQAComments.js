Ext.define('CookBook.view.qa.ViewQAComments', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewQAComments',
    title: 'Comments',
    collapsible: true,
    height: 150,
    items:[{
        xtype: 'textarea',
        width: 1424,
        height: 145,
        itemId: 'qaCommentsArea',
        name: 'qaCommentsArea'
    }
    ]
});