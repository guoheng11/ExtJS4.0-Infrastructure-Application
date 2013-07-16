Ext.define('CookBook.view.prompts.ViewPromptsLangSixPromptsProvidedByCustomer', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixPromptsProvidedByCustomer',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixPromptsProvidedByCustomer'
});