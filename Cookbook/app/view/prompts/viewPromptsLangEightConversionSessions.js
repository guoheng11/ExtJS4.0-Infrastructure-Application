Ext.define('CookBook.view.prompts.ViewPromptsLangEightConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightConversionSessions'
});