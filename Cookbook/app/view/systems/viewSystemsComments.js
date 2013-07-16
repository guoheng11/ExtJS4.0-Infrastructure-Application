Ext.define('CookBook.view.systems.ViewSystemsComments', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSystemsComments',
    title: 'Comments',
    collapsible: true,
    height: 150,
    items:[{
        xtype: 'textarea',
        width: 1224,
        height: 150,
        itemId: 'systemsCommentsArea',
        name: 'systemsCommentsArea'
    }
    ]
});