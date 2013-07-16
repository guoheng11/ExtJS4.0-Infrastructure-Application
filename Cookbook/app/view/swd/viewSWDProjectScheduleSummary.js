Ext.define('CookBook.view.swd.ViewSWDProjectScheduleSummary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewSWDProjectScheduleSummary',
    title: 'Project Schedule Summary',
    border: false,
    height: 1005,
    bodyborder: false,
    collapsible: true,
    frame: true,
    layout: 'vbox',
    items: [{
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled Vendor Start:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'scheduledVendorStart',
            name: 'SWDSummaryScheduledVendorStart'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled Vendor Complete:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'scheduledVendorComplete',
            name: 'SWDSummaryScheduledVendorComplete'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual Vendor Complete:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualVendorComplete',
            name: 'SWDSummaryActualVendorComplete'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled BA Start:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledBAStart',
            name: 'SWDSummaryScheduledBAStart'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled BA Complete:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledBAComplete',
            name: 'SWDSummaryScheduledBAComplete'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual BA Complete:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualBAComplete',
            name: 'SWDSummaryActualBAComplete'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled CF Docs to Customer:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'scheduledCFDocsToCustomer',
            name: 'SWDSummaryScheduledCFDocsToCustomer'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled CF Docs Approval:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'scheduledCFDocsApproval',
            name: 'SWDSummaryScheduledCFDocsApproval'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual CF Docs to Customer:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualCFDocsToCustomer',
            name: 'SWDSummaryActualCFDocsToCustomer'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual CF Docs Approval:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualCFDocsApproval',
            name: 'SWDSummaryActualCFDocsApproval'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Target Scripts Ordered:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'targetScriptsOrdered',
            name: 'SWDSummaryTargetScriptsOrdered'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Target Scripts Delivered:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'targetScriptsDelivered',
            name: 'SWDSummaryTargetScriptsDelivered'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual Scripts Loaded:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualScriptsLoaded',
            name: 'SWDSummaryActualScriptsLoaded'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled Dev Start:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledDevStart',
            name: 'SWDSummaryScheduledDevStart'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled Dev Complete:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledDevComplete',
            name: 'SWDSummaryScheduledDevComplete'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual Dev Complete:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualDevComplete',
            name: 'SWDSummaryActualDevComplete'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled QA Start:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledQAStart',
            name: 'SWDSummaryScheduledQAStart'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled QA Complete:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledQAComplete',
            name: 'SWDSummaryScheduledQAComplete'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual QA Complete:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualQAComplete',
            name: 'SWDSummaryActualQAComplete'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled TLS_SaaS Start:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            //readOnly: true,
            itemId: 'scheduledTLSSAASStart',
            name: 'SWDSummaryScheduledTLSSAASStart'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled TLS_SaaS Complete:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            //readOnly: true,
            itemId: 'scheduledTLSSAASComplete',
            name: 'SWDSummaryScheduledTLSSAASComplete'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual TLS_SaaS Complete:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualTLSSAASComplete',
            name: 'SWDSummaryActualTLSSAASComplete'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled Systems Start:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledSystemsStart',
            name: 'SWDSummaryScheduledSystemsStart'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled Systems Complete:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            readOnly: true,
            itemId: 'scheduledSystemsComplete',
            name: 'SWDSummaryScheduledSystemsComplete'
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual Systems Complete:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualSystemsComplete',
            name: 'SWDSummaryActualSystemsComplete'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Scheduled UAT Delivery:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'scheduledUATDelivery',
            name: 'SWDSummaryScheduledUATDelivery',
            listeners: {
                render: function(c) {
                    Ext.QuickTips.register({
                        target: c.getEl(),
                        text: 'This date is tied to Summary tab\'s Scheduled Uat Date'
                    });
                },
                change: function() {
                    Ext.ComponentQuery.query('viewSummaryScheduledUatDate')[0].setFullValue(Ext.ComponentQuery.query('#scheduledUATDelivery')[0].getRawValue());
                }
            }
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Actual UAT Delivery:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'actualUATDelivery',
            name: 'SWDSummaryActualUATDelivery'
        }]
    }, {
        height: 20,
        border: false,
        bodyborder: false,
        frame: false
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: 'Requested Production Date:',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'SWDSummaryTargetProdDate',
            name: 'SWDSummaryTargetProductionDate',
            listeners: {
                change: function() {
                    Ext.ComponentQuery.query('viewSummaryRequestedProdDate')[0].setFullValue(Ext.ComponentQuery.query('#SWDSummaryTargetProdDate')[0].getRawValue());
                },
                render: function(c) {
                    Ext.QuickTips.register({
                        target: c.getEl(),
                        text: 'This date is tied to the Summary tab\'s Requested Prod Date field'
                    });
                }
            }
        }]
    }, {
        layout: 'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items: [{
            xtype: 'label',
            html: '<b>Scheduled Production Date:</b>',
            width: 400
        }, {
            xtype: 'textDate', //(smm) 'datefield',
            itemId: 'SWDSummaryActualProdDate',
            name: 'SWDSummaryActualProductionDate',
            listeners: {
                change: function() {
                    Ext.ComponentQuery.query('#uatprodinstallUatDate')[0].setFullValue(Ext.ComponentQuery.query('#SWDSummaryActualProdDate')[0].getRawValue());
                    Ext.ComponentQuery.query('viewSummaryScheduledProdDate')[0].setFullValue(Ext.ComponentQuery.query('#SWDSummaryActualProdDate')[0].getRawValue());
                },
                render: function(c) {
                    Ext.QuickTips.register({
                        target: c.getEl(),
                        text: 'This date is tied to UAT & Prod Install\'s Production Date field AND to Summary tab\'s Scheduled Prod Date'
                    });
                }
            }
        }]
    }]
});