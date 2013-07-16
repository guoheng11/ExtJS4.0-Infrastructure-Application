Ext.define('CookBook.view.summary.ViewSummaryAdditionalBusinessUnits', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewSummaryAdditionalBusinessUnits',

	store:  'BusinessUnits',

	//options
	fieldLabel:			'Additional Business Units',
	labelAlign:			'top',
	trigerAction:		'all',
	typeAhead:			false,
	displayField:		'name',
	valueField:			'name',
	allowBlank:			true,
	multiSelect:		true,
	matchFieldWidth:	true,
	selectOnTab:		false,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true,
		loadMask: false
	},
	queryMode:			'local',

	name:				'summaryAdditionalBusinessUnits',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select one or more business units'
			});
		}
	}
});