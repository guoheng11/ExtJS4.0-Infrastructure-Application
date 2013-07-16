Ext.define('CookBook.view.prompts.ViewPromptsLangSevenTranslationFeePerWord', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenTranslationFeePerWord',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenTranslationFeePerWord'
});