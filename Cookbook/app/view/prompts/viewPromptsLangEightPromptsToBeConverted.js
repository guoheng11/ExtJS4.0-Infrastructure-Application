Ext.define('CookBook.view.prompts.ViewPromptsLangEightPromptsToBeConverted', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightPromptsToBeConverted',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightPromptsToBeConverted'
});