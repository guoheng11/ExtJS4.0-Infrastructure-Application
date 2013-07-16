Ext.define('CookBook.view.prompts.ViewPromptsLangSixPromptsToBeBilled', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSixPromptsToBeBilled',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSixPromptsToBeBilled'
});