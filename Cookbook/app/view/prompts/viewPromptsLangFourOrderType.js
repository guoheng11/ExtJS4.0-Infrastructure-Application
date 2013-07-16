Ext.define('CookBook.view.prompts.ViewPromptsLangFourOrderType', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangFourOrderType',

	store: {
		fields: ['type'],
		data: [
			{'type':'Standard'},
			{'type':'Next Business Day'},
			{'type':'Same Day'}
		]
	},

	//options
	fieldLabel:			'',
	value:              '',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'type',
	valueField:			'type',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true
	},
	queryMode:			'local',

	name:				'promptsPromptsLangFourOrderType',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select an order type'
			});
		}
	}
});