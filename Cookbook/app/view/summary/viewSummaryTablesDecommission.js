Ext.define('CookBook.view.summary.ViewSummaryTablesDecommission', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesDecommission',

	//options
	allowBlank: true,
	fieldLabel: 'Decommission',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesDecommission1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesDecommission2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});