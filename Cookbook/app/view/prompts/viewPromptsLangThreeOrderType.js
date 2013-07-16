Ext.define('CookBook.view.prompts.ViewPromptsLangThreeOrderType', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangThreeOrderType',

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

	name:				'promptsPromptsLangThreeOrderType',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select an order type'
			});
		}
	}
});