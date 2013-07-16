Ext.define('CookBook.view.prompts.ViewPromptsLangNineConversionPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineConversionPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineConversionPromptFee'
});