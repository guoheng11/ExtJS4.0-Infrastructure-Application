Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptsToBeConverted', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOnePromptsToBeConverted',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOnePromptsToBeConverted',
	itemId: 'viewPromptsLangOnePromptsToBeConverted',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});