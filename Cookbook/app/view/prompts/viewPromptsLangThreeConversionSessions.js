Ext.define('CookBook.view.prompts.ViewPromptsLangThreeConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangThreeConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	regex: new RegExp("\\d+"),

	name: 'promptsLangThreeConversionSessions'
});