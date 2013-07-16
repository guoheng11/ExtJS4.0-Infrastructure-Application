Ext.define('CookBook.view.prompts.ViewPromptsLangSevenRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenRecordingSessions'
});