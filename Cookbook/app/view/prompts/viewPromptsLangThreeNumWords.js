Ext.define('CookBook.view.prompts.ViewPromptsLangThreeNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeNumWords'
});