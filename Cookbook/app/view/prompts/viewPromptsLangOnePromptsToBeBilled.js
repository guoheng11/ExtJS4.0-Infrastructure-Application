Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptsToBeBilled', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOnePromptsToBeBilled',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOnePromptsToBeBilled',
	itemId: 'viewPromptsLangOnePromptsToBeBilled',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});