Ext.define('CookBook.view.prompts.ViewPromptsLangFourTotalRecordingFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangFourTotalRecordingFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangFourTotalRecordingFee'
});