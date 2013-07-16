Ext.define('CookBook.view.misupdates.ViewMISUpdatesAddDnis', {
	extend: 'Ext.grid.Panel',
	alias:  'widget.viewMISUpdatesAddDnis',

	name: 'misupdatesAddDnis',

	title: 'Add Dnis',
	collapsible: true,
	collapseFirst: true,
	collapsed: true,
	//region: 'center',
		
	store: 'MISUpdateAddDnises',
	/*store: {
		fields: ['dnis','route_to','platform','description','effective_date'],
		data: [ ]
	},*/
	columns: [
		{ header: 'New Dnis', width: 96, dataIndex: 'dnis', editor: {xtype: 'textfield'}},
		{ header: 'APP/MIS To Be Added To', width: 144, dataIndex: 'route_to', editor: {
												xtype: 'combobox',
												store: 'Applications',
												multiSelect:		false,
												displayField:		'name',
												valueField:			'name',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true,
													loadMask:     false
												},
												queryMode:			'local'
		}},
		{ header: 'Platform', width: 64, dataIndex: 'platform', editor: {
												xtype:				'combobox',
												store:				'Platforms',
												multiSelect:		false,
												displayField:		'platform1',
												valueField:			'platform1',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true,
													loadMask:     false
												},
												queryMode:			'local'
		}},
		{ header: 'Description', width: 100, flex: 1, dataIndex: 'description', editor: {xtype: 'textfield'}},
		{ header: 'Effective Date', /*xtype: 'datecolumn',*/ width: 100, dataIndex: 'effective_date', editor: { xtype: 'textDate', format: 'm/d/Y'}, 
																									  renderer: function (value, metaData) {
																										if (value == null) {
																											return;
																										}

																										var pattern = /T00:00:00/;
																										if (pattern.test(value.toString())) {
																											var datestring = value.substring(0, value.indexOf('T'));
																											var month = datestring.substring(5,7);
																											var day   = datestring.substring(8,10);
																											var year  = datestring.substring(0,4);
																											return month + "/" + day + "/" + year;
																										}

																										pattern = /00:00:00/;
																									    if (pattern.test(value.toString())) {
																											return Ext.util.Format.date(value, 'm/d/Y');
																									    }

																										return value;
																									  }
		},
		{ xtype: 'actioncolumn', width: 22, items: [{
												icon: 'extjs/examples/restful/images/delete.png',
												tooltip: 'click to delete this row',
												handler: function (grid, rowIndex, colIndex) {
													grid.getStore().removeAt(rowIndex);
												}
											}]
		}
	],
	selType: 'cellmodel',
	columnLines: true,
	plugins: [
		Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})
	],
	viewConfig: {
		//stripeRows: true
	},
	tools: [
		{
			type: 'plus',
			tooltip: 'Add another entry to this table',
			handler: function (event, toolEl, panel) {
				var gridPanel = panel.up();
				gridPanel.getStore().add({
					mis_update_id:GLOBAL_currentProjectOpenMISUpdatesID
				});  //add an empty row
			}
		}/*,{
			type: 'refresh',
			handler: function(event, toolEl, panel) {
				var gridPanel = panel.up();
				gridPanel.getStore().sync();
			}
		}*/
	]
});