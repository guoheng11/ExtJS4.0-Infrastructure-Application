Ext.define('CookBook.view.prompts.ViewPromptsLangTwoConvertedPromptFormat', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangTwoConvertedPromptFormat',

	store: {
		fields: ['format'],
		data: [
			{'format':'.wav'},
			{'format':'alternate'}
		]
	},

	//options
	fieldLabel:			'',
	value:              '',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'format',
	valueField:			'format',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true
	},
	queryMode:			'local',

	name:				'viewPromptsLangTwoConvertedPromptFormat',
	itemId:				'viewPromptsLangTwoConvertedPromptFormat',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a prompt format'
			});
		}
	}
});