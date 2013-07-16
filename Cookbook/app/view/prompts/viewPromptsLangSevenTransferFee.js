Ext.define('CookBook.view.prompts.ViewPromptsLangSevenTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenTransferFee'
});