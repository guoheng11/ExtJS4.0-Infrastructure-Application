Ext.define('CookBook.view.misupdates.ViewMISUpdatesDescriptionOfChange', {
	extend: 'Ext.form.field.TextArea',
	alias:  'widget.viewMISUpdatesDescriptionOfChange',

	//options
	allowBlank: false,
	fieldLabel: 'Description Of Change',
	labelAlign: 'left',
	value: '',

	name: 'misupdatesDescriptionOfChange',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter a description of the change'
			});
		}
	}
});