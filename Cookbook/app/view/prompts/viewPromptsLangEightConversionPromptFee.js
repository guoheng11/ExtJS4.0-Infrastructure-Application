Ext.define('CookBook.view.prompts.ViewPromptsLangEightConversionPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightConversionPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightConversionPromptFee'
});