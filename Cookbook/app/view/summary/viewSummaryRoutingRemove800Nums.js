Ext.define('CookBook.view.summary.ViewSummaryRoutingRemove800Nums', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryRoutingRemove800Nums',

	//options
	allowBlank: true,
	fieldLabel: 'Remove 800#s',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryRoutingRemove800Nums1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryRoutingRemove800Nums2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});