Ext.define('CookBook.view.prompts.ViewPromptsLangNineCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineCDFee'
});