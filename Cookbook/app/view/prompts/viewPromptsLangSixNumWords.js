Ext.define('CookBook.view.prompts.ViewPromptsLangSixNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixNumWords'
});