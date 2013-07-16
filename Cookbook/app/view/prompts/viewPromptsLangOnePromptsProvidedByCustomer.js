Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptsProvidedByCustomer', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOnePromptsProvidedByCustomer',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOnePromptsProvidedByCustomer',
	itemId: 'viewPromptsLangOnePromptsProvidedByCustomer',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});