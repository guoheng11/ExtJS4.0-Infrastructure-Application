Ext.define('CookBook.view.summary.ViewSummaryBusinessUnit', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewSummaryBusinessUnit',

	store:  'BusinessUnits',

	//options
	fieldLabel:			'Primary Business Unit',
	labelAlign:			'left',
	trigerAction:		'all',
	typeAhead:			false,
	displayField:		'name',
	valueField:			'name',
	allowBlank:			false,
	matchFieldWidth:	true,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true,
		loadMask: false
	},
	queryMode:			'local',

	name:				'summaryBusinessUnit',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a business unit'
			});
		}
	}
});