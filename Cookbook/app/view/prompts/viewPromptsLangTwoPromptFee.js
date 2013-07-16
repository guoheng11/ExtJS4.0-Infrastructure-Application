Ext.define('CookBook.view.prompts.ViewPromptsLangTwoPromptFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoPromptFee',

	//options
	allowBlank: true,
	fieldLabel: '',
	labelAlign: 'left',

	name: 'viewPromptsLangTwoPromptFee',
	itemId: 'viewPromptsLangTwoPromptFee',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});