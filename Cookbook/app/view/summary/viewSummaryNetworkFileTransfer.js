Ext.define('CookBook.view.summary.ViewSummaryNetworkFileTransfer', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryNetworkFileTransfer',

	//options
	allowBlank: true,
	fieldLabel: 'File Transfer',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryNetworkFileTransfer1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryNetworkFileTransfer2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});