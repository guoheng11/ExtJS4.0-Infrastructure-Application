Ext.define('CookBook.view.prompts.ViewPromptsLangNineOrderType', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangNineOrderType',

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

	name:				'promptsPromptsLangNineOrderType',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select an order type'
			});
		}
	}
});