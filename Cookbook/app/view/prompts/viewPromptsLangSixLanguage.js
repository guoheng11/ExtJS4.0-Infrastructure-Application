Ext.define('CookBook.view.prompts.ViewPromptsLangSixLanguage', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangSixLanguage',

	store: {
		fields: ['language'],
		data: [
			{'language':'English'},
			{'language':'Spanish'},
			{'language':'French'},
			{'language':'British English'},
			{'language':'Russian'},
			{'language':'German'},
			{'language':'Polish'},
			{'language':'Dutch'},
			{'language':'Finnish'},
			{'language':'Swedish'},
			{'language':'Japanese'},
			{'language':'Chinese'},
		]
	},

	//options
	fieldLabel:			'',
	value:              '',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'language',
	valueField:			'language',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true
	},
	queryMode:			'local',

	name:				'promptsPromptsLangSixLanguage',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a language'
			});
		}
	}
});