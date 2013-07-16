Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallProdStagingFolder', {
    extend: 'Ext.form.field.Text',
    alias:  'widget.viewBuffetProdInstallProdStagingFolder',

    //options
    allowBlank: false,
    fieldLabel: 'Prod Staging Folder',
    labelAlign: 'left',
    value: '',

    name: 'buffetprodinstallProdStagingFolder',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Double-click to navigate to the Prod staging folder.  Else, enter the directory name manually'
            });
        }
    }
});