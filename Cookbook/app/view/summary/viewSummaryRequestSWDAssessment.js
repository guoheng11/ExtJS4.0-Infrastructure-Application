Ext.define('CookBook.view.summary.ViewSummaryRequestSWDAssessment', {
	extend: 'Ext.button.Button',
	alias:  'widget.viewSummaryRequestSWDAssessment',

	name:	'summarySWDAssessment',
	text:   'Request SWD Assessment',
	
	listeners: {
		click: function() {
			//alert('This will send a SWD Assessment email');
			window.location = 'mailto:sean.mercer@usan.com';
		}
	}
});