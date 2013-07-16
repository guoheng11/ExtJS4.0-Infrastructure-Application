Ext.define('CookBook.view.summary.ViewSummaryProjectStatusDate', {
	extend: 'Ext.form.field.Date',
	alias:  'widget.viewSummaryProjectStatusDate',

	//store:  'Statuses',

	//options
	/*
	fieldLabel:			'Date',
	labelAlign:			'top',
	triggerAction:		'all',
	typeAhead:			false,
	displayField:		'created',
	valueField:			'created',
	grow:				true,
	readOnly:			true,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true
	},
	queryMode:			'local',
*/

	//options
	allowBlank: false,
	fieldLabel: 'Date',
	labelAlign: 'left',
	editable:   false,
	//minValue: new Date(),

	name:				'summaryProjectStatusDate',

	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select the date for this status'
			});
		}
	}
});