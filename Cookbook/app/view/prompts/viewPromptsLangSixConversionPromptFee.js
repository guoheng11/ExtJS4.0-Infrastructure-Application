Ext.define('CookBook.view.prompts.ViewPromptsLangSixConversionPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixConversionPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixConversionPromptFee'
});