Ext.define('CookBook.view.tls.ViewTLSTotalTLSSaasHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSTotalTLSSaaSHours',
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
        html: '<b>Total TLS_SaaS Hours:</b>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalTLSSaaSBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalTLSSaaSBookedLabel',
        text: '0'
    }]
});

function updateTotalTLSSaaSHours () {
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i=0;
//coding
    var codingBilled = Ext.ComponentQuery.query('#tlsSaaSCodingBilledHours');
    for(i=0;i<codingBilled.length;i++) {
        totalBilledHours+=codingBilled[i].getValue();
    }
    var codingBooked = Ext.ComponentQuery.query('#tlsSaaSCodingBookedHours');
    for(i=0;i<codingBooked.length;i++) {
        totalBookedHours+=codingBooked[i].getValue();
    }
//testing
    var testingBilled = Ext.ComponentQuery.query('#tlsSaaSTestingBilledHours');
    for(i=0;i<testingBilled.length;i++) {
        totalBilledHours+=testingBilled[i].getValue();
    }
    var testingBooked = Ext.ComponentQuery.query('#tlsSaaSTestingBookedHours');
    for(i=0;i<testingBooked.length;i++) {
        totalBookedHours+=testingBooked[i].getValue();
    }
//uat implementation
    var uatImplementationBilled = Ext.ComponentQuery.query('#tlsSaaSUATImplementationBilledHours');
    for(i=0;i<uatImplementationBilled.length;i++) {
        totalBilledHours+=uatImplementationBilled[i].getValue();
    }
    var uatImplementationBooked = Ext.ComponentQuery.query('#tlsSaaSUATImplementationBookedHours');
    for(i=0;i<uatImplementationBooked.length;i++) {
        totalBookedHours+=uatImplementationBooked[i].getValue();
    }
//uat support
    var uatSupportBilled = Ext.ComponentQuery.query('#tlsSaaSUATSupportBilledHours');
    for(i=0;i<uatSupportBilled.length;i++) {
        totalBilledHours+=uatSupportBilled[i].getValue();
    }
    var uatSupportBooked = Ext.ComponentQuery.query('#tlsSaaSUATSupportBookedHours');
    for(i=0;i<uatSupportBooked.length;i++) {
        totalBookedHours+=uatSupportBooked[i].getValue();
    }
//production implementation
    var productionImplementationBilled = Ext.ComponentQuery.query('#tlsSaaSProductionImplementationBilledHours');
    for(i=0;i<productionImplementationBilled.length;i++) {
        totalBilledHours+=productionImplementationBilled[i].getValue();
    }
    var productionImplementationBooked = Ext.ComponentQuery.query('#tlsSaaSProductionImplementationBookedHours');
    for(i=0;i<productionImplementationBooked.length;i++) {
        totalBookedHours+=productionImplementationBooked[i].getValue();
    }
//scripts
    var scriptsBilled = Ext.ComponentQuery.query('#tlsSaaSScriptsBilledHours');
    for(i=0;i<scriptsBilled.length;i++) {
        totalBilledHours+=scriptsBilled[i].getValue();
    }
    var scriptsBooked = Ext.ComponentQuery.query('#tlsSaaSScriptsBookedHours');
    for(i=0;i<scriptsBooked.length;i++) {
        totalBookedHours+=scriptsBooked[i].getValue();
    }
//other    
    var otherBilled = Ext.ComponentQuery.query('#tlsSaaSOtherBilledHours');
    for(i=0;i<otherBilled.length;i++) {
        totalBilledHours+=otherBilled[i].getValue();
    }
    var otherBooked = Ext.ComponentQuery.query('#tlsSaaSOtherBookedHours');
    for(i=0;i<otherBooked.length;i++) {
        totalBookedHours+=otherBooked[i].getValue();
    }


    //var billedLabel = Ext.ComponentQuery.query('#TotalTLSSaaSBilledLabel');
    //billedLabel[0].setText(totalBilledHours);

    //var bookedLabel = Ext.ComponentQuery.query('#TotalTLSSaaSBookedLabel');
    //bookedLabel[0].setText(totalBookedHours);
    
    GLOBAL_totalTLSSaaSBilledHours = totalBilledHours;
    GLOBAL_totalTLSSaaSBookedHours = totalBookedHours;
    
    
    //updateTotalTLSHours();
}