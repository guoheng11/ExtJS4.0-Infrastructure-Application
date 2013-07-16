Ext.define('CookBook.view.prompts.ViewPromptsLangThreeConversionPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeConversionPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeConversionPromptFee'
});