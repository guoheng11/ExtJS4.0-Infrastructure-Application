Ext.define('CookBook.view.prompts.ViewPromptsLangOneConversionSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneConversionSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOneConversionSessions',
	itemId: 'viewPromptsLangOneConversionSessions',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});