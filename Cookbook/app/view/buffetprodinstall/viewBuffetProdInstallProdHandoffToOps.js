Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdHandoffToOps', {
    extend: 'Ext.button.Button',
    alias:  'widget.viewBuffetProdInstallProdHandoffToOps',
    text:   'Prod Handoff to Ops',
    listeners: {
        click: function() {
            alert('This will send a Prod Handoff email to Ops');
        }
    }
});