Ext.define('CookBook.view.prompts.ViewPromptsLangSevenPromptsToBeBilled', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenPromptsToBeBilled',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenPromptsToBeBilled'
});