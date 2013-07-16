Ext.define('CookBook.view.summary.ViewSummaryRequestPONums', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewSummaryRequestPONums',

	name:	'summaryPONums',
	text:   'Request PO#s',
	
	listeners: {
		click: function() {
			//alert('This will send a PO# request email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});