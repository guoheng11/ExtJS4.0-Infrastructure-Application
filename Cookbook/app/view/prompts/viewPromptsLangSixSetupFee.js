Ext.define('CookBook.view.prompts.ViewPromptsLangSixSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixSetupFee'
});