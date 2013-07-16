Ext.define('CookBook.view.prompts.ViewPromptsLangOneTranslationFeePerWord', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneTranslationFeePerWord',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneTranslationFeePerWord',
	itemId: 'viewPromptsLangOneTranslationFeePerWord'
});