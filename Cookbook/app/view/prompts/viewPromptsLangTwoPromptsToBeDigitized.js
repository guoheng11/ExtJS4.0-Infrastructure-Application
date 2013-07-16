Ext.define('CookBook.view.prompts.ViewPromptsLangTwoPromptsToBeDigitized', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoPromptsToBeDigitized',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoPromptsToBeDigitized',
	itemId: 'viewPromptsLangTwoPromptsToBeDigitized'
});