Ext.define('CookBook.view.summary.ViewSummaryNewTranType', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryNewTranType',

	//options
	allowBlank: true,
	fieldLabel: 'New Tran Type',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryNewTranType1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryNewTranType2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});