Ext.define('CookBook.view.summary.ViewSummaryNuanceNDM', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryNuanceNDM',

	//options
	allowBlank: true,
	fieldLabel: 'NDM',
	labelAlign: 'right',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryNuanceNDM1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryNuanceNDM2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});