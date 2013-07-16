Ext.define('CookBook.view.prompts.ViewPromptsLangTwoNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoNumWords',
	itemId: 'viewPromptsLangTwoNumWords'
});