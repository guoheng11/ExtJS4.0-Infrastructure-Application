Ext.define('CookBook.view.swd.ViewSWDTopBar', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDTopBar',
    height: 50,
    frame: false,
    bodyStyle: 'background-color:#dfe8f5;',
    items:[{
        xtype: 'label',
        width: 60,
        html: ''
    },{
        xtype: 'label',
        width: 50,
        html:  '<b>Contact Name</b>'
    },{
        xtype: 'label',
        width: 110,
        html: ''
    },{
        xtype: 'label',
        width: 50,
        html: '<b>Billed Hours</b>'
    },{
        xtype: 'label',
        width: 60,
        html: ''
    },{
        xtype: 'label',
        width: 60,
        html: '<b>Booked Hours</b>'
    },{
        xtype: 'label',
        width: 65, //set to 65 if need to move below
        html: ''
    },{
        xtype: 'label',
        width: 65,
        html: '<b>Target Start</b>'
    },{
        xtype: 'label',
        width: 75,
        html: ''
    },{
        xtype:'label',
        width: 90,
        html: '<b>Target Complete</b>'
    },{
        xtype: 'label',
        width: 55, //set to 55 if need to move below
        html: ''
    },{
        xtype: 'label',
        width: 90,
        html: '<b>Scheduled Start</b>'
    },{
        xtype: 'label',
        width: 60,
        html: ''
    },{
        xtype: 'label',
        width: 100,
        html: '<b>Scheduled Complete</b>'
    },{
        xtype: 'label',
        width: 55, //set to 55 if need to move below
        html: ''
    },{
        xtype: 'label',
        width: 100,
        html: '<b>Actual Complete</b>'
    }]
});