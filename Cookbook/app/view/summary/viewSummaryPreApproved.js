Ext.define('CookBook.view.summary.ViewSummaryPreApproved', {
	extend: 'Ext.form.RadioGroup',
	alias:  'widget.viewSummaryPreApproved',

	//options
	allowBlank: false,
	fieldLabel: 'PreApproved',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: 'Yes',
			name: 'summaryPreApproved',
			inputValue: '1'
		},
		{
			boxLabel: 'No', 
			name: 'summaryPreApproved',
			inputValue: '0'
		}
	]
});