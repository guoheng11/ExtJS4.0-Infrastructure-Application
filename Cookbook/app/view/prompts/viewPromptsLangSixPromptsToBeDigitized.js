Ext.define('CookBook.view.prompts.ViewPromptsLangSixPromptsToBeDigitized', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixPromptsToBeDigitized',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixPromptsToBeDigitized'
});