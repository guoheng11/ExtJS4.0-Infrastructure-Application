Ext.define('CookBook.view.prompts.ViewPromptsLangFourRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourRecordingSessions'
});