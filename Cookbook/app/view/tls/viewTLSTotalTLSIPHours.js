Ext.define('CookBook.view.tls.ViewTLSTotalTLSIPHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSTotalTLSIPHours',
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
        html: '<b>Total TLS_IP Hours:</b>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalTLSIPBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalTLSIPBookedLabel',
        text: '0'
    }]
});

function updateTotalTLSIPHours () {
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i=0;
//AccessUSAN Setup
    var AUBilled = Ext.ComponentQuery.query('#tlsIPAccessUSANBilledHours');
    for(i=0;i<AUBilled.length;i++) {
        totalBilledHours+=AUBilled[i].getValue();
    }
    var AUBooked = Ext.ComponentQuery.query('#tlsIPAccessUSANBookedHours');
    for(i=0;i<AUBooked.length;i++) {
        totalBookedHours+=AUBooked[i].getValue();
    }
//scripts
/* commented out 3-15-13 issue log
    var scriptsBilled = Ext.ComponentQuery.query('#tlsIPScriptsBilledHours');
    for(i=0;i<scriptsBilled.length;i++) {
        totalBilledHours+=scriptsBilled[i].getValue();
    }
    var scriptsBooked = Ext.ComponentQuery.query('#tlsIPScriptsBookedHours');
    for(i=0;i<scriptsBooked.length;i++) {
        totalBookedHours+=scriptsBooked[i].getValue();
    }
    */
//uat implementation
    var uatImplementationBilled = Ext.ComponentQuery.query('#tlsIPUATImplementationBilledHours');
    for(i=0;i<uatImplementationBilled.length;i++) {
        totalBilledHours+=uatImplementationBilled[i].getValue();
    }
    var uatImplementationBooked = Ext.ComponentQuery.query('#tlsIPUATImplementationBookedHours');
    for(i=0;i<uatImplementationBooked.length;i++) {
        totalBookedHours+=uatImplementationBooked[i].getValue();
    }
//uat support
    var uatSupportBilled = Ext.ComponentQuery.query('#tlsIPUATSupportBilledHours');
    for(i=0;i<uatSupportBilled.length;i++) {
        totalBilledHours+=uatSupportBilled[i].getValue();
    }
    var uatSupportBooked = Ext.ComponentQuery.query('#tlsIPUATSupportBookedHours');
    for(i=0;i<uatSupportBooked.length;i++) {
        totalBookedHours+=uatSupportBooked[i].getValue();
    }
//production implementation
    var productionImplementationBilled = Ext.ComponentQuery.query('#tlsIPProductionImplementationBilledHours');
    for(i=0;i<productionImplementationBilled.length;i++) {
        totalBilledHours+=productionImplementationBilled[i].getValue();
    }
    var productionImplementationBooked = Ext.ComponentQuery.query('#tlsIPProductionImplementationBookedHours');
    for(i=0;i<productionImplementationBooked.length;i++) {
        totalBookedHours+=productionImplementationBooked[i].getValue();
    }
//other    
    var otherBilled = Ext.ComponentQuery.query('#tlsIPOtherBilledHours');
    for(i=0;i<otherBilled.length;i++) {
        totalBilledHours+=otherBilled[i].getValue();
    }
    var otherBooked = Ext.ComponentQuery.query('#tlsIPOtherBookedHours');
    for(i=0;i<otherBooked.length;i++) {
        totalBookedHours+=otherBooked[i].getValue();
    }


    var billedLabel = Ext.ComponentQuery.query('#TotalTLSIPBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalTLSIPBookedLabel');
    bookedLabel[0].setText(totalBookedHours);
    
    GLOBAL_totalTLSIPBilledHours = totalBilledHours;
    GLOBAL_totalTLSIPBookedHours = totalBookedHours;
    
    updateTotalTLSHours();
}