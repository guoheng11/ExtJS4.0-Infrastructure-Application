Ext.define('CookBook.view.summary.ViewSummaryCompany', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewSummaryCompany',

	store:  'Companies',

	//options
	fieldLabel:			'Company',
	labelAlign:			'left',
	trigerAction:		'all',
	typeAhead:			false,
	displayField:		'company_name',
	valueField:			'company_name',
	matchFieldWidth:	true,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true,
		loadMask: false
	},
	queryMode:			'local',

	name:				'summaryCompany',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a company'
			});
		}
	}
});