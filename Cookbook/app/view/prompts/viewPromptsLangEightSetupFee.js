Ext.define('CookBook.view.prompts.ViewPromptsLangEightSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightSetupFee'
});