Ext.define('CookBook.view.systems.ViewSystemsChargesForQuote', {
    //these labels are updated in the updateTotalTLSHours() function within viewTLSTotalTLSHours.js file
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSystemsChargesForQuote',
    title: 'SYSTEMS Hours & Hardware Charges for Quote',
    border: false,
    height: 120,
    bodyborder: false,
    collapsible:true,
    frame: true,
    layout: 'vbox',
    items:[{
        layout:'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        //height:30,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total Systems Hours:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'billableSystemsHours',
            text: '0',
            width: 110
        }]
    },{
        xtype: 'label',
        height: 50,
        text: ''
    },{
        layout:'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        //height:30,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total Hardware / Software Charges:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'totalHardwareCharges',
            text: '$0.00',
            width: 110
        }]
    }]
});