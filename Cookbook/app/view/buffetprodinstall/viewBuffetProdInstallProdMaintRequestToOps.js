Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdMaintRequestToOps', {
    extend: 'Ext.button.Button',
    alias:  'widget.viewBuffetProdInstallProdMaintRequestToOps',
    text:   'Prod Maintenance Request to Ops',
    listeners: {
        click: function() {
            alert('This will send a Prod Maintenance Request email to Ops');
        }
    }
});