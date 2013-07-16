Ext.define('CookBook.view.mainview.mainview', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainCookView',
    activeTab: 0,
    region: 'center',
    items: [{
        xtype: 'form',
        name: 'summary',
        itemId: 'summary',
        title: 'Summary',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1264, //2056,
            height: 2295, //ah 2000, //smm 1800,//2056,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'hbox',
                align: 'left'
            },
            items: [{
                xtype: 'panel',
                width: 350,
                height: 2295, //ah 2000, //smm 1800,
                frame: false,
                bodyStyle: 'background-color:#dfe8f5;',
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 350,
                    height: 1100, //ah 865
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    bodyPadding: 7,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '<B>Project Information</B>',
                        height: 32
                    }, {
                        xtype: 'viewSummaryUSANProjectNumber',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryProjectName',
                        labelWidth: 175,
                        width: 330
                    }, {
                        xtype: 'viewSummaryCustomerProjectNumber',
                        labelWidth: 175
                    }, {
                        xtype: 'label',
                        text: '',
                        height: 20
                    }, {
                        xtype: 'viewSummaryCompany',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryBusinessUnit',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryAdditionalBusinessUnits',
                        labelWidth: 175,
                        width: 330
                    }, {
                        xtype: 'label',
                        text: '',
                        height: 20
                    }, {
                        xtype: 'viewSummaryQuoteLOERecvDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryUpdatedSpecsRecv',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryQuoteLOEDueDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryRequestedUatDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryRequestedProdDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryQuoteLOEIssueDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryScheduledUatDate', //quoted uat delivery date
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryAuthDueDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryAuthRecvDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryRevisedUATDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryUATAcceptanceDue',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryUATAcceptedDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryScheduledProdDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryProdCompleteDate',
                        labelWidth: 175
                    }, {
                        xtype: 'label',
                        text: '',
                        height: 20
                    }, {
                        xtype: 'viewSummaryExpedite',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryPreApproved',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryConferenceCall',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummarySoak',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryLinked',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryLinkType',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryLinkedProjects',
                        labelWidth: 175,
                        width: 330
                    }, { //smm (9/18/12)
                        xtype: 'viewSummaryProjectDependencies',
                        labelWidth: 175,
                        width: 330,
                        height: 185
                    }]
                }, {
                    xtype: 'panel',
                    width: 350,
                    height: 32,
                    frame: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: []
                }, {
                    xtype: 'panel',
                    width: 350,
                    height: 850, //790,
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    bodyPadding: 7,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '<B>Project Contacts</B>',
                        height: 32
                    }, {
                        xtype: 'viewSummaryUsanTC',
                        labelWidth: 330,
                        width: 330
                    },
                    /*{
                     xtype: 'viewSummaryUsanDevManager',
                     labelWidth: 175
                     },*/
                    {
                        xtype: 'viewSummaryUsanDevPM',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanBA',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanDeveloper',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanMIS',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanQA',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanOpsPM',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanTLSIP',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanTLSSaaS',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanSystemsEngineer',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanOSG',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryUsanNetworkOps',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'label',
                        text: '',
                        height: 20
                    }, {
                        xtype: 'viewSummaryCustomerRFQ',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryCustomerPM',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryCustomerTesting',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryCustomerHost',
                        labelWidth: 330,
                        width: 330
                    }, {
                        xtype: 'viewSummaryCustomerTC',
                        labelWidth: 330,
                        width: 330
                    }]
                }, {
                    xtype: 'panel',
                    width: 350,
                    height: 32,
                    frame: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: []
                }, {
                    xtype: 'panel',
                    width: 350,
                    height: 336,
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    bodyPadding: 7,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '<B>Project Description</B>',
                        height: 32
                    }, {
                        xtype: 'viewSummaryProjectDescription',
                        labelWidth: 0,
                        labelHeight: 0,
                        width: 330,
                        height: 220
                    }]
                }]
            }, {
                xtype: 'panel',
                width: 32,
                height: 2295, //ah 2000, //smm 1800,
                frame: false,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: []
            }, {
                xtype: 'panel',
                width: 350,
                height: 2295, //ah 2000, //smm 1800,
                frame: false,
                bodyStyle: 'background-color:#dfe8f5;',
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 350,
                    height: 2295, //ah 2000, //smm 1800,
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    bodyPadding: 7,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '<B>Project Requirements</B>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspExisting&nbsp&nbsp&nbspNew',
                        height: 32
                    }, {
                        xtype: 'label',
                        text: 'Documentation',
                        height: 20
                    }, {
                        xtype: 'viewSummaryDocumentationVisio',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryDocumentationVUI',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryDocumentationOther',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryDocumentationDecommission',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryApplication',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryApplicationDecommission',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryParm',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryParmDecommission',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Reporting',
                        height: 20
                    }, {
                        xtype: 'viewSummaryReportingButton',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryReportingOther',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryReportingVision',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryReportingDecommission',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Tables',
                        height: 20
                    }, {
                        xtype: 'viewSummaryTablesXlsCsv',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTablesMetafile',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTablesDefFile',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTablesUsanUpdateLoad',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTablesCustomerUpdateUsanLoad',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTablesCustomerUpdateLoad',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTablesDecommission',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Prompts',
                        height: 20
                    }, {
                        xtype: 'viewSummaryPromptsStandard',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryPromptsNLU',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Routing',
                        height: 20
                    }, {
                        xtype: 'viewSummaryRoutingNew800Nums',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryRoutingRemove800Nums',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryRoutingRedirect800Nums',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryRoutingDAPSS7',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTraffic',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryScraper',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryNewTranType',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryEngine',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Grammars',
                        height: 20
                    }, {
                        xtype: 'viewSummaryGrammarsStandard',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryGrammarsVXML',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Back Office',
                        height: 20
                    }, {
                        xtype: 'viewSummaryBackOfficeDB',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryBackOfficeProcess',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryBackOfficeWebServices',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Network',
                        height: 20
                    }, {
                        xtype: 'viewSummaryNetworkFileTransfer',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryNetworkInfrastructure',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Host',
                        height: 20
                    }, {
                        xtype: 'viewSummaryHostConnectivity',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryHostWSDL',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTNTFunctionality',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryTTSFunctionality',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummarySpeechRecognition',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryUUI',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryReadi800',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryAccessUSANAccessUser',
                        labelWidth: 245
                    }, {
                        xtype: 'label',
                        text: 'Nuance',
                        height: 20
                    }, {
                        xtype: 'viewSummaryNuanceDevelopment',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryNuanceNDM',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryServiceID',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryBisoApproval',
                        labelWidth: 245
                    }, {
                        xtype: 'viewSummaryOther',
                        labelWidth: 245
                    }]
                }]
            }, {
                xtype: 'panel',
                width: 32,
                height: 2295, //ah 2000, //smm 1800,
                frame: false,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: []
            }, {
                xtype: 'panel',
                width: 500,
                height: 2295, //ah 2000, //smm 1800,
                frame: false,
                bodyStyle: 'background-color:#dfe8f5;',
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 500,
                    height: 980,
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    bodyPadding: 7,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        html: '<B>Project Status and History</B>',
                        height: 32
                    }, {
                        xtype: 'viewSummaryProjectStatus',
                        labelWidth: 175,
                        width: 480 //(smm) make this wider so all of the status is visible
                    }, {
                        xtype: 'viewSummaryChooseProjectStatus',
                        labelWidth: 175,
                        width: 480 //(smm) make this wider so all of the status is visible
                    }, {
                        xtype: 'viewSummaryProjectStatusDate',
                        labelWidth: 175
                    }, {
                        xtype: 'viewSummaryProjectStatusButton',
                        labelWidth: 175
                    }, {
                        xtype: 'label',
                        height: 32
                    }, {
                        xtype: 'viewSummaryProjectNextSteps',
                        width: 480,
                        height: 350
                    }, {
                        xtype: 'label',
                        height: 32
                    }, {
                        xtype: 'viewSummaryProjectHistory',
                        width: 480,
                        height: 350
                    }, {
                        xtype: 'label',
                        height: 32
                    },{
                        xtype: 'viewSummaryProjectFolder',
                        width: 330
                    }]
                }]
            }]
        }],
        listeners: {
            afterrender: function() {
                var myMask = new Ext.LoadMask(Ext.getBody(), {
                    msg: "Loading. Please wait..."
                });
                myMask.show();
                //GLOBAL_currentController.getStore("ProjectHistories").load();
                var store = GLOBAL_currentController.getStore("BusinessUnits");
                store.sort('name', 'ASC');
                var store = GLOBAL_currentController.getStore("Companies");
                store.sort('company_name', 'ASC');
                store.load();
                var store = GLOBAL_currentController.getStore("Contacts");
                store.sort('name', 'ASC');
                store.load();
                GLOBAL_currentController.getStore("ContactTypes").load();
                GLOBAL_currentController.getStore("Platforms").load();
                GLOBAL_currentController.getStore("Statuses").load();
                var store = GLOBAL_currentController.getStore("ProjectInformationLinkedProjects");
                store.sort('project_number', 'ASC');
                store.load();
                myMask.hide();
            },
            activate: function() {
                doPsuedoLoading();
            },
            deactivate: function() {
                this.updateSummaryPage();
            }
        },
        updateSummaryPage: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TLS") || (GLOBAL_permission == "SYS") || (GLOBAL_permission == "QA") || (GLOBAL_permission == "PMT")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, true, false));

                Ext.Ajax.request({
                    url: 'UpdateSummaryPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username,
                        permission: GLOBAL_permission //for change logging
                    },
                    jsonData: jsonBlob,
                    success: function(response) {
                        var obj = Ext.decode(response.responseText);
                        //console.log(obj.rows[0]); 
                        if (obj.rows[0] == 'Project Number Already Exists') {
                            console.log("Summary page NOT saved. Duplicate project number.");
                            Ext.MessageBox.confirm('Error When Saving', '<b>USAN Project Number</b> Given Already Exists.<br /><br /> Please Enter A Different' + ' Project Number.<br /><br /><b>Your data has not been saved.</b><br /><br />Do you want to enter a new <b>USAN' + ' Project Number</b> now?', function(button) {
                                if (button === 'yes') {
                                    Ext.MessageBox.prompt('Enter New USAN Project Number', 'Please enter the desired <b>USAN Project Number.</b>', function(button, msg) {
                                        if (button === 'ok') {
                                            Ext.ComponentQuery.query('viewSummaryUSANProjectNumber')[0].setValue(msg);
                                        } else {
                                            Ext.ComponentQuery.query('viewSummaryUSANProjectNumber')[0].markInvalid('Project Number Already Exists');
                                        }
                                    });
                                } else {
                                    Ext.ComponentQuery.query('viewSummaryUSANProjectNumber')[0].markInvalid('Project Number Already Exists');
                                }
                            });
                        } else {
                            if (obj.rows[0].indexOf("refresh needed") != -1) {
                                //alert('refresh needed');
                                GLOBAL_currentController.getStore('ProjectInformationLinkedProjects').removeAll();
                                GLOBAL_currentController.getStore('ProjectInformationVitals').removeAll();
                                GLOBAL_currentController.getStore('ProjectInformationLinkedProjects').load();
                                GLOBAL_currentController.getStore('ProjectInformationVitals').load();
                                if (obj.rows[0].indexOf("~~") != -1) {
                                    Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText(obj.rows[0].substring(obj.rows[0].indexOf("[") + 1, obj.rows[0].indexOf("]")));
                                }
                                /*             
                                 remove possible added entries (from advanced filtering), clear filter, setting to Project Number so that grid still shows
                                 data after refresh - see navToolbar.js
                                 */
                                Ext.ComponentQuery.query('#searchTypes')[0].setText('Project Number');
                                Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            }
                            console.log("updated Summary");
                        }

                    }
                });
            }
        }
    }, {
        //                                          ADAM START
        xtype: 'form',
        title: 'Requirements',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1240,
            autoscroll: true,
            height: 4250,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            bodyborder: false,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewReqDocumentation',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqApplication',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqTable',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqRouting',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqScraper',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqEngine',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqManager',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqGrammar',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqVXML',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqBackOfficeDB',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqBackOfficeProcess',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqBackOfficeWebSvc',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqConfigurationFile',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqFaxForm',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqFileXferUpload',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqFileXferDownload',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqTTSFunctionality',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqTNTFunctionality',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqSpeechRecognition',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqUUI',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqServiceID',
                height: 200,
                width: 1224
            }, {
                xtype: 'viewReqOther',
                height: 200,
                width: 1224
            }]
        }],
        listeners: {
            activate: function() {
                doRequirementsLoading(GLOBAL_currentProjectOpenProjectID);
            }
        }
        //                                          ADAM END
    }, {
        title: 'MIS Updates',
        xtype: 'form',
        name: 'misupdatesForm',
        itemId: 'misupdatesForm',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1024,
            height: 1300,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'panel',
                title: 'Report Change',
                itemId: 'misUpdatesReportPanel',
                width: 768,
                height: 135,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'viewMISUpdatesReportNames',
                    width: 750
                }, {
                    xtype: 'viewMISUpdatesDescriptionOfChange',
                    width: 750,
                    height: 64
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'panel',
                title: 'Distribution Change',
                itemId: 'misUpdatesDistributionPanel',
                width: 768,
                height: 300,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 750,
                    height: 64,
                    frame: true,
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'viewMISUpdatesDistributionSelectEmail',
                        width: 288
                    }, {
                        xtype: 'label',
                        width: 20
                    }, {
                        xtype: 'viewMISUpdatesAddEmailButton'
                    }, {
                        xtype: 'label',
                        width: 42,
                        html: '&nbsp&nbsp&nbsp<b>or</b>'
                    }, {
                        xtype: 'viewMISUpdatesDeleteEmailButton'
                    }]
                }, {
                    xtype: 'viewMISUpdatesDistributionAddEmail',
                    width: 750,
                    height: 96
                }, {
                    xtype: 'viewMISUpdatesDistributionDeleteEmail',
                    width: 750,
                    height: 96
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'panel',
                title: 'Delivery Change',
                itemId: 'misUpdatesDeliveryPanel',
                width: 768,
                height: 128,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'viewMISUpdatesDeliveryChangeNewMethod',
                    width: 384
                }, {
                    xtype: 'viewMISUpdatesDeliveryChangeNewFormat',
                    width: 384
                }, {
                    xtype: 'viewMISUpdatesDeliveryChangeNewFrequency',
                    width: 384
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewMISUpdatesAddDnis',
                height: 200,
                width: 768
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewMISUpdatesChangeDnis',
                height: 200,
                width: 768
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewMISUpdatesRemoveDnis',
                height: 200,
                width: 768
            }]
        }],
        listeners: {
            activate: function() {
                doMISUpdatesLoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                this.updateMISUpdates();
            }
        },
        updateMISUpdates: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));

                Ext.Ajax.request({
                    url: 'UpdateMISUpdates.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated MISUpdates");
                    }
                });
            }
        }
    }, {
        xtype: 'form',
        title: 'MIS New',
        name: 'misNew',
        itemId: 'misNew',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1024,
            height: 1150,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'panel',
                title: 'New Report Description',
                itemId: 'misNewReportDescriptionPanel',
                width: 768,
                height: 200,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'viewMISNewReportDescription',
                    labelWidth: 0,
                    labelHeight: 0,
                    width: 750,
                    height: 150
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'panel',
                title: 'File1 Reporting Info',
                itemId: 'misNewFileReportingInfoPanel',
                width: 768,
                height: 200,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'viewMISNewBusinessUnit',
                    labelWidth: 175,
                    width: 750
                }, {
                    xtype: 'viewMISNewApplicationGroup',
                    labelWidth: 175,
                    width: 750
                }, {
                    xtype: 'viewMISNewRequestedReportName',
                    labelWidth: 175,
                    width: 750,
                    height: 100
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'panel',
                title: 'Delivery Change',
                itemId: 'misNewDeliveryChangePanel',
                width: 768,
                height: 128,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'viewMISNewMethod',
                    labelWidth: 175,
                    width: 750
                }, {
                    xtype: 'viewMISNewFormat',
                    labelWidth: 175,
                    width: 750
                }, {
                    xtype: 'viewMISNewFrequency',
                    labelWidth: 175,
                    width: 750
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'panel',
                title: 'Distribution Change',
                itemId: 'misNewDistributionChangePanel',
                width: 768,
                height: 300,
                collapsible: true,
                collapsed: true,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 750,
                    height: 64,
                    frame: true,
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'viewMISNewDistributionSelectEmail',
                        width: 288
                    }, {
                        xtype: 'label',
                        width: 20
                    }, {
                        xtype: 'viewMISNewAddEmailButton'
                    }, {
                        xtype: 'label',
                        width: 42,
                        html: '&nbsp&nbsp&nbsp<b>or</b>'
                    }, {
                        xtype: 'viewMISNewDeleteEmailButton'
                    }]
                }, {
                    xtype: 'viewMISNewDistributionAddEmail',
                    width: 750,
                    height: 96
                }, {
                    xtype: 'viewMISNewDistributionDeleteEmail',
                    width: 750,
                    height: 96
                }],
                listeners: {
                    checkCollapsibility: function() {
                        if (this.collapsed) {
                            this.expand(true);
                        }
                    }
                }
            }, {
                xtype: 'label',
                text: '',
                height: 20
            }, {
                xtype: 'viewMISNewAddDnis',
                height: 200,
                width: 768
            }]
        }],
        listeners: {
            activate: function() {
                doMISNewLoading(GLOBAL_currentProjectOpenProjectID);

                var grid = Ext.ComponentQuery.query('viewReqApplication')[0];
                var misNewPanel = Ext.ComponentQuery.query('viewMISNewApplicationGroup')[0];
                misNewPanel.setValue("");
                var gridStore = grid.getStore();
                var gridCount = gridStore.count();
                var stringToAdd = "";
                for (var i = 0; i < gridCount; i++) {
                    if (gridStore.getAt(i).get('app_file') != "" && gridStore.getAt(i).get('app_file') != null && gridStore.getAt(i).get('app_file') != " ") {
                        stringToAdd += gridStore.getAt(i).get('app_file') + ", ";
                    }
                }
                stringToAdd = stringToAdd.substring(0, stringToAdd.length - 2);
                misNewPanel.setValue(stringToAdd);
            },
            deactivate: function() {
                this.updateMISNew();
            }
        },
        updateMISNew: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "DEV") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "TC")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));

                Ext.Ajax.request({
                    url: 'UpdateMISNewPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated MIS New");
                    }
                });
            }
        }
    }, {
        title: 'Traffic & Routing',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        xtype: 'form',
        name: 'trafficRouting',
        itemId: 'trafficRouting',
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1260,
            height: 2400,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'label',
                height: 32,
                html: '<B>Traffic Requirements</B>'
            }, {
                xtype: 'panel',
                title: 'New Traffic',
                width: 1250,
                height: 300,
                collapsible: true,
                collapsed: false,
                collapsedFirst: false,
                frame: true,
                layout: {
                    type: 'vbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'viewTrafficRoutingIncludedInForecast',
                    labelWidth: 128
                }, {
                    xtype: 'viewTrafficRoutingIncrementalMinutesPerMonth',
                    labelWidth: 128
                }, {
                    xtype: 'viewTrafficRoutingIncrementalCallsPerMonth',
                    labelWidth: 128
                }, {
                    xtype: 'viewTrafficRoutingBusyHourCalls',
                    labelWidth: 128
                }, {
                    xtype: 'viewTrafficRoutingBusyHourCallPercentage',
                    labelWidth: 128
                }, {
                    xtype: 'viewTrafficRoutingAverageCallDuration',
                    labelWidth: 128
                }]
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'label',
                height: 32,
                html: '<B>Routing Requirements</B>'
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'form',
                bodyPadding: 5,
                collapsible: true,
                collapsed: true,
                title: 'Upload / Export  XLS',
                frame: false,
                bodyStyle: 'background-color:#dfe8f5;',
                bodyborder: false,
                height: 65,
                width: 1250,
                layout: 'hbox',
                items: [{
                    xtype: 'filefield',
                    name: 'xls_upload',
                    itemId: 'trafficRoutingXlsUpload',
                    fieldLabel: 'XLS File to Import',
                    msgTarget: 'side',
                    allowBlank: false,
                    anchor: '100%',
                    flex: 6,
                    allowBlank: true,
                    buttonText: 'Browse'
                }, {
                    xtype: 'label',
                    flex: 1
                }, {
                    xtype: 'checkbox',
                    fieldLabel: 'Delete Existing Grid Data?',
                    name: 'trafficRoutingDeleteExisting',
                    itemId: 'trafficRoutingDeleteExisting',
                    flex: 2
                }, {
                    xtype: 'label',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'Upload XLS to Grid',
                    flex: 2,
                    handler: function() {
                        if (GLOBAL_readonly) {
                            return;
                        }
                        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {

                            if (Ext.ComponentQuery.query('#trafficRoutingXlsUpload')[0].getValue() == '') {
                                Ext.Msg.alert('Empty File', 'Please select a file to upload');
                                return;
                            }

                            var form = this.up('form').getForm();

                            var jsonBlob = Ext.JSON.encode(this.up('form').getForm().getValues(false, false, true));
                            var chkbox = Ext.ComponentQuery.query('#trafficRoutingDeleteExisting')[0].getValue();

                            if (chkbox == true) {
                                Ext.create("Ext.Window", {
                                    title: "Confirm Delete",
                                    modal: true,
                                    bodyStyle: "padding:10px",
                                    items: [{
                                        xtype: 'label',
                                        html: "<b>Please select which existing Grid Data to delete.</b><br /><br />"
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Add',
                                        checked: true,
                                        name: 'trafficRoutingMsgAdd',
                                        itemId: 'trafficRoutingMsgAdd'
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Change',
                                        checked: true,
                                        name: 'trafficRoutingMsgChange',
                                        itemId: 'trafficRoutingMsgChange'
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Remove',
                                        checked: true,
                                        name: 'trafficRoutingMsgRemove',
                                        itemId: 'trafficRoutingMsgRemove'
                                    }],
                                    buttons: [{
                                        text: "Ok",
                                        handler: function() {
                                            var eto = this;
                                            var addButton = Ext.ComponentQuery.query('#trafficRoutingMsgAdd')[0].getValue();
                                            var changeButton = Ext.ComponentQuery.query('#trafficRoutingMsgChange')[0].getValue();
                                            var removeButton = Ext.ComponentQuery.query('#trafficRoutingMsgRemove')[0].getValue();

                                            if (form.isValid()) {
                                                console.log('valid, submitting');
                                                form.submit({
                                                    url: 'TrafficRoutingUploadDNIS.ashx',
                                                    waitMsg: 'Attempting to upload file...',
                                                    params: {
                                                        user_name: GLOBAL_username,
                                                        jsonBlob: jsonBlob,
                                                        project_id: GLOBAL_currentProjectOpenProjectID,
                                                        delete_existing: chkbox,
                                                        delete_add: addButton,
                                                        delete_change: changeButton,
                                                        delete_remove: removeButton
                                                    },
                                                    success: function(fp, o) {
                                                        eto.up('window').close();
                                                        var obj = Ext.decode(o.response.responseText);
                                                        Ext.Msg.alert('Upload File Results', '' + obj.rows[0]);
                                                        doTrafficRoutingGridsReload();
                                                    },
                                                    failure: function(fp, action) {
                                                        eto.up('window').close();
                                                        var obj = Ext.decode(action.response.responseText);
                                                        Ext.Msg.alert('Upload File Results', 'Your file was not uploaded. ' + obj.rows[0]);
                                                        doTrafficRoutingGridsReload();
                                                    }
                                                });
                                            } else {
                                                console.log('form is not valid');
                                            }
                                        }
                                    }, {
                                        text: "Cancel",
                                        handler: function() {
                                            this.up('window').close();
                                        }
                                    }]
                                }).show();
                            } else {
                                if (form.isValid()) {
                                    console.log('valid, submitting');
                                    form.submit({
                                        url: 'TrafficRoutingUploadDNIS.ashx',
                                        waitMsg: 'Attempting to upload file...',
                                        params: {
                                            user_name: GLOBAL_username,
                                            jsonBlob: jsonBlob,
                                            project_id: GLOBAL_currentProjectOpenProjectID,
                                            delete_existing: false,
                                            delete_add: false,
                                            delete_change: false,
                                            delete_remove: false
                                        },
                                        success: function(fp, o) {
                                            var obj = Ext.decode(o.response.responseText);
                                            Ext.Msg.alert('Upload File Results', '' + obj.rows[0]);
                                            doTrafficRoutingGridsReload();
                                        },
                                        failure: function(fp, action) {
                                            var obj = Ext.decode(action.response.responseText);
                                            Ext.Msg.alert('Upload File Results', 'Your file was not uploaded. ' + obj.rows[0]);
                                        }
                                    });
                                } else {
                                    console.log('form is not valid');
                                }
                            }
                        }
                    }
                }, {
                    xtype: 'label',
                    flex: 1
                }, {
                    xtype: 'button',
                    text: 'Export Data to XLS',
                    flex: 2,
                    handler: function() {
                        var eto = this;
                        var projFolder = "";
                        if (Ext.ComponentQuery.query('#summaryProjectFolder')[0]) {
                            projFolder = Ext.ComponentQuery.query('#summaryProjectFolder')[0].getValue();
                        } else {
                            projFolder = "Located on Summary Tab";
                        }

                        var form = this.up('form').getForm();

                        var jsonBlob = Ext.JSON.encode(this.up('form').getForm().getValues(false, false, true));

                        Ext.create("Ext.Window", {
                            title: "Confirm Export",
                            bodyStyle: "padding:10px",
                            modal: true,
                            items: [{
                                xtype: 'label',
                                html: "<b>Please select which Grids to export.</b><br /><br />The Exported XLS file will be placed in the <b>Project Folder</b>: <br /><br />(" + projFolder + ")<br /><br />"
                            }, {
                                xtype: 'checkbox',
                                fieldLabel: 'Add',
                                checked: true,
                                name: 'trafficRoutingMsgExportAdd',
                                itemId: 'trafficRoutingMsgExportAdd'
                            }, {
                                xtype: 'checkbox',
                                fieldLabel: 'Change',
                                checked: true,
                                name: 'trafficRoutingMsgExportChange',
                                itemId: 'trafficRoutingMsgExportChange'
                            }, {
                                xtype: 'checkbox',
                                fieldLabel: 'Remove',
                                checked: true,
                                name: 'trafficRoutingMsgExportRemove',
                                itemId: 'trafficRoutingMsgExportRemove'
                            }],
                            buttons: [{
                                text: "Ok",
                                handler: function() {
                                    var eto = this;
                                    var addButton = Ext.ComponentQuery.query('#trafficRoutingMsgExportAdd')[0].getValue();
                                    var changeButton = Ext.ComponentQuery.query('#trafficRoutingMsgExportChange')[0].getValue();
                                    var removeButton = Ext.ComponentQuery.query('#trafficRoutingMsgExportRemove')[0].getValue();

                                    var jsonBlob = Ext.JSON.encode(GLOBAL_currentProjectOpenProjectID);

                                    if (form.isValid()) {
                                        console.log('valid, submitting');
                                        form.submit({
                                            url: 'ExportTrafficRoutingGrid.ashx',
                                            waitMsg: 'Attempting to export file...',
                                            params: {
                                                project_id: GLOBAL_currentProjectOpenProjectID,
                                                user_name: GLOBAL_username,
                                                export_add: addButton,
                                                export_change: changeButton,
                                                export_remove: removeButton
                                            },
                                            success: function(fp, o) {
                                                eto.up('window').close();
                                                var obj = Ext.decode(o.response.responseText);
                                                Ext.Msg.alert('Success', 'Your file has been exported.' + obj.rows[0]);
                                            },
                                            failure: function(fp, action) {
                                                eto.up('window').close();
                                                var obj = Ext.decode(action.response.responseText);
                                                Ext.Msg.alert('Failure', 'Your file was not exported.' + obj.rows[0]);
                                            }
                                        });
                                    } else {
                                        console.log('form is not valid');
                                    }
                                }
                            }, {
                                text: "Cancel",
                                handler: function() {
                                    this.up('window').close();
                                }
                            }]
                        }).show();
                    }
                }]

            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewTrafficRoutingAddDnis',
                height: 200,
                maxHeight: 600,
                resizable: true,
                minWidth: 1250,
                width: 1250
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewTrafficRoutingChangeDnis',
                height: 200,
                maxHeight: 600,
                resizable: true,
                minWidth: 1250,
                width: 1250
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewTrafficRoutingRemoveDnis',
                height: 200,
                maxHeight: 600,
                resizable: true,
                minWidth: 1250,
                width: 1250
            }]
        }],
        listeners: {
            activate: function() {
                doTrafficAndRoutingLoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                this.updateTrafficRouting();
            }
        },
        updateTrafficRouting: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));

                Ext.Ajax.request({
                    url: 'UpdateTrafficRouting.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username,
                        permission: GLOBAL_permission //for change logging
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated Traffic & Routing");
                    }
                });
            }
        }
    }, {
        title: 'AccessUSAN',
        name: 'AccessUSAN',
        itemId: 'AccessUSAN',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        xtype: 'form',
        items: [{
            xtype: 'panel',
            width: 1424,
            height: 680, //2450
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewAccessUSANAssessment'
            }, {
                xtype: 'viewAccessUSANComments'
            }]
        }],
        listeners: {
            activate: function() {
                doAccessUSANLoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                this.updateAccessUSAN();
            }
        },
        updateAccessUSAN: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "OPM") || (GLOBAL_permission == "PM")) {
                var blobPart1 = this.getForm().getValues(false, false, true);
                var jsonBlob = Ext.JSON.encode(blobPart1);

                Ext.Ajax.request({
                    url: 'UpdateAccessUSANPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username
                    },
                    jsonData: jsonBlob,

                    success: function(response) {
                        console.log("updated AccessUSAN");
                        var obj = Ext.decode(response.responseText);
                        if (obj.rows[0].indexOf('Error') != -1) {
                            alert(obj.rows[0]);
                        }
                    }
                });
            }
        }
    }, {
        title: 'SWD',
        name: 'SWD',
        itemId: 'SWD',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        xtype: 'form',
        items: [{
            xtype: 'panel',
            width: 1424,
            height: 2145, //2450
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewSWDDevAssessment',
                width: 1410
            }, {
                xtype: 'viewSWDHoursScheduled',
                width: 1410
            }, {
                xtype: 'viewSWDHoursForQuote',
                width: 1410
            }, {
                xtype: 'viewSWDComments',
                width: 1410
            }, {
                xtype: 'viewSWDProjectScheduleSummary',
                width: 1410
            }]
        }],
        listeners: {
            deactivate: function() {
                this.updateSWD();
            },
            activate: function() {
                doSWDLoading(GLOBAL_currentProjectOpenProjectID);
            }
        },
        updateSWD: function(systemsDates) {
            if (GLOBAL_readonly) {
                return;
            }
            if (((GLOBAL_permission == "TC") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "DEV")) || ((GLOBAL_permission == "OPM" && !Ext.isEmpty(systemsDates)))) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, true));
                Ext.Ajax.request({
                    url: 'UpdateSWDPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        systems_updates: systemsDates
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated SWD");
                    }
                });
            }
        }

    }, {
        title: 'TLS',
        name: 'TLS',
        itemId: 'TLS',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        xtype: 'form',
        items: [{
            xtype: 'panel',
            width: 1424,
            height: 1900, //2450
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewTLSTLSIPAssessment'
            }, {
                xtype: 'viewTLSTLSSaaSAssessment'
            }, {
                xtype: 'viewTLSTLSIPHoursForQuote',
                width: 1410
            }, {
                xtype: 'viewTLSTLSSaaSHoursForQuote',
                width: 1410
            }, {
                xtype: 'viewTLSComments',
                width: 1410
            }]
        }],
        listeners: {
            activate: function() {
                doTLSLoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                this.updateTLS();
            }
        },
        updateTLS: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, true));

                Ext.Ajax.request({
                    url: 'UpdateTLSPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username,
                        permission: GLOBAL_permission //for change logging
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated TLS");
                    }
                });
            }
        }
    }, {
        title: 'OSG',
        name: 'OSG',
        itemId: 'OSG',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        xtype: 'form',
        items: [{
            xtype: 'panel',
            width: 1424,
            height: 680, //2450
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewQAAssessment',
                width: 1410
            }, {
                xtype: 'viewQAHoursForQuote',
                width: 1410
            }, {
                xtype: 'viewQAComments',
                width: 1410
            }]
        }],
        listeners: {
            activate: function() {
                doQALoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                this.updateQA();
            }
        },
        updateQA: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "QA")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, true));
                Ext.Ajax.request({
                    url: 'UpdateQAPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username
                    },
                    jsonData: jsonBlob,
                    success: function(response) {
                        console.log("updated OSG (QA)");
                        var obj = Ext.decode(response.responseText);
                        if (obj.rows[0].indexOf('Error') != -1) {
                            alert(obj.rows[0]);
                        }
                    }
                });
            }
        }
    }, {
        title: 'Systems',
        name: 'Systems',
        itemId: 'Systems',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        xtype: 'form',
        items: [{
            xtype: 'panel',
            width: 1424,
            height: 2000,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewSystemsSystemsAssessment'
            }, {
                xtype: 'viewSystemsHardwareSoftwareRequirementsGrid'
            }, {
                xtype: 'viewSystemsComments',
                width: 1210
            }]
        }],
        listeners: {
            activate: function() {
                doSystemsLoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                //this.updateSystems();
            }
        },
        updateSystems: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "SYS")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, true));
                Ext.Ajax.request({
                    url: 'UpdateSystemsPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username,
                        permission: GLOBAL_permission //for change logging
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated Systems");
                    }
                });
            }
        }
    }, {
        title: 'Network Ops',
        name: 'NetworkOps',
        itemId: 'NetworkOps',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        xtype: 'form',
        items: [{
            xtype: 'panel',
            width: 1424,
            height: 680, //2450
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewNetworkOpsAssessment',
                width: 1410
            }, {
                xtype: 'viewNetworkOpsHoursForQuote',
                width: 1410
            }, {
                xtype: 'viewNetworkOpsComments',
                width: 1410
            }]
        }],
        listeners: {
            activate: function() {
                doNetworkOpsLoading(GLOBAL_currentProjectOpenProjectID);
            },
            deactivate: function() {
                this.updateNetworkOps();
            }
        },
        updateNetworkOps: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "QA")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, true));
                Ext.Ajax.request({
                    url: 'UpdateNetworkOpsPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username
                    },
                    jsonData: jsonBlob,
                    success: function(response) {
                        console.log("updated Network Ops");
                        var obj = Ext.decode(response.responseText);
                        if (obj.rows[0].indexOf('Error') != -1) {
                            alert(obj.rows[0]);
                        }
                    }
                });
            }
        }
    }, {
        title: 'UAT & Prod Install',
        xtype: 'form',
        name: 'uatProdInstall',
        itemId: 'uatProdInstall',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        autoScroll: true,
        items: [{
            xtype: 'viewUATProdInstallUATInstallDetails'
        }, {
            xtype: 'viewUATProdInstallProductionInstallDetails'
        }, {
            xtype: 'viewUATProdInstallSoakInstallDetails'
        }],
        listeners: {
            activate: function() {
                doUATPRODInstallLoading(GLOBAL_currentProjectOpenProjectID, false);
            },
            deactivate: function() {
                this.updateUatProdInstall();
            }
        },
        updateUatProdInstall: function() {
            var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));
            Ext.Ajax.request({
                url: 'UpdateUatProdInstall.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    project_id: GLOBAL_currentProjectOpenProjectID
                },
                jsonData: jsonBlob,
                success: function() {
                    console.log('updated UatProdInstall');
                    doStagingFolderMenuLinksLoading(GLOBAL_currentProjectOpenProjectID);
                }
            });
        }
    }, {
        title: 'Buffet Prod Install',
        name: 'buffetProdInstall',
        itemId: 'buffetProdInstall',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        xtype: 'form',
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1156,
            height: 1240,
            bodyPadding: 5,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'panel',
                title: 'Buffet Prod Install Details',
                width: 1100,
                //collapsed: false,
                //collapsedFirst: false,
                bodyPadding: 5,
                bodyStyle: 'background-color:#dfe8f5;',
                //collapsible: true,
                items: [{
                    xtype: 'viewBuffetProdInstallDate'
                }, {
                    xtype: 'viewBuffetProdInstallConferenceStart'
                }, {
                    xtype: 'viewBuffetProdInstallConferenceBridge'
                }, {
                    xtype: 'viewBuffetProdInstallNodes'
                }, {
                    xtype: 'viewBuffetProdInstallPostMaintenanceMasterProject',
                    width: 1060
                }]
            }, {
                xtype: 'label',
                height: 32
            }, {
                xtype: 'panel',
                width: 1100,
                height: 32,
                itemId: 'buffetProdInstallMasterProjectContainerHeader',
                frame: false,
                bodyStyle: 'background-color:#dfe8f5;',
                layout: {
                    type: 'hbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'label',
                    width: 192,
                    text: ''
                }, {
                    xtype: 'label',
                    width: 192,
                    html: '<b>Project ID</b>'
                }, {
                    xtype: 'label',
                    width: 192,
                    html: '<b>USAN CCR#</b>'
                }, {
                    xtype: 'label',
                    width: 50,
                    text: ''
                }, {
                    xtype: 'label',
                    width: 192,
                    html: '<b>CCR#</b>'
                }, {
                    xtype: 'label',
                    width: 192,
                    html: '<b>Maintenance Start</b>'
                }]
            }, {
                xtype: 'panel',
                width: 1100,
                height: 55,
                itemId: 'buffetProdInstallMasterProjectContainer',
                frame: false,
                bodyPadding: 5,
                bodyStyle: 'background-color:#dfe8f5;',
                items: [{
                    bodyPadding: 5,
                    width: 1060,
                    bodyborder: false,
                    layout: 'hbox',
                    items: [{
                        xtype: 'label',
                        width: 145,
                        html: '<b>Master Project</b>'
                    }, {
                        xtype: 'viewBuffetProdInstallMasterProject',
                        readOnly: true
                    }, {
                        xtype: 'label',
                        width: 35
                    }, {
                        xtype: 'viewBuffetProdInstallUSANCCR',
                        readOnly: true
                    }, {
                        xtype: 'label',
                        width: 75
                    }, {
                        xtype: 'viewBuffetProdInstallCCRMasterProject',
                        readOnly: true
                    }, {
                        xtype: 'label',
                        width: 80
                    }, {
                        xtype: 'viewBuffetProdInstallMaintenanceStartMasterProject',
                        readOnly: true
                    }]

                }]


            }, {
                xtype: 'viewBuffetProdInstallAssocProjectContainer',
                width: 1100,
                height: 115
            }, {
                xtype: 'label',
                height: 32
            }, {
                xtype: 'viewBuffetProdInstallRequirements',
                height: 300,
                width: 1100
            }, {
                xtype: 'button',
                text: 'Load Requirements',
                handler: function() {
                    if (GLOBAL_readonly) {
                        return;
                    }
                    if ((GLOBAL_permission == "DEV") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "TC")) {
                        var linkedProjView = Ext.ComponentQuery.query('viewSummaryLinkedProjects')[0];
                        var linkedProjStr = linkedProjView.getValue() + "";
                        var projsArray = [];
                        var currentLinkedProjStr;
                        var commaCounter = (linkedProjStr.split(",").length - 1);
                        for (var i = 0; i < commaCounter + 1; i++) {
                            if (linkedProjStr != null && linkedProjStr != "") {
                                if (linkedProjStr.indexOf(",") != -1) {
                                    currentLinkedProjStr = linkedProjStr.slice(0, linkedProjStr.indexOf(","));
                                    currentLinkedProjStr = Ext.String.trim(currentLinkedProjStr);
                                    //updated the entire comma delimited string to now start after the comma
                                    linkedProjStr = linkedProjStr.slice(linkedProjStr.indexOf(",") + 1);
                                    linkedProjStr = Ext.String.trim(linkedProjStr);
                                    projsArray.push(currentLinkedProjStr);
                                } else {
                                    currentLinkedProjStr = linkedProjStr;
                                    projsArray.push(currentLinkedProjStr);
                                }
                            }
                        }
                        //add current project number also - currently not doing this...
                        //projsArray.push(Ext.ComponentQuery.query('viewSummaryUSANProjectNumber')[0].getValue());
                        var jsonBlob = Ext.JSON.encode(projsArray);
                        Ext.Ajax.request({
                            url: 'UpdateBuffetProjectRequirements.ashx',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                project_id: GLOBAL_currentProjectOpenProjectID
                            },
                            jsonData: jsonBlob,
                            success: function() {
                                console.log("success");
                                var store = GLOBAL_currentController.getStore('BuffetProdInstallRequirements');
                                store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                                store.load();
                            }
                        });
                    }
                }
            }, {
                xtype: 'label',
                height: 32
            }, {
                xtype: 'panel',
                title: 'Buffet Prod Install Comments',
                width: 1100,
                collapsed: false,
                collapsedFirst: false,
                bodyPadding: 5,
                bodyStyle: 'background-color:#dfe8f5;',
                frame: true,
                collapsible: true,
                items: [{
                    xtype: 'viewBuffetProdInstallComments',
                    width: 1060,
                    height: 144
                }]
            }, {
                xtype: 'label',
                height: 32
            }, {
                xtype: 'label',
                html: '<b>Staging Folders</b>',
                height: 16
            }, {
                xtype: 'viewBuffetProdInstallStagingFoldersContainer',
                width: 1100,
                height: 130
            }]
        }],
        listeners: {
            activate: function() {
                doBuffetProdInstallLoading(GLOBAL_currentProjectOpenProjectID);
                loadBuffetLinkedProjects();
            },
            deactivate: function() {
                this.updateBuffetProdInstall();
            }
        },
        updateBuffetProdInstall: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));
                Ext.Ajax.request({
                    url: 'UpdateBuffetProdInstallPage.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log("updated BuffetProdInstall");
                        doStagingFolderMenuLinksLoading(GLOBAL_currentProjectOpenProjectID);
                    }
                });
            }
        }
    }, {
        title: 'Prompts',
        xtype: 'form',
        itemId: 'promptsForm',
        name: 'promptsForm',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        bodyPadding: 7,
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 2056,
            height: 2056,
            frame: true,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewPromptsSummary',
                width: 742,
                height: 256
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'label',
                height: 10
            }, {
                xtype: 'panel',
                itemId: 'blahblah',
                title: 'GreatVoice',
                collapsible: true,
                collapseFirst: true,
                collapsed: true,
                width: 1092, //2056,
                height: 1047,
                frame: true,
                layout: {
                    type: 'hbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 256,
                    height: 1010,
                    frame: true,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        height: 10 //45
                    }, {
                        xtype: 'viewPromptsAddPanel'
                    }, {
                        xtype: 'label',
                        height: 12
                    }, {
                        xtype: 'label',
                        text: 'Language',
                        height: 28
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Recorded',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Billed',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Prompts Provided by Customer',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Translation Required - Minimum Fee',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Translation Required - # of Words',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Order Type',
                        height: 28
                    }, {
                        xtype: 'label',
                        text: 'Recording Sessions',
                        height: 28
                    }, {
                        xtype: 'label',
                        text: 'Voice Talent', //'Recording Studio',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Converted',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Conversion Sessions',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Digitized',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Prompt Transfer Fee Required',
                        height: 23
                    }, {
                        xtype: 'label',
                        text: 'CD Required',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'CD Mailing Address',
                        height: 90 //25
                    }, {
                        xtype: 'label',
                        text: 'Prompt Format',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Converted Prompt Format',
                        height: 26
                    }, {
                        xtype: 'label',
                        text: 'Translation Needs Approval',
                        height: 50
                    }, {
                        xtype: 'label',
                        html: '<B>FEE CALCULATION</B>',
                        height: 46 //50
                    }, {
                        xtype: 'label',
                        text: 'Fee Formula',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Setup Fee',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Prompt Fee',
                        height: 31 //27
                    }, {
                        xtype: 'label',
                        text: 'Conversion Setup Fee',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Conversion Prompt Fee',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Translation Fee - Minimum',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Translation Fee - Per Word',
                        height: 27
                    }, {
                        xtype: 'label',
                        text: 'Transfer Fee',
                        height: 28
                    }, {
                        xtype: 'label',
                        text: 'Recording Fee (Per Language)',
                        height: 48
                    }, {
                        xtype: 'viewPromptsGreatVoiceCDFee',
                        width: 246
                    }, {
                        xtype: 'label',
                        text: '',
                        height: 10
                    }, {
                        xtype: 'viewPromptsGreatVoiceTotalFee',
                        width: 246
                    }]
                }]
            }, {
                xtype: 'label',
                height: 16
            }, {
                xtype: 'panel',
                itemId: 'gmVoicesPanel',
                title: 'GM Voices',
                collapsible: true,
                collapseFirst: true,
                collapsed: true,
                width: 1092, //2056,
                height: 1047,
                frame: true,
                layout: {
                    type: 'hbox',
                    align: 'left'
                },
                items: [{
                    xtype: 'panel',
                    width: 256,
                    height: 1010,
                    frame: true,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    items: [{
                        xtype: 'label',
                        height: 10 //45
                    }, {
                        xtype: 'viewPromptsAddGMVoicesPanel',
                        height: 25
                    }, {
                        xtype: 'label',
                        height: 12
                    }, {
                        xtype: 'label',
                        text: 'Language',
                        height: 28
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Recorded',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Billed',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Prompts Provided by Customer',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Translation Required - Minimum Fee',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Translation Required - # of Words',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Order Type',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Recording Sessions',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Voice Talent', //'Recording Studio',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Converted',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Conversion Sessions',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Prompts to be Digitized',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Prompt Transfer Fee Required',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'CD Required',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'CD Mailing Address',
                        height: 90 //25
                    }, {
                        xtype: 'label',
                        text: 'Prompt Format',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Converted Prompt Format',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Translation Needs Approval',
                        height: 50
                    }, {
                        xtype: 'label',
                        html: '<B>Billing Summary</B>',
                        height: 50
                    }, {
                        xtype: 'label',
                        text: 'Setup Fee',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Recording 1-2',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Recording 3+',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Translation',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Delivery',
                        height: 25
                    }, {
                        xtype: 'label',
                        text: 'Totals',
                        height: 50
                    }, {
                        xtype: 'viewPromptsGMVoicesTotalFee',
                        width: 246
                    }]
                }]
            }, {
                xtype: 'label',
                height: 20
            }, {
                xtype: 'viewPromptsPONum',
                labelWidth: 128
            }, {
                xtype: 'viewPromptsPromptWorksheet',
                labelWidth: 128,
                width: 640
            }]
        }],
        listeners: {
            activate: function() {
                doPromptsLoading(GLOBAL_currentProjectOpenProjectID);
            }
        },
        updatePromptsMisc: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM")) {
                var jsonBlob = Ext.JSON.encode(this.getForm().getValues(false, false, false));
                Ext.Ajax.request({
                    url: 'UpdatePromptsMisc.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID
                    },
                    jsonData: jsonBlob,
                    success: function() {
                        console.log('Prompts worksheet and summary saved');
                    }
                });
            }
        }
    }, {
        title: 'Assumptions',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        bodyPadding: 7,
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1024,
            height: 1152,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewAssumptionsUserList',
                height: 300,
                width: 1000
            }, {
                xtype: 'label',
                height: 32
            }, {
                xtype: 'viewAssumptionsProjectList',
                height: 500,
                width: 1000
            }]
        }],
        listeners: {
            activate: function() {
                doAssumptionsLoading(GLOBAL_currentProjectOpenProjectID);
            }
        }
    }, {
        title: 'Deliverables',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        bodyPadding: 7,
        autoScroll: true,
        items: [{
            xtype: 'panel',
            width: 1024,
            height: 1152,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewDeliverablesUserList',
                height: 300,
                width: 1000
            }, {
                xtype: 'label',
                height: 32
            }, {
                xtype: 'viewDeliverablesProjectList',
                height: 500,
                width: 1000
            }]
        }],
        listeners: {
            activate: function() {
                doDeliverablesLoading(GLOBAL_currentProjectOpenProjectID);
            }
        }
    }, {
        title: 'Change Log',
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        bodyPadding: 7,
        hidden: false,
        autoScroll: true,
        itemId: 'changelogtab',
        items: [{
            xtype: 'panel',
            width: 1224,
            height: 400,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 7,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [{
                xtype: 'viewChangeLogMainLog',
                height: 355,
                width: 1210
            }]
        }],
        listeners: {
            added: function() {
                if (GLOBAL_permission != "PM") {
                    this.hide();
                    console.log('change log not visible');
                } else {
                    console.log('change log visible');
                }
            },
            activate: function() {
                Ext.Function.defer(function() {
                    doChangeLogLoading(GLOBAL_currentProjectOpenProjectID);
                }, 500);

            }

        }
    }],
    listeners: {
        beforetabchange: {
            fn: tabchange
        }
    }


});

function tabchange(tabPanel, newCard, oldCard) {


    Ext.getBody().mask("Loading " + newCard.title + " tab. Please wait...");

    Ext.callback(function() {
        tabPanel.un("beforetabchange", tabchange);
        tabPanel.setActiveTab(newCard);
        tabPanel.on("beforetabchange", tabchange);
    }, this, [tabPanel, newCard], 50);

    //disable masking if tab has already been loaded
    if (newCard.title == 'Summary') {
        console.log('tab change to summary tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Requirements' && GLOBAL_hasRequirementsTabBeenLoaded == true) {
        console.log('tab change to requirements tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'MIS Updates' && GLOBAL_hasMISUpdatesTabBeenLoaded == true) {
        console.log('tab change to mis updates tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'MIS New' && GLOBAL_hasMISNewTabBeenLoaded == true) {
        console.log('tab change to mis new tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Traffic & Routing' && GLOBAL_hasTrafficRoutingTabBeenLoaded == true) {
        console.log('tab change to traffic routing tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'AccessUSAN' && GLOBAL_hasAccessUSANTabBeenLoaded == true) {
        console.log('tab change to access usan tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'SWD' && GLOBAL_hasSWDTabBeenLoaded == true) {
        console.log('tab change to swd tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'TLS' && GLOBAL_hasTLSTabBeenLoaded == true) {
        console.log('tab change to tls tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'OSG' && GLOBAL_hasQATabBeenLoaded == true) {
        console.log('tab change to qa (OGS) tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Network Ops' && GLOBAL_hasNetworkOpsTabBeenLoaded == true) {
        console.log('tab change to network ops tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Systems' && GLOBAL_hasSystemsTabBeenLoaded == true) {
        console.log('tab change to systems tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'UAT & Prod Install' && GLOBAL_hasUATProdInstallTabBeenLoaded == true) {
        console.log('tab change to uat prod install tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Buffet Prod Install' && GLOBAL_hasBuffetProdInstallTabBeenLoaded == true) {
        console.log('tab change to buffet prod install tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'promptsForm') {
        console.log('tab change to prompts tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Assumptions' && GLOBAL_hasAssumptionsTabBeenLoaded == true) {
        console.log('tab change to assumptions tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Deliverables' && GLOBAL_hasDeliverablesTabBeenLoaded == true) {
        console.log('tab change to deliverables tab - unmasking');
        Ext.getBody().unmask();
    } else if (newCard.title == 'Change Log') {
        console.log('tab change to change log tab - unmasking');
        Ext.getBody().unmask();
    }

    return false;
}


function loadBuffetLinkedProjects() {
    if (Ext.ComponentQuery.query('viewSummaryLinkType')[0].getValue() == 'Master') {
        Ext.ComponentQuery.query('#buffetProdInstallMasterProjectContainer')[0].enable();
        Ext.ComponentQuery.query('#buffetProdInstallMasterProjectContainerHeader')[0].enable();
        Ext.ComponentQuery.query('viewBuffetProdInstallAssocProjectContainer')[0].enable();
        //populate master project container
        var masterProjNumView = Ext.ComponentQuery.query('viewBuffetProdInstallMasterProject')[0];
        var masterProjCCRView = Ext.ComponentQuery.query('viewBuffetProdInstallCCRMasterProject')[0];
        var masterProjMaintStartView = Ext.ComponentQuery.query('viewBuffetProdInstallMaintenanceStartMasterProject')[0];
        var masterProjUSANCCRView = Ext.ComponentQuery.query('viewBuffetProdInstallUSANCCR')[0];
        var currentProjNumView = Ext.ComponentQuery.query('viewSummaryUSANProjectNumber')[0];


        console.log('&&3');
        //now we need to send the handler an array of the projects we want to populate in the associated containers
        var linkedProjStr = Ext.ComponentQuery.query('viewSummaryLinkedProjects')[0].getValue() + "";
        var jsonBlob = Ext.JSON.encode(linkedProjStr);
        Ext.Ajax.request({
            url: 'UpdateBuffetLinkedProjects.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                project_id: GLOBAL_currentProjectOpenProjectID
            },
            jsonData: jsonBlob,
            success: function(response) {
                console.log('&&4');
                console.log("success");
                //a string is returned of each associated project in the folloiwng format, pipe delimited:
                //projectid;usanccr#;ccr#;maintstart|etc;etc;etc;etc
                var obj = Ext.decode(response.responseText);
                var response = obj.rows[0];
                var projsArray = response.split("|");
                var parentContainer = Ext.ComponentQuery.query('viewBuffetProdInstallAssocProjectContainer')[0];
                parentContainer.removeAll();
                for (var i = 0; i < projsArray.length; i++) {
                    var currentAssocProjId = projsArray[i].substring(0, projsArray[i].indexOf(';'));
                    projsArray[i] = projsArray[i].substring(projsArray[i].indexOf(';') + 1);
                    var currentAssocUSANCCR = projsArray[i].substring(0, projsArray[i].indexOf(';'));
                    projsArray[i] = projsArray[i].substring(projsArray[i].indexOf(';') + 1);
                    var currentAssocCCR = projsArray[i].substring(0, projsArray[i].indexOf(';'));
                    projsArray[i] = projsArray[i].substring(projsArray[i].indexOf(';') + 1);
                    var currentAssocMaintStart = projsArray[i];
                    //now we have all projects/fields separated. now we need to add to parent container and populate
                    var panelToBeAdded = Ext.create('CookBook.view.buffetprodinstall.ViewBuffetProdInstallAssociatedProject');
                    panelToBeAdded.down('#buffetProdInstallAssocProjectID').setValue(currentAssocProjId);
                    panelToBeAdded.down('#buffetProdInstallAssocCCR').setValue(currentAssocCCR);
                    panelToBeAdded.down('#buffetProdInstallAssocUSANCCR').setValue(currentAssocUSANCCR);
                    panelToBeAdded.down('#buffetProdInstallAssocMaintStart').setValue(currentAssocMaintStart);
                    parentContainer.add(panelToBeAdded);
                }

                controller = GLOBAL_currentController.getController('Cookbook');
                store = controller.getStore('UatProdInstalls');
                if (store.count() < 1) {
                    console.log('&&1');
                    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                    store.load({
                        callback: function(records, operation, success) {
                            if (records) {
                                if ((records.length > 0) && success) {
                                    currentProjCCRView = records[0].get('uat_ccr');
                                    currentProjMainStartView = records[0].get('uat_maintenance_start');
                                    currentProjUSANCCRView = records[0].get('uat_usan_ccr');

                                    console.log(currentProjUSANCCRView + "|" + currentProjMainStartView + "|" + currentProjCCRView);

                                    masterProjNumView.setValue(currentProjNumView.getValue());
                                    masterProjUSANCCRView.setValue(currentProjUSANCCRView);
                                    masterProjCCRView.setValue(currentProjCCRView);

                                    try {
                                        masterProjMaintStartView.setValue(Ext.Date.format(currentProjMainStartView, 'g:i A'));
                                    } catch (err) {
                                        console.log(err);
                                        masterProjMaintStartView.setValue(currentProjMainStartView);
                                    }
                                }
                            }
                        }
                    });
                } else {
                    console.log('&&2');
                    currentProjCCRView = Ext.ComponentQuery.query('#uatprodinstallUatCCR')[0];
                    currentProjMainStartView = Ext.ComponentQuery.query('#uatprodinstallUatMaintenanceStart')[0];
                    currentProjUSANCCRView = Ext.ComponentQuery.query('#uatprodinstallUatUsanCCR')[0];

                    masterProjNumView.setValue(currentProjNumView.getValue());
                    masterProjUSANCCRView.setValue(currentProjUSANCCRView.getValue());
                    masterProjCCRView.setValue(currentProjCCRView.getValue());

                    try {
                        masterProjMaintStartView.setValue(Ext.Date.format(currentProjMainStartView.getValue(), 'g:i A'));
                    } catch (err) {
                        console.log(err);
                        masterProjMaintStartView.setValue(currentProjMainStartView.getValue());
                    }
                }
            }
        });
    } else {
        Ext.ComponentQuery.query('#buffetProdInstallMasterProjectContainer')[0].disable();
        Ext.ComponentQuery.query('#buffetProdInstallMasterProjectContainerHeader')[0].disable();
        Ext.ComponentQuery.query('viewBuffetProdInstallAssocProjectContainer')[0].disable();
    }
}