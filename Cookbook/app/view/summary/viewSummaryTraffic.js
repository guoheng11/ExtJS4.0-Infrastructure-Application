Ext.define('CookBook.view.summary.ViewSummaryTraffic', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTraffic',

	//options
	allowBlank: true,
	fieldLabel: 'Traffic',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTraffic1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTraffic2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});