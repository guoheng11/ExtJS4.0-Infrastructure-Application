Ext.define('CookBook.view.tls.ViewTLSTotalTLSHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewTLSTotalTLSHours',
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
        html: '<b>Total TLS (IP / SaaS) Hours:</b>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalTLSBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalTLSBookedLabel',
        text: '0'
    }]
});

function updateTotalTLSHours () {
    /*
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var addingHours = 0;
    totalBilledHours = GLOBAL_totalTLSSaaSBilledHours + GLOBAL_totalTLSIPBilledHours;
    totalBookedHours = GLOBAL_totalTLSSaaSBookedHours + GLOBAL_totalTLSIPBookedHours;

    var billedLabel = Ext.ComponentQuery.query('#TotalTLSBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalTLSBookedLabel');
    bookedLabel[0].setText(totalBookedHours);

    //viewTLSTLSHoursForQuote labels updating
    //billable TLS IP
    var billedTLSIPLabel = Ext.ComponentQuery.query('#billableTLSIPHours');
    billedTLSIPLabel[0].setText(GLOBAL_totalTLSIPBilledHours);
    //access usan setup
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlsipAccessUSANSetUpLbl');
    var value = Ext.ComponentQuery.query('#tlsIPAccessUSANBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //scripts
	
    //uat implementation
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlsipUatImplementationLbl');
    var value = Ext.ComponentQuery.query('#tlsIPUATImplementationBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //uat support
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlsipUatSupportLbl');
    var value = Ext.ComponentQuery.query('#tlsIPUATSupportBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //production implementation
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlsipProductionImplementationLbl');
    var value = Ext.ComponentQuery.query('#tlsIPProductionImplementationBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //other
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlsipOtherLbl');
    var value = Ext.ComponentQuery.query('#tlsIPOtherBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
   
    //billable TLS SaaS
    var billedTLSSaaSLabel = Ext.ComponentQuery.query('#billableTLSSaaSHours');
    billedTLSSaaSLabel[0].setText(GLOBAL_totalTLSSaaSBilledHours);
    //coding
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlssaasCodingLbl');
    var value = Ext.ComponentQuery.query('#tlsSaaSCodingBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //testing
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlssaasTestingLbl');
    var value = Ext.ComponentQuery.query('#tlsSaaSTestingBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //uat implementation
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlssaasUATImplementationLbl');
    var value = Ext.ComponentQuery.query('#tlsSaaSUATImplementationBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //uat support
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlssaasUATSupportLbl');
    var value = Ext.ComponentQuery.query('#tlsSaaSUATSupportBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //production implementation
        addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlssaasProductionImplementationLbl');
    var value = Ext.ComponentQuery.query('#tlsSaaSProductionImplementationBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);
    //other
    addingHours = 0;
    var lbl = Ext.ComponentQuery.query('#tlssaasOtherLbl');
    var value = Ext.ComponentQuery.query('#tlsSaaSOtherBilledHours');
    for(var i=0;i<value.length;i++) {
        addingHours+=value[i].getValue();
    }
    lbl[0].setText(addingHours);*/
}