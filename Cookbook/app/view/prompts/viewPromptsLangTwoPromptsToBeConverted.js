Ext.define('CookBook.view.prompts.ViewPromptsLangTwoPromptsToBeConverted', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoPromptsToBeConverted',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoPromptsToBeConverted',
	itemId: 'viewPromptsLangTwoPromptsToBeConverted'
});