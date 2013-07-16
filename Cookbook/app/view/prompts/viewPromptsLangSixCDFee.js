Ext.define('CookBook.view.prompts.ViewPromptsLangSixCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixCDFee'
});