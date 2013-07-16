Ext.define('CookBook.view.prompts.ViewPromptsLangNineTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineTransferFee'
});