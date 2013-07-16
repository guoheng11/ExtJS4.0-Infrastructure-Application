Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdStagingRequestToDev', {
    extend: 'Ext.button.Button',
    alias:  'widget.viewBuffetProdInstallProdStagingRequestToDev',
    text:   'Prod Staging Request to Dev',
    listeners: {
        click: function() {
            alert('This will send a Prod Staging Request email to Dev');
        }
    }
});