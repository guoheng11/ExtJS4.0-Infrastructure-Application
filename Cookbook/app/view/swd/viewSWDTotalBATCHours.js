Ext.define('CookBook.view.swd.ViewSWDTotalBATCHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDTotalBATCHours',
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
        html: '<b>Total BA/TC Hours:</b>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalBATCBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalBATCBookedLabel',
        text: '0'
    }]
});

function updateTotalBATCHours () {
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i=0;

    var totalBilledHoursValue = Ext.ComponentQuery.query('#designDocumentationBilledHours');
    for(i=0;i<totalBilledHoursValue.length;i++) {
        totalBilledHours+=totalBilledHoursValue[i].getValue();
    }

    var totalBookedHoursValue = Ext.ComponentQuery.query('#designDocumentationBookedHours');
    for(i=0;i<totalBookedHoursValue.length;i++) {
        totalBookedHours+=totalBookedHoursValue[i].getValue();
    }

    var billedLabel = Ext.ComponentQuery.query('#TotalBATCBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalBATCBookedLabel');
    bookedLabel[0].setText(totalBookedHours);

    GLOBAL_totalBATCBillingHours = totalBilledHours;
    GLOBAL_totalBATCBookedHours = totalBookedHours;

    updateTotalSWDHours();
}