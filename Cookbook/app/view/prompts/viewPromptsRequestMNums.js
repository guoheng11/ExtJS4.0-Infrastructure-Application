Ext.define('CookBook.view.prompts.ViewPromptsRequestMNums', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewPromptsRequestMNums',

	name:	'promptsRequestMNums',
	text:   'Request M#s',
	
	listeners: {
		click: function() {
			//alert('This will send a M#s Request email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});