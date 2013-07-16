Ext.define('CookBook.view.trafficrouting.ViewTrafficRoutingIncrementalCallsPerMonth', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewTrafficRoutingIncrementalCallsPerMonth',

	//options
	allowBlank: false,
	fieldLabel: 'Incremental Calls / Mo.',
	labelAlign: 'left',
	vtype: 'alphanum',

	name: 'trafficroutingIncrementalCallsPerMonth'/*,
	
	listeners: {

		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: ''
			});
		}
	}*/
});