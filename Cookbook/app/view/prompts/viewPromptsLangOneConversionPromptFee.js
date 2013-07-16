Ext.define('CookBook.view.prompts.ViewPromptsLangOneConversionPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneConversionPromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneConversionPromptFee',
	itemId: 'viewPromptsLangOneConversionPromptFee'
});