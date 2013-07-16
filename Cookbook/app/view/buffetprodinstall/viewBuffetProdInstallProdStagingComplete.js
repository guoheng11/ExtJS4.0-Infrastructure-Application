Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdStagingComplete', {
    extend: 'Ext.button.Button',
    alias:  'widget.viewBuffetProdInstallProdStagingComplete',
    text:   'Prod Staging Copmlete',
    listeners: {
        click: function() {
            alert('This will send a Prod Staging Request Complete email to Dev');
        }
    }
});