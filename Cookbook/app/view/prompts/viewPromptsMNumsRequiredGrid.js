Ext.define('CookBook.view.prompts.ViewPromptsMNumsRequiredGrid', {
	extend: 'Ext.grid.Panel',
	alias:  'widget.viewPromptsMNumsRequiredGrid',

	name: 'promptsMNumsRequiredGrid',

	title: 'M#s Required',
	/*collapsible: true,
	collapseFirst: true,
	collapsed: true,*/
	//region: 'center',
		
	store: {
		fields: ['type','number_prompts','language','coLang1','coLang2','coLang3',
			     'coLang4','coLang5','coLang6','coLang7',
			     'coLang8','coLang9'],
		data: [	]
	},
	columns: [
		{ xtype: 'actioncolumn', width: 22, items: [{
												icon: 'extjs/examples/restful/images/delete.png',
												tooltip: 'click to delete this row',
												handler: function (grid, rowIndex, colIndex) {
													grid.getStore().removeAt(rowIndex);
												}
											}]
		},
		{ header: 'Type', width: 64, dataIndex: 'type', editor: {
												xtype:				'combobox',
												store: {
													fields: ['type'],
													data: [
														{'type':'NLU'},
														{'type':'Standard'}
													]
												},
												multiSelect:		false,
												displayField:		'type',
												valueField:			'type',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true
												},
												queryMode:			'local'
		}},
		{ header: 'Number of Prompts', width: 128, dataIndex: 'number_prompts', editor: {xtype: 'textfield'}},
		{ header: 'Language', width: 96, dataIndex: 'language', editor: {
												xtype: 'combobox',
												store: {
													fields: ['language'],
													data: [
														{'language':'English'},
														{'language':'Spanish'},
														{'language':'French'},
														{'language':'British English'},
														{'language':'Russian'},
														{'language':'German'},
														{'language':'Polish'},
														{'language':'Dutch'},
														{'language':'Finnish'},
														{'language':'Swedish'},
														{'language':'Japanese'},
														{'language':'Chinese'}
													]
												},
												multiSelect:		false,
												displayField:		'language',
												valueField:			'language',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true
												},
												queryMode:			'local'
		}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang1', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang2', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang3', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang4', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang5', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang6', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang7', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang8', editor: {xtype: 'textfield'}},
		{ header: 'Corresponding Language', width: 128, dataIndex: 'coLang9', editor: {xtype: 'textfield'}}
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
				gridPanel.getStore().add({});  //add an empty row
			}
	}
	]
});