Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptFormat', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangOnePromptFormat',

	store: {
		fields: ['format'],
		data: [
			{'format':'.wav'},
			{'format':'alternate'}
		]
	},

	//options
	fieldLabel:			'',
	value:              '.wav',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'format',
	valueField:			'format',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name:				'viewPromptsLangOnePromptFormat',
	itemId:				'viewPromptsLangOnePromptFormat',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a prompt format'
			});
		}
	}
});