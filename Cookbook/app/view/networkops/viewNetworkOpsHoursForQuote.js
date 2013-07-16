Ext.define('CookBook.view.networkops.ViewNetworkOpsHoursForQuote', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewNetworkOpsHoursForQuote',
    title: 'Network Operations Hours for Quote',
    border: false,
    height: 50,
    bodyborder: false,
    collapsible: true,
    frame: true,
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        //height:30,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Total Net Ops Hours:</b>',
            width: 532
        }, {
            xtype: 'label',
            itemId: 'totalNetworkOpsHours',
            text: '0',
            width: 110
        },{
			xtype: 'numberfield',
			itemId: 'submittedTotalNetworkOpsHours',
			name: 'submittedTotalNetworkOpsHours',
			value: 0,
			hidden: true
		}]
    }]
});
