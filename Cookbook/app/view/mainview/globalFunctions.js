Ext.define('CookBook.view.mainview.globalFunctions', {});

function resetAllGlobalVariables() {
    GLOBAL_currentProjectOpenProjectID = null;
    GLOBAL_currentProjectOpenMISNewID = 0;
    GLOBAL_currentProjectOpenMISUpdatesID = 0;
    GLOBAL_projectCurrentlyOpen = false;

    //ah clear load globals
    GLOBAL_hasRequirementsTabBeenLoaded = false;
    GLOBAL_hasMISUpdatesTabBeenLoaded = false;
    GLOBAL_hasMISNewTabBeenLoaded = false;
    GLOBAL_hasTrafficRoutingTabBeenLoaded = false;
    GLOBAL_hasAccessUSANTabBeenLoaded = false;
    GLOBAL_hasSWDTabBeenLoaded = false;
    GLOBAL_hasTLSTabBeenLoaded = false;
    GLOBAL_hasQATabBeenLoaded = false;
    GLOBAL_hasSystemsTabBeenLoaded = false;
    GLOBAL_hasUATProdInstallTabBeenLoaded = false;
    GLOBAL_hasBuffetProdInstallTabBeenLoaded = false;
    GLOBAL_hasAssumptionsTabBeenLoaded = false;
    GLOBAL_hasNetworkOpsTabBeenLoaded = false;
    GLOBAL_hasDeliverablesTabBeenLoaded = false;
    GLOBAL_hasPromptsTabBeenLoaded = false;

    //clear SWD Globals
    GLOBAL_totalBATCBillingHours = 0;
    GLOBAL_totalBATCBookedHours = 0;
    GLOBAL_totalPreUATBillingHours = 0;
    GLOBAL_totalPreUATBookedHours = 0;
    GLOBAL_totalPostUATBillingHours = 0;
    GLOBAL_totalPostUATBookedHours = 0;
    GLOBAL_totalDevBookedHours = 0;
    GLOBAL_totalDevBilledHours = 0;
    GLOBAL_totalTLSSaaSBilledHours = 0;
    GLOBAL_totalTLSSaaSBookedHours = 0;
    GLOBAL_totalTLSIPBilledHours = 0;
    GLOBAL_totalTLSIPBookedHours = 0;
}

function removeAllStoreData() {
    var controller = GLOBAL_currentController;
    doStagingFolderMenuLinksLoading(null); //this will clear out the staging folder links

    //summary
    controller.getStore('ProjectHistories').removeAll();
    controller.getStore('ProjectInformations').removeAll();
    controller.getStore('ProjectContacts').removeAll();
    controller.getStore('LinkedProjects').removeAll();
    controller.getStore('ProjectStatuses').removeAll();
    //requirements
    controller.getStore('ApplicationRequirements').removeAll();
    controller.getStore('BackofficeDBRequirements').removeAll();
    controller.getStore('BackofficeProcessRequirements').removeAll();
    controller.getStore('BackofficeWebserviceRequirements').removeAll();
    controller.getStore('ConfigFileRequirements').removeAll();
    controller.getStore('DocumentationRequirements').removeAll();
    controller.getStore('EngineRequirements').removeAll();
    controller.getStore('FaxFormRequirements').removeAll();
    controller.getStore('FileXferRequirements').removeAll();
    controller.getStore('GrammarRequirements').removeAll();
    controller.getStore('ManagerRequirements').removeAll();
    controller.getStore('OtherRequirements').removeAll();
    controller.getStore('ScraperRequirements').removeAll();
    controller.getStore('ServiceIDRequirements').removeAll();
    controller.getStore('SpeechRecognitionRequirements').removeAll();
    controller.getStore('TableRequirements').removeAll();
    controller.getStore('TNTFunctionalityRequirements').removeAll();
    controller.getStore('TTSFunctionalityRequirements').removeAll();
    controller.getStore('UUIRequirements').removeAll();
    controller.getStore('VXMLRequirements').removeAll();
    controller.getStore('FileXferRequirementUploads').removeAll();
    controller.getStore('FileXferRequirementDownloads').removeAll();
    controller.getStore('RequirementsTabRoutings').removeAll(); //ah 07/12/13
    //mis updates
    controller.getStore('MISUpdates').removeAll();
    controller.getStore('MISUpdateDeliveryChanges').removeAll();
    controller.getStore('MISUpdateDnises').removeAll();
    controller.getStore('MISUpdateAddDnises').removeAll();
    controller.getStore('MISUpdateChangeDnises').removeAll();
    controller.getStore('MISUpdateRemoveDnises').removeAll();
    controller.getStore('MISUpdateReportNames').removeAll();
    controller.getStore('MISUpdateDistributionChanges').removeAll();
    //mis new
    controller.getStore('MISNew').removeAll();
    controller.getStore('MISNewReportNames').removeAll();
    controller.getStore('MISNewDnises').removeAll();
    controller.getStore('MISNewDeliveries').removeAll();
    controller.getStore('MISNewDistributions').removeAll();
    //traffic routing
    controller.getStore('TrafficRequirements').removeAll();
    controller.getStore('TrafficRoutingRemoveDnises').removeAll();
    controller.getStore('TrafficRoutingChangeDnises').removeAll();
    controller.getStore('TrafficRoutingAddDnises').removeAll();
    controller.getStore('RoutingRequirements').removeAll();
    //access usan
    controller.getStore('AccessUSANReqs').removeAll();
    //swd
    controller.getStore('SWDSchedules').removeAll();
    controller.getStore('SWDAssessments').removeAll();
    //tls
    controller.getStore('TLSIPAssessments').removeAll();
    controller.getStore('TLSSaaSAssessments').removeAll();
    //osg
    controller.getStore('OSGAssessments').removeAll();
    //systems
    controller.getStore('HardwareRequirements').removeAll(); //ah 04/10/13
    controller.getStore('SystemsAssessments').removeAll(); //ah 04/10/13
    //network ops
    controller.getStore('NetworkOpsAssessments').removeAll();
    //uat prod install
    controller.getStore('UatProdInstalls').removeAll();
    controller.getStore('StagingFolders').removeAll();
    controller.getStore('ProdInstallRequirements').removeAll(); //ah 07/12/13
    controller.getStore('UATInstallRequirements').removeAll(); //ah 07/12/13
    controller.getStore('SoakInstallRequirements').removeAll(); //ah 07/12/13

    //buffet prod install
    controller.getStore('ProjectRequirements').removeAll();
    controller.getStore('ProdInstallationBuffets').removeAll();
    controller.getStore('BuffetProdInstallRequirements').removeAll();
    //prompts
    controller.getStore('PromptMNumsRequirements').removeAll();
    controller.getStore('PromptDetails').removeAll();
    controller.getStore('PromptWorksheets').removeAll();
    controller.getStore('GMVoicePromptDetails').removeAll();
    //assumptions
    controller.getStore('ProjectAssumptions').removeAll();
    //deliverables
    controller.getStore('ProjectDeliverables').removeAll();
    //misc

}