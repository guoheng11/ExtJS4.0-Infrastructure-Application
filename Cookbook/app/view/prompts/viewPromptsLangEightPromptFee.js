Ext.define('CookBook.view.prompts.ViewPromptsLangEightPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightPromptFee'
});