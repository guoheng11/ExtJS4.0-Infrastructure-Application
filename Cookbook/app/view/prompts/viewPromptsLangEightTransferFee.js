Ext.define('CookBook.view.prompts.ViewPromptsLangEightTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightTransferFee'
});