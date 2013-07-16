Ext.define('CookBook.view.prompts.ViewPromptsLangTwoOrderType', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangTwoOrderType',

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
	value:              'Standard',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'type',
	valueField:			'type',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name:				'viewPromptsLangTwoOrderType',
	itemId:				'viewPromptsLangTwoOrderType',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select an order type'
			});
		}
	}
});