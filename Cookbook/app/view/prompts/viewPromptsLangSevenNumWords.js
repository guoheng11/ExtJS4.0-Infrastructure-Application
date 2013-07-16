Ext.define('CookBook.view.prompts.ViewPromptsLangSevenNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenNumWords'
});