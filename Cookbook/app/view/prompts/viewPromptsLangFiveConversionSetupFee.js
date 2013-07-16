Ext.define('CookBook.view.prompts.ViewPromptsLangFiveConversionSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveConversionSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveConversionSetupFee'
});