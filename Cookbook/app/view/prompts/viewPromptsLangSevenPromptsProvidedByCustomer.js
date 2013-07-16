Ext.define('CookBook.view.prompts.ViewPromptsLangSevenPromptsProvidedByCustomer', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenPromptsProvidedByCustomer',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenPromptsProvidedByCustomer'
});