Ext.define('CookBook.view.prompts.ViewPromptsLangOnePromptsToBeRecorded', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewPromptsLangOnePromptsToBeRecorded',

	//options
	allowBlank: false,
	fieldLabel: '',
	labelAlign: 'left',
	value: '0',
	regex: new RegExp("\\d+"),

	name: 'viewPromptsLangOnePromptsToBeRecorded',
	itemId: 'viewPromptsLangOnePromptsToBeRecorded',

	listeners: {
		blur: function () {
			this.up().doFeeCalculations(false);
		}/*,
		change: function() {
			this.up().doFeeCalculations(true);
		}*/
	}
});