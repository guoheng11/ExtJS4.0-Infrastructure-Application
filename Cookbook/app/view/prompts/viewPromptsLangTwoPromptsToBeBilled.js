Ext.define('CookBook.view.prompts.ViewPromptsLangTwoPromptsToBeBilled', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoPromptsToBeBilled',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoPromptsToBeBilled',
	itemId: 'viewPromptsLangTwoPromptsToBeBilled'
});