Ext.define('CookBook.view.summary.ViewSummaryScraper', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryScraper',

	//options
	allowBlank: true,
	fieldLabel: 'Scraper',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryScraper1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryScraper2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});