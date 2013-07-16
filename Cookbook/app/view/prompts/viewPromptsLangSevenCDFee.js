Ext.define('CookBook.view.prompts.ViewPromptsLangSevenCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenCDFee'
});