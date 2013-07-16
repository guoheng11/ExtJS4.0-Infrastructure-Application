Ext.define('CookBook.view.summary.ViewSummaryRequestMNums', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewSummaryRequestMNums',

	name:	'summaryMNums',
	text:   'Request M#s',
	
	listeners: {
		click: function() {
			//alert('This will send an M# request email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});