Ext.define('CookBook.view.summary.ViewSummaryParm', {
	extend: 'Ext.form.CheckboxGroup',
	alias:  'widget.viewSummaryParm',

	//options
	allowBlank: true,
	fieldLabel: 'Parm',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',
	
	items: [
		{ 
			boxLabel: '',
			name: 'summaryParm1',
			inputValue: '1',
			padding: '0 38 0 10'
		},
		{
			boxLabel: '', 
			name: 'summaryParm2',
			inputValue: '0',
			padding: '0 0 0 0'
		}
	]
});