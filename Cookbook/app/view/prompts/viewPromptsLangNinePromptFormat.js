Ext.define('CookBook.view.prompts.ViewPromptsLangNinePromptFormat', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangNinePromptFormat',

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

	name:				'promptsPromptsLangNinePromptFormat',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a prompt format'
			});
		}
	}
});