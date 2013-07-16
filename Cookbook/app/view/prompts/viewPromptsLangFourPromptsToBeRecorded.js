Ext.define('CookBook.view.prompts.ViewPromptsLangFourPromptsToBeRecorded', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourPromptsToBeRecorded',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourPromptsToBeRecorded'
});