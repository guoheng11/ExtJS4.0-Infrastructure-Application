Ext.define('CookBook.view.prompts.ViewPromptsLangOneNumWords', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOneNumWords',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOneNumWords',
	itemId: 'viewPromptsLangOneNumWords',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations();
		}
	}
});