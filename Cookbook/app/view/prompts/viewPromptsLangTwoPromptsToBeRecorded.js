Ext.define('CookBook.view.prompts.ViewPromptsLangTwoPromptsToBeRecorded', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoPromptsToBeRecorded',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoPromptsToBeRecorded',
	itemId: 'viewPromptsLangTwoPromptsToBeRecorded'
});