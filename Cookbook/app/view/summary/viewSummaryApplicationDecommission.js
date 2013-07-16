Ext.define('CookBook.view.summary.ViewSummaryApplicationDecommission', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryApplicationDecommission',

	//options
	allowBlank: true,
	fieldLabel: 'Decommission',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryApplicationDecommission1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryApplicationDecommission2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});