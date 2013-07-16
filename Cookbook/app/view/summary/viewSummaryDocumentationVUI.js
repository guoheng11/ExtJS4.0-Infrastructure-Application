Ext.define('CookBook.view.summary.ViewSummaryDocumentationVUI', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryDocumentationVUI',

	//options
	allowBlank: true,
	fieldLabel: 'VUI',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryDocumentationVUI1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryDocumentationVUI2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});