Ext.define('CookBook.view.prompts.ViewPromptsLangOneSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneSetupFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)
	

	name: 'viewPromptsLangOneSetupFee',
	itemId: 'viewPromptsLangOneSetupFee'
});