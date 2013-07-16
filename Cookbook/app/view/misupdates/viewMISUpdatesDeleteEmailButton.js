Ext.define('CookBook.view.misupdates.ViewMISUpdatesDeleteEmailButton', {
	extend: 'Ext.Button',
	alias:  'widget.viewMISUpdatesDeleteEmailButton',

	//options
	text:				'Delete Email(s)',

	name:				'summaryMISUpdatesDeleteEmailButton',


	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Click to add selected email addresses to the Delete Email textbox'
			});
		},
		
		/* TODO:  Add code to make sure duplicates don't appear inside and between the Add/Delete boxes */
		click: function() {
			var destination = Ext.ComponentQuery.query('viewMISUpdatesDistributionDeleteEmail');
			var emails = Ext.ComponentQuery.query('viewMISUpdatesDistributionSelectEmail');
			
			var destValue = destination[0].getValue();
			if (destValue) {
				destination[0].setValue(destValue + '; ' + emails[0].getRawValue());
			}
			else {
				destination[0].setValue(emails[0].getRawValue());
			}
		}
	}
	
});