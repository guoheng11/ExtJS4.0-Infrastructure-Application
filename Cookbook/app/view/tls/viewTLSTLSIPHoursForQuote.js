Ext.define('CookBook.view.tls.ViewTLSTLSIPHoursForQuote', {
    //these labels are updated in the updateTotalTLSHours() function within viewTLSTotalTLSHours.js file
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSTLSIPHoursForQuote',
    title: 'TLS_IP Hours for Quote',
    border: false,
    height: 140,
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
            html: '<b>Total TLS_IP Hours:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'billableTLSIPHours',
            text: '0',
            width: 110
        }]
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>AccessUSAN SetUp:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlsipAccessUSANSetUpLbl',
            text: '0',
            width: 110
        }]
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>UAT Implementation:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlsipUatImplementationLbl',
            text: '0',
            width: 110
        }]
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>UAT Support:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlsipUatSupportLbl',
            text: '0',
            width: 110
        }]
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>Production Implementation:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlsipProductionImplementationLbl',
            text: '0',
            width: 110
        }]
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>Other:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlsipOtherLbl',
            text: '0',
            width: 110
        }]
    }]
});