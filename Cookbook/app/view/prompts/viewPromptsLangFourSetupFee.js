Ext.define('CookBook.view.prompts.ViewPromptsLangFourSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourSetupFee'
});