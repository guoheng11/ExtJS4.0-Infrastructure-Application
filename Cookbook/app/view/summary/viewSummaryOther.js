Ext.define('CookBook.view.summary.ViewSummaryOther', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryOther',

	//options
	allowBlank: true,
	fieldLabel: 'Other',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryOther1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryOther2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});