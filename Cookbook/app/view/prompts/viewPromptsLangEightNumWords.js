Ext.define('CookBook.view.prompts.ViewPromptsLangEightNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightNumWords'
});