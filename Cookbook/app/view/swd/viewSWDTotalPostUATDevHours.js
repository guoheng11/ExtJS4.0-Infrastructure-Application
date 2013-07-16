Ext.define('CookBook.view.swd.ViewSWDTotalPostUATDevHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDTotalPostUATDevHours',
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
        html: '&nbsp&nbsp&nbsp&nbsp<i>Total Post-UAT Dev Hours:</i>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalPostUATDevBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalPostUATDevBookedLabel',
        text: '0',
        width: 65
    }]
});

function updateTotalPostUATDevHours2 () {
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i=0;

    var uatBilledHours = Ext.ComponentQuery.query('#uatBilledHours');
    for(i=0;i<uatBilledHours.length;i++) {
        totalBilledHours+=uatBilledHours[i].getValue();
    }

    var uatBookedHours = Ext.ComponentQuery.query('#uatBookedHours');
    for(i=0;i<uatBookedHours.length;i++) {
        totalBookedHours+=uatBookedHours[i].getValue();
    }
    
    var projectOverheadBilledHours = Ext.ComponentQuery.query('#projectOverheadBilledHours');
    for(i=0;i<projectOverheadBilledHours.length;i++){
        totalBilledHours += projectOverheadBilledHours[i].getValue();
    }
    
    var projectOverheadBookedHours = Ext.ComponentQuery.query('#projectOverheadBookedHours');
    for(i=0;i<projectOverheadBookedHours.length;i++){
        totalBookedHours += projectOverheadBookedHours[i].getValue();
    }

    var billedLabel = Ext.ComponentQuery.query('#TotalPostUATDevBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalPostUATDevBookedLabel');
    bookedLabel[0].setText(totalBookedHours);

    GLOBAL_totalPostUATBillingHours = totalBilledHours;
    GLOBAL_totalPostUATBookedHours = totalBookedHours;

    updateTotalSWDHours();
}