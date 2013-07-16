Ext.define('CookBook.view.prompts.ViewPromptsLangTwoLanguage', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewPromptsLangTwoLanguage',

	store: 'Languages', /*{
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
	},*/

	//options
	fieldLabel:			'',
	value:              '',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'language1',
	valueField:			'language1',
	forceSelection:     true,  //need to restrict to Store values
	editable:           false,
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name:				'viewPromptsLangTwoLanguage',
	itemId:				'viewPromptsLangTwoLanguage',

	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a language'
			});
		}
	}
});