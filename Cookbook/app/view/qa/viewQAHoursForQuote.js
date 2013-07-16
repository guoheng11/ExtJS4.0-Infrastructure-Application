Ext.define('CookBook.view.qa.ViewQAHoursForQuote', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewQAHoursForQuote',
    title: 'OSG Hours for Quote',
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
            html: '<b>Total OSG Hours:</b>',
            width: 532
        }, {
            xtype: 'label',
            itemId: 'totalQAHours',
            text: '0',
            width: 110
        },{
			xtype: 'numberfield',
			itemId: 'submittedTotalQAHours',
			name: 'submittedTotalQAHours',
			value: 0,
			hidden: true
		}]
    }]
});
