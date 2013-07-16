Ext.define('CookBook.view.summary.ViewSummaryRequestOPSAssessment', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewSummaryRequestOPSAssessment',

	name:	'summaryOPSAssessment',
	text:   'Request OPS Assessment',
	
	listeners: {
		click: function() {
			//alert('This will send an OPS Assessment email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});