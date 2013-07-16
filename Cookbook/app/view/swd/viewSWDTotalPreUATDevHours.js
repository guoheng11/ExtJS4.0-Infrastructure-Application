Ext.define('CookBook.view.swd.ViewSWDTotalPreUATDevHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDTotalPreUATDevHours',
    preventHeader: true,
    title: '',
    border: false,
    //height: 25,
    bodyborder: false,
    collapsible:true,
    frame: false,
    bodyStyle: 'background-color:#dfe8f5;',
    layout: 'hbox',
    items:[{
        xtype: 'label',
        html: '&nbsp&nbsp&nbsp&nbsp<i>Total Pre-UAT Dev Hours:</i>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalPreUATDevBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalPreUATDevBookedLabel',
        text: '0',
        width: 65
    }]
});

function updateTotalPreUATDevHours2 () {
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i=0;

    var workflowBilledHours = Ext.ComponentQuery.query('#workflowBilledHours');
    for(i=0;i<workflowBilledHours.length;i++) {
        totalBilledHours+=workflowBilledHours[i].getValue();
    }

    var requirementsBilledHours = Ext.ComponentQuery.query('#requirementsBilledHours');
    for(i=0;i<requirementsBilledHours.length;i++) {
        totalBilledHours+=requirementsBilledHours[i].getValue();
    }

    var codingBilledHours = Ext.ComponentQuery.query('#codingBilledHours');
    for(i=0;i<codingBilledHours.length;i++) {
        totalBilledHours+=codingBilledHours[i].getValue();
    }

    var misBilledHours = Ext.ComponentQuery.query('#misBilledHours');
    for(i=0;i<misBilledHours.length;i++) {
        totalBilledHours+=misBilledHours[i].getValue();
    }

    var testingBilledHours = Ext.ComponentQuery.query('#testingBilledHours');
    for(i=0;i<testingBilledHours.length;i++) {
        totalBilledHours+=testingBilledHours[i].getValue();
    }

    var misOtherBilledHours = Ext.ComponentQuery.query('#misOtherBilledHours');
    for(i=0;i<misOtherBilledHours.length;i++) {
        totalBilledHours+=misOtherBilledHours[i].getValue();
    }

    var qaBilledHours = Ext.ComponentQuery.query('#qaBilledHours');
    for(i=0;i<qaBilledHours.length;i++) {
        totalBilledHours+=qaBilledHours[i].getValue();
    }

    var requirementsBookedHours = Ext.ComponentQuery.query('#requirementsBookedHours');
    for(i=0;i<requirementsBookedHours.length;i++) {
        totalBookedHours+=requirementsBookedHours[i].getValue();
    }

    var codingBookedHours = Ext.ComponentQuery.query('#codingBookedHours');
    for(i=0;i<codingBookedHours.length;i++) {
        totalBookedHours+=codingBookedHours[i].getValue();
    }

    var misBookedHours = Ext.ComponentQuery.query('#misBookedHours');
    for(i=0;i<misBookedHours.length;i++) {
        totalBookedHours+=misBookedHours[i].getValue();
    }

    var testingBookedHours = Ext.ComponentQuery.query('#testingBookedHours');
    for(i=0;i<testingBookedHours.length;i++) {
        totalBookedHours+=testingBookedHours[i].getValue();
    }

    var misOtherBookedHours = Ext.ComponentQuery.query('#misOtherBookedHours');
    for(i=0;i<misOtherBookedHours.length;i++) {
        totalBookedHours+=misOtherBookedHours[i].getValue();
    }

    var qaBookedHours = Ext.ComponentQuery.query('#qaBookedHours');
    for(i=0;i<qaBookedHours.length;i++) {
        totalBookedHours+=qaBookedHours[i].getValue();
    }

    var billedLabel = Ext.ComponentQuery.query('#TotalPreUATDevBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalPreUATDevBookedLabel');
    bookedLabel[0].setText(totalBookedHours);

    GLOBAL_totalPreUATBillingHours = totalBilledHours;
    GLOBAL_totalPreUATBookedHours = totalBookedHours;

    updateTotalSWDHours();
}