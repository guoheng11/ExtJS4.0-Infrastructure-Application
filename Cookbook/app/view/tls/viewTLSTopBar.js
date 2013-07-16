Ext.define('CookBook.view.tls.ViewTLSTopBar', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSTopBar',
    height: 50,
    frame: false,
    bodyStyle: 'background-color:#dfe8f5;',
    layout:'hbox',
    items:[{
        xtype: 'label',
        width: 50,
        html:  '<b>Contact Name</b>'
    },{
        xtype: 'label',
        width: 50,
        html: '<b>Billed Hours</b>'
    },{
        xtype: 'label',
        width: 60,
        html: '<b>Booked Hours</b>'
    },{
        xtype: 'label',
        width: 65,
        html: '<b>Target Start</b>'
    },{
        xtype:'label',
        width: 90,
        html: '<b>Target Complete</b>'
    },{
        xtype: 'label',
        width: 90,
        html: '<b>Scheduled Start</b>'
    },{
        xtype: 'label',
        width: 100,
        html: '<b>Scheduled Complete</b>'
    },{
        xtype: 'label',
        width: 100,
        html: '<b>Actual Complete</b>'
    }]
});