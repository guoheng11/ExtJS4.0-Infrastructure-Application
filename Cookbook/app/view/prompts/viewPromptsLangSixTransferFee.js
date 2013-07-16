Ext.define('CookBook.view.prompts.ViewPromptsLangSixTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixTransferFee'
});