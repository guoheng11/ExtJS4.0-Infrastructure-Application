Ext.define('CookBook.view.summary.ViewSummaryDocumentationVisio', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryDocumentationVisio',

	//options
	allowBlank: true,
	fieldLabel: 'VISIO',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	name:	'summaryDocumentationVisio',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryDocumentationVisio1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryDocumentationVisio2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});