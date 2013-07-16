Ext.define('CookBook.view.prompts.ViewPromptsLangFourPromptsToBeConverted', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourPromptsToBeConverted',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourPromptsToBeConverted'
});