Ext.define('CookBook.view.prompts.ViewPromptsRequestPONum', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewPromptsRequestPONum',

	name:	'promptsRequestPONum',
	text:   'Request PO#',
	
	listeners: {
		click: function() {
			//alert('This will send a PO# Request email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});