Ext.define('CookBook.view.misupdates.ViewMISUpdatesReportNames', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewMISUpdatesReportNames',

	//options
	allowBlank: true,
	fieldLabel: 'Report Name(s)',
	labelAlign: 'left',
	value: ' ',

	store: 'ReportNames',

	typeAhead:			false,
	displayField:		'name',
	valueField:			'name',
	allowBlank:			true,
	matchFieldWidth:	true,
	multiSelect:		true,
	selectOnTab:		false,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name: 'misupdatesReportNames',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter one or more report names, separated by commas'
			});
		}
	}
});