Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingBusyHourCalls', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewTrafficRoutingBusyHourCalls',

	//options
	allowBlank: false,
	fieldLabel: 'Busy-Hour Calls',
	labelAlign: 'left',
	vtype: 'alphanum',

	name: 'trafficroutingBusyHourCalls'/*,
	
	listeners: {

		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: ''
			});
		}
	}*/
});