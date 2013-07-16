Ext.define('CookBook.view.prompts.ViewPromptsLangOneMinimumFee', {
	extend: 'Ext.form.field.Checkbox',
	alias:  'widget.viewPromptsLangOneMinimumFee',	

	name: 'viewPromptsLangOneMinimumFee',
	itemId: 'viewPromptsLangOneMinimumFee',

	listeners: {
		change: function () {
			this.up().doFeeCalculations();
		}
	}
});