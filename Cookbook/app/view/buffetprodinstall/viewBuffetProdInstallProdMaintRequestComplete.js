Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdMaintRequestComplete', {
    extend: 'Ext.button.Button',
    alias:  'widget.viewBuffetProdInstallProdMaintRequestComplete',
    text:   'Prod Maintenance Complete',
    listeners: {
        click: function() {
            alert('This will send a Prod Maintenance Request Complete email to Ops');
        }
    }
});