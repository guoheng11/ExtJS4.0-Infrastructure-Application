Ext.define('CookBook.view.prompts.ViewPromptsLangOneCDFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneCDFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneCDFee',
	itemId: 'viewPromptsLangOneCDFee'
});