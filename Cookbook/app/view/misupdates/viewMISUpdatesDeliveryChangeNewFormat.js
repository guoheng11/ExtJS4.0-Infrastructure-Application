Ext.define('CookBook.view.misupdates.ViewMISUpdatesDeliveryChangeNewFormat', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewMISUpdatesDeliveryChangeNewFormat',

	store: 'DeliveryFormats', /*{
		fields: ['type'],
		data: [
			{'type':'.csv'},
			{'type':'.txt'}
		]
	},*/

	//options
	fieldLabel:			'New Format',
	value:              '(.csv and/or .txt)',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'format',
	valueField:			'format',
	allowBlank:			true,
	matchFieldWidth:	true,
	multiSelect:		true,
	selectOnTab:		false,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name:				'misupdatesDeliveryChangeNewFormat',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a delivery format'
			});
		}
	}
});