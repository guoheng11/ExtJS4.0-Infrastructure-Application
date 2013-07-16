Ext.define('CookBook.view.misupdates.ViewMISUpdatesDeliveryChangeNewMethod', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewMISUpdatesDeliveryChangeNewMethod',

	store: 'DeliveryMethods', /*{
		fields: ['type'],
		data: [
			{'type':'Email'},
			{'type':'AccessUSAN'},
			{'type':'Vision'}
		]
	},*/

	//options
	fieldLabel:			'New Method',
	value:              '(Email, AccessUSAN, Vision)',
	labelAlign:			'left',
	typeAhead:			false,
	displayField:		'method',
	valueField:			'method',
	allowBlank:			true,
	matchFieldWidth:	true,
	multiSelect:		true,
	selectOnTab:		false,
	listConfig: {
		autoHeight: true,
		loadMask:     false
	},
	queryMode:			'local',

	name:				'misupdatesDeliveryChangeNewMethod',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Select a delivery method'
			});
		}
	}
});