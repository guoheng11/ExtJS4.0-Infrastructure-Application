Ext.define('CookBook.view.prompts.ViewPromptsLangSixPromptsToBeConverted', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixPromptsToBeConverted',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixPromptsToBeConverted'
});