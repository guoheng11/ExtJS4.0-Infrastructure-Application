Ext.define('CookBook.view.summary.ViewSummaryAccessUSANAccessUser', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryAccessUSANAccessUser',

	//options
	allowBlank: false,
	fieldLabel: 'AccessUSAN Access/User',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryAccessUSANAccessUser1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryAccessUSANAccessUser2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});