Ext.define('CookBook.view.prompts.ViewPromptsLangFiveRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFiveRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFiveRecordingSessions'
});