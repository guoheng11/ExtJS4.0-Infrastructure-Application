Ext.define('CookBook.view.prompts.ViewPromptsLangTwoRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '1',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangTwoRecordingSessions',
	itemId: 'viewPromptsLangTwoRecordingSessions'
});