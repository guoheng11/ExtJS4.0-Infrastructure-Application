Ext.define('CookBook.view.prompts.ViewPromptsLangFiveNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveNumWords'
});