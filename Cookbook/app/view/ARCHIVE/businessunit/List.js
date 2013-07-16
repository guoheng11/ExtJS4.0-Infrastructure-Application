Ext.define('CookBook.view.businessunit.List', {
	extend: 'Ext.form.field.ComboBox',
	alias:  'widget.businessunitlist',
	title:  'All businessunits',

	store: 'BusinessUnits',

	fieldLabel: 'Omg, awesome apps inside',
	labelAlign: "top",
	trigerAction: 'all',
	typeAhead: false,
	displayField: 'app_name',
	valueField: 'app_name',
	matchFieldWidth: true,
	listConfig: {
		//minHeight: 128,
		//maxHeight: 512,
		autoHeight: true
	},
	queryMode: 'local',

	initComponent: function() {

/*
		this.columns = [
			{header: 'App Name', dataIndex: 'app_name', flex: 1},
			{header: 'App Type ID', dataIndex: 'app_type_id', flex: 1}
		];
*/

		this.callParent(arguments);
	}
});