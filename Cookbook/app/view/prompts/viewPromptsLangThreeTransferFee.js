Ext.define('CookBook.view.prompts.ViewPromptsLangThreeTransferFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeTransferFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeTransferFee'
});