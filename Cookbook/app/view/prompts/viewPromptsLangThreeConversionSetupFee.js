Ext.define('CookBook.view.prompts.ViewPromptsLangThreeConversionSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeConversionSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeConversionSetupFee'
});