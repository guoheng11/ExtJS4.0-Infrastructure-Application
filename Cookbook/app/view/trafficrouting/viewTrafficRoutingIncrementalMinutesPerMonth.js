Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingIncrementalMinutesPerMonth', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewTrafficRoutingIncrementalMinutesPerMonth',

	//options
	allowBlank: false,
	fieldLabel: 'Incremental Min. / Mo.',
	labelAlign: 'left',
	vtype: 'alphanum',

	name: 'trafficroutingIncrementalMinutesPerMonth'/*,
	
	listeners: {

		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: ''
			});
		}
	}*/
});