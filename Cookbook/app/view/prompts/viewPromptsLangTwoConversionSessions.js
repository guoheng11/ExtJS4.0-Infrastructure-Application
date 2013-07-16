Ext.define('CookBook.view.prompts.ViewPromptsLangTwoConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoConversionSessions',
	itemId: 'viewPromptsLangTwoConversionSessions'
});