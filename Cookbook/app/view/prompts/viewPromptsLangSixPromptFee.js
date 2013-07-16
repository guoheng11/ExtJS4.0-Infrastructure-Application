Ext.define('CookBook.view.prompts.ViewPromptsLangSixPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixPromptFee'
});