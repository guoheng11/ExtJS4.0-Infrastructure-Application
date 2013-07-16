Ext.define('CookBook.view.prompts.ViewPromptsLangThreePromptsToBeDigitized', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreePromptsToBeDigitized',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreePromptsToBeDigitized'
});