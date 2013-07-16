Ext.define('CookBook.view.prompts.ViewPromptsLangNineTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineTranslationFeeMinimum',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineTranslationFeeMinimum'
});