Ext.define('CookBook.view.prompts.ViewPromptsLangFiveConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveConversionSessions'
});