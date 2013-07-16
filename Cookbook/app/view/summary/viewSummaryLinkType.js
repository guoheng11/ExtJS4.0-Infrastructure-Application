Ext.define('CookBook.view.summary.ViewSummaryLinkType', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewSummaryLinkType',

	store: {
		fields: ['type'],
		data: [
			{'type':'Master'},
			{'type':'Slave'}
		]
	},

	//options
	fieldLabel:			'Link Type',
	labelAlign:			'left',
	trigerAction:		'all',
	typeAhead:			false,
	displayField:		'type',
	valueField:			'type',
	allowBlank:			true,
	matchFieldWidth:	true,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true,
		loadMask: false
	},
	queryMode:			'local',

	name:				'summaryLinkType',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a link type'
			});
		}
	}
});