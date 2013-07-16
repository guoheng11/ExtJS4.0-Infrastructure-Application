Ext.define('CookBook.view.prompts.ViewPromptsLangFourConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourConversionSessions'
});