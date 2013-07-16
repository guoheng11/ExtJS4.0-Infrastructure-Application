Ext.define('CookBook.view.swd.ViewSWDComments', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDComments',
    title: 'Comments',
    collapsible: true,
    height: 110,
    items:[{
        xtype: 'textarea',
        width: 1410,
        height: 100,
        itemId: 'swdCommentsArea',
        name: 'swdCommentsArea'
    }
    ]
});