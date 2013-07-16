Ext.define('CookBook.view.prompts.ViewPromptsLangOneRecordingSessions', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneRecordingSessions',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '1',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOneRecordingSessions',
	itemId: 'viewPromptsLangOneRecordingSessions',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});