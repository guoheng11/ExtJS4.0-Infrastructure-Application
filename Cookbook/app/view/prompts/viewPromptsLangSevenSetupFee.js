Ext.define('CookBook.view.prompts.ViewPromptsLangSevenSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenSetupFee'
});