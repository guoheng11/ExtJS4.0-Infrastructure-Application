Ext.define('CookBook.view.prompts.ViewPromptsLangNinePromptsToBeRecorded', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNinePromptsToBeRecorded',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNinePromptsToBeRecorded'
});