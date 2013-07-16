Ext.define('CookBook.view.prompts.ViewPromptsLangThreeCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeCDFee'
});