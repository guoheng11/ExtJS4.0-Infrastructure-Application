Ext.define('CookBook.controller.Cookbook', {
    extend: 'Ext.app.Controller',

	stores: [
		//summary stores
		'ProjectInformations',
		'ProjectContacts',
		'ProjectStatuses',
        'ProjectInformationLinkedProjects',
		'LinkedProjects',
		'ProjectHistories',
		//requirements stores
		'ApplicationRequirements',
		'BackofficeDBRequirements',
		'BackofficeProcessRequirements',
		'BackofficeWebserviceRequirements',
		'ConfigFileRequirements',
		'DocumentationRequirements',
		'EngineRequirements',
		'FaxFormRequirements',
		'FileXferRequirements',
		'GrammarRequirements',
		'ManagerRequirements',
		'OtherRequirements',
		'ScraperRequirements',
		'ServiceIDRequirements',
		'SpeechRecognitionRequirements',
		'TableRequirements',
		'TNTFunctionalityRequirements',
		'TTSFunctionalityRequirements',
		'UUIRequirements',
		'VXMLRequirements',
        'FileXferRequirementUploads',
        'FileXferRequirementDownloads',
        'RequirementsTabRoutings',
		//mis updates stores
		'MISUpdates',
		'MISUpdateDeliveryChanges',
		'MISUpdateDnises',
		'MISUpdateAddDnises',
		'MISUpdateChangeDnises',
		'MISUpdateRemoveDnises',
		'MISUpdateReportNames',
		'MISUpdateDistributionChanges',
		//mis new stores
        'MISNew',
        'MISNewReportNames',
        'MISNewDeliveries',
        'MISNewDistributions',
        'MISNewDnises',
		//traffic routing stores
		'TrafficRequirements',
		'TrafficRoutingRemoveDnises',
		'TrafficRoutingChangeDnises',
		'TrafficRoutingAddDnises',
		'RoutingRequirements',
		//access usan stores
		'AccessUSANReqs',
		'AccessUsanContacts',
		'AccessUsanTables',
		//swd stores
        'SWDSchedules',
        'SWDAssessments',
        'SWDContacts',
		//tls stores
		'TLSIPAssessments',
		'TLSSaaSAssessments',
		'TLSContacts',
		//osg stores
		'OSGAssessments',
		'OSGContacts',
		//systems stores
		'SystemsAssessments',
		'SystemsContacts',
		'HardwareRequirements',
		//network ops stores
		'NetworkOpsAssessments',
		'NetworkOpsContacts',
		//uat prod install stores
		'UatProdInstalls',
		'UATInstallRequirements',
		'ProdInstallRequirements',
		'SoakInstallRequirements',
        'StagingFolders',
		//buffet prod install stores
		'ProdInstallationBuffets',
        'ProjectRequirements',
        'BuffetProdInstallRequirements',
		//prompts stores
		'PromptMNumsRequirements',
		'PromptDetails',
		'GMVoicePromptDetails',
		'PromptWorksheets',
		//assumptions stores
		'Assumptions',
		'ProjectAssumptions',
		//deliverables stores
		'Deliverables',
		'ProjectDeliverables',
		//changelog stores
		'ChangeLogs',
		//preview panel/select project grid stores
		'ContactsEmailWindow',
		'ProjectInformationVitals',
		'ApplicationRequirementsNav',
		'TableRequirementsNav',
		'ScraperRequirementsNav',
		'EngineRequirementsNav',
		'ManagerRequirementsNav',
		'GrammarRequirementsNav',
		'RoutingRequirementsNav',
		//editor stores
		'ExtdbTables',
		'BusinessUnits',
		'Applications',
		'Companies',
		'Contacts',
		'ContactTypes',
		'Statuses',
		'Scrapers',
		'ScraperTypes',
		'Engines',
		'Managers',
		'Grammars',
		'BackofficeDBs',
		'BackofficeProcesses',
		'BackofficeWebservices',
		'ConfigurationFiles',
		'FaxForms',
		'FileXferUploads',
		'FileXferDownloads',
		'ReportNames',
		'DeliveryMethods',
		'DeliveryFormats',
		'DeliveryFrequencies',
		'Platforms',
		'Languages',
		'Categories',
		'Nodes',
		'ServiceIDs',
		//misc stores
        'EmailTemplates'
	],

	models: [
		'SystemsAssessment',
		'HardwareRequirement',
		'ProjectInformationVital',
		'BusinessUnit',
		'Application',
		'Company',
		'Contact',
		'ChangeLog',
		'Status',
		'ProjectHistory',
        
		'ProjectInformation',
		'LinkedProject',
		'ProjectStatus',
        'StagingFolder',
		'MISUpdate',
		'MISUpdateDeliveryChange',
		'MISUpdateDnis',
		'MISUpdateAddDnis',
		'MISUpdateChangeDnis',
		'MISUpdateRemoveDnis',
		'MISUpdateReportName',
		'MISUpdateDistributionChange',
        'MISNewDnis',
        'MISNewDelivery',
        'MISNewDistribution',
		'SWDAssessment',
        'MISNew',
        'MISNewReportName',

        'TLSAssessment',
        'OSGAssessment',
        'NetworkOpsAssessment',

        'EmailTemplate',
		'TrafficRequirement',
		'RoutingRequirement',
		'TrafficRoutingRemoveDnis',
		'TrafficRoutingChangeDnis',
		'TrafficRoutingAddDnis',

		'AccessUSANReq',
		'UatProdInstall',
        'ProjectRequirement',
		'PromptMNumsRequirement',
		'PromptDetail',
		'GMVoicePromptDetail',
		'PromptWorksheet',

		'ProdInstallationBuffet',
        'SWDSchedule',
		'ApplicationRequirement',
		'BackofficeDBRequirement',
		'BackofficeProcessRequirement',
		'BackofficeWebserviceRequirement',
		'ConfigFileRequirement',
		'DocumentationRequirement',
		'EngineRequirement',
		'FaxFormRequirement',
		'FileXferRequirement',
		'GrammarRequirement',
		'ManagerRequirement',
		'RequirementsTabRouting',
		'OtherRequirement',
		'ScraperRequirement',
		'ServiceIDRequirement',
		'SpeechRecognitionRequirement',
		'TableRequirement',
		'TNTFunctionalityRequirement',
		'TTSFunctionalityRequirement',
		'UUIRequirement',
		'BuffetProdInstallRequirement',
		'VXMLRequirement',
		'Category',
		'Node',
		'Assumption',
		'Deliverable',
		'ProjectAssumption',
		'ProjectDeliverable',
		'ServiceID'
	],

	views: [
	    //mainview
	    'mainview.mainview',
	    'mainview.globalFunctions',
	    'mainview.splash',
	    'mainview.selectProjectGrid',
	    'mainview.navToolbar',
		'mainview.textDate',
		'mainview.textTime',
		'mainview.triggerDate',
		'mainview.CFInstallCustom',
		
		//summary tab components
		'summary.ViewSummaryUSANProjectNumber',
		'summary.ViewSummaryProjectName',
		'summary.ViewSummaryCustomerProjectNumber',
		'summary.ViewSummaryCompany',
		'summary.ViewSummaryBusinessUnit',
		'summary.ViewSummaryAdditionalBusinessUnits',
		'summary.ViewSummaryQuoteLOERecvDate',
		'summary.ViewSummaryQuoteLOEDueDate',
		'summary.ViewSummaryRequestedUatDate',
		'summary.ViewSummaryRequestedProdDate',
		'summary.ViewSummaryExpedite',
		'summary.ViewSummaryPreApproved',
		'summary.ViewSummaryConferenceCall',
		'summary.ViewSummaryLinked',
		'summary.ViewSummaryLinkType',
		'summary.ViewSummaryLinkedProjects',
		'summary.ViewSummaryUsanTC',
		'summary.ViewSummaryUsanDevPM',
		'summary.ViewSummaryUsanBA',
		'summary.ViewSummaryUsanDeveloper',
		'summary.ViewSummaryUsanMIS',
		'summary.ViewSummaryUsanQA',
		'summary.ViewSummaryUsanOpsPM',
		'summary.ViewSummaryUsanTLSIP',
		'summary.ViewSummaryUsanTLSSaaS',
		'summary.ViewSummaryUsanSystemsEngineer',
		'summary.ViewSummaryCustomerRFQ',
		'summary.ViewSummaryCustomerPM',
		'summary.ViewSummaryCustomerTesting',
		'summary.ViewSummaryCustomerHost',
		'summary.ViewSummaryCustomerTC',
		'summary.ViewSummaryProjectDescription',
		'summary.ViewSummaryDocumentationVisio',
		'summary.ViewSummaryDocumentationVUI',
		'summary.ViewSummaryDocumentationOther',
		'summary.ViewSummaryApplication',
		'summary.ViewSummaryParm',
		'summary.ViewSummaryReportingButton',
		'summary.ViewSummaryReportingOther',
		'summary.ViewSummaryReportingVision',
		'summary.ViewSummaryTablesXlsCsv',
		'summary.ViewSummaryTablesMetafile',
		'summary.ViewSummaryTablesDefFile',
		'summary.ViewSummaryTablesUsanUpdateLoad',
		'summary.ViewSummaryTablesCustomerUpdateUsanLoad',
		'summary.ViewSummaryTablesCustomerUpdateLoad',
		'summary.ViewSummaryPromptsStandard',
		'summary.ViewSummaryPromptsNLU',
		'summary.ViewSummaryRoutingNew800Nums',
		'summary.ViewSummaryRoutingRemove800Nums',
		'summary.ViewSummaryRoutingRedirect800Nums',
		'summary.ViewSummaryRoutingDAPSS7',
		'summary.ViewSummaryTraffic',
		'summary.ViewSummaryScraper',
		'summary.ViewSummaryNewTranType',
		'summary.ViewSummaryEngine',
		'summary.ViewSummaryGrammarsStandard',
		'summary.ViewSummaryGrammarsVXML',
		'summary.ViewSummaryBackOfficeDB',
		'summary.ViewSummaryBackOfficeProcess',
		'summary.ViewSummaryBackOfficeWebServices',
		'summary.ViewSummaryNetworkFileTransfer',
		'summary.ViewSummaryNetworkInfrastructure',
		'summary.ViewSummaryHostConnectivity',
		'summary.ViewSummaryHostWSDL',
		'summary.ViewSummaryTNTFunctionality',
		'summary.ViewSummaryTTSFunctionality',
		'summary.ViewSummarySpeechRecognition',
		'summary.ViewSummaryUUI',
		'summary.ViewSummaryReadi800',
		'summary.ViewSummaryAccessUSANAccessUser',
		'summary.ViewSummaryNuanceDevelopment',
		'summary.ViewSummaryNuanceNDM',
		'summary.ViewSummaryServiceID',
		'summary.ViewSummaryBisoApproval',
		'summary.ViewSummaryOther',
		'summary.ViewSummaryChooseProjectStatus',
		'summary.ViewSummaryProjectStatus',
		'summary.ViewSummaryProjectStatusDate',
		'summary.ViewSummaryProjectStatusButton',
		'summary.ViewSummaryProjectHistory',
		'summary.ViewSummaryRequestSWDAssessment',
		'summary.ViewSummaryRequestOPSAssessment',
		'summary.ViewSummaryRequestMNums',
		'summary.ViewSummaryRequestPONums',
		'summary.ViewSummaryGenerateIFQ',
		'summary.ViewSummaryProjectFolder',
		'summary.ViewSummaryButtonUAT',
		'summary.ViewSummaryButtonProd',
		'summary.ViewSummaryAccessUSAN',
		'summary.ViewSummaryVisioDrop',
		'summary.ViewSummaryProjectDependencies',
		'summary.ViewSummaryScheduledUatDate',
		'summary.ViewSummaryScheduledProdDate',
		'summary.ViewSummaryQuoteLOEIssueDate',
		'summary.ViewSummaryAuthDueDate',
		'summary.ViewSummaryAuthRecvDate',
		'summary.ViewSummaryUATAcceptedDate',
		'summary.ViewSummaryProdCompleteDate',
		'summary.ViewSummaryUsanOSG',
		'summary.ViewSummaryUsanNetworkOps',
		'summary.ViewSummaryProjectNextSteps',
		'summary.ViewSummaryDocumentationDecommission',
		'summary.ViewSummaryApplicationDecommission',
		'summary.ViewSummaryParmDecommission',
		'summary.ViewSummaryReportingDecommission',
		'summary.ViewSummaryTablesDecommission',
		'summary.ViewSummaryUpdatedSpecsRecv',
		'summary.ViewSummaryRevisedUATDate',
		'summary.ViewSummaryUATAcceptanceDue',
		'summary.ViewSummarySoak',
		

		//mis updates components
		'misupdates.ViewMISUpdatesReportNames',
		'misupdates.ViewMISUpdatesAddEmailButton',
		'misupdates.ViewMISUpdatesDeleteEmailButton',
		'misupdates.ViewMISUpdatesDescriptionOfChange',
		'misupdates.ViewMISUpdatesDistributionSelectEmail',
		'misupdates.ViewMISUpdatesDistributionAddEmail',
		'misupdates.ViewMISUpdatesDistributionDeleteEmail',
		'misupdates.ViewMISUpdatesDeliveryChangeNewMethod',
		'misupdates.ViewMISUpdatesDeliveryChangeNewFormat',
		'misupdates.ViewMISUpdatesDeliveryChangeNewFrequency',
		'misupdates.ViewMISUpdatesAddDnis',
		'misupdates.ViewMISUpdatesChangeDnis',
		'misupdates.ViewMISUpdatesRemoveDnis',

		//traffic & routing components
		'trafficrouting.ViewTrafficRoutingIncludedInForecast',
		'trafficrouting.ViewTrafficRoutingIncrementalMinutesPerMonth',
		'trafficrouting.ViewTrafficRoutingIncrementalCallsPerMonth',
		'trafficrouting.ViewTrafficRoutingBusyHourCalls',
		'trafficrouting.ViewTrafficRoutingBusyHourCallPercentage',
		'trafficrouting.ViewTrafficRoutingAverageCallDuration',
		'trafficrouting.ViewTrafficRoutingAddDnis',
		'trafficrouting.ViewTrafficRoutingChangeDnis',
		'trafficrouting.ViewTrafficRoutingRemoveDnis',

		//uat/prod install components
		'uatprodinstall.ViewUATProdInstallUATInstallDetails',
		'uatprodinstall.ViewUATProdInstallProductionInstallDetails',
		'uatprodinstall.ViewUATProdInstallSoakInstallDetails',
		

		//prompts components
		'prompts.ViewPromptsFunctions',
		'prompts.ViewPromptsAddPanel',
		'prompts.ViewPromptsAddGMVoicesPanel',
		'prompts.ViewPromptsLangOneLanguage',
		'prompts.ViewPromptsLangOnePromptsToBeRecorded',
		'prompts.ViewPromptsLangOnePromptsToBeBilled',
		'prompts.ViewPromptsLangOnePromptsProvidedByCustomer',
		'prompts.ViewPromptsLangOneMinimumFee',
		'prompts.ViewPromptsLangOneNumWords',
		'prompts.ViewPromptsLangOneOrderType',
		'prompts.ViewPromptsLangOneRecordingSessions',
		'prompts.ViewPromptsLangOneRecordingStudio',
		'prompts.ViewPromptsLangOnePromptsToBeConverted',
		'prompts.ViewPromptsLangOneConversionSessions',
		'prompts.ViewPromptsLangOnePromptsToBeDigitized',
		'prompts.ViewPromptsLangOneTransferFeeRequired',
		'prompts.ViewPromptsLangOneCDRequired',
		'prompts.ViewPromptsLangOneCDMailingAddress',
		'prompts.ViewPromptsLangOnePromptFormat',
		'prompts.ViewPromptsLangOneConvertedPromptFormat',
		'prompts.ViewPromptsLangOneTranslationNeedsApproval',
		'prompts.ViewPromptsLangOneFeeFormula',
		'prompts.ViewPromptsLangOneSetupFee',
		'prompts.ViewPromptsLangOnePromptFee',
		'prompts.ViewPromptsLangOneConversionSetupFee',
		'prompts.ViewPromptsLangOneConversionPromptFee',
		'prompts.ViewPromptsLangOneTranslationFeeMinimum',
		'prompts.ViewPromptsLangOneTranslationFeePerWord',
		'prompts.ViewPromptsLangOneTransferFee',
		'prompts.ViewPromptsLangOneCDFee',
		'prompts.ViewPromptsLangOneTotalRecordingFee',

		'prompts.ViewPromptsLangTwoLanguage',
		'prompts.ViewPromptsLangTwoPromptsToBeRecorded',
		'prompts.ViewPromptsLangTwoPromptsToBeBilled',
		'prompts.ViewPromptsLangTwoPromptsProvidedByCustomer',
		'prompts.ViewPromptsLangTwoMinimumFee',
		'prompts.ViewPromptsLangTwoNumWords',
		'prompts.ViewPromptsLangTwoOrderType',
		'prompts.ViewPromptsLangTwoRecordingSessions',
		'prompts.ViewPromptsLangTwoRecordingStudio',
		'prompts.ViewPromptsLangTwoPromptsToBeConverted',
		'prompts.ViewPromptsLangTwoConversionSessions',
		'prompts.ViewPromptsLangTwoPromptsToBeDigitized',
		'prompts.ViewPromptsLangTwoTransferFeeRequired',
		'prompts.ViewPromptsLangTwoCDRequired',
		'prompts.ViewPromptsLangTwoCDMailingAddress',
		'prompts.ViewPromptsLangTwoPromptFormat',
		'prompts.ViewPromptsLangTwoConvertedPromptFormat',
		'prompts.ViewPromptsLangTwoTranslationNeedsApproval',
		'prompts.ViewPromptsLangTwoFeeFormula',
		'prompts.ViewPromptsLangTwoSetupFee',
		'prompts.ViewPromptsLangTwoPromptFee',
		'prompts.ViewPromptsLangTwoConversionSetupFee',
		'prompts.ViewPromptsLangTwoConversionPromptFee',
		'prompts.ViewPromptsLangTwoTranslationFeeMinimum',
		'prompts.ViewPromptsLangTwoTotalRecordingFee',

		'prompts.ViewPromptsRequestPONum',
		'prompts.ViewPromptsMNumsRequiredGrid',
		'prompts.ViewPromptsRequestMNums',
		'prompts.ViewPromptsCompleteMNums',
		'prompts.ViewPromptsPromptWorksheet',
		'prompts.ViewPromptsPONum',
		'prompts.ViewPromptsGreatVoiceTotalFee',
		'prompts.ViewPromptsGMVoicesTotalFee',
		'prompts.ViewPromptsGreatVoiceCDFee',
		'prompts.ViewPromptsSummary',
		
		//requirements components
		'requirements.ViewReqApplication',
		'requirements.ViewReqBackOfficeDB',
        'requirements.ViewReqBackOfficeProcess',
        'requirements.ViewReqBackOfficeWebSvc',
        'requirements.ViewReqConfigurationFile',
        'requirements.ViewReqDocumentation',
        'requirements.ViewReqEngine',
        'requirements.ViewReqFaxForm',
        'requirements.ViewReqFileXferDownload',
        'requirements.ViewReqFileXferUpload',
        'requirements.ViewReqGrammar',
        'requirements.ViewReqManager',
        'requirements.ViewReqOther',
        'requirements.ViewReqServiceID',
        'requirements.ViewReqSpeechRecognition',
        'requirements.ViewReqScraper',
        'requirements.ViewReqTable',
        'requirements.ViewReqTNTFunctionality',
        'requirements.ViewReqTTSFunctionality',
        'requirements.ViewReqUUI',
        'requirements.ViewReqVXML',
        'requirements.ViewReqRouting',
        
        //misnew components
        'misnew.ViewMISNewReportDescription',
        'misnew.ViewMISNewBusinessUnit',
        'misnew.ViewMISNewApplicationGroup',
        'misnew.ViewMISNewDivisionBUForBilling',
        'misnew.ViewMISNewRequestedReportName',
        'misnew.ViewMISNewMethod',
        'misnew.ViewMISNewFormat',
        'misnew.ViewMISNewFrequency',
        'misnew.ViewMISNewEmailAddress',
        'misnew.ViewMISNewAddDnis',
        'misnew.ViewMISNewChangeDnis',
        'misnew.ViewMISNewDistributionSelectEmail',
        'misnew.ViewMISNewAddEmailButton',
        'misnew.ViewMISNewDeleteEmailButton',
        'misnew.ViewMISNewDistributionAddEmail',
        'misnew.ViewMISNewDistributionDeleteEmail',
        
		//accessusan
		'accessusan.ViewAccessUSANAssessment',
		'accessusan.ViewAccessUSANComments',
		
        //qa
		'qa.ViewQAAssessment',
		'qa.ViewQAComments',
		'qa.ViewQAHoursForQuote',
		
		//networkops
		'networkops.ViewNetworkOpsAssessment',
		'networkops.ViewNetworkOpsComments',
		'networkops.ViewNetworkOpsHoursForQuote',
		
        //swd       
        'swd.ViewSWDDevAssessment',
        'swd.ViewSWDComments',
        'swd.ViewSWDHoursScheduled',
        'swd.ViewSWDHoursForQuote',
        'swd.ViewSWDProjectScheduleSummary',
        
        //tls
        'tls.ViewTLSTLSIPAssessment',
        'tls.ViewTLSTLSSaaSAssessment',
        'tls.ViewTLSTLSIPHoursForQuote',
        'tls.ViewTLSTLSSaaSHoursForQuote',
        'tls.ViewTLSComments',
        
        //systems
        'systems.ViewSystemsSystemsAssessment',
        //'systems.ViewSystemsChargesForQuote',
        'systems.ViewSystemsComments',
        'systems.ViewSystemsHardwareSoftwareRequirementsGrid',
        
       //buffet prod install
       'buffetprodinstall.ViewBuffetProdInstallDate',
       'buffetprodinstall.ViewBuffetProdInstallConferenceStart',
       'buffetprodinstall.ViewBuffetProdInstallConferenceBridge',
       'buffetprodinstall.ViewBuffetProdInstallNodes',
       'buffetprodinstall.ViewBuffetProdInstallMasterProject',
       'buffetprodinstall.ViewBuffetProdInstallCCRMasterProject',
       'buffetprodinstall.ViewBuffetProdInstallMaintenanceStartMasterProject',
       'buffetprodinstall.ViewBuffetProdInstallPostMaintenanceMasterProject',
       'buffetprodinstall.ViewBuffetProdInstallAssociatedProject',
       'buffetprodinstall.ViewBuffetProdInstallCCRAssociatedProject',
       'buffetprodinstall.ViewBuffetProdInstallMaintenanceStartAssociatedProject',
       'buffetprodinstall.ViewBuffetProdInstallPostMaintenanceAssociatedProject',
       'buffetprodinstall.ViewBuffetProdInstallRequirements',
       'buffetprodinstall.ViewBuffetProdInstallComments',
       'buffetprodinstall.ViewBuffetProdInstallProdStagingFolder',
       'buffetprodinstall.ViewBuffetProdInstallVXMLStagingFolder',
       'buffetprodinstall.ViewBuffetProdInstallProdMaintRequestToOps',
       'buffetprodinstall.ViewBuffetProdInstallProdMaintRequestComplete',
       'buffetprodinstall.ViewBuffetProdInstallProdStagingRequestToDev',
       'buffetprodinstall.ViewBuffetProdInstallProdStagingComplete',
       'buffetprodinstall.ViewBuffetProdInstallProdHandoffToOps',
       'buffetprodinstall.ViewBuffetProdInstallProdHandoffComplete',
       'buffetprodinstall.ViewBuffetProdInstallAssocProjectContainer',
       'buffetprodinstall.ViewBuffetProdInstallUSANCCR',
       'buffetprodinstall.ViewBuffetProdInstallStagingFoldersContainer',

		'assumptions.ViewAssumptionsUserList',
		'assumptions.ViewAssumptionsProjectList',

		'deliverables.ViewDeliverablesUserList',
		'deliverables.ViewDeliverablesProjectList',
		
		//change log
		'changelog.ViewChangeLogMainLog',


	   //editors
	   'editors.ViewEditorForms',
	   'editors.ViewEmailRequestForms',
	   'editors.ViewRoutingReportView',
	   'editors.ViewRFQReportView'
	   
          
	/**/
		],
	refs: [{
	    ref: 'projectnumber',
	    selector: 'viewSummaryUSANProjectNumber'
	},
	/*
			{
				ref: 'statusdate',
				selector: 'viewSummaryProjectStatusDate'
			},
			*/
	{
	    ref: 'status',
	    selector: 'viewSummaryProjectStatus'
	}, {
	    ref: 'projectfolder',
	    selector: 'viewSummaryProjectFolder'
	}, {
	    ref: 'buttonuat',
	    selector: 'viewSummaryButtonUAT'
	}, {
	    ref: 'buttonprod',
	    selector: 'viewSummaryButtonProd'
	}, {
	    ref: 'accessusan',
	    selector: 'viewSummaryAccessUSAN'
	}, {
	    ref: 'visiodrop',
	    selector: 'viewSummaryVisioDrop'
	}, {
	    ref: 'worksheetfolder',
	    selector: 'viewPromptsPromptWorksheet'
	}],


init: function() {
    //console.log("hello?!");

    this.control({
        /*
			'viewSummaryProjectStatus': {
				select: this.updateDateField
			},
			*/
        'viewSummaryProjectFolder': {
            render: this.setProjectFolderSummaryViewEvent
        },
        'viewSummaryButtonUAT': {
            render: this.setButtonUatHttpWindowDoubleClickEvent
        },
        'viewSummaryButtonProd': {
            render: this.setButtonProdHttpWindowDoubleClickEvent
        },
        'viewSummaryAccessUSAN': {
            render: this.setAccessUSANHttpWindowDoubleClickEvent
        },
        'viewSummaryVisioDrop': {
            render: this.setVisioDropExplorerWindowDoubleClickEvent
        },
        'viewPromptsPromptWorksheet': {
            render: this.setPromptWorksheetWindowDoubleClickEvent
        },
        '#summary field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#misupdatesForm field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#trafficRouting field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#uatProdInstall field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#promptsForm field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#misNew field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#SWD field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#TLS field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#Systems field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#OSG field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#NetworkOps field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#AccessUSAN field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        },
        '#buffetProdInstall field': {
            change: {
                fn: this.blurEvent,
                buffer: 2000
            }
        }
    });
},

blurEvent: function(field, oldVal, newVal, opts) {
    //if field.up('form') doesn't exist, then bail immediately
    if (field.up('form') == undefined) {
        return;
    }

    //if we have no current project, then bail immediately
    if (GLOBAL_currentProjectOpenProjectID == null) {
        return;
    }

    //(smm) if this project is read-only (or if the user is read-only), then bail immediately
    if (GLOBAL_readonly || (GLOBAL_permission == "RDO")) {
        return;
    }

    //console.log(field);
    console.log(field.getValue() + " needs to be submitted.  Form is " + field.up("form").name);

    //(smm) Added checks for user permission flags
    if (field.up("form").name == "promptsForm" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
        //console.log(field.up("form").getForm().getValues());
        field.up("form").updatePromptsMisc();
    } else if (field.up("form").name == "misupdatesForm" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TC"))) {
        //console.log(field.up("form").getForm().getValues());
        field.up("form").updateMISUpdates();
    } else if (field.up("form").name == "trafficRouting" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM"))) {
        //console.log(field.up("form").getForm().getValues());
        field.up("form").updateTrafficRouting();
    } else if (field.up("form").name == "misNew" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "TC"))) {
        //console.log(field.up("form").getForm().getValues());
        field.up("form").updateMISNew();
    } else if (field.up("form").name == "uatProdInstall" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "PM"))) //sean: allow Devs; adam allow TC
    {
        //console.log(field.up("form").getForm().getValues(false, false, true));
        field.up("form").updateUatProdInstall();
    } else if (field.up("form").name == "summary" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TLS") || (GLOBAL_permission == "SYS") || (GLOBAL_permission == "QA") || (GLOBAL_permission == "PMT") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateSummaryPage();
    } else if (field.up("form").name == "SWD" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TC"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateSWD();
    } else if ((field.up("form").name == "TLS") && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS") || (GLOBAL_permission == "PM"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateTLS();
    } else if (field.up("form").name == "Systems" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "SYS") || (GLOBAL_permission == "PM"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateSystems();
    } else if (field.up("form").name == "OSG" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA") || (GLOBAL_permission == "PM"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateQA();
    } else if (field.up("form").name == "NetworkOps" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA") || (GLOBAL_permission == "PM"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateNetworkOps();
    } else if (field.up("form").name == "AccessUSAN" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "PM"))) {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateAccessUSAN();
    } else if (field.up("form").name == "buffetProdInstall" && ((GLOBAL_permission == "ADM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "PM"))) //sean: allow Devs
    {
        //console.log(field.up("form").getForm().getValues(false, false, false));
        field.up("form").updateBuffetProdInstall();
    }
},

/*  (Not needed anymore due to changed callflow functionality.  Preserving for reference)
	updateDateField: function() {
		var datetext = this.getStatusdate();
		var statustext = this.getStatus().getRawValue();
		var data = datetext.store.findRecord('status_type', statustext, 0, false, true, false);
		var date = data.get('created');

		console.log(date);

		datetext.setValue((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
	},
*/

setOpsExplorerDoubleClickEvent: function() {
    var field = this.getProjectfolder();
    field.getEl().on('dblclick', this.openOpsExplorerWindow, field, {
        scope: this
    });
},

setProjectFolderSummaryViewEvent: function() {
    var field = this.getProjectfolder();
    field.getEl().on('dblclick', this.openFromProjectFolderSummaryView, field, {
        scope: this
    });
},

setButtonUatHttpWindowDoubleClickEvent: function() {
    var field = this.getButtonuat();
    field.getEl().on('dblclick', this.openHttpWindow, field, {
        scope: this
    });
},

setButtonProdHttpWindowDoubleClickEvent: function() {
    field = this.getButtonprod();
    field.getEl().on('dblclick', this.openHttpWindow, field, {
        scope: this
    });
},

setAccessUSANHttpWindowDoubleClickEvent: function() {
    field = this.getAccessusan();
    field.getEl().on('dblclick', this.openHttpWindow, field, {
        scope: this
    });
},

setVisioDropExplorerWindowDoubleClickEvent: function() {
    field = this.getVisiodrop();
    field.getEl().on('dblclick', this.openOpsExplorerWindow, field, {
        scope: this
    });
},

setPromptWorksheetWindowDoubleClickEvent: function() {
    field = this.getWorksheetfolder();
    field.getEl().on('dblclick', this.openFromProjectFolderSummaryView, field, {
        scope: this
    });
},

openHttpWindow: function(c, textfield) {
    //var field = this.getProjectfolder();
    var path = this.getValue();

    if (path == '') {
        return;
    }

    window.open(path, '_blank');
},

openOpsExplorerWindow: function(a, b, c, passedValue) {
    //var field = this.getProjectfolder();
    if (Ext.isEmpty(passedValue) == true) {
        console.log('passedValue is empty; using default link|' + a + "|" + b + "|" + c + "|" + passedValue);
        var path = '\\\\ops1\\e_drive\\project management\\';
    } else {
        console.log('passedValue is NOT empty |' + passedValue);
        var path = passedValue;
    }

    if (path == '') {
        path = '\\\\ops1\\e_drive\\project management\\';
    }


    if (Ext.isIE) {
        window.open('file:' + path + '', '_blank');
    } else {
        if (Ext.isEmpty(GLOBAL_cryptObj) != true) {
            console.log('plugin attempting to open network path: ' + path);
            GLOBAL_cryptObj.OpenNetworkPath(path + '');
        } else {
            alert("Plugin needed to browse windows explorer");
        }

    }
},

openFromProjectFolderSummaryView: function(a, val) {
    var passedValue = val.value;
    if (Ext.isEmpty(passedValue) == true) {
        //console.log('passedValue is empty; using default link|' + a + "|" + b + "|" + c + "|" + passedValue);
        var path = '\\\\ops1\\e_drive\\project management\\';
    } else {
        console.log('passedValue is NOT empty |' + passedValue);
        var path = passedValue;
    }

    if (path == '') {
        path = '\\\\ops1\\e_drive\\project management\\';
    }


    if (Ext.isIE) {
        window.open('file:' + path + '', '_blank');
    } else {
        if (Ext.isEmpty(GLOBAL_cryptObj) != true) {
            console.log('plugin attempting to open network path: ' + path);
            GLOBAL_cryptObj.OpenNetworkPath(path + '');
        } else {
            alert("Plugin needed to browse windows explorer");
        }

    }

}
});