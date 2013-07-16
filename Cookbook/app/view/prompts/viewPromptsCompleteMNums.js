Ext.define('CookBook.view.prompts.ViewPromptsCompleteMNums', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewPromptsCompleteMNums',

	name:	'promptsCompleteMNums',
	text:   'Complete M#s',
	
	listeners: {
		click: function() {
			//alert('This will send an M#s Complete email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});