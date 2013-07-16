Ext.define('CookBook.view.prompts.ViewPromptsLangTwoSetupFee', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangTwoSetupFee',

	//options
	allowBlank: true,
	fieldLabel: '',
	labelAlign: 'left',
	

	name: 'viewPromptsLangTwoSetupFee',
	itemId: 'viewPromptsLangTwoSetupFee',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});