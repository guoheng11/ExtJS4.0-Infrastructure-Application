Ext.define('CookBook.view.summary.ViewSummaryHostWSDL', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryHostWSDL',

	//options
	allowBlank: true,
	fieldLabel: 'WSDL',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryHostWSDL1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryHostWSDL2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});