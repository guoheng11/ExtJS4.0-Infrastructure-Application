Ext.define('CookBook.view.summary.ViewSummaryApplication', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryApplication',

	//options
	allowBlank: false,
	fieldLabel: 'Application',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryApplication1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryApplication2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});