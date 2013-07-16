Ext.define('CookBook.view.prompts.ViewPromptsInfoGrid', {
	extend: 'Ext.grid.Panel',
	alias:  'widget.viewPromptsInfoGrid',

	name: 'promptsInfoGrid',

	title: '',
	//region: 'center',
		
	store: {
		fields: ['language','promptsToBeRecorded','promptsToBeBilled','promptsProvidedByCustomer','minimumFee',
			     'numberOfWords','orderType','recordingSessions','recordingStudio','promptsToBeConverted',
			     'conversionSessions','promptsToBeDigitized','promptTransferFeeRequired','cdRequired','cdMailingAddress',
			     'promptFormat','convertedPromptFormat','translationNeedsApproval'],
		data: [
			
		]
	},
	columns: [
		{ header: '', width: 96, dataIndex: 'dnis', editor: {xtype: 'textfield'}},
		{ header: '', width: 96, dataIndex: 'dnis', editor: {xtype: 'textfield'}},
		

		{ header: 'New Dnis', width: 96, dataIndex: 'dnis', editor: {xtype: 'textfield'}},
		{ header: 'APP To Be Routed To', width: 144, dataIndex: 'app', editor: {xtype: 'textfield'}},
		{ header: 'Platform', width: 64, dataIndex: 'platform', editor: {
												xtype:				'combobox',
												store: {
													fields: ['type'],
													data: [
														{'type':'SIVR'},
														{'type':'NIVR'}
													]
												},
												multiSelect:		true,
												displayField:		'type',
												valueField:			'type',
												allowBlank:			true,
												matchFieldWidth:	true,
												listConfig: {
													autoHeight: true
												},
												queryMode:			'local'
		}},
		{ header: 'Description', width: 100, dataIndex: 'description', editor: {xtype: 'textfield'}},
		{ header: 'APP To Be Removed From', width: 144, dataIndex: 'app', editor: {xtype: 'textfield'}},
		{ header: 'Routing Update', width: 100, dataIndex: 'routingupdate', editor: {xtype: 'textfield'}},
		{ header: 'Prod Traffic', xtype: 'datecolumn', width: 100, dataIndex: 'prodtraffic', editor: {xtype: 'datefield', format: 'm/d/y'}}
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
	}
});