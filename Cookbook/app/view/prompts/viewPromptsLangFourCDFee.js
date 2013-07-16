Ext.define('CookBook.view.prompts.ViewPromptsLangFourCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourCDFee'
});