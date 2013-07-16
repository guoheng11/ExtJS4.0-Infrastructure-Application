Ext.define('CookBook.view.summary.ViewSummaryDocumentationOther', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryDocumentationOther',

	//options
	allowBlank: true,
	fieldLabel: 'Other',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryDocumentationOther1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryDocumentationOther2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});