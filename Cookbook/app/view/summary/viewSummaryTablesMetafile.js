Ext.define('CookBook.view.summary.ViewSummaryTablesMetafile', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryTablesMetafile',

	//options
	allowBlank: true,
	fieldLabel: 'Metafile',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryTablesMetafile1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryTablesMetafile2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});