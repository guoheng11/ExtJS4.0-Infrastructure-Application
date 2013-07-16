Ext.define('CookBook.view.prompts.ViewPromptsLangEightRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightRecordingSessions'
});