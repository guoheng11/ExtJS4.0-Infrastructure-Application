Ext.define('CookBook.view.prompts.ViewPromptsLangFiveTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveTranslationFeeMinimum',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveTranslationFeeMinimum'
});