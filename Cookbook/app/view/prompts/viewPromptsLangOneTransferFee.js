Ext.define('CookBook.view.prompts.ViewPromptsLangOneTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneTransferFee',
	itemId: 'viewPromptsLangOneTransferFee'
});