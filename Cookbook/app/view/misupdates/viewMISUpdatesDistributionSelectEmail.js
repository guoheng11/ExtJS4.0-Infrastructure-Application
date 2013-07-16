Ext.define('CookBook.view.misupdates.ViewMISUpdatesDistributionSelectEmail', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewMISUpdatesDistributionSelectEmail',

	store:  'Contacts',

	//options
	triggerAction:		'all',
	typeAhead:			false,
	displayField:		'email1',
	valueField:			'email1',
	matchFieldWidth:	true,
	multiSelect:		true,
	selectOnTab:		false,
	delimiter:		    '; ',
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	allowBlank: false,
	fieldLabel: 'Select Email',
	labelAlign: 'left',
	value: '',

	name: 'misupdatesDistributionSelectEmail',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select one or more email addresses and then click \'Add Email(s)\' or \'Delete Email(s)\' to insert the email(s) into the appropriate textbox'
			});
		}
	}
});