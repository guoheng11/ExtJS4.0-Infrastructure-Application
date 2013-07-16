Ext.define('CookBook.view.prompts.ViewPromptsLangNinePromptsToBeDigitized', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNinePromptsToBeDigitized',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNinePromptsToBeDigitized'
});