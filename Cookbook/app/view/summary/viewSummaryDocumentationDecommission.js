Ext.define('CookBook.view.summary.ViewSummaryDocumentationDecommission', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryDocumentationDecommission',

	//options
	allowBlank: true,
	fieldLabel: 'Decommission',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryDocumentationDecommission1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryDocumentationDecommission2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});