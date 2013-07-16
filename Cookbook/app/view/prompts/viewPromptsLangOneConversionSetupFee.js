Ext.define('CookBook.view.prompts.ViewPromptsLangOneConversionSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneConversionSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneConversionSetupFee',
	itemId: 'viewPromptsLangOneConversionSetupFee'
});