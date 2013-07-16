Ext.define('CookBook.view.prompts.ViewPromptsLangNineRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangNineRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangNineRecordingSessions'
});