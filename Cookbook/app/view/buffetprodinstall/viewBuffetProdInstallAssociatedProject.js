Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallAssociatedProject', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewBuffetProdInstallAssociatedProject',
    bodyPadding: 5,
	width: 1060,
    bodyborder: false,
    layout: 'hbox',
    items:[{
        xtype: 'label',
        width: 145,
        html:  '<b>Associated Projects</b>'
    },{
        xtype: 'textfield',
        itemId: 'buffetProdInstallAssocProjectID',
        readOnly: true
    },{
        xtype: 'label',
        width: 35
    },{
        xtype: 'textfield',
        itemId: 'buffetProdInstallAssocUSANCCR',
        readOnly: true
    },{
        xtype: 'label',
        width: 75
    },{
        xtype: 'textfield',
        itemId: 'buffetProdInstallAssocCCR',
        readOnly: true
    },{
        xtype: 'label',
        width: 80
    },{
        xtype: 'textfield',
        itemId: 'buffetProdInstallAssocMaintStart',
        readOnly: true
    }]
});