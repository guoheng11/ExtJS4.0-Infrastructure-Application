Ext.define('CookBook.view.prompts.ViewPromptsLangFourConversionSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourConversionSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourConversionSetupFee'
});