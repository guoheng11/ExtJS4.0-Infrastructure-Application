Ext.define('CookBook.view.prompts.ViewPromptsLangFourNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourNumWords'
});