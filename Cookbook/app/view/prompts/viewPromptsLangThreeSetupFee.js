Ext.define('CookBook.view.prompts.ViewPromptsLangThreeSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeSetupFee'
});