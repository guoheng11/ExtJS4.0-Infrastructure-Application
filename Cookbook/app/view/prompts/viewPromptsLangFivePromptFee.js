Ext.define('CookBook.view.prompts.ViewPromptsLangFivePromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFivePromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFivePromptFee'
});