Ext.define('CookBook.view.prompts.ViewPromptsLangNinePromptsProvidedByCustomer', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNinePromptsProvidedByCustomer',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNinePromptsProvidedByCustomer'
});