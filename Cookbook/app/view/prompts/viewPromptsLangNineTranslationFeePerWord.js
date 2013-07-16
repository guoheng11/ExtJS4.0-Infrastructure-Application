Ext.define('CookBook.view.prompts.ViewPromptsLangNineTranslationFeePerWord', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineTranslationFeePerWord',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineTranslationFeePerWord'
});