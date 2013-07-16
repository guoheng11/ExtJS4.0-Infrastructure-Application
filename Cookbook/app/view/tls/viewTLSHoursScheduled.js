Ext.define('CookBook.view.tls.ViewTLSHoursScheduled', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSHoursScheduled',
    title: 'TLS Hours Scheduled',
    border: false,
    height: 110,
    bodyborder: false,
    collapsible:true,
    frame: true,
    layout: 'vbox',
    items:[{
        preventHeader: true,
        title: '',
        border: false,
        height: 30,
        width: 1210,
        bodyborder: false,
        collapsible:true,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        layout: 'hbox',
        items:[{
            xtype: 'label',
            html: '',
            width: 196
        },{
            xtype: 'label',
            html: '<b>Billed Hours</b>',
            width: 100
        },{
            xtype: 'label',
            html: '<b>Booked Hours</b>'
        }]
    },{
        xtype: 'viewTLSTotalTLSSaaSHours',
        width: 1210
    },{
        xtype: 'viewTLSTotalTLSIPHours',
        width: 1210
    },{
        xtype: 'viewTLSTotalTLSHours',
        width: 1210
    }]
});