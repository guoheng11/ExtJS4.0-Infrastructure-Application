Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingBusyHourCallPercentage', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewTrafficRoutingBusyHourCallPercentage',

	//options
	allowBlank: false,
	fieldLabel: 'Busy-Hour Call %',
	labelAlign: 'left',

	name: 'trafficroutingBusyHourCallPercentage'/*,
	
	listeners: {

		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: ''
			});
		}
	}*/
});