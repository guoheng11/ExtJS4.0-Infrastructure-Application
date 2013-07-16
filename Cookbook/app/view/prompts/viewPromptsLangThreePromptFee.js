Ext.define('CookBook.view.prompts.ViewPromptsLangThreePromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreePromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreePromptFee'
});