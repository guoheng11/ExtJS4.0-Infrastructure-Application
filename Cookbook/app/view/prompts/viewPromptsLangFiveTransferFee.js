Ext.define('CookBook.view.prompts.ViewPromptsLangFiveTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveTransferFee'
});