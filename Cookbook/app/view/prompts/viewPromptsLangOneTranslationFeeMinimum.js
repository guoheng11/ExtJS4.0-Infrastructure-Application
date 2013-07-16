Ext.define('CookBook.view.prompts.ViewPromptsLangOneTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneTranslationFeeMinimum',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneTranslationFeeMinimum',
	itemId: 'viewPromptsLangOneTranslationFeeMinimum'
});