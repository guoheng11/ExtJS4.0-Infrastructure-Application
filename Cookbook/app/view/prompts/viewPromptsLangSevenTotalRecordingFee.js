Ext.define('CookBook.view.prompts.ViewPromptsLangSevenTotalRecordingFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangSevenTotalRecordingFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangSevenTotalRecordingFee'
});