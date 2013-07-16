Ext.define('CookBook.view.summary.ViewSummaryChooseProjectStatus', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewSummaryChooseProjectStatus',

	store:  'Statuses',

	//options
	fieldLabel:			'Select Status',
	labelAlign:			'left',
	triggerAction:		'all',
	typeAhead:			false,
	displayField:		'type',
	valueField:			'type',
	allowBlank:			false,
	matchFieldWidth:	true,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true,
		loadMask: false
	},
	queryMode:			'local',

	name:				'summaryChooseProjectStatus',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Choose a project status'
			});
		}
	}
});