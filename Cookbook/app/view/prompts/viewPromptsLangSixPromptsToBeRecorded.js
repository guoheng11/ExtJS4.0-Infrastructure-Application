Ext.define('CookBook.view.prompts.ViewPromptsLangSixPromptsToBeRecorded', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixPromptsToBeRecorded',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixPromptsToBeRecorded'
});