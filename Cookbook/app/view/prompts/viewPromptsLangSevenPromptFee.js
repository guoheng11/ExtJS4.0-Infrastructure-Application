Ext.define('CookBook.view.prompts.ViewPromptsLangSevenPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenPromptFee'
});