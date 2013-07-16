Ext.define('CookBook.view.prompts.ViewPromptsLangFiveCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveCDFee'
});