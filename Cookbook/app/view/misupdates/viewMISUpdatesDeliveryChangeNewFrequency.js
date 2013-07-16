Ext.define('CookBook.view.misupdates.ViewMISUpdatesDeliveryChangeNewFrequency', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewMISUpdatesDeliveryChangeNewFrequency',

	store: 'DeliveryFrequencies', /*{
		fields: ['type'],
		data: [
			{'type':'Daily'},
			{'type':'Weekly'},
			{'type':'MTD'},
			{'type':'Monthly'}
		]
	},*/

	//options
	fieldLabel:			'New Frequency',
	value:              '(Daily, Weekly, MTD, Monthly, Other)',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'frequency',
	valueField:			'frequency',
	allowBlank:			true,
	matchFieldWidth:	true,
	multiSelect:		true,
	selectOnTab:		false,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name:				'misupdatesDeliveryChangeNewFrequency',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a delivery frequency.  If the given options do not apply, manually type the frequency'
			});
		}
	}
});