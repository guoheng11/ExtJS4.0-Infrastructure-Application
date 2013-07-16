Ext.define('CookBook.view.prompts.ViewPromptsLangNineConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineConversionSessions'
});