Ext.define('CookBook.view.prompts.ViewPromptsLangNinePromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNinePromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNinePromptFee'
});