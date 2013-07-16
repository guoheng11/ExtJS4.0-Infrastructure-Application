Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingAverageCallDuration', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewTrafficRoutingAverageCallDuration',

	//options
	allowBlank: false,
	fieldLabel: 'Average Call Duration',
	labelAlign: 'left',

	name: 'trafficroutingAverageCallDuration'/*,
	
	listeners: {

		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: ''
			});
		}
	}*/
});