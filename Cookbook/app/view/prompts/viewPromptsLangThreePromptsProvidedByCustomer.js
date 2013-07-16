Ext.define('CookBook.view.prompts.ViewPromptsLangThreePromptsProvidedByCustomer', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreePromptsProvidedByCustomer',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreePromptsProvidedByCustomer'
});