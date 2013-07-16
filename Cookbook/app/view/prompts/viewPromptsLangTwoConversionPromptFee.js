Ext.define('CookBook.view.prompts.ViewPromptsLangTwoConversionPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoConversionPromptFee',

	//options
	allowBlank: true,
	fieldLabel: '',
	labelAlign: 'left',

	name: 'viewPromptsLangTwoConversionPromptFee',
	itemId: 'viewPromptsLangTwoConversionPromptFee',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});