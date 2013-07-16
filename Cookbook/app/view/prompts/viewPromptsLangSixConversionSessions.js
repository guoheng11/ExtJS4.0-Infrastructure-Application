Ext.define('CookBook.view.prompts.ViewPromptsLangSixConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixConversionSessions'
});