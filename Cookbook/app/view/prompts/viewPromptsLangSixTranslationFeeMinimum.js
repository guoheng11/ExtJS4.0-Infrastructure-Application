Ext.define('CookBook.view.prompts.ViewPromptsLangSixTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixTranslationFeeMinimum',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixTranslationFeeMinimum'
});