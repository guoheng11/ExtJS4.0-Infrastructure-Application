Ext.define('CookBook.view.prompts.ViewPromptsLangEightPromptsToBeRecorded', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightPromptsToBeRecorded',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightPromptsToBeRecorded'
});