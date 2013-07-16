Ext.define('CookBook.view.summary.ViewSummaryNetworkInfrastructure', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryNetworkInfrastructure',

	//options
	allowBlank: true,
	fieldLabel: 'Infrastructure',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryNetworkInfrastructure1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryNetworkInfrastructure2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});