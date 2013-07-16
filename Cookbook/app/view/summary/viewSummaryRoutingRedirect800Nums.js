Ext.define('CookBook.view.summary.ViewSummaryRoutingRedirect800Nums', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryRoutingRedirect800Nums',

	//options
	allowBlank: true,
	fieldLabel: 'Redirect 800#s',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryRoutingRedirect800Nums1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryRoutingRedirect800Nums2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});