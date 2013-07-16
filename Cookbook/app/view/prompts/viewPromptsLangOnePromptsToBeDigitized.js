Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptsToBeDigitized', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOnePromptsToBeDigitized',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOnePromptsToBeDigitized',
	itemId: 'viewPromptsLangOnePromptsToBeDigitized',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});