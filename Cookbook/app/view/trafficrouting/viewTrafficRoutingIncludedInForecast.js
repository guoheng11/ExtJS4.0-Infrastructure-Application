Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingIncludedInForecast', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.viewTrafficRoutingIncludedInForecast',

	//options
	allowBlank: false,
	fieldLabel: 'Included in Forecast',
	labelAlign: 'left',

	store: {
		fields: ['value'],
		data: [{
			'value':'yes'
		},{
			'value':'no'
		}
		]
	},  

	multiSelect:		false,
	displayField:		'value',
	valueField:			'value',
	allowBlank:			false,
	forceSelection:     true,
	matchFieldWidth:	true,
	valueNotFoundText:  'no',
	value:              'no',
	listConfig: {
		autoHeight: true
	},
	queryMode:			'local',

	name: 'trafficroutingIncludedInForecast'/*,
	
	listeners: {

		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: ''
			});
		}
	}*/
});