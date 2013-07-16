Ext.define('CookBook.view.prompts.ViewPromptsLangSevenPromptsToBeDigitized', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenPromptsToBeDigitized',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenPromptsToBeDigitized'
});