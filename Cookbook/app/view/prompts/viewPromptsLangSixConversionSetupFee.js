Ext.define('CookBook.view.prompts.ViewPromptsLangSixConversionSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixConversionSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixConversionSetupFee'
});