Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallVXMLStagingFolder', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewBuffetProdInstallVXMLStagingFolder',

	//options
	allowBlank: false,
	fieldLabel: 'VXML Staging Folder',
	labelAlign: 'left',
	value: '',

	name: 'buffetprodinstallVXMLStagingFolder',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Double-click to navigate to the VXML staging folder.  Else, enter the directory name manually'
			});
		}
	}
});