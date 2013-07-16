Ext.define('CookBook.view.summary.ViewSummaryBisoApproval', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryBisoApproval',

	//options
	allowBlank: false,
	fieldLabel: 'Biso Approval',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryBisoApproval1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryBisoApproval2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});