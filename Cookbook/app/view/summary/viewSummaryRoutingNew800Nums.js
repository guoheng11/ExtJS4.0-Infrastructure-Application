Ext.define('CookBook.view.summary.ViewSummaryRoutingNew800Nums', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryRoutingNew800Nums',

	//options
	allowBlank: true,
	fieldLabel: 'New 800#s',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryRoutingNew800Nums1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryRoutingNew800Nums2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});