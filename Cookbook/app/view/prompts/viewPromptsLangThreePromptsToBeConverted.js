Ext.define('CookBook.view.prompts.ViewPromptsLangThreePromptsToBeConverted', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreePromptsToBeConverted',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreePromptsToBeConverted'
});