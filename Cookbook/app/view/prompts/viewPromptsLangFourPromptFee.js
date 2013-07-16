Ext.define('CookBook.view.prompts.ViewPromptsLangFourPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourPromptFee'
});