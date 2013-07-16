Ext.define('CookBook.view.prompts.ViewPromptsLangTwoTranslationFeeMinimum', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoTranslationFeeMinimum',

	//options
	allowBlank: true,
	fieldLabel: '',
	labelAlign: 'left',

	name: 'viewPromptsLangTwoTranslationFeeMinimum',
	itemId: 'viewPromptsLangTwoTranslationFeeMinimum',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});