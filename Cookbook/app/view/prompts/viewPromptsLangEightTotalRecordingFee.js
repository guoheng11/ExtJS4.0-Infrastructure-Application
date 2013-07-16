Ext.define('CookBook.view.prompts.ViewPromptsLangEightTotalRecordingFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangEightTotalRecordingFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangEightTotalRecordingFee'
});