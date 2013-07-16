Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOnePromptFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOnePromptFee',
	itemId: 'viewPromptsLangOnePromptFee'
});