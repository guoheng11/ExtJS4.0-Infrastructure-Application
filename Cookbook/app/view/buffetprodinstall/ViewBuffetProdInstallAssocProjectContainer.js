Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallAssocProjectContainer', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewBuffetProdInstallAssocProjectContainer',
    bodyBorder: false,
    autoScroll: true,
    preventHeader: true,
    border: false,
    frame: true,
    bodyStyle: 'background-color:#dfe8f5;',
    items: [{
        xtype: 'viewBuffetProdInstallAssociatedProject'
    }
    ]
});