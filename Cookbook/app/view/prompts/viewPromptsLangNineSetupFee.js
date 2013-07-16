Ext.define('CookBook.view.prompts.ViewPromptsLangNineSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineSetupFee'
});