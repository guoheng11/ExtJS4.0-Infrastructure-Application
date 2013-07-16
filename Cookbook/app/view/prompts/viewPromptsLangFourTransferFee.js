Ext.define('CookBook.view.prompts.ViewPromptsLangFourTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourTransferFee'
});