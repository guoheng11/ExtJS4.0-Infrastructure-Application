Ext.define('CookBook.view.swd.ViewSWDTotalDevHours', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDTotalDevHours',
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
        html: '<b>Total Dev Hours:</b>',
        width: 225
    },{
        xtype: 'label',
        itemId: 'TotalDevBilledLabel',
        text: '0',
        width: 110
    },{
        xtype: 'label',
        itemId: 'TotalDevBookedLabel',
        text: '0'
    }]
});

function updateTotalDevHours2 () {
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i=0;
    //workflow
    var WorkflowBilled = Ext.ComponentQuery.query('#workflowBilledHours');
    for(i=0;i<WorkflowBilled.length;i++) {
        totalBilledHours+=WorkflowBilled[i].getValue();
    }
    //requirements
    var ReqBilled = Ext.ComponentQuery.query('#requirementsBilledHours');
    for(i=0;i<ReqBilled.length;i++) {
        totalBilledHours+=ReqBilled[i].getValue();
    }
    var ReqBooked = Ext.ComponentQuery.query('#requirementsBookedHours');
    for(i=0;i<ReqBooked.length;i++) {
        totalBookedHours+=ReqBooked[i].getValue();
    }
    //coding
    var CodingBilled = Ext.ComponentQuery.query('#codingBilledHours');
    for(i=0;i<CodingBilled.length;i++) {
        totalBilledHours+=CodingBilled[i].getValue();
    }
    var CodingBooked = Ext.ComponentQuery.query('#codingBookedHours');
    for(i=0;i<CodingBooked.length;i++) {
        totalBookedHours+=CodingBooked[i].getValue();
    }
    //MIS CF Labels
    var MISBilled = Ext.ComponentQuery.query('#misBilledHours');
    for(i=0;i<MISBilled.length;i++) {
        totalBilledHours+=MISBilled[i].getValue();
    }
    var MISBooked = Ext.ComponentQuery.query('#misBookedHours');
    for(i=0;i<MISBooked.length;i++) {
        totalBookedHours+=MISBooked[i].getValue();
    }
    //testing/implementation
    var testingBilled = Ext.ComponentQuery.query('#testingBilledHours');
    for(i=0;i<testingBilled.length;i++) {
        totalBilledHours+=testingBilled[i].getValue();
    }
    var testingBooked = Ext.ComponentQuery.query('#testingBookedHours');
    for(i=0;i<testingBooked.length;i++) {
        totalBookedHours+=testingBooked[i].getValue();
    }
    //MIS Other
    var misOtherBilled = Ext.ComponentQuery.query('#misOtherBilledHours');
    for(i=0;i<misOtherBilled.length;i++) {
        totalBilledHours+=misOtherBilled[i].getValue();
    }
    var misOtherBooked = Ext.ComponentQuery.query('#misOtherBookedHours');
    for(i=0;i<misOtherBooked.length;i++) {
        totalBookedHours+=misOtherBooked[i].getValue();
    }
    //QA
    var QABilled = Ext.ComponentQuery.query('#qaBilledHours');
    for(i=0;i<QABilled.length;i++) {
        totalBilledHours+=QABilled[i].getValue();
    }
    var QABooked = Ext.ComponentQuery.query('#qaBookedHours');
    for(i=0;i<QABooked.length;i++) {
        totalBookedHours+=QABooked[i].getValue();
    }
    //UAT Support
    var UATBilled = Ext.ComponentQuery.query('#uatBilledHours');
    for(i=0;i<UATBilled.length;i++) {
        totalBilledHours+=UATBilled[i].getValue();
    }
    var UATBooked = Ext.ComponentQuery.query('#uatBookedHours');
    for(i=0;i<UATBooked.length;i++) {
        totalBookedHours+=UATBooked[i].getValue();
    }
    //Project Overhead
    var ProjectOverheadBilled = Ext.ComponentQuery.query('#projectOverheadBilledHours');
    for(i=0;i<ProjectOverheadBilled.length;i++) {
        totalBilledHours+=ProjectOverheadBilled[i].getValue();
    }
    var ProjectOverheadBooked = Ext.ComponentQuery.query('#projectOverheadBookedHours');
    for(i=0;i<ProjectOverheadBooked.length;i++) {
        totalBookedHours+=ProjectOverheadBooked[i].getValue();
    }
    //labels
    var billedLabel = Ext.ComponentQuery.query('#TotalDevBilledLabel');
    billedLabel[0].setText(totalBilledHours);

    var bookedLabel = Ext.ComponentQuery.query('#TotalDevBookedLabel');
    bookedLabel[0].setText(totalBookedHours);
    
    GLOBAL_totalDevBookedHours = totalBookedHours;
    GLOBAL_totalDevBilledHours = totalBilledHours;

    updateTotalSWDHours();
}