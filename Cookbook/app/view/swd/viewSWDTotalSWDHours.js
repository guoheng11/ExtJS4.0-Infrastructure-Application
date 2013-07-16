Ext.define('CookBook.view.swd.ViewSWDTotalSWDHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDTotalSWDHours',
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
        html: '<b>Total SWD (BA / TC / Dev) Hours:</b>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalSWDBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalSWDBookedLabel',
        text: '0'
    }]
});

function updateTotalSWDHours () {
    //also updates the SWD Hours for Quote panel
    var totalBilledHours = 0;
    var totalBookedHours = 0;

    totalBilledHours = GLOBAL_totalBATCBillingHours + GLOBAL_totalPreUATBillingHours + GLOBAL_totalPostUATBillingHours;
    totalBookedHours = GLOBAL_totalBATCBookedHours + GLOBAL_totalPreUATBookedHours + GLOBAL_totalPostUATBookedHours;

    var billedLabel = Ext.ComponentQuery.query('#TotalSWDBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalSWDBookedLabel');
    bookedLabel[0].setText(totalBookedHours);

    //SWD Hours for Quote panel

    //Billable BA / TC Hours
    var billedBATCHours = Ext.ComponentQuery.query('#billableBATCHours');
    billedBATCHours[0].setText(GLOBAL_totalBATCBillingHours);

    //Non-Billable BA / TC Hours
    var nonBillableTCHoursNumber = GLOBAL_totalBATCBookedHours - GLOBAL_totalBATCBillingHours;
    if (nonBillableTCHoursNumber < 0) {
        nonBillableTCHoursNumber = 0;
    }
    var nonBilledBATCHours = Ext.ComponentQuery.query('#nonBillableBATCHours');
    nonBilledBATCHours[0].setText(nonBillableTCHoursNumber);

    //Total Billable Dev Hours
    var totalBilledDevHours = Ext.ComponentQuery.query('#totalBillableDevHours');
    totalBilledDevHours[0].setText(GLOBAL_totalDevBilledHours);

    //Billable Coding Hours
    var totalCodingHoursBilledNumber = 0;
    var codingHoursBilled = Ext.ComponentQuery.query('#codingBilledHours');
    for(var i=0;i<codingHoursBilled.length;i++) {
        totalCodingHoursBilledNumber+=codingHoursBilled[i].getValue();
    }
    var billedCodingHours = Ext.ComponentQuery.query('#billableCodingHours');
    billedCodingHours[0].setText(totalCodingHoursBilledNumber);

    //Billable Other Hours
    var totalOtherHoursBilledNumber = GLOBAL_totalDevBilledHours - totalCodingHoursBilledNumber;
    if(totalOtherHoursBilledNumber < 0) {
        totalOtherHoursBilledNumber = 0;
    }
    var billedOtherHours = Ext.ComponentQuery.query('#billableOtherHours');
    billedOtherHours[0].setText(totalOtherHoursBilledNumber);

}