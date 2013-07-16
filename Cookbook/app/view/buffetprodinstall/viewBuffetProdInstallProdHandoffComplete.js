Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdHandoffComplete', {
    extend: 'Ext.button.Button',
    alias:  'widget.viewBuffetProdInstallProdHandoffComplete',
    text:   'Prod Handoff / Install Complete',
    listeners: {
        click: function() {
            alert('This will send a Prod Handoff / Install Complete email to Ops');
        }
    }
});