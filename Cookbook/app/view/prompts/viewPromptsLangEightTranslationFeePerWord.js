Ext.define('CookBook.view.prompts.ViewPromptsLangEightTranslationFeePerWord', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightTranslationFeePerWord',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightTranslationFeePerWord'
});