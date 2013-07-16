Ext.define('CookBook.view.prompts.ViewPromptsLangTwoPromptsProvidedByCustomer', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoPromptsProvidedByCustomer',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoPromptsProvidedByCustomer',
	itemId: 'viewPromptsLangTwoPromptsProvidedByCustomer'
});