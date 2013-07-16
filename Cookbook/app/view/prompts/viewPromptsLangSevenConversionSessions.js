Ext.define('CookBook.view.prompts.ViewPromptsLangSevenConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenConversionSessions'
});