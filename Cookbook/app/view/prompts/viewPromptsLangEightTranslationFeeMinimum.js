Ext.define('CookBook.view.prompts.ViewPromptsLangEightTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightTranslationFeeMinimum',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightTranslationFeeMinimum'
});