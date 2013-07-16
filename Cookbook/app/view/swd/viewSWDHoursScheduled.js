Ext.define('CookBook.view.swd.ViewSWDHoursScheduled', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewSWDHoursScheduled',
    title: 'SWD Hours Scheduled',
    border: false,
    height: 180,
    bodyborder: false,
    collapsible: true,
    frame: true,
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        width: 1210,
        preventHeader: true,
        title: '',
        height: 20,
        border: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '',
            width: 196
        }, {
            xtype: 'label',
            html: '<b>Billed Hours</b>',
            width: 100
        }, {
            xtype: 'label',
            html: '<b>Booked Hours</b>'
        }]
    }, {
        layout: 'hbox',
        width: 1210,
        height: 30,
        preventHeader: true,
        title: '',
        border: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Total BA/TC Hours:</b>',
            width: 225
        }, {
            xtype: 'label',
            itemId: 'TotalBATCBilledLabel',
            text: '0',
            width: 110
        }, {
            xtype: 'label',
            itemId: 'TotalBATCBookedLabel',
            text: '0'
        }]
    }, {
        layout: 'hbox',
        width: 1210,
        preventHeader: true,
        title: '',
        border: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Total Dev Hours:</b>',
            width: 225
        }, {
            xtype: 'label',
            itemId: 'TotalDevBilledLabel',
            text: '0',
            width: 110
        }, {
            xtype: 'label',
            itemId: 'TotalDevBookedLabel',
            text: '0'
        }]
    }, {
        layout: 'hbox',
        width: 1210,
        preventHeader: true,
        title: '',
        border: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '&nbsp&nbsp&nbsp&nbsp<i>Total Pre-UAT Dev Hours:</i>',
            width: 225
        }, {
            xtype: 'label',
            itemId: 'TotalPreUATDevBilledLabel',
            text: '0',
            width: 110
        }, {
            xtype: 'label',
            itemId: 'TotalPreUATDevBookedLabel',
            text: '0',
            width: 65
        }]
    }, {
        layout: 'hbox',
        width: 1210,
        height: 30,
        preventHeader: true,
        title: '',
        border: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '&nbsp&nbsp&nbsp&nbsp<i>Total Post-UAT Dev Hours:</i>',
            width: 225
        }, {
            xtype: 'label',
            itemId: 'TotalPostUATDevBilledLabel',
            text: '0',
            width: 110
        }, {
            xtype: 'label',
            itemId: 'TotalPostUATDevBookedLabel',
            text: '0',
            width: 65
        }]
    },{
        layout: 'hbox',
        width: 1210,
        height: 30,
        preventHeader: true,
        title: '',
        border: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Total SWD Hours (BA / TC / Dev):',
            width: 225
        }, {
            xtype: 'label',
            itemId: 'totalSWDBilledHoursLabel',
            text: '0',
            width: 110
        }, {
            xtype: 'label',
            itemId: 'totalSWDBookedHoursLabel',
            text: '0',
            width: 65
        }]
    }]
});