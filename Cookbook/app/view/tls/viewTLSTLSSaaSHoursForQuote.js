Ext.define('CookBook.view.tls.ViewTLSTLSSaaSHoursForQuote', {
    //these labels are updated in the updateTotalTLSHours() function within viewTLSTotalTLSHours.js file
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSTLSSaaSHoursForQuote',
    title: 'TLS_SaaS Hours for Quote',
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
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total TLS_SaaS Hours:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'billableTLSSaaSHours',
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>Coding:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlssaasCodingLbl',
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
            html: '&nbsp&nbsp&nbsp&nbsp<i>Testing:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'tlssaasTestingLbl',
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
            itemId: 'tlssaasUATImplementationLbl',
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
            itemId: 'tlssaasUATSupportLbl',
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
            itemId: 'tlssaasProductionImplementationLbl',
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
            itemId: 'tlssaasOtherLbl',
            text: '0',
            width: 110
        }]
    }]
});