Ext.define('CookBook.view.prompts.ViewPromptsLangTwoTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangTwoTransferFee'
});