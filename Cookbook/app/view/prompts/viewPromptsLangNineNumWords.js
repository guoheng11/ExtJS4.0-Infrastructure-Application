Ext.define('CookBook.view.prompts.ViewPromptsLangNineNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineNumWords'
});