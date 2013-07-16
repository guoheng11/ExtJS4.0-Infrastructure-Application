Ext.define('CookBook.view.prompts.ViewPromptsLangEightPromptsToBeBilled', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightPromptsToBeBilled',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightPromptsToBeBilled'
});