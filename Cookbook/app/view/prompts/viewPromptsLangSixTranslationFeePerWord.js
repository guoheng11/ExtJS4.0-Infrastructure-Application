Ext.define('CookBook.view.prompts.ViewPromptsLangSixTranslationFeePerWord', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixTranslationFeePerWord',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixTranslationFeePerWord'
});