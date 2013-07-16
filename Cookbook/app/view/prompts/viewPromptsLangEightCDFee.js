Ext.define('CookBook.view.prompts.ViewPromptsLangEightCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightCDFee'
});