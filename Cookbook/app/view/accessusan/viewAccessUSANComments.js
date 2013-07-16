Ext.define('CookBook.view.accessusan.ViewAccessUSANComments', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewAccessUSANComments',
    title: 'Comments',
    collapsible: true,
    height: 150,
    width: 1410,
    items: [{
        xtype: 'textarea',
        width: 1400,
        height: 145,
        itemId: 'accessUSANCommentsArea',
        name: 'accessUSANCommentsArea'
    }]
});