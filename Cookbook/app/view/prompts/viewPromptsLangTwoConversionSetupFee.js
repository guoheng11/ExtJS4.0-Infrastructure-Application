Ext.define('CookBook.view.prompts.ViewPromptsLangTwoConversionSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoConversionSetupFee',

	//options
	allowBlank: true,
	fieldLabel: '',
	labelAlign: 'left',

	name: 'viewPromptsLangTwoConversionSetupFee',
	itemId: 'viewPromptsLangTwoConversionSetupFee',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});