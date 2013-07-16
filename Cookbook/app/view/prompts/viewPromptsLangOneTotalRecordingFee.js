Ext.define('CookBook.view.prompts.ViewPromptsLangOneTotalRecordingFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneTotalRecordingFee',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),
	readOnly: true,  //(smm)

	name: 'viewPromptsLangOneTotalRecordingFee',
	itemId: 'viewPromptsLangOneTotalRecordingFee'
});