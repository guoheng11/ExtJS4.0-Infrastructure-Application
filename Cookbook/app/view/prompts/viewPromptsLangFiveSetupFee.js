Ext.define('CookBook.view.prompts.ViewPromptsLangFiveSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveSetupFee'
});