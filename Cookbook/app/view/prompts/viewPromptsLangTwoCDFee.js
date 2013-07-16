Ext.define('CookBook.view.prompts.ViewPromptsLangTwoCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangTwoCDFee'
});