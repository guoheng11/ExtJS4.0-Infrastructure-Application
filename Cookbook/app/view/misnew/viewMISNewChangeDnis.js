Ext.define('CookBook.view.misnew.ViewMISNewChangeDnis', {
	extend: 'Ext.grid.Panel',
	alias:  'widget.viewMISNewChangeDnis',

	name: 'misnewChangeDnis',

	title: 'Change Dnis',
	collapsible: true,
	collapseFirst: true,
	collapsed: true,
	//region: 'center',
			
	store: {
        fields: ['dnis','reroute_to','platform','description','remove_from','effective_date'],
        data: [ ]
    },
    columns: [
        { header: 'Existing Dnis', flex: 1, dataIndex: 'dnis', editor: {xtype: 'textfield'}},
        { header: 'APP/MIS To Be ReRouted To', flex: 1, dataIndex: 'reroute_to', editor: {
                                                xtype: 'combobox',
                                                store: 'Applications',
                                                multiSelect:        false,
                                                displayField:       'name',
                                                valueField:         'name',
                                                allowBlank:         true,
                                                matchFieldWidth:    true,
                                                listConfig: {
                                                    autoHeight: true,
													loadMask:     false
                                                },
                                                queryMode:          'local'
        }},
        { header: 'Platform', flex: 1, dataIndex: 'platform', editor: {
                                                xtype:              'combobox',
                                                store: {
                                                    fields: ['type'],
                                                    data: [
                                                        {'type':'SIVR'},
                                                        {'type':'NIVR'}
                                                    ]
                                                },
                                                multiSelect:        true,
                                                displayField:       'type',
                                                valueField:         'type',
                                                allowBlank:         true,
                                                matchFieldWidth:    true,
                                                listConfig: {
                                                    autoHeight: true,
													loadMask:     false
                                                },
                                                queryMode:          'local'
        }},
        { header: 'Description', flex: 1, dataIndex: 'description', editor: {xtype: 'textfield'}},
        { header: 'APP/MIS To Be Removed From', flex: 1, dataIndex: 'remove_from', editor: {
                                                xtype: 'combobox',
                                                store: 'Applications',
                                                multiSelect:        false,
                                                displayField:       'name',
                                                valueField:         'name',
                                                allowBlank:         true,
                                                matchFieldWidth:    true,
                                                listConfig: {
                                                    autoHeight: true,
													loadMask:     false
                                                },
                                                queryMode:          'local'
        }},
        { header: 'Effective Date', xtype: 'datecolumn', flex: 1, dataIndex: 'effective_date', editor: {xtype: 'datefield', format: 'm/d/y'}},
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
                gridPanel.getStore().add({});  //add an empty row
            }
        }
    ]
});