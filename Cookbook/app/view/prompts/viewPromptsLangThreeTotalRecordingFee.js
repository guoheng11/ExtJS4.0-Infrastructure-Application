Ext.define('CookBook.view.prompts.ViewPromptsLangThreeTotalRecordingFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeTotalRecordingFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeTotalRecordingFee'
});