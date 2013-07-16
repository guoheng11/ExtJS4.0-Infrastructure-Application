Ext.define('CookBook.view.summary.ViewSummaryParmDecommission', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryParmDecommission',

	//options
	allowBlank: true,
	fieldLabel: 'Decommission',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryParmDecommission1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryParmDecommission2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});