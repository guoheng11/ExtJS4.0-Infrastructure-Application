Ext.define('CookBook.view.summary.ViewSummarySoak', {
	extend: 'Ext.form.RadioGroup',
	alias:  'widget.viewSummarySoak',

	//options
	allowBlank: false,
	fieldLabel: 'Soak',
	labelAlign: 'left',
	columns: 'auto',
	layout: 'table',

	name: 'summarySoakRadio',
	
	items: [
		{ 
			boxLabel: 'Yes',
			name: 'summarySoakRadio',
			inputValue: '1'
		},
		{
			boxLabel: 'No', 
			name: 'summarySoakRadio',
			inputValue: '0'
		}
	]
});