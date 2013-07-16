Ext.define('CookBook.view.prompts.ViewPromptsLangFourTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourTranslationFeeMinimum',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourTranslationFeeMinimum'
});