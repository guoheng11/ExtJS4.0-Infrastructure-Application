//check for logging capability
if (!window.console) {
    console = {
        log: function() {}
    };
}

console.log('username from windowsid: ' + SERVER_windowsname);
console.log('parsed username: ' + SERVER_username);
console.log('user permission: ' + SERVER_permission);
console.log('last time logged in: ' + SERVER_lasttime);
console.log('last time cookbook updated: ' + SERVER_lastupdate);
console.log(SERVER_datecompare);
console.log('using disable caching: ' + SERVER_usecaching);
//caching is determined in default.aspx.cs
if (SERVER_usecaching == 'True') {
    Ext.Loader.setConfig({
        enabled: true,
        disableCaching: true
    });
    console.log('disableCaching: true; pages will not be cached');
} else {
    //at this point, user has been logged in since last update.
    //however, they may not have logged in with their current browser
    //so to check that, we look for a cookie (browser dependent) and
    //if the cookie exists with the latest timestamp, then they have
    //been in using their current browser since the last update 
    if (checkCookie() == true) {
        console.log('CookieCheck came back true! caching will be enabled.')
        Ext.Loader.setConfig({
            enabled: true,
            disableCaching: false
        });
        console.log('disableCaching: false; pages may be cached');
    } else {
        console.log('CookieCheck came back false - caching will not be enabled.')
        Ext.Loader.setConfig({
            enabled: true,
            disableCaching: true
        });
        console.log('disableCaching: true; pages will not be cached');
    }

}
//cookie testing
Ext.Loader.setPath('Ext.ux', '../ux/');

function checkCookie() {
    var cacheCheck = getCookie("Cookbook.cacheCheck");
    if (cacheCheck != null && cacheCheck != "") {
        var checkAgainst = SERVER_cacheCookieValue;
        if (cacheCheck == checkAgainst) {
            console.log("User already has cache cookie stored: " + cacheCheck);
            return true;
        } else {
            console.log("User has cookie (" + cacheCheck + "), but doesn't match current cookie value  (" + checkAgainst + ")");
            cacheCheck = SERVER_cacheCookieValue;
            setCookie("Cookbook.cacheCheck", cacheCheck, 365);
            return false;
        }
    } else {
        cacheCheck = SERVER_cacheCookieValue;
        if (cacheCheck != null && cacheCheck != "") {
            setCookie("Cookbook.cacheCheck", cacheCheck, 365);
            console.log("New cache cookie created: " + cacheCheck);
            return false;
        } else {
            return false;
        }
    }
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
//SWD Globals
var GLOBAL_totalBATCBillingHours = 0;
var GLOBAL_totalBATCBookedHours = 0;
var GLOBAL_totalPreUATBillingHours = 0;
var GLOBAL_totalPreUATBookedHours = 0;
var GLOBAL_totalPostUATBillingHours = 0;
var GLOBAL_totalPostUATBookedHours = 0;
var GLOBAL_totalDevBookedHours = 0;
var GLOBAL_totalDevBilledHours = 0;
var GLOBAL_totalTLSSaaSBilledHours = 0;
var GLOBAL_totalTLSSaaSBookedHours = 0;
var GLOBAL_totalTLSIPBilledHours = 0;
var GLOBAL_totalTLSIPBookedHours = 0;
//Tab Globals
var GLOBAL_hasRequirementsTabBeenLoaded = false;
var GLOBAL_hasMISUpdatesTabBeenLoaded = false;
var GLOBAL_hasMISNewTabBeenLoaded = false;
var GLOBAL_hasTrafficRoutingTabBeenLoaded = false;
var GLOBAL_hasAccessUSANTabBeenLoaded = false;
var GLOBAL_hasSWDTabBeenLoaded = false;
var GLOBAL_hasTLSTabBeenLoaded = false;
var GLOBAL_hasQATabBeenLoaded = false;
var GLOBAL_hasNetworkOpsTabBeenLoaded = false;
var GLOBAL_hasSystemsTabBeenLoaded = false;
var GLOBAL_hasUATProdInstallTabBeenLoaded = false;
var GLOBAL_hasBuffetProdInstallTabBeenLoaded = false;
var GLOBAL_hasPromptsTabBeenLoaded = false;
var GLOBAL_hasAssumptionsTabBeenLoaded = false;
var GLOBAL_hasDeliverablesTabBeenLoaded = false;
//Project Globals
var GLOBAL_projectCurrentlyOpen = false;
var GLOBAL_currentController = null;
var GLOBAL_currentProjectOpenProjectID = 0;
var GLOBAL_currentProjAlreadyLoadedSWDTLS = false;
var GLOBAL_currentProjectOpenMISNewID = 0;
var GLOBAL_currentProjectOpenMISUpdatesID = 0;
var GLOBAL_hasUATProdLoaded = false;
var GLOBAL_hasSWDLoaded = false;
var GLOBAL_hasBuffetProdLoaded = false;
var GLOBAL_username = "anonymous";
var GLOBAL_permission = 'RDO'; //default to a ReadOnly permission
var GLOBAL_lastTimeLoggedIn = null;
var GLOBAL_readonly = false;
var GLOBAL_cryptObj = null;
var GLOBAL_pageURL = null;
var GLOBAL_projectNumToAutoLoad = null;
var GLOBAL_hideChangeLog = true;
var GLOBAL_sessionTimeRemaining = 0;
Ext.require('Ext.container.Viewport');
Ext.require('Ext.grid.plugin.CellEditing');
Ext.require('Ext.grid.plugin.RowEditing');
Ext.require('Ext.form.field.Hidden'); //smm
Ext.require('Ext.ux.grid.Printer');
//(smm) override grid.Scroller
Ext.define('CookBook.grid.ScrollerOverride', {
    override: 'Ext.grid.Scroller',
    constructor: function(config) {
        this.callParent(arguments);
    },
    onAdded: function() {
        this.callParent(arguments);
        var me = this;
        if (me.scrollEl) {
            me.mun(me.scrollEl, 'scroll', me.onElScroll, me);
            me.mon(me.scrollEl, 'scroll', me.onElScroll, me);
        }
    }
});
//ah override for grouping summary grid feature
Ext.define('CookBook.grid.GroupingSummaryOverride', {
    override: 'Ext.grid.feature.GroupingSummary',
    getPrintData: function(index) {
        var me = this,
            columns = me.view.headerCt.getColumnsForTpl(),
            i = 0,
            length = columns.length,
            data = []

        if (!me.summaryGroups[index - 1]) {
            me.getFragmentTpl(); //fix
        }


        var name = me.summaryGroups[index - 1].name,
            active = me.summaryData[name],
            column;
        for (; i < length; ++i) {
            column = columns[i];
            column.gridSummaryValue = this.getColumnValue(column, active);
            data.push(column);
        }
        return data;
    }
});

Ext.override(Ext.grid.plugin.CellEditing, {
    onSpecialKey: function(ed, field, e) {
        var grid = this.grid,
            sm;
        if (e.getKey() === e.TAB) {
            return;
        }
    }
});

function resetTimerInterval() {
    clearInterval(GLOBAL_sessionTimeRemaining);
    timeTilLogout = 1800000 //10000 - for testing 10 seconds;
    GLOBAL_sessionTimeRemaining = setInterval("checkTimerInterval()", 1000);
}

function checkTimerInterval() {
    if (GLOBAL_currentProjectOpenProjectID == null || GLOBAL_currentProjectOpenProjectID == 0) {
        Ext.ComponentQuery.query('#timerLabel')[0].setText('No Session Active');
        return;
    }
    timeTilLogout = timeTilLogout - 1000;
    if (timeTilLogout <= 0) {
        timeTilLogout = 0;
        clearInterval(GLOBAL_sessionTimeRemaining);
        autoLogOut();
    }
    var secs = timeTilLogout / 1000;
    var mins = parseInt(secs / 60);
    var secs = parseInt(secs % 60);
    var timeString = "NOW!";
    if (timeTilLogout > 0) {
        if (secs < 10) {
            secs = "0" + secs;
        }
        timeString = mins + ":" + secs;
    }
    Ext.ComponentQuery.query('#timerLabel')[0].setText('Session Expiration: ' + timeString);
}

function autoLogOut() {
    var closeProjectButton = Ext.ComponentQuery.query('#closeCurrentProjectButton')[0];
    closeProjectButton.fireEvent('click', closeProjectButton);
    alert('You have been logged out due to 30 minutes of inactivity.');
}

Ext.application({

    name: 'CookBook',
    appFolder: 'app',

    controllers: ['Cookbook'],

    launch: function() {
        //var controller = this.getController('Cookbook');
        //var store = controller.getStore('BusinessUnits');
        GLOBAL_currentController = this.getController('Cookbook');
        GLOBAL_pageURL = window.location.href;
        if (GLOBAL_pageURL.indexOf('?p=') != -1) {
            var i = GLOBAL_pageURL.indexOf('?p=');
            var k = GLOBAL_pageURL.substring(i + 3);
            //console.log(k);
            GLOBAL_projectNumToAutoLoad = k;
        }


        (function() {
            var _originalRequest = Ext.data.Connection.prototype.request;
            Ext.override(Ext.data.Connection, {
                request: function(options) {
                    //console.log('options: '+options.url);
                    _originalRequest.apply(this, arguments);
                    if (GLOBAL_currentProjectOpenProjectID != null && GLOBAL_currentProjectOpenProjectID != 0) {
                        if (options.url.indexOf('Heartbeat') != -1) {
                            //console.log('% should NOT refresh timer now');
                        } else {
                            resetTimerInterval();
                            //console.log('% should refresh timer now');
                        }
                    }
                }
            });
        })();

        var viewport = Ext.create('Ext.container.Viewport', {
            alias: 'widget.mainview',
            itemId: 'CenterView',
            layout: 'border',
            defaults: {
                collapsible: false,
                split: true
            },
            bodyborder: false,
            //autoScroll: true,
            items: [{
                xtype: 'panel',
                title: 'Navigation',
                region: 'north',
                frame: false,
                bodyStyle: 'background-color:#dfe8f5;',
                collapsible: true,
                //collapsed: true,
                //width: 150,
                height: 160,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [{
                    xtype: 'navToolbar',
                    flex: 1
                }, {
                    xtype: 'panel',
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    flex: 4,
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'selectProjectGrid',
                        flex: 1
                    }, {
                        xtype: 'panel',
                        frame: false,
                        bodyStyle: 'background-color:#dfe8f5;',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [{
                            id: 'statusCompanyPanel',
                            html: '',
                            bodyPadding: 7,
                            bodyCls: 'preview_pane',
                            frame: false,
                            flex: 1
                        }, {
                            id: 'statusCompanyPanel2',
                            html: '',
                            bodyPadding: 7,
                            bodyCls: 'preview_pane',
                            frame: false,
                            flex: 1
                        }]
                    }]
                }]
            }, {
                region: 'center',
                xtype: 'splash'
            }],
            listeners: {
                afterrender: function() {
                    setTimeout(function() {
                        Ext.get('loading').remove();
                        Ext.get('loading-mask').fadeOut({
                            remove: true
                        });
                    }, 250);

                    var grid = Ext.ComponentQuery.query('selectProjectGrid')[0];

                    grid.getSelectionModel().on('selectionchange', function(sm, selectedRecord) {
                        if (selectedRecord.length) {
                            var detailPanel = Ext.getCmp('statusCompanyPanel');
                            var detailPanel2 = Ext.getCmp('statusCompanyPanel2');
                            var templateString = "";
                            var templateArray = [];
                            var templateArray2 = [];

                            if (selectedRecord[0].get('hiddenVal')) {
                                /*'advanced filter' is active, so the project informations that are normally displayed have been filtered out
                                 templateArray = [];
                                 templateArray.push('<b>Advanced Filtering Active</b><br/><br/>');*/
                                if (!Ext.isEmpty(buildTemplate('application', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('application', selectedRecord[0]));
                                }
                                if (!Ext.isEmpty(buildTemplate('table', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('table', selectedRecord[0]));
                                }
                                if (!Ext.isEmpty(buildTemplate('scraper', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('scraper', selectedRecord[0]));
                                }
                                if (!Ext.isEmpty(buildTemplate('engine', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('engine', selectedRecord[0]));
                                }
                                if (!Ext.isEmpty(buildTemplate('manager', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('manager', selectedRecord[0]));
                                }
                                if (!Ext.isEmpty(buildTemplate('grammar', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('grammar', selectedRecord[0]));
                                }
                                if (!Ext.isEmpty(buildTemplate('dnis', selectedRecord[0]))) {
                                    templateArray.push(buildTemplate('dnis', selectedRecord[0]));
                                }
                            }


                            if (!Ext.isEmpty(buildTemplate('project_status', selectedRecord[0]))) {
                                templateArray.push(buildTemplate('project_status', selectedRecord[0]));
                            }
                            if (!Ext.isEmpty(buildTemplate('rfq_loe_recv_date', selectedRecord[0]))) {
                                templateArray.push(buildTemplate('rfq_loe_recv_date', selectedRecord[0]));
                            }
                            if (!Ext.isEmpty(buildTemplate('scheduled_uat_delivery', selectedRecord[0]))) {
                                templateArray.push(buildTemplate('scheduled_uat_delivery', selectedRecord[0]));
                            }
                            if (!Ext.isEmpty(buildTemplate('scheduled_production_date', selectedRecord[0]))) {
                                templateArray.push(buildTemplate('scheduled_production_date', selectedRecord[0]));
                            }
                            if (!Ext.isEmpty(buildTemplate('prod_complete_date', selectedRecord[0]))) {
                                templateArray.push(buildTemplate('prod_complete_date', selectedRecord[0]));
                            }
                            /*
                             
                             if (!Ext.isEmpty(buildTemplate('expedite', selectedRecord[0]))) {
                             templateArray.push(buildTemplate('expedite', selectedRecord[0]));
                             }
                             
                             if (!Ext.isEmpty(buildTemplate('quote_loe_due_date', selectedRecord[0]))) {
                             templateArray.push(buildTemplate('quote_loe_due_date', selectedRecord[0]));
                             }
                             if (!Ext.isEmpty(buildTemplate('requested_uat_date', selectedRecord[0]))) {
                             templateArray.push(buildTemplate('requested_uat_date', selectedRecord[0]));
                             }
                             if (!Ext.isEmpty(buildTemplate('requested_prod_date', selectedRecord[0]))) {
                             templateArray.push(buildTemplate('requested_prod_date', selectedRecord[0]));
                             }
                             
                             
                             
                             if (templateArray.length < 10) {
                             if (!Ext.isEmpty(buildTemplate('preapproved', selectedRecord[0]))) {
                             templateArray.push(buildTemplate('preapproved', selectedRecord[0]));
                             }
                             }
                             if (templateArray.length < 10) {
                             if (buildTemplate('company', selectedRecord[0]) != "") {
                             templateArray.push(buildTemplate('company', selectedRecord[0]));
                             }
                             }
                             if (templateArray.length < 10) {
                             if (buildTemplate('primary_business_unit', selectedRecord[0]) != "") {
                             templateArray.push(buildTemplate('primary_business_unit', selectedRecord[0]));
                             }
                             }
                             if (templateArray.length < 10) {
                             if (buildTemplate('additional_business_units', selectedRecord[0]) != "") {
                             templateArray.push(buildTemplate('additional_business_units', selectedRecord[0]));
                             }
                             }
                             if (templateArray.length < 10) {
                             if (buildTemplate('customer_project_number', selectedRecord[0]) != "") {
                             templateArray.push(buildTemplate('customer_project_number', selectedRecord[0]));
                             }
                             }*/
                            if (templateArray.length < 1) {
                                templateArray.push('(no information available)');
                            }

                            if (templateArray.length > 5) {
                                for (var k = templateArray.length; k > 5; k--) {
                                    templateArray2.push(templateArray.pop());
                                }
                                templateArray2 = templateArray2.reverse();
                            } else {
                                templateArray2 = [];
                            }



                            var projTpl = Ext.create('Ext.Template', templateArray);
                            projTpl.overwrite(detailPanel.body, selectedRecord[0].data);

                            var projTpl2 = Ext.create('Ext.Template', templateArray2);
                            projTpl2.overwrite(detailPanel2.body, selectedRecord[0].data);




                        }
                    });

                    //1. embed the plugin
                    if (Ext.isChrome) Ext.each(navigator.mimeTypes, function(m, i) {
                        if (/usancookbook/gi.test(m.type)) {
                            //console.log(i, m)
                            document.getElementById('cookbook').innerHTML = '<object id="usancookbook" type="application/x-usancookbook" style="height:0px;width:0px" > </object>';
                        }
                    });
                    else {
                        document.getElementById('cookbook').innerHTML = '<object id="usancookbook" type="application/x-usancookbook" style="height:0px;width:0px" > </object>';
                    }

                    Ext.Function.defer(function() {
                        //2. Check to see if it loaded
                        GLOBAL_cryptObj = document.getElementById("usancookbook");
                        try {
                            if (GLOBAL_cryptObj.echo('123') == '123') {
                                newPlugin = true;
                                console.log('plugin loaded');
                            }
                        } catch (e) {
                            console.log('plugin not loaded');
                            //document.getElementById('cookbook').innerHTML = 'Please click here to load the plugin:  <a href="file:app/USANCookbook.msi"> USANCookbook </a>';
                            alert("You are going to be prompted to install USANCookbook.msi.  Either choose to install or save it to your computer.  Once the installation is complete, refresh this page.  You will then be able to follow project links to network folders as you would in Internet Explorer.");
                            window.open("app/USANCookbook.msi", '_blank');
                            if (/support/gi.test(e.message) || /has no/gi.test(e.message)) {
                                newPlugin = false;
                            } else if (/cannot call/gi.test(e.message)) {
                                newPlugin = false;
                            } else {
                                //logArea.innerHTML += e.message + "<br>";
                            }
                        }
                    }, 1000);

                    if (GLOBAL_projectNumToAutoLoad != null) {
                        Ext.getBody().mask("Attempting to auto load " + GLOBAL_projectNumToAutoLoad + ".  Please wait...");
                        var store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectInformationVitals');
                        store.load({
                            callback: function() {
                                var record = GLOBAL_currentController.getStore('ProjectInformationVitals').findRecord('project_number', GLOBAL_projectNumToAutoLoad);
                                if (!Ext.isEmpty(record)) {
                                    console.log('autoloading');
                                    Ext.ComponentQuery.query('selectProjectGrid')[0].fireEvent('itemdblclick', null, record);
                                } else {
                                    console.log('Auto load failed - project not found:' + GLOBAL_projectNumToAutoLoad);
                                    Ext.getBody().unmask();
                                }
                            }
                        });
                    } else {
                        var store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectInformationVitals');
                        store.load();
                    }
                }
            }
        });

        /* get the username */
        Ext.Ajax.request({
            url: 'GetUserName.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(request) {
                var obj = Ext.decode(request.responseText);

                GLOBAL_username = obj.rows[0].user_name;
                GLOBAL_permission = obj.rows[0].permission;
                GLOBAL_lastTimeLoggedIn = obj.rows[0].lasttime;

                console.log('user name: ' + GLOBAL_username);
                console.log('user permission: ' + GLOBAL_permission);

                var field = Ext.ComponentQuery.query('#usernameLabel');
                field[0].setText(GLOBAL_username);

                //initialize the notification loop
                sendNotification();
            }
        });
    }
});



function stringTrim(inputString) {
    //since javascript doesn't have string.trim()...
    var i = inputString + '';
    return (i.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
}

//populate the template based on what info is present for the current project selected

function buildTemplate(category, selectedRecord) {
    if (category == '') {
        return '';
    }
    if (!Ext.isEmpty(stringTrim(selectedRecord.get(category))) && selectedRecord.get(category) != null) {
        //since the fields are not formatted in the model, the below is for formatting so that all fields are capitalized, etc 
        var upperCaseCategory = category.substring(0, 1);
        upperCaseCategory = upperCaseCategory.toUpperCase();
        upperCaseCategory += category.substring(1);
        upperCaseCategory = upperCaseCategory.replace('_', ' ');
        upperCaseCategory = upperCaseCategory.replace('_', ' ');
        upperCaseCategory = upperCaseCategory.replace('_', ' ');
        upperCaseCategory = upperCaseCategory.replace('uat', 'UAT');
        upperCaseCategory = upperCaseCategory.replace('prod', 'PROD');
        upperCaseCategory = upperCaseCategory.replace('Rfq', 'RFQ');
        upperCaseCategory = upperCaseCategory.replace('rfq', 'RFQ');
        upperCaseCategory = upperCaseCategory.replace('Loe', 'LOE');
        upperCaseCategory = upperCaseCategory.replace('loe', 'LOE');
        for (var i = 0; i < upperCaseCategory.length - 2; i++) {
            if (upperCaseCategory.charAt(i) == ' ') {
                var charToUpper = upperCaseCategory.substring(i + 1, i + 2);
                charToUpper = charToUpper.toUpperCase();
                upperCaseCategory = upperCaseCategory.substring(0, i + 1) + charToUpper + upperCaseCategory.substring(i + 2);
            }
        }
        if (category == 'scheduled_uat_delivery') {
            upperCaseCategory = "Quoted UAT Date";
        }
        if (category == 'scheduled_production_date') {
            upperCaseCategory = "Scheduled PROD Date";
        }
        if (category == 'project_status') {
            upperCaseCategory = "Project Status";
        }
        return ('<b>' + upperCaseCategory + '</b>: {' + category + '}<br/>');
    } else {
        return '';
    }
}

function buildEmailLinks(permission) {
    switch (permission) {
        default: {
            /*console.log('Unknown permission: ' + permission + '! No email links built!');
             break;*/
            console.log('Building PM...');
            var menu = Ext.ComponentQuery.query('#emailLinksMenu')[0];
            //menu.add();
            break;
        }
    }
}


//start a heart-beat with the server

function sendNotification() {

    //don't notify if the user isn't currently in a project
    if (!GLOBAL_projectCurrentlyOpen) {
        Ext.defer(sendNotification, 60000);
        return;
    }

    var json = Ext.JSON.encode("Nothing to see here");

    Ext.Ajax.request({
        url: 'Heartbeat.ashx',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        jsonData: json,
        params: {
            user_name: GLOBAL_username,
            project_id: GLOBAL_currentProjectOpenProjectID
        },
        success: function(request) {
            Ext.defer(sendNotification, 60000); //setup the next notification (beat)
        },
        failure: function(response) {
            var obj = Ext.decode(response.responseText);
            console.log("Heartbeat failed:  " + obj.rows[0]);
        }
    });
}

function unlockCurrentProject() {
    //unlock the current project before the browser closes
    for (var i = 0; i < 3; i++) {
        var json = Ext.JSON.encode("Nothing to see here");
        Ext.Ajax.request({
            url: 'ReleaseProjectLock.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            jsonData: json,
            params: {
                project_id: GLOBAL_currentProjectOpenProjectID,
                user_name: GLOBAL_username
            },
            success: function(request) {
                /*var obj = Ext.decode(request.responseText);
                 if (obj.rows[0] != "Project successfully released")
                 {
                 alert("There was an error in closing the project: " + obj.rows[0]);
                 return;
                 }*/
            },
            failure: function(response) {
                /*var obj = Ext.decode(response.responseText);
                 alert("There was an error in closing the project: " + obj.rows[0]);
                 return;*/
            }
        });
    }
}



//(smm) - added doDeferLoading

function doSummaryLoading(PROJECT_SPECIFIED, doDeferLoading) {

    /*UPDATED FUNCTION:
     * Order of events - function name:
     * 1. Page is masked - doSummaryLoading
     * 2a. Call to ProjectInformations store to load - doSummaryLoading
     *      2b. ProjectInformations store contains a callback method to load ProjectContacts Store
     * 3a. ProjectContacts store is triggered by ProjectInformations Store callback method - doSummaryLoadingPart2
     *      3b. ProjectContacts store contains a callback method to load ProjectStatus and ProjectHistories stores
     * 4a. ProjectStatus and ProjectHistories stores triggered by ProjectContacts store callback method - doSummaryLoadingPart3
     *      4b. Project Status and ProjectHistories contain a callback method to load the rest of SummaryLoading
     * 5. Staging Folders are loaded
     * 6. Call to doMiscLoading to grab MISUpdates & MISNew IDs
     * 7. Page unmasked
     */
    if (PROJECT_SPECIFIED != null) {
        //1. Page is masked - doSummaryLoading
        //Ext.getBody().mask("Please wait...");

        //(smm) - deferred logic here
        if (doDeferLoading) {
            Ext.getBody().mask("Loading Summary.  Please wait...");
            Ext.callback(function() {
                doSummaryLoading(PROJECT_SPECIFIED, false);
            }, this, [], 50);
            return;
        }
        var store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectInformations');
        var fields;
        store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
        //2a. Call to ProjectInformations store to load
        store.load({
            callback: function(records, operation, success) {
                if (records) {
                    if (success && (records.length > 0)) {
                        fields = Ext.ComponentQuery.query('viewSummaryUSANProjectNumber');
                        fields[0].setValue(records[0].get('project_number'));

                        if (records[0].get('project_number') != undefined && records[0].get('project_number') != null && records[0].get('project_number') != '') {
                            Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText(records[0].get('project_number'));
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryProjectName');
                        fields[0].setValue(records[0].get('project_name'));

                        fields = Ext.ComponentQuery.query('viewSummaryCustomerProjectNumber');
                        fields[0].setValue(records[0].get('customer_project_number'));

                        fields = Ext.ComponentQuery.query('viewSummaryCompany');
                        fields[0].setValue(records[0].get('company'));

                        fields = Ext.ComponentQuery.query('viewSummaryBusinessUnit');
                        fields[0].setValue(records[0].get('primary_business_unit'));

                        fields = Ext.ComponentQuery.query('viewSummaryAdditionalBusinessUnits');
                        fields[0].setValue(records[0].get('additional_business_units'));

                        fields = Ext.ComponentQuery.query('viewSummaryQuoteLOERecvDate');
                        fields[0].setFullValue(records[0].get('rfq_loe_recv_date')); //(smm) changing rawValue to setFullValue for textDates
                        fields = Ext.ComponentQuery.query('viewSummaryQuoteLOEDueDate');
                        fields[0].setFullValue(records[0].get('quote_loe_due_date'));

                        fields = Ext.ComponentQuery.query('viewSummaryRequestedUatDate');
                        fields[0].setFullValue(records[0].get('requested_uat_date'));

                        fields = Ext.ComponentQuery.query('viewSummaryRequestedProdDate');
                        fields[0].setFullValue(records[0].get('requested_prod_date'));

                        fields = Ext.ComponentQuery.query('viewSummaryUpdatedSpecsRecv');
                        fields[0].setFullValue(records[0].get('updated_specs_recv'));

                        fields = Ext.ComponentQuery.query('viewSummaryRevisedUATDate');
                        fields[0].setFullValue(records[0].get('revised_uat_date'));

                        fields = Ext.ComponentQuery.query('viewSummaryUATAcceptanceDue');
                        fields[0].setFullValue(records[0].get('uat_acceptance_due'));

                        //ah 3-15-13
                        fields = Ext.ComponentQuery.query('viewSummaryQuoteLOEIssueDate');
                        fields[0].setFullValue(records[0].get('quote_loe_issue_date'));

                        //ah 3-15-13
                        fields = Ext.ComponentQuery.query('viewSummaryAuthDueDate');
                        fields[0].setFullValue(records[0].get('auth_due_date'));

                        //ah 3-15-13
                        fields = Ext.ComponentQuery.query('viewSummaryAuthRecvDate');
                        fields[0].setFullValue(records[0].get('auth_recv_date'));

                        //ah 3-15-13
                        fields = Ext.ComponentQuery.query('viewSummaryUATAcceptedDate');
                        fields[0].setFullValue(records[0].get('uat_accepted_date'));

                        //ah 3-15-13
                        fields = Ext.ComponentQuery.query('viewSummaryProdCompleteDate');
                        fields[0].setFullValue(records[0].get('prod_complete_date'));






                        //ah
                        fields = Ext.ComponentQuery.query('viewSummaryScheduledProdDate');
                        fields[0].setFullValue(records[0].get('scheduled_prod_date'));

                        //ah
                        fields = Ext.ComponentQuery.query('viewSummaryScheduledUatDate');
                        fields[0].setFullValue(records[0].get('scheduled_uat_date'));

                        fields = Ext.ComponentQuery.query('viewSummaryExpedite');
                        fields[0].setValue({
                            'summaryExpediteRadio': records[0].get('expedite')
                        });

                        fields = Ext.ComponentQuery.query('viewSummarySoak');
                        fields[0].setValue({
                            'summarySoakRadio': records[0].get('soak')
                        });

                        fields = Ext.ComponentQuery.query('viewSummaryPreApproved');
                        fields[0].setValue({
                            'summaryPreApproved': records[0].get('preapproved')
                        });

                        fields = Ext.ComponentQuery.query('viewSummaryConferenceCall');
                        fields[0].setValue({
                            'summaryConferenceCall': records[0].get('conference_call')
                        });

                        fields = Ext.ComponentQuery.query('viewSummaryLinked');
                        fields[0].setValue({
                            'summaryLinked': records[0].get('linked')
                        });

                        fields = Ext.ComponentQuery.query('viewSummaryLinkType');
                        fields[0].setValue(records[0].get('link_type'));

                        //smm (9-18-12)
                        fields = Ext.ComponentQuery.query('viewSummaryProjectDependencies');
                        fields[0].setValue(records[0].get('project_dependencies'));

                        fields = Ext.ComponentQuery.query('viewSummaryProjectDescription');
                        fields[0].setValue(records[0].get('description'));

                        fields = Ext.ComponentQuery.query('viewSummaryProjectNextSteps');
                        fields[0].setValue(records[0].get('next_steps'));

                        fields = Ext.ComponentQuery.query('viewSummaryDocumentationVisio');
                        var radioValue = parseInt(records[0].get('doc_visio'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVisio1: true,
                                    summaryDocumentationVisio2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVisio1: false,
                                    summaryDocumentationVisio2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVisio1: true,
                                    summaryDocumentationVisio2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVisio1: false,
                                    summaryDocumentationVisio2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryDocumentationVUI');
                        radioValue = parseInt(records[0].get('doc_vui'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVUI1: true,
                                    summaryDocumentationVUI2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVUI1: false,
                                    summaryDocumentationVUI2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVUI1: true,
                                    summaryDocumentationVUI2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryDocumentationVUI1: false,
                                    summaryDocumentationVUI2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryDocumentationOther');
                        radioValue = parseInt(records[0].get('doc_other'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryDocumentationOther1: true,
                                    summaryDocumentationOther2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryDocumentationOther1: false,
                                    summaryDocumentationOther2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryDocumentationOther1: true,
                                    summaryDocumentationOther2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryDocumentationOther1: false,
                                    summaryDocumentationOther2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryDocumentationDecommission');
                        radioValue = parseInt(records[0].get('doc_decommission'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryDocumentationDecommission1: true,
                                    summaryDocumentationDecommission2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryDocumentationDecommission1: false,
                                    summaryDocumentationDecommission2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryDocumentationDecommission1: true,
                                    summaryDocumentationDecommission2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryDocumentationDecommission1: false,
                                    summaryDocumentationDecommission2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryApplication');
                        radioValue = parseInt(records[0].get('application'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryApplication1: true,
                                    summaryApplication2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryApplication1: false,
                                    summaryApplication2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryApplication1: true,
                                    summaryApplication2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryApplication1: false,
                                    summaryApplication2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryApplicationDecommission');
                        radioValue = parseInt(records[0].get('application_decommission'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryApplicationDecommission1: true,
                                    summaryApplicationDecommission2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryApplicationDecommission1: false,
                                    summaryApplicationDecommission2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryApplicationDecommission1: true,
                                    summaryApplicationDecommission2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryApplicationDecommission1: false,
                                    summaryApplicationDecommission2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryParm');
                        radioValue = parseInt(records[0].get('parm'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryParm1: true,
                                    summaryParm2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryParm1: false,
                                    summaryParm2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryParm1: true,
                                    summaryParm2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryParm1: false,
                                    summaryParm2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryParmDecommission');
                        radioValue = parseInt(records[0].get('parm_decommission'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryParmDecommission1: true,
                                    summaryParmDecommission2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryParmDecommission1: false,
                                    summaryParmDecommission2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryParmDecommission1: true,
                                    summaryParmDecommission2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryParmDecommission1: false,
                                    summaryParmDecommission2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryReportingButton');
                        radioValue = parseInt(records[0].get('reporting_button'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryReportingButton1: true,
                                    summaryReportingButton2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryReportingButton1: false,
                                    summaryReportingButton2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryReportingButton1: true,
                                    summaryReportingButton2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryReportingButton1: false,
                                    summaryReportingButton2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryReportingOther');
                        radioValue = parseInt(records[0].get('reporting_other'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryReportingOther1: true,
                                    summaryReportingOther2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryReportingOther1: false,
                                    summaryReportingOther2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryReportingOther1: true,
                                    summaryReportingOther2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryReportingOther1: false,
                                    summaryReportingOther2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryReportingVision');
                        radioValue = parseInt(records[0].get('reporting_vision'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryReportingVision1: true,
                                    summaryReportingVision2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryReportingVision1: false,
                                    summaryReportingVision2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryReportingVision1: true,
                                    summaryReportingVision2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryReportingVision1: false,
                                    summaryReportingVision2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryReportingDecommission');
                        radioValue = parseInt(records[0].get('reporting_decommission'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryReportingDecommission1: true,
                                    summaryReportingDecommission2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryReportingDecommission1: false,
                                    summaryReportingDecommission2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryReportingDecommission1: true,
                                    summaryReportingDecommission2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryReportingDecommission1: false,
                                    summaryReportingDecommission2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesXlsCsv');
                        radioValue = parseInt(records[0].get('tables_xls_csv'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesXlsCsv1: true,
                                    summaryTablesXlsCsv2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesXlsCsv1: false,
                                    summaryTablesXlsCsv2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesXlsCsv1: true,
                                    summaryTablesXlsCsv2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesXlsCsv1: false,
                                    summaryTablesXlsCsv2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesMetafile');
                        radioValue = parseInt(records[0].get('tables_metafile'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesMetafile1: true,
                                    summaryTablesMetafile2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesMetafile1: false,
                                    summaryTablesMetafile2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesMetafile1: true,
                                    summaryTablesMetafile2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesMetafile1: false,
                                    summaryTablesMetafile2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesDefFile');
                        radioValue = parseInt(records[0].get('tables_def_file'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesDefFile1: true,
                                    summaryTablesDefFile2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesDefFile1: false,
                                    summaryTablesDefFile2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesDefFile1: true,
                                    summaryTablesDefFile2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesDefFile1: false,
                                    summaryTablesDefFile2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesUsanUpdateLoad');
                        radioValue = parseInt(records[0].get('tables_usan_update_load'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesUsanUpdateLoad1: true,
                                    summaryTablesUsanUpdateLoad2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesUsanUpdateLoad1: false,
                                    summaryTablesUsanUpdateLoad2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesUsanUpdateLoad1: true,
                                    summaryTablesUsanUpdateLoad2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesUsanUpdateLoad1: false,
                                    summaryTablesUsanUpdateLoad2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesCustomerUpdateUsanLoad');
                        radioValue = parseInt(records[0].get('tables_customer_update_usan_load'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateUsanLoad1: true,
                                    summaryTablesCustomerUpdateUsanLoad2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateUsanLoad1: false,
                                    summaryTablesCustomerUpdateUsanLoad2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateUsanLoad1: true,
                                    summaryTablesCustomerUpdateUsanLoad2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateUsanLoad1: false,
                                    summaryTablesCustomerUpdateUsanLoad2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesCustomerUpdateLoad');
                        radioValue = parseInt(records[0].get('tables_customer_update_load'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateLoad1: true,
                                    summaryTablesCustomerUpdateLoad2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateLoad1: false,
                                    summaryTablesCustomerUpdateLoad2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateLoad1: true,
                                    summaryTablesCustomerUpdateLoad2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesCustomerUpdateLoad1: false,
                                    summaryTablesCustomerUpdateLoad2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTablesDecommission');
                        radioValue = parseInt(records[0].get('tables_decommission'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTablesDecommission1: true,
                                    summaryTablesDecommission2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTablesDecommission1: false,
                                    summaryTablesDecommission2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTablesDecommission1: true,
                                    summaryTablesDecommission2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTablesDecommission1: false,
                                    summaryTablesDecommission2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryPromptsStandard');
                        radioValue = parseInt(records[0].get('prompts_standard'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryPromptsStandard1: true,
                                    summaryPromptsStandard2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryPromptsStandard1: false,
                                    summaryPromptsStandard2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryPromptsStandard1: true,
                                    summaryPromptsStandard2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryPromptsStandard1: false,
                                    summaryPromptsStandard2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryPromptsNLU');
                        radioValue = parseInt(records[0].get('prompts_nlu'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryPromptsNLU1: true,
                                    summaryPromptsNLU2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryPromptsNLU1: false,
                                    summaryPromptsNLU2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryPromptsNLU1: true,
                                    summaryPromptsNLU2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryPromptsNLU1: false,
                                    summaryPromptsNLU2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryRoutingNew800Nums');
                        radioValue = parseInt(records[0].get('routing_new_800_nums'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryRoutingNew800Nums1: true,
                                    summaryRoutingNew800Nums2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryRoutingNew800Nums1: false,
                                    summaryRoutingNew800Nums2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryRoutingNew800Nums1: true,
                                    summaryRoutingNew800Nums2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryRoutingNew800Nums1: false,
                                    summaryRoutingNew800Nums2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryRoutingRemove800Nums');
                        radioValue = parseInt(records[0].get('routing_remove_800_nums'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryRoutingRemove800Nums1: true,
                                    summaryRoutingRemove800Nums2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryRoutingRemove800Nums1: false,
                                    summaryRoutingRemove800Nums2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryRoutingRemove800Nums1: true,
                                    summaryRoutingRemove800Nums2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryRoutingRemove800Nums1: false,
                                    summaryRoutingRemove800Nums2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryRoutingRedirect800Nums');
                        radioValue = parseInt(records[0].get('routing_redirect_800_nums'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryRoutingRedirect800Nums1: true,
                                    summaryRoutingRedirect800Nums2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryRoutingRedirect800Nums1: false,
                                    summaryRoutingRedirect800Nums2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryRoutingRedirect800Nums1: true,
                                    summaryRoutingRedirect800Nums2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryRoutingRedirect800Nums1: false,
                                    summaryRoutingRedirect800Nums2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryRoutingDAPSS7');
                        radioValue = parseInt(records[0].get('routing_dap_ss7'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryRoutingDAPSS71: true,
                                    summaryRoutingDAPSS72: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryRoutingDAPSS71: false,
                                    summaryRoutingDAPSS72: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryRoutingDAPSS71: true,
                                    summaryRoutingDAPSS72: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryRoutingDAPSS71: false,
                                    summaryRoutingDAPSS72: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTraffic');
                        radioValue = parseInt(records[0].get('traffic'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTraffic1: true,
                                    summaryTraffic2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTraffic1: false,
                                    summaryTraffic2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTraffic1: true,
                                    summaryTraffic2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTraffic1: false,
                                    summaryTraffic2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryScraper');
                        radioValue = parseInt(records[0].get('scraper'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryScraper1: true,
                                    summaryScraper2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryScraper1: false,
                                    summaryScraper2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryScraper1: true,
                                    summaryScraper2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryScraper1: false,
                                    summaryScraper2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryNewTranType');
                        radioValue = parseInt(records[0].get('new_tran_type'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryNewTranType1: true,
                                    summaryNewTranType2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryNewTranType1: false,
                                    summaryNewTranType2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryNewTranType1: true,
                                    summaryNewTranType2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryNewTranType1: false,
                                    summaryNewTranType2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryEngine');
                        radioValue = parseInt(records[0].get('engine'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryEngine1: true,
                                    summaryEngine2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryEngine1: false,
                                    summaryEngine2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryEngine1: true,
                                    summaryEngine2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryEngine1: false,
                                    summaryEngine2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryGrammarsStandard');
                        radioValue = parseInt(records[0].get('grammars_standard'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryGrammarsStandard1: true,
                                    summaryGrammarsStandard2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryGrammarsStandard1: false,
                                    summaryGrammarsStandard2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryGrammarsStandard1: true,
                                    summaryGrammarsStandard2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryGrammarsStandard1: false,
                                    summaryGrammarsStandard2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryGrammarsVXML');
                        radioValue = parseInt(records[0].get('grammars_vxml'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryGrammarsVXML1: true,
                                    summaryGrammarsVXML2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryGrammarsVXML1: false,
                                    summaryGrammarsVXML2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryGrammarsVXML1: true,
                                    summaryGrammarsVXML2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryGrammarsVXML1: false,
                                    summaryGrammarsVXML2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryBackOfficeDB');
                        radioValue = parseInt(records[0].get('backoffice_db'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeDB1: true,
                                    summaryBackOfficeDB2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeDB1: false,
                                    summaryBackOfficeDB2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeDB1: true,
                                    summaryBackOfficeDB2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeDB1: false,
                                    summaryBackOfficeDB2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryBackOfficeProcess');
                        radioValue = parseInt(records[0].get('backoffice_process'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeProcess1: true,
                                    summaryBackOfficeProcess2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeProcess1: false,
                                    summaryBackOfficeProcess2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeProcess1: true,
                                    summaryBackOfficeProcess2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeProcess1: false,
                                    summaryBackOfficeProcess2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryBackOfficeWebServices');
                        radioValue = parseInt(records[0].get('backoffice_webservices'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeWebServices1: true,
                                    summaryBackOfficeWebServices2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeWebServices1: false,
                                    summaryBackOfficeWebServices2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeWebServices1: true,
                                    summaryBackOfficeWebServices2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryBackOfficeWebServices1: false,
                                    summaryBackOfficeWebServices2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryNetworkFileTransfer');
                        radioValue = parseInt(records[0].get('network_file_transfer'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryNetworkFileTransfer1: true,
                                    summaryNetworkFileTransfer2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryNetworkFileTransfer1: false,
                                    summaryNetworkFileTransfer2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryNetworkFileTransfer1: true,
                                    summaryNetworkFileTransfer2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryNetworkFileTransfer1: false,
                                    summaryNetworkFileTransfer2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryNetworkInfrastructure');
                        radioValue = parseInt(records[0].get('network_infrastructure'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryNetworkInfrastructure1: true,
                                    summaryNetworkInfrastructure2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryNetworkInfrastructure1: false,
                                    summaryNetworkInfrastructure2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryNetworkInfrastructure1: true,
                                    summaryNetworkInfrastructure2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryNetworkInfrastructure1: false,
                                    summaryNetworkInfrastructure2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryHostConnectivity');
                        radioValue = parseInt(records[0].get('host_connectivity'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryHostConnectivity1: true,
                                    summaryHostConnectivity2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryHostConnectivity1: false,
                                    summaryHostConnectivity2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryHostConnectivity1: true,
                                    summaryHostConnectivity2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryHostConnectivity1: false,
                                    summaryHostConnectivity2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryHostWSDL');
                        radioValue = parseInt(records[0].get('host_wsdl'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryHostWSDL1: true,
                                    summaryHostWSDL2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryHostWSDL1: false,
                                    summaryHostWSDL2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryHostWSDL1: true,
                                    summaryHostWSDL2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryHostWSDL1: false,
                                    summaryHostWSDL2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTNTFunctionality');
                        radioValue = parseInt(records[0].get('tnt'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTNTFunctionality1: true,
                                    summaryTNTFunctionality2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTNTFunctionality1: false,
                                    summaryTNTFunctionality2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTNTFunctionality1: true,
                                    summaryTNTFunctionality2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTNTFunctionality1: false,
                                    summaryTNTFunctionality2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryTTSFunctionality');
                        radioValue = parseInt(records[0].get('tts'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryTTSFunctionality1: true,
                                    summaryTTSFunctionality2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryTTSFunctionality1: false,
                                    summaryTTSFunctionality2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryTTSFunctionality1: true,
                                    summaryTTSFunctionality2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryTTSFunctionality1: false,
                                    summaryTTSFunctionality2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummarySpeechRecognition');
                        radioValue = parseInt(records[0].get('speech_rec'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summarySpeechRecognition1: true,
                                    summarySpeechRecognition2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summarySpeechRecognition1: false,
                                    summarySpeechRecognition2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summarySpeechRecognition1: true,
                                    summarySpeechRecognition2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summarySpeechRecognition1: false,
                                    summarySpeechRecognition2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryUUI');
                        radioValue = parseInt(records[0].get('uui'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryUUI1: true,
                                    summaryUUI2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryUUI1: false,
                                    summaryUUI2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryUUI1: true,
                                    summaryUUI2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryUUI1: false,
                                    summaryUUI2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryReadi800');
                        radioValue = parseInt(records[0].get('readi800'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryReadi8001: true,
                                    summaryReadi8002: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryReadi8001: false,
                                    summaryReadi8002: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryReadi8001: true,
                                    summaryReadi8002: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryReadi8001: false,
                                    summaryReadi8002: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryAccessUSANAccessUser');
                        radioValue = parseInt(records[0].get('access_usan_user_access'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryAccessUSANAccessUser1: true,
                                    summaryAccessUSANAccessUser2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryAccessUSANAccessUser1: false,
                                    summaryAccessUSANAccessUser2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryAccessUSANAccessUser1: true,
                                    summaryAccessUSANAccessUser2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryAccessUSANAccessUser1: false,
                                    summaryAccessUSANAccessUser2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryNuanceDevelopment');
                        radioValue = parseInt(records[0].get('nuance_development'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryNuanceDevelopment1: true,
                                    summaryNuanceDevelopment2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryNuanceDevelopment1: false,
                                    summaryNuanceDevelopment2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryNuanceDevelopment1: true,
                                    summaryNuanceDevelopment2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryNuanceDevelopment1: false,
                                    summaryNuanceDevelopment2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryNuanceNDM');
                        radioValue = parseInt(records[0].get('nuance_ndm'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryNuanceNDM1: true,
                                    summaryNuanceNDM2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryNuanceNDM1: false,
                                    summaryNuanceNDM2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryNuanceNDM1: true,
                                    summaryNuanceNDM2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryNuanceNDM1: false,
                                    summaryNuanceNDM2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryServiceID');
                        radioValue = parseInt(records[0].get('service_id'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryServiceID1: true,
                                    summaryServiceID2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryServiceID1: false,
                                    summaryServiceID2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryServiceID1: true,
                                    summaryServiceID2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryServiceID1: false,
                                    summaryServiceID2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryBisoApproval');
                        radioValue = parseInt(records[0].get('biso_approval'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryBisoApproval1: true,
                                    summaryBisoApproval2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryBisoApproval1: false,
                                    summaryBisoApproval2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryBisoApproval1: true,
                                    summaryBisoApproval2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryBisoApproval1: false,
                                    summaryBisoApproval2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryOther');
                        radioValue = parseInt(records[0].get('other'));
                        switch (radioValue) {
                        case 1:
                            {
                                fields[0].setValue({
                                    summaryOther1: true,
                                    summaryOther2: false
                                });
                                break;
                            }
                        case 2:
                            {
                                fields[0].setValue({
                                    summaryOther1: false,
                                    summaryOther2: true
                                });
                                break;
                            }
                        case 3:
                            {
                                fields[0].setValue({
                                    summaryOther1: true,
                                    summaryOther2: true
                                });
                                break;
                            }
                        case 0:
                        default:
                            {
                                fields[0].setValue({
                                    summaryOther1: false,
                                    summaryOther2: false
                                });
                            }
                        }

                        fields = Ext.ComponentQuery.query('viewSummaryProjectFolder');
                        fields[0].setValue(records[0].get('project_folder'));

                        fields = Ext.ComponentQuery.query('viewSummaryLinkedProjects');
                        fields[0].setValue(records[0].get('linked_projects'));
                    }
                }
                //2b. ProjectInformations store contains a callback method to load ProjectContacts Store
                doSummaryLoadingPart2(PROJECT_SPECIFIED);
            }
        });
    }
}

function doSummaryLoadingPart2(PROJECT_SPECIFIED) {
    // 3a. ProjectContacts store is triggered by ProjectInformations Store callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectContacts');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (success && (records.length > 0)) {
                    for (i in records) {
                        var type = records[i].get('type');
                        var fields;
                        var value;

                        switch (type) {
                        case 'USAN Developer':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanDeveloper');
                            break;

                        case 'USAN QA':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanQA');
                            break;

                        case 'USAN TC':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanTC');
                            break;

                        case 'USAN Dev Manager':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanDevManager');
                            break;

                        case 'USAN Dev PM':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanDevPM');
                            break;

                        case 'USAN BA':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanBA');
                            break;

                        case 'USAN MIS':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanMIS');
                            break;

                        case 'USAN Ops PM':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanOpsPM');
                            break;

                        case 'USAN TLS-IP':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanTLSIP');
                            break;

                        case 'USAN TLS-SaaS':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanTLSSaaS');
                            break;

                        case 'USAN OSG':
                            //ah 3-15-13
                            fields = Ext.ComponentQuery.query('viewSummaryUsanOSG');
                            break;

                        case 'USAN Network Ops':
                            //ah 3-15-13
                            fields = Ext.ComponentQuery.query('viewSummaryUsanNetworkOps');
                            break;

                        case 'Customer RFQ':
                            fields = Ext.ComponentQuery.query('viewSummaryCustomerRFQ');
                            break;

                        case 'Customer PM':
                            fields = Ext.ComponentQuery.query('viewSummaryCustomerPM');
                            break;

                        case 'Customer Testing':
                            fields = Ext.ComponentQuery.query('viewSummaryCustomerTesting');
                            break;

                        case 'Customer Host':
                            fields = Ext.ComponentQuery.query('viewSummaryCustomerHost');
                            break;

                        case 'Customer TC':
                            fields = Ext.ComponentQuery.query('viewSummaryCustomerTC');
                            break;

                        case 'USAN Systems Engineer':
                            fields = Ext.ComponentQuery.query('viewSummaryUsanSystemsEngineer');
                            break;

                        } //end switch
                        value = fields[0].getValue();
                        //console.log(value);
                        value.push(records[i].get('name'));
                        //console.log("pushed: " + value);

                        fields[0].select(value);

                    } // end for
                }
            }
            //3b. ProjectContacts store contains a callback method to load ProjectStatus and ProjectHistories stores
            doSummaryLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doSummaryLoadingPart3(PROJECT_SPECIFIED) {
    //4a. ProjectStatus and ProjectHistories stores triggered by ProjectContacts store callback method
    store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectStatuses');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (success && (records.length > 0)) {
                    if (store.getCount() > 0) {
                        if (store.getAt(0)) {
                            if (store.getAt(0).get('date')) {
                                store.sort('date', 'DESC');
                                var fields = Ext.ComponentQuery.query('viewSummaryProjectStatus');
                                var currentStatus = GLOBAL_currentController.getController('Cookbook').getStore('ProjectInformations').getAt(0).get('current_project_status');
                                if (Ext.isEmpty(currentStatus) || currentStatus.length < 1 || currentStatus == "" || currentStatus == undefined || currentStatus == null) {
                                    fields[0].setValue(store.getAt(0).get('type'));
                                } else {
                                    fields[0].setValue(currentStatus);
                                }
                                //console.log('% ' + store.getAt(0).get('type'));
                            }
                        }
                    }
                }
            } /* Load ProjectHistory data for the Summary tab */
            var readOnly = false;
            if (GLOBAL_readonly || (GLOBAL_permission == "RDO")) {
                readOnly = true;
            }
            store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectHistories');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.proxy.extraParams.read_only = readOnly; //smm
            store.load({
                callback: function(records, operation, success) {
                    store.sort('date', 'DESC');
                    doSummaryLoadingPart4(PROJECT_SPECIFIED); //
                }
            });
        }
    });
}

function doSummaryLoadingPart4(PROJECT_SPECIFIED) {
    store = GLOBAL_currentController.getController('Cookbook').getStore('BusinessUnits');
    store.load({
        callback: function(records, operation, success) {
            store = GLOBAL_currentController.getController('Cookbook').getStore('Applications');
            store.load({
                callback: function(records, operation, success) {
                    GLOBAL_currentController.getStore("Applications").sort('name', 'ASC');
                    doStagingFolderMenuLinksLoadingSummary(PROJECT_SPECIFIED);
                }
            });
        }
    });
}

function doStagingFolderMenuLinksLoadingSummary(PROJECT_SPECIFIED) {
    //this function is NOT called by uat/buffet tabs!! ONLY summary loading!!
    var controller = GLOBAL_currentController.getController('Cookbook');
    var uatMenuLabel = Ext.ComponentQuery.query('#uatProdInstallLinkLabel')[0];
    var prodMenuLabel = Ext.ComponentQuery.query('#buffetProdInstallLinkLabel')[0];
    var uatmenu = Ext.ComponentQuery.query('#uatProdInstallLinkMenu')[0];
    var prodmenu = Ext.ComponentQuery.query('#buffetProdInstallLinkMenu')[0];
    uatmenu.removeAll();
    prodmenu.removeAll();
    uatMenuLabel.disable();
    prodMenuLabel.disable();
    if (PROJECT_SPECIFIED != null && PROJECT_SPECIFIED != undefined) {
        var store = GLOBAL_currentController.getController('Cookbook').getStore('StagingFolders');
        store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
        var fields;
        store.load({
            callback: function(records, operation, success) {
                if (records) {
                    if (success && (records.length > 0)) {
                        for (i in records) {
                            if (records[i].get('type') == 'uat' || records[i].get('type') == 'prod' || records[i].get('type') == 'soak') {
                                if (records[i].get('notes') != null && records[i].get('notes') != undefined && records[i].get('notes') != '') {
                                    uatMenuLabel.enable();
                                    var folder = records[i].get('folder');
                                    uatmenu.add([{
                                        text: records[i].get('notes'),
                                        handler: function() {
                                            var thisValue = this.text;
                                            var store = GLOBAL_currentController.getController('Cookbook').getStore('StagingFolders');
                                            var indexOfRecord = store.find('notes', thisValue);
                                            var record = store.findRecord('notes', thisValue);
                                            if (record.get('is_buffet') != false) {
                                                record = store.findRecord('notes', thisValue, indexOfRecord + 1);
                                            }
                                            GLOBAL_currentController.openOpsExplorerWindow(null, null, null, record.get('folder'));
                                            //window.open(record.get('folder'), '_blank');
                                        }
                                    }]);
                                }
                            } else {
                                if (records[i].get('notes') != null && records[i].get('notes') != undefined && records[i].get('notes') != '') {
                                    prodMenuLabel.enable();
                                    var folder = records[i].get('folder');
                                    prodmenu.add([{
                                        text: records[i].get('notes'),
                                        handler: function() {
                                            var thisValue = this.text;
                                            var store = GLOBAL_currentController.getController('Cookbook').getStore('StagingFolders');
                                            var indexOfRecord = store.find('notes', thisValue);
                                            var record = store.findRecord('notes', thisValue);
                                            if (record.get('is_buffet') == false) {
                                                record = store.findRecord('notes', thisValue, indexOfRecord + 1);
                                            }
                                            GLOBAL_currentController.openOpsExplorerWindow(null, null, null, record.get('folder'));
                                            //window.open(record.get('folder'), '_blank');
                                        }
                                    }]);
                                }
                            }
                        }
                    }
                }
                doMiscLoading(PROJECT_SPECIFIED);
            }
        });
    }
}

function doMiscLoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * Order of events:
     * 1. THIS METHOD IS CALLED FROM doSummaryLoading - Page is already Masked!!
     * 2. Call to MISUpdates to store GLOBAL_currentProjectOpenMISUpdatesID
     * 3. Call to MISNew to store GLOBAL_currentProjectOpenMISNewID
     * 4. Page is unmasked
     */
    doMiscLoadingPart2(PROJECT_SPECIFIED);
}

function doMiscLoadingPart2(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('MISUpdates');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var misUpdateID = records[0].get('mis_update_id');
                    GLOBAL_currentProjectOpenMISUpdatesID = misUpdateID;
                }
            }
            doMiscLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doMiscLoadingPart3(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('MISNew');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var misNewID = records[0].get('mis_new_id');
                    GLOBAL_currentProjectOpenMISNewID = misNewID;
                }
            }
            Ext.getBody().unmask();
        }
    });
}

function doRequirementsLoading(PROJECT_SPECIFIED) {
    /*
     * UPDATED FUNCTION -
     *
     * called in succession!
     *
     * 1. Documentation
     * 2. Application
     * 3. Table
     * 4. Scraper
     * 5. Engine
     * 6. Manager
     * 7. Grammar
     * 8. VXML
     * 9. BackOfficeDB
     * 10. BackOfficeProcess
     * 11. BackOfficeWebservice
     * 12. Configuration File
     * 13. Fax Form
     * 14. FileXferUpload
     * 15. FileXferDownload
     * 16. TTS Functionality
     * 17. TNT Functionality
     * 18. Speech Recognition
     * 19. UUI
     * 20. Service ID
     * 21. Other
     * 22. Routing - THIS CALLS doStagingFolderMenuLinksLoadingSummary!
     */
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasRequirementsTabBeenLoaded != true) {
            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                readOnly = true;
            }
            var controller = GLOBAL_currentController.getController('Cookbook');
            var store = GLOBAL_currentController.getStore("DocumentationRequirements");
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.read_only = readOnly; //smm
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            if (readOnly) {
                Ext.ComponentQuery.query('viewReqDocumentation')[0].on('beforeedit', function(plugin, edit) {
                    return false;
                });
            }
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            var grid = Ext.ComponentQuery.query('viewReqDocumentation');
                            grid[0].expand(true);
                            //grid[0].collapsed = false;
                        }
                    }

                    doRequirementsLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('req tab already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doRequirementsLoadingPart2(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("ApplicationRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqApplication')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqApplication');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart3(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("TableRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqTable')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqTable');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart4(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart4(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("ScraperRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqScraper')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqScraper');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart5(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart5(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("EngineRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqEngine')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqEngine');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart6(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart6(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("ManagerRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqManager')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqManager');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart7(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart7(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("GrammarRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqGrammar')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqGrammar');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart8(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart8(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("VXMLRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqVXML')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqVXML');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart9(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart9(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("BackofficeDBRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqBackOfficeDB')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqBackOfficeDB');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart10(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart10(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("BackofficeProcessRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqBackOfficeProcess')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqBackOfficeProcess');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart11(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart11(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("BackofficeWebserviceRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqBackOfficeWebSvc')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqBackOfficeWebSvc');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart12(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart12(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("ConfigFileRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqConfigurationFile')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqConfigurationFile');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart13(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart13(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("FaxFormRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqFaxForm')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqFaxForm');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart14(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart14(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("FileXferRequirementUploads");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqFileXferUpload')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqFileXferUpload');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart15(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart15(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("FileXferRequirementDownloads");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqFileXferDownload')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqFileXferDownload');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart16(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart16(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("TTSFunctionalityRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqTTSFunctionality')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqTTSFunctionality');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart17(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart17(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("TNTFunctionalityRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqTNTFunctionality')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqTNTFunctionality');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart18(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart18(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("SpeechRecognitionRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqSpeechRecognition')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqSpeechRecognition');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart19(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart19(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("UUIRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqUUI')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqUUI');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart20(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart20(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("ServiceIDRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqServiceID')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqServiceID');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart21(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart21(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("OtherRequirements");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqOther')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqOther');
                    grid[0].expand(true);
                }
            }

            doRequirementsLoadingPart22(PROJECT_SPECIFIED);
        }
    });
}

function doRequirementsLoadingPart22(PROJECT_SPECIFIED) {
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = GLOBAL_currentController.getStore("RequirementsTabRoutings");
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
    if (readOnly) {
        Ext.ComponentQuery.query('viewReqRouting')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var grid = Ext.ComponentQuery.query('viewReqRouting');
                    grid[0].expand(true);
                }
            }

            doRequirementsTabLoading(PROJECT_SPECIFIED)
        }
    });
}

function doPromptsLoading(PROJECT_SPECIFIED) {
    //UPDATE - THIS FUNCTION IS NOW CALLED FROM DOMISCGRIDSLOADING!!

    /*UPDATED FUNCTION:
     * doPromptsLoading//doPromptsLoadingPart2//doPromptsLoadingPart3//doPromptsLoadingPart4
     *
     * Order of events - function name:
     * 1. Page is masked - doPromptsLoading
     * 2a. Call to Languages store to load - doPromptsLoading
     *      2b. Languages store contains a callback method to load PromptWorksheets Store
     * 3a. PromptWorksheets store load triggered from Languages callback method - doPromptsLoadingPart2
     *      3b. PromptWorksheets store contains a callback method to load PromptDetails Store
     * 4a. PromptDetails store load triggered from PromptWorksheets callback method - doPromptsLoadingPart3
     *      4b. PromptDetails store contains a callback method to load GMVoicePromptDetails Store
     * 5a. GMVoicePromptDetails store load triggered from PromptDetails callback method - doPromptsLoadingPart4
     *      5b. GMVoicePromptDetails store contains a callback method to unmask page
     * 6. Page is unmasked triggered from GMVoicePromptDetails callback method - doPromptsLoadingPart4
     */
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasPromptsTabBeenLoaded != true) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to Languages store to load
            controller.getStore("Languages").load({
                callback: function(records, operation, success) {
                    //Languages store contains a callback method to load PromptWorksheets Store
                    doPromptsLoadingPart2(PROJECT_SPECIFIED);
                }
            })
        } else {
            console.log('prompts has already been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doPromptsLoadingPart2(PROJECT_SPECIFIED) {
    //3a. PromptWorksheets store load triggered from Languages callback method
    /* Load PromptWorksheet data */
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('PromptWorksheets');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if ((records.length > 0) && success) {
                    fields = Ext.ComponentQuery.query('viewPromptsPromptWorksheet');
                    fields[0].setValue(records[0].get('prompt_worksheet'));

                    fields = Ext.ComponentQuery.query('viewPromptsSummary');
                    fields[0].setValue(records[0].get('prompt_summary'));

                    fields = Ext.ComponentQuery.query('viewPromptsPONum');
                    fields[0].setValue(records[0].get('po_num'));

                    fields = Ext.ComponentQuery.query('viewPromptsGreatVoiceCDFee');
                    fields[0].setValue(records[0].get('great_voice_cd_fee'));

                    fields = Ext.ComponentQuery.query('viewPromptsGreatVoiceTotalFee');
                    fields[0].setValue(records[0].get('great_voice_total_fee'));

                    fields = Ext.ComponentQuery.query('viewPromptsGMVoicesTotalFee');
                    fields[0].setValue(records[0].get('gm_voices_total_fee'));
                }
            }
            //3b. PromptWorksheets store contains a callback method to load PromptDetails Store
            doPromptsLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doPromptsLoadingPart3(PROJECT_SPECIFIED) {
    //4a. PromptDetails store load triggered from PromptWorksheets callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    var promptsLoaded = 0;
    var store = controller.getStore('PromptDetails');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if ((records.length > 0) && success) {

                var panel = Ext.ComponentQuery.query('#blahblah');

                for (i = 0; i < records.length; i++) {
                    panel[0].add(Ext.create('widget.viewPromptsPanels'));
                }

                var language = Ext.ComponentQuery.query('#viewPromptsLangOneLanguage');
                var promptsRecorded = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeRecorded');
                var promptsBilled = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeBilled');
                var promptsProvided = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsProvidedByCustomer');
                var minFee = Ext.ComponentQuery.query('#viewPromptsLangOneMinimumFee');
                var numWords = Ext.ComponentQuery.query('#viewPromptsLangOneNumWords');
                var orderType = Ext.ComponentQuery.query('#viewPromptsLangOneOrderType');
                var recordingSessions = Ext.ComponentQuery.query('#viewPromptsLangOneRecordingSessions');
                var recordingStudio = Ext.ComponentQuery.query('#viewPromptsLangOneRecordingStudio');
                var promptsConverted = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeConverted');
                var conversionSessions = Ext.ComponentQuery.query('#viewPromptsLangOneConversionSessions');
                var promptsDigitized = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeDigitized');
                var feeRequired = Ext.ComponentQuery.query('#viewPromptsLangOneTransferFeeRequired');
                var cdRequired = Ext.ComponentQuery.query('#viewPromptsLangOneCDRequired');
                var cdMailingAddress = Ext.ComponentQuery.query('#viewPromptsLangOneCDMailingAddress');
                var promptFormat = Ext.ComponentQuery.query('#viewPromptsLangOnePromptFormat');
                var needsApproval = Ext.ComponentQuery.query('#viewPromptsLangOneTranslationNeedsApproval');
                var feeFormula = Ext.ComponentQuery.query('#viewPromptsLangOneFeeFormula');
                var setupFee = Ext.ComponentQuery.query('#viewPromptsLangOneSetupFee');
                var promptFee = Ext.ComponentQuery.query('#viewPromptsLangOnePromptFee');
                var conversionSetupFee = Ext.ComponentQuery.query('#viewPromptsLangOneConversionSetupFee');
                var conversionPromptFee = Ext.ComponentQuery.query('#viewPromptsLangOneConversionPromptFee');
                var feeMin = Ext.ComponentQuery.query('#viewPromptsLangOneTranslationFeeMinimum');
                var feePerWord = Ext.ComponentQuery.query('#viewPromptsLangOneTranslationFeePerWord');
                var transferFee = Ext.ComponentQuery.query('#viewPromptsLangOneTransferFee');
                //var cdFee = Ext.ComponentQuery.query('#viewPromptsLangOneCDFee');
                var totalRecordingFee = Ext.ComponentQuery.query('#viewPromptsLangOneTotalRecordingFee');
                var convertedPromptFormat = Ext.ComponentQuery.query('#viewPromptsLangOneConvertedPromptFormat');

                for (i in records) {
                    language[i].setValue(records[i].get('language'));
                    promptsRecorded[i].setValue(records[i].get('prompts_recorded'));
                    promptsBilled[i].setValue(records[i].get('prompts_billed'));
                    promptsProvided[i].setValue(records[i].get('prompts_provided'));
                    minFee[i].setValue(records[i].get('min_fee'));
                    numWords[i].setValue(records[i].get('num_words'));
                    orderType[i].setValue(records[i].get('order_type'));
                    recordingSessions[i].setValue(records[i].get('recording_sessions'));
                    recordingStudio[i].setValue(records[i].get('recording_studio'));
                    promptsConverted[i].setValue(records[i].get('prompts_converted'));
                    conversionSessions[i].setValue(records[i].get('conversion_sessions'));
                    promptsDigitized[i].setValue(records[i].get('prompts_digitized'));
                    feeRequired[i].setValue(records[i].get('fee_required'));
                    cdRequired[i].setValue(records[i].get('cd_required'));
                    cdMailingAddress[i].setValue(records[i].get('cd_mailing_address'));
                    promptFormat[i].setValue(records[i].get('prompt_format'));
                    needsApproval[i].setValue(records[i].get('needs_approval'));
                    feeFormula[i].setValue(records[i].get('fee_formula'));
                    setupFee[i].setValue(records[i].get('setup_fee'));
                    promptFee[i].setValue(records[i].get('prompt_fee'));
                    conversionSetupFee[i].setValue(records[i].get('conversion_setup_fee'));
                    conversionPromptFee[i].setValue(records[i].get('conversion_prompt_fee'));
                    feeMin[i].setValue(records[i].get('fee_min'));
                    feePerWord[i].setValue(records[i].get('fee_per_word'));
                    transferFee[i].setValue(records[i].get('transfer_fee'));
                    //cdFee[i].setValue(records[i].get('cd_fee'));
                    totalRecordingFee[i].setValue(records[i].get('total_recording_fee'));
                    convertedPromptFormat[i].setValue(records[i].get('converted_prompt_format'));
                }

                for (i in language) {
                    language[i].on('change', language[i].up('panel').updatePromptDetails, language[i], {
                        buffer: 2000
                    });
                    promptsRecorded[i].on('change', promptsRecorded[i].up('panel').promptsRecordedChange, promptsRecorded[i]); //, {buffer: 2000});
                    promptsBilled[i].on('change', promptsBilled[i].up('panel').updatePromptDetails, promptsBilled[i], {
                        buffer: 2000
                    });
                    promptsProvided[i].on('change', promptsProvided[i].up('panel').updatePromptDetails, promptsProvided[i], {
                        buffer: 2000
                    });
                    minFee[i].on('change', minFee[i].up('panel').updatePromptDetails, minFee[i], {
                        buffer: 2000
                    });
                    numWords[i].on('change', numWords[i].up('panel').updatePromptDetails, numWords[i], {
                        buffer: 2000
                    });
                    orderType[i].on('change', orderType[i].up('panel').updatePromptDetails, orderType[i], {
                        buffer: 2000
                    });
                    recordingSessions[i].on('change', recordingSessions[i].up('panel').updatePromptDetails, recordingSessions[i], {
                        buffer: 2000
                    });
                    recordingStudio[i].on('change', recordingStudio[i].up('panel').updatePromptDetails, recordingStudio[i], {
                        buffer: 2000
                    });
                    promptsConverted[i].on('change', promptsConverted[i].up('panel').updatePromptDetails, promptsConverted[i], {
                        buffer: 2000
                    });
                    conversionSessions[i].on('change', conversionSessions[i].up('panel').updatePromptDetails, conversionSessions[i], {
                        buffer: 2000
                    });
                    promptsDigitized[i].on('change', promptsDigitized[i].up('panel').updatePromptDetails, promptsDigitized[i], {
                        buffer: 2000
                    });
                    feeRequired[i].on('change', feeRequired[i].up('panel').updatePromptDetails, feeRequired[i], {
                        buffer: 2000
                    });
                    cdRequired[i].on('change', cdRequired[i].up('panel').cdRequiredChange, cdRequired[i]); //, {buffer: 2000});
                    cdMailingAddress[i].on('change', cdMailingAddress[i].up('panel').updatePromptDetails, cdMailingAddress[i], {
                        buffer: 2000
                    });
                    promptFormat[i].on('change', promptFormat[i].up('panel').updatePromptDetails, promptFormat[i], {
                        buffer: 2000
                    });
                    needsApproval[i].on('change', needsApproval[i].up('panel').updatePromptDetails, needsApproval[i], {
                        buffer: 2000
                    });
                    feeFormula[i].on('change', feeFormula[i].up('panel').updatePromptDetails, feeFormula[i], {
                        buffer: 2000
                    });
                    setupFee[i].on('change', setupFee[i].up('panel').updatePromptDetails, setupFee[i], {
                        buffer: 2000
                    });
                    promptFee[i].on('change', promptFee[i].up('panel').updatePromptDetails, promptFee[i], {
                        buffer: 2000
                    });
                    conversionSetupFee[i].on('change', conversionSetupFee[i].up('panel').updatePromptDetails, conversionSetupFee[i], {
                        buffer: 2000
                    });
                    conversionPromptFee[i].on('change', conversionPromptFee[i].up('panel').updatePromptDetails, conversionPromptFee[i], {
                        buffer: 2000
                    });
                    feeMin[i].on('change', feeMin[i].up('panel').updatePromptDetails, feeMin[i], {
                        buffer: 2000
                    });
                    feePerWord[i].on('change', feePerWord[i].up('panel').updatePromptDetails, feePerWord[i], {
                        buffer: 2000
                    });
                    transferFee[i].on('change', transferFee[i].up('panel').updatePromptDetails, transferFee[i], {
                        buffer: 2000
                    });
                    //cdFee[i].on('change', cdFee[i].up('panel').updatePromptDetails, cdFee[i], {buffer: 2000});
                    totalRecordingFee[i].on('change', totalRecordingFee[i].up('panel').updatePromptDetails, totalRecordingFee[i], {
                        buffer: 2000
                    });
                    convertedPromptFormat[i].on('change', convertedPromptFormat[i].up('panel').updatePromptDetails, convertedPromptFormat[i], {
                        buffer: 2000
                    });
                }
                panel[0].expand(true);
                //panel[0].collapsed = false;
            } else {
                var language = Ext.ComponentQuery.query('#viewPromptsLangOneLanguage');
                var promptsRecorded = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeRecorded');
                var promptsBilled = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeBilled');
                var promptsProvided = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsProvidedByCustomer');
                var minFee = Ext.ComponentQuery.query('#viewPromptsLangOneMinimumFee');
                var numWords = Ext.ComponentQuery.query('#viewPromptsLangOneNumWords');
                var orderType = Ext.ComponentQuery.query('#viewPromptsLangOneOrderType');
                var recordingSessions = Ext.ComponentQuery.query('#viewPromptsLangOneRecordingSessions');
                var recordingStudio = Ext.ComponentQuery.query('#viewPromptsLangOneRecordingStudio');
                var promptsConverted = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeConverted');
                var conversionSessions = Ext.ComponentQuery.query('#viewPromptsLangOneConversionSessions');
                var promptsDigitized = Ext.ComponentQuery.query('#viewPromptsLangOnePromptsToBeDigitized');
                var feeRequired = Ext.ComponentQuery.query('#viewPromptsLangOneTransferFeeRequired');
                var cdRequired = Ext.ComponentQuery.query('#viewPromptsLangOneCDRequired');
                var cdMailingAddress = Ext.ComponentQuery.query('#viewPromptsLangOneCDMailingAddress');
                var promptFormat = Ext.ComponentQuery.query('#viewPromptsLangOnePromptFormat');
                var needsApproval = Ext.ComponentQuery.query('#viewPromptsLangOneTranslationNeedsApproval');
                var feeFormula = Ext.ComponentQuery.query('#viewPromptsLangOneFeeFormula');
                var setupFee = Ext.ComponentQuery.query('#viewPromptsLangOneSetupFee');
                var promptFee = Ext.ComponentQuery.query('#viewPromptsLangOnePromptFee');
                var conversionSetupFee = Ext.ComponentQuery.query('#viewPromptsLangOneConversionSetupFee');
                var conversionPromptFee = Ext.ComponentQuery.query('#viewPromptsLangOneConversionPromptFee');
                var feeMin = Ext.ComponentQuery.query('#viewPromptsLangOneTranslationFeeMinimum');
                var feePerWord = Ext.ComponentQuery.query('#viewPromptsLangOneTranslationFeePerWord');
                var transferFee = Ext.ComponentQuery.query('#viewPromptsLangOneTransferFee');
                //var cdFee = Ext.ComponentQuery.query('#viewPromptsLangOneCDFee');
                var totalRecordingFee = Ext.ComponentQuery.query('#viewPromptsLangOneTotalRecordingFee');
                var convertedPromptFormat = Ext.ComponentQuery.query('#viewPromptsLangOneConvertedPromptFormat');

                for (i in language) {
                    language[i].on('change', language[i].up('panel').updatePromptDetails, language[i], {
                        buffer: 2000
                    });
                    promptsRecorded[i].on('change', promptsRecorded[i].up('panel').promptsRecordedChange, promptsRecorded[i]); //, {buffer: 2000});
                    promptsBilled[i].on('change', promptsBilled[i].up('panel').updatePromptDetails, promptsBilled[i], {
                        buffer: 2000
                    });
                    promptsProvided[i].on('change', promptsProvided[i].up('panel').updatePromptDetails, promptsProvided[i], {
                        buffer: 2000
                    });
                    minFee[i].on('change', minFee[i].up('panel').updatePromptDetails, minFee[i], {
                        buffer: 2000
                    });
                    numWords[i].on('change', numWords[i].up('panel').updatePromptDetails, numWords[i], {
                        buffer: 2000
                    });
                    orderType[i].on('change', orderType[i].up('panel').updatePromptDetails, orderType[i], {
                        buffer: 2000
                    });
                    recordingSessions[i].on('change', recordingSessions[i].up('panel').updatePromptDetails, recordingSessions[i], {
                        buffer: 2000
                    });
                    recordingStudio[i].on('change', recordingStudio[i].up('panel').updatePromptDetails, recordingStudio[i], {
                        buffer: 2000
                    });
                    promptsConverted[i].on('change', promptsConverted[i].up('panel').updatePromptDetails, promptsConverted[i], {
                        buffer: 2000
                    });
                    conversionSessions[i].on('change', conversionSessions[i].up('panel').updatePromptDetails, conversionSessions[i], {
                        buffer: 2000
                    });
                    promptsDigitized[i].on('change', promptsDigitized[i].up('panel').updatePromptDetails, promptsDigitized[i], {
                        buffer: 2000
                    });
                    feeRequired[i].on('change', feeRequired[i].up('panel').updatePromptDetails, feeRequired[i], {
                        buffer: 2000
                    });
                    cdRequired[i].on('change', cdRequired[i].up('panel').cdRequiredChange, cdRequired[i]); //, {buffer: 2000});
                    cdMailingAddress[i].on('change', cdMailingAddress[i].up('panel').updatePromptDetails, cdMailingAddress[i], {
                        buffer: 2000
                    });
                    promptFormat[i].on('change', promptFormat[i].up('panel').updatePromptDetails, promptFormat[i], {
                        buffer: 2000
                    });
                    needsApproval[i].on('change', needsApproval[i].up('panel').updatePromptDetails, needsApproval[i], {
                        buffer: 2000
                    });
                    feeFormula[i].on('change', feeFormula[i].up('panel').updatePromptDetails, feeFormula[i], {
                        buffer: 2000
                    });
                    setupFee[i].on('change', setupFee[i].up('panel').updatePromptDetails, setupFee[i], {
                        buffer: 2000
                    });
                    promptFee[i].on('change', promptFee[i].up('panel').updatePromptDetails, promptFee[i], {
                        buffer: 2000
                    });
                    conversionSetupFee[i].on('change', conversionSetupFee[i].up('panel').updatePromptDetails, conversionSetupFee[i], {
                        buffer: 2000
                    });
                    conversionPromptFee[i].on('change', conversionPromptFee[i].up('panel').updatePromptDetails, conversionPromptFee[i], {
                        buffer: 2000
                    });
                    feeMin[i].on('change', feeMin[i].up('panel').updatePromptDetails, feeMin[i], {
                        buffer: 2000
                    });
                    feePerWord[i].on('change', feePerWord[i].up('panel').updatePromptDetails, feePerWord[i], {
                        buffer: 2000
                    });
                    transferFee[i].on('change', transferFee[i].up('panel').updatePromptDetails, transferFee[i], {
                        buffer: 2000
                    });
                    //cdFee[i].on('change', cdFee[i].up('panel').updatePromptDetails, cdFee[i], {buffer: 2000});
                    totalRecordingFee[i].on('change', totalRecordingFee[i].up('panel').updatePromptDetails, totalRecordingFee[i], {
                        buffer: 2000
                    });
                    convertedPromptFormat[i].on('change', convertedPromptFormat[i].up('panel').updatePromptDetails, convertedPromptFormat[i], {
                        buffer: 2000
                    });
                }
            }
            //4b. PromptDetails store contains a callback method to load GMVoicePromptDetails Store
            doPromptsLoadingPart4(PROJECT_SPECIFIED);
        }
    });
}

function doPromptsLoadingPart4(PROJECT_SPECIFIED) {
    //5a. GMVoicePromptDetails store load triggered from PromptDetails callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    var promptsLoaded = 0;
    var store = controller.getStore('GMVoicePromptDetails');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if ((records.length > 0) && success) {

                var panel = Ext.ComponentQuery.query('#gmVoicesPanel');

                for (i = 0; i < records.length; i++) {
                    panel[0].add(Ext.create('widget.viewPromptsGMVoicesPanels'));
                }

                var language = Ext.ComponentQuery.query('#viewPromptsLangTwoLanguage');
                var promptsRecorded = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeRecorded');
                var promptsBilled = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeBilled');
                var promptsProvided = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsProvidedByCustomer');
                var minFee = Ext.ComponentQuery.query('#viewPromptsLangTwoMinimumFee');
                var numWords = Ext.ComponentQuery.query('#viewPromptsLangTwoNumWords');
                var orderType = Ext.ComponentQuery.query('#viewPromptsLangTwoOrderType');
                var recordingSessions = Ext.ComponentQuery.query('#viewPromptsLangTwoRecordingSessions');
                var recordingStudio = Ext.ComponentQuery.query('#viewPromptsLangTwoRecordingStudio');
                var promptsConverted = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeConverted');
                var conversionSessions = Ext.ComponentQuery.query('#viewPromptsLangTwoConversionSessions');
                var promptsDigitized = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeDigitized');
                var feeRequired = Ext.ComponentQuery.query('#viewPromptsLangTwoTransferFeeRequired');
                var cdRequired = Ext.ComponentQuery.query('#viewPromptsLangTwoCDRequired');
                var cdMailingAddress = Ext.ComponentQuery.query('#viewPromptsLangTwoCDMailingAddress');
                var promptFormat = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptFormat');
                var needsApproval = Ext.ComponentQuery.query('#viewPromptsLangTwoTranslationNeedsApproval');
                var setupFee = Ext.ComponentQuery.query('#viewPromptsLangTwoSetupFee');
                var recording1Fee = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptFee');
                var recording3Fee = Ext.ComponentQuery.query('#viewPromptsLangTwoConversionSetupFee');
                var translationFee = Ext.ComponentQuery.query('#viewPromptsLangTwoConversionPromptFee');
                var deliveryFee = Ext.ComponentQuery.query('#viewPromptsLangTwoTranslationFeeMinimum');
                var totalRecordingFee = Ext.ComponentQuery.query('#viewPromptsLangTwoTotalRecordingFee');
                var convertedPromptFormat = Ext.ComponentQuery.query('#viewPromptsLangTwoConvertedPromptFormat');

                for (i in records) {
                    language[i].setValue(records[i].get('language'));
                    promptsRecorded[i].setValue(records[i].get('prompts_recorded'));
                    promptsBilled[i].setValue(records[i].get('prompts_billed'));
                    promptsProvided[i].setValue(records[i].get('prompts_provided'));
                    minFee[i].setValue(records[i].get('min_fee'));
                    numWords[i].setValue(records[i].get('num_words'));
                    orderType[i].setValue(records[i].get('order_type'));
                    recordingSessions[i].setValue(records[i].get('recording_sessions'));
                    recordingStudio[i].setValue(records[i].get('recording_studio'));
                    promptsConverted[i].setValue(records[i].get('prompts_converted'));
                    conversionSessions[i].setValue(records[i].get('conversion_sessions'));
                    promptsDigitized[i].setValue(records[i].get('prompts_digitized'));
                    feeRequired[i].setValue(records[i].get('fee_required'));
                    cdRequired[i].setValue(records[i].get('cd_required'));
                    cdMailingAddress[i].setValue(records[i].get('cd_mailing_address'));
                    promptFormat[i].setValue(records[i].get('prompt_format'));
                    needsApproval[i].setValue(records[i].get('needs_approval'));
                    setupFee[i].setValue(records[i].get('setup_fee'));
                    recording1Fee[i].setValue(records[i].get('recording1_fee'));
                    recording3Fee[i].setValue(records[i].get('recording3_fee'));
                    translationFee[i].setValue(records[i].get('translation_fee'));
                    deliveryFee[i].setValue(records[i].get('delivery_fee'));
                    totalRecordingFee[i].setValue(records[i].get('total_recording_fee'));
                    convertedPromptFormat[i].setValue(records[i].get('converted_prompt_format'));
                }

                for (i in language) {
                    language[i].on('change', language[i].up('panel').updatePromptDetails, language[i], {
                        buffer: 2000
                    });
                    promptsRecorded[i].on('change', promptsRecorded[i].up('panel').updatePromptDetails, promptsRecorded[i], {
                        buffer: 2000
                    });
                    promptsBilled[i].on('change', promptsBilled[i].up('panel').updatePromptDetails, promptsBilled[i], {
                        buffer: 2000
                    });
                    promptsProvided[i].on('change', promptsProvided[i].up('panel').updatePromptDetails, promptsProvided[i], {
                        buffer: 2000
                    });
                    minFee[i].on('change', minFee[i].up('panel').updatePromptDetails, minFee[i], {
                        buffer: 2000
                    });
                    numWords[i].on('change', numWords[i].up('panel').updatePromptDetails, numWords[i], {
                        buffer: 2000
                    });
                    orderType[i].on('change', orderType[i].up('panel').updatePromptDetails, orderType[i], {
                        buffer: 2000
                    });
                    recordingSessions[i].on('change', recordingSessions[i].up('panel').updatePromptDetails, recordingSessions[i], {
                        buffer: 2000
                    });
                    recordingStudio[i].on('change', recordingStudio[i].up('panel').updatePromptDetails, recordingStudio[i], {
                        buffer: 2000
                    });
                    promptsConverted[i].on('change', promptsConverted[i].up('panel').updatePromptDetails, promptsConverted[i], {
                        buffer: 2000
                    });
                    conversionSessions[i].on('change', conversionSessions[i].up('panel').updatePromptDetails, conversionSessions[i], {
                        buffer: 2000
                    });
                    promptsDigitized[i].on('change', promptsDigitized[i].up('panel').updatePromptDetails, promptsDigitized[i], {
                        buffer: 2000
                    });
                    feeRequired[i].on('change', feeRequired[i].up('panel').updatePromptDetails, feeRequired[i], {
                        buffer: 2000
                    });
                    cdRequired[i].on('change', cdRequired[i].up('panel').updatePromptDetails, cdRequired[i], {
                        buffer: 2000
                    });
                    cdMailingAddress[i].on('change', cdMailingAddress[i].up('panel').updatePromptDetails, cdMailingAddress[i], {
                        buffer: 2000
                    });
                    promptFormat[i].on('change', promptFormat[i].up('panel').updatePromptDetails, promptFormat[i], {
                        buffer: 2000
                    });
                    needsApproval[i].on('change', needsApproval[i].up('panel').updatePromptDetails, needsApproval[i], {
                        buffer: 2000
                    });
                    setupFee[i].on('change', setupFee[i].up('panel').updatePromptDetails, setupFee[i], {
                        buffer: 2000
                    });
                    recording1Fee[i].on('change', recording1Fee[i].up('panel').updatePromptDetails, recording1Fee[i], {
                        buffer: 2000
                    });
                    recording3Fee[i].on('change', recording3Fee[i].up('panel').updatePromptDetails, recording3Fee[i], {
                        buffer: 2000
                    });
                    translationFee[i].on('change', translationFee[i].up('panel').updatePromptDetails, translationFee[i], {
                        buffer: 2000
                    });
                    deliveryFee[i].on('change', deliveryFee[i].up('panel').updatePromptDetails, deliveryFee[i], {
                        buffer: 2000
                    });
                    totalRecordingFee[i].on('change', totalRecordingFee[i].up('panel').updatePromptDetails, totalRecordingFee[i], {
                        buffer: 2000
                    });
                    convertedPromptFormat[i].on('change', convertedPromptFormat[i].up('panel').updatePromptDetails, convertedPromptFormat[i], {
                        buffer: 2000
                    });
                }

                panel[0].expand(true);
                //panel[0].collapsed = false;
            } else {
                var language = Ext.ComponentQuery.query('#viewPromptsLangTwoLanguage');
                var promptsRecorded = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeRecorded');
                var promptsBilled = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeBilled');
                var promptsProvided = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsProvidedByCustomer');
                var minFee = Ext.ComponentQuery.query('#viewPromptsLangTwoMinimumFee');
                var numWords = Ext.ComponentQuery.query('#viewPromptsLangTwoNumWords');
                var orderType = Ext.ComponentQuery.query('#viewPromptsLangTwoOrderType');
                var recordingSessions = Ext.ComponentQuery.query('#viewPromptsLangTwoRecordingSessions');
                var recordingStudio = Ext.ComponentQuery.query('#viewPromptsLangTwoRecordingStudio');
                var promptsConverted = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeConverted');
                var conversionSessions = Ext.ComponentQuery.query('#viewPromptsLangTwoConversionSessions');
                var promptsDigitized = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptsToBeDigitized');
                var feeRequired = Ext.ComponentQuery.query('#viewPromptsLangTwoTransferFeeRequired');
                var cdRequired = Ext.ComponentQuery.query('#viewPromptsLangTwoCDRequired');
                var cdMailingAddress = Ext.ComponentQuery.query('#viewPromptsLangTwoCDMailingAddress');
                var promptFormat = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptFormat');
                var needsApproval = Ext.ComponentQuery.query('#viewPromptsLangTwoTranslationNeedsApproval');
                var setupFee = Ext.ComponentQuery.query('#viewPromptsLangTwoSetupFee');
                var recording1Fee = Ext.ComponentQuery.query('#viewPromptsLangTwoPromptFee');
                var recording3Fee = Ext.ComponentQuery.query('#viewPromptsLangTwoConversionSetupFee');
                var translationFee = Ext.ComponentQuery.query('#viewPromptsLangTwoConversionPromptFee');
                var deliveryFee = Ext.ComponentQuery.query('#viewPromptsLangTwoTranslationFeeMinimum');
                var totalRecordingFee = Ext.ComponentQuery.query('#viewPromptsLangTwoTotalRecordingFee');
                var convertedPromptFormat = Ext.ComponentQuery.query('#viewPromptsLangTwoConvertedPromptFormat');

                for (i in language) {
                    language[i].on('change', language[i].up('panel').updatePromptDetails, language[i], {
                        buffer: 2000
                    });
                    promptsRecorded[i].on('change', promptsRecorded[i].up('panel').updatePromptDetails, promptsRecorded[i], {
                        buffer: 2000
                    });
                    promptsBilled[i].on('change', promptsBilled[i].up('panel').updatePromptDetails, promptsBilled[i], {
                        buffer: 2000
                    });
                    promptsProvided[i].on('change', promptsProvided[i].up('panel').updatePromptDetails, promptsProvided[i], {
                        buffer: 2000
                    });
                    minFee[i].on('change', minFee[i].up('panel').updatePromptDetails, minFee[i], {
                        buffer: 2000
                    });
                    numWords[i].on('change', numWords[i].up('panel').updatePromptDetails, numWords[i], {
                        buffer: 2000
                    });
                    orderType[i].on('change', orderType[i].up('panel').updatePromptDetails, orderType[i], {
                        buffer: 2000
                    });
                    recordingSessions[i].on('change', recordingSessions[i].up('panel').updatePromptDetails, recordingSessions[i], {
                        buffer: 2000
                    });
                    recordingStudio[i].on('change', recordingStudio[i].up('panel').updatePromptDetails, recordingStudio[i], {
                        buffer: 2000
                    });
                    promptsConverted[i].on('change', promptsConverted[i].up('panel').updatePromptDetails, promptsConverted[i], {
                        buffer: 2000
                    });
                    conversionSessions[i].on('change', conversionSessions[i].up('panel').updatePromptDetails, conversionSessions[i], {
                        buffer: 2000
                    });
                    promptsDigitized[i].on('change', promptsDigitized[i].up('panel').updatePromptDetails, promptsDigitized[i], {
                        buffer: 2000
                    });
                    feeRequired[i].on('change', feeRequired[i].up('panel').updatePromptDetails, feeRequired[i], {
                        buffer: 2000
                    });
                    cdRequired[i].on('change', cdRequired[i].up('panel').updatePromptDetails, cdRequired[i], {
                        buffer: 2000
                    });
                    cdMailingAddress[i].on('change', cdMailingAddress[i].up('panel').updatePromptDetails, cdMailingAddress[i], {
                        buffer: 2000
                    });
                    promptFormat[i].on('change', promptFormat[i].up('panel').updatePromptDetails, promptFormat[i], {
                        buffer: 2000
                    });
                    needsApproval[i].on('change', needsApproval[i].up('panel').updatePromptDetails, needsApproval[i], {
                        buffer: 2000
                    });
                    setupFee[i].on('change', setupFee[i].up('panel').updatePromptDetails, setupFee[i], {
                        buffer: 2000
                    });
                    recording1Fee[i].on('change', recording1Fee[i].up('panel').updatePromptDetails, recording1Fee[i], {
                        buffer: 2000
                    });
                    recording3Fee[i].on('change', recording3Fee[i].up('panel').updatePromptDetails, recording3Fee[i], {
                        buffer: 2000
                    });
                    translationFee[i].on('change', translationFee[i].up('panel').updatePromptDetails, translationFee[i], {
                        buffer: 2000
                    });
                    deliveryFee[i].on('change', deliveryFee[i].up('panel').updatePromptDetails, deliveryFee[i], {
                        buffer: 2000
                    });
                    totalRecordingFee[i].on('change', totalRecordingFee[i].up('panel').updatePromptDetails, totalRecordingFee[i], {
                        buffer: 2000
                    });
                    convertedPromptFormat[i].on('change', convertedPromptFormat[i].up('panel').updatePromptDetails, convertedPromptFormat[i], {
                        buffer: 2000
                    });
                }
            }
            //5b. GMVoicePromptDetails store contains a callback method to unmask page
            console.log('Prompts tab finished loading; unmasking');
            GLOBAL_hasPromptsTabBeenLoaded = true;
            Ext.getBody().unmask();
            //6. Page is unmasked triggered from GMVoicePromptDetails callback method
        }
    });
}

function doMISUpdatesLoading(PROJECT_SPECIFIED) {
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasMISUpdatesTabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            store = controller.getStore('MISUpdates');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            var shouldIExpand = false;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            var misUpdateID = records[0].get('mis_update_id');
                            GLOBAL_currentProjectOpenMISUpdatesID = misUpdateID;
                            if (!Ext.isEmpty(records[0].get('description'))) {
                                shouldIExpand = true;
                            }
                            fields = Ext.ComponentQuery.query('viewMISUpdatesDescriptionOfChange');
                            fields[0].setValue(records[0].get('description'));
                        }
                    }
                    if (shouldIExpand) {
                        Ext.ComponentQuery.query('#misUpdatesReportPanel')[0].fireEvent('checkCollapsibility');
                    }
                    doMISUpdatesLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('mis updates has already been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doMISUpdatesLoadingPart2(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook'); /* Load MISUpdateDelivery data */
    store = controller.getStore('MISUpdateDeliveryChanges');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (records.length > 0) {
                if (!Ext.isEmpty(records[0].get('method')) || !Ext.isEmpty(records[0].get('format')) || !Ext.isEmpty(records[0].get('frequency_id'))) {
                    shouldIExpand = true;
                }
                fields = Ext.ComponentQuery.query('viewMISUpdatesDeliveryChangeNewMethod');
                fields[0].setValue(records[0].get('method'));

                fields = Ext.ComponentQuery.query('viewMISUpdatesDeliveryChangeNewFormat');
                fields[0].setValue(records[0].get('format'));

                fields = Ext.ComponentQuery.query('viewMISUpdatesDeliveryChangeNewFrequency');
                fields[0].setValue(records[0].get('frequency_id'));
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misUpdatesDeliveryPanel')[0].fireEvent('checkCollapsibility');
            }
            doMISUpdatesLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doMISUpdatesLoadingPart3(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook'); /* Load MISUpdateReportNames data */
    store = controller.getStore('MISUpdateReportNames');
    store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (success && (records.length > 0)) {
                fields = Ext.ComponentQuery.query('viewMISUpdatesReportNames');
                for (i in records) {
                    if (!Ext.isEmpty(records[i].get('report_name'))) {
                        shouldIExpand = true;
                    }
                    if (fields[0].getValue() != " ") {
                        //console.log("ReportName field: (" + fields[0].getValue() + ")");
                        fields[0].setValue(fields[0].getValue() + ', ' + records[i].get('report_name'));
                    } else {
                        fields[0].setValue(records[i].get('report_name'));
                    }
                }
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misUpdatesReportPanel')[0].fireEvent('checkCollapsibility');
            }
            doMISUpdatesLoadingPart4(PROJECT_SPECIFIED);
        }
    });
}

function doMISUpdatesLoadingPart4(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook'); /* Load MISUpdateDistributionChanges data and place in appropriate textboxes */
    store = controller.getStore('MISUpdateDistributionChanges');
    store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (success && (records.length > 0)) {
                var addEmailBox = Ext.ComponentQuery.query('viewMISUpdatesDistributionAddEmail');
                var deleteEmailBox = Ext.ComponentQuery.query('viewMISUpdatesDistributionDeleteEmail');

                for (i in records) {
                    shouldIExpand = true;
                    if (records[i].get('add_or_delete') == 'add') {
                        if (addEmailBox[0].getValue()) {
                            addEmailBox[0].setValue(addEmailBox[0].getValue() + '; ' + records[i].get('email1'));
                        } else {
                            addEmailBox[0].setValue(records[i].get('email1'));
                        }
                    } else if (records[i].get('add_or_delete') == 'delete') {
                        if (deleteEmailBox[0].getValue()) {
                            deleteEmailBox[0].setValue(deleteEmailBox[0].getValue() + '; ' + records[i].get('email1'));
                        } else {
                            deleteEmailBox[0].setValue(records[i].get('email1'));
                        }
                    }
                }
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misUpdatesDistributionPanel')[0].fireEvent('checkCollapsibility');
            }
            doMISUpdatesLoadingPart5(PROJECT_SPECIFIED);
        }
    });
}

function doMISUpdatesLoadingPart5(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    store = controller.getStore('MISUpdateDnises');
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            //determine readOnly status (for MISUpdate grids)
            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                readOnly = true;
            }

            /* Load MISUpdateDnis data and place in appropriate grids */
            var add_grid = Ext.ComponentQuery.query('viewMISUpdatesAddDnis');
            var add_store = add_grid[0].getStore();
            add_store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
            add_store.proxy.extraParams.read_only = readOnly; //smm
            var change_grid = Ext.ComponentQuery.query('viewMISUpdatesChangeDnis');
            var change_store = change_grid[0].getStore();
            change_store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
            change_store.proxy.extraParams.read_only = readOnly; //smm
            var remove_grid = Ext.ComponentQuery.query('viewMISUpdatesRemoveDnis');
            var remove_store = remove_grid[0].getStore();
            remove_store.proxy.extraParams.mis_update_id = GLOBAL_currentProjectOpenMISUpdatesID;
            remove_store.proxy.extraParams.read_only = readOnly; //smm

            if (readOnly) {
                Ext.ComponentQuery.query('viewMISUpdatesAddDnis')[0].on('beforeedit', function(plugin, edit) {
                    return false;
                });
            }

            if (readOnly) {
                Ext.ComponentQuery.query('viewMISUpdatesChangeDnis')[0].on('beforeedit', function(plugin, edit) {
                    return false;
                });
            }

            if (readOnly) {
                Ext.ComponentQuery.query('viewMISUpdatesRemoveDnis')[0].on('beforeedit', function(plugin, edit) {
                    return false;
                });
            }
            //get the three grids
            add_store.load({
                callback: function(records, operation, success) {
                    if (success && (records.length > 0)) {
                        add_grid[0].expand(true);
                    }
                }
            });

            change_store.load({
                callback: function(records, operation, success) {
                    if (success && (records.length > 0)) {
                        change_grid[0].expand(true);
                    }
                }
            });

            remove_store.load({
                callback: function(records, operation, success) {
                    if (success && (records.length > 0)) {
                        remove_grid[0].expand(true);
                    }
                }
            });


            store = controller.getStore('DeliveryFormats');
            store.load({
                callback: function() {
                    store = controller.getStore('DeliveryFrequencies');
                    store.load({
                        callback: function() {
                            store = controller.getStore('DeliveryMethods');
                            store.load({
                                callback: function() {
                                    GLOBAL_hasMISUpdatesTabBeenLoaded = true;
                                    console.log('mis new initial load complete; unmasking');
                                    Ext.getBody().unmask();
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function doMISNewLoading(PROJECT_SPECIFIED) {
    // Load MISNew data
    var controller = GLOBAL_currentController.getController('Cookbook');
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasMISNewTabBeenLoaded == false) {
            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "DEV") || (GLOBAL_permission == "PM") || (GLOBAL_permission == "TC"))) {
                readOnly = true;
            }
            var store = GLOBAL_currentController.getStore("MISNewDnises");
            store.proxy.extraParams.mis_new_id = GLOBAL_currentProjectOpenMISNewID;
            store.proxy.extraParams.read_only = readOnly; //smm
            if (readOnly) {
                Ext.ComponentQuery.query('viewMISNewAddDnis')[0].on('beforeedit', function(plugin, edit) {
                    return false;
                });
            }

            store.load({
                callback: function(records, operation, success) {
                    if (success && (records.length > 0)) {
                        Ext.ComponentQuery.query('viewMISNewAddDnis')[0].expand(true);
                    }
                    doMISNewLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('mis new has already been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doMISNewLoadingPart2(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('MISNew');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    var fields = Ext.ComponentQuery.query('viewMISNewReportDescription');
                    fields[0].setValue(records[0].get('description'));
                    if (!Ext.isEmpty(records[0].get('description'))) {
                        shouldIExpand = true;
                    }
                    var BU = Ext.ComponentQuery.query('viewMISNewBusinessUnit');
                    BU[0].setValue(records[0].get('name'));
                }
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misNewReportDescriptionPanel')[0].fireEvent('checkCollapsibility');
            }
            doMISNewLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doMISNewLoadingPart3(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('MISNewReportNames');
    store.proxy.extraParams.mis_new_id = GLOBAL_currentProjectOpenMISNewID;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (success && (records.length > 0)) {
                fields = Ext.ComponentQuery.query('viewMISNewRequestedReportName');
                for (i in records) {
                    if (!Ext.isEmpty(records[i].get('report_name'))) {
                        shouldIExpand = true;
                    }
                    if (fields[0].getValue() != " " && fields[0].getValue() != "" && fields[0].getValue() != null) {
                        //console.log("ReportName field: (" + fields[0].getValue() + ")");
                        fields[0].setValue(fields[0].getValue() + ', ' + records[i].get('report_name'));
                    } else {
                        fields[0].setValue(records[i].get('report_name'));
                    }
                }
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misNewFileReportingInfoPanel')[0].fireEvent('checkCollapsibility');
            }
            doMISNewLoadingPart4(PROJECT_SPECIFIED);
        }
    });
}

function doMISNewLoadingPart4(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('MISNewDeliveries');
    store.proxy.extraParams.mis_new_id = GLOBAL_currentProjectOpenMISNewID;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (records.length > 0) {
                var R1 = Ext.ComponentQuery.query('viewMISNewMethod');
                R1[0].setValue(records[0].get('method'));
                if (!Ext.isEmpty(records[0].get('method'))) {
                    shouldIExpand = true;
                }
                var R2 = Ext.ComponentQuery.query('viewMISNewFormat');
                R2[0].setValue(records[0].get('format'));
                if (!Ext.isEmpty(records[0].get('format'))) {
                    shouldIExpand = true;
                }
                var R3 = Ext.ComponentQuery.query('viewMISNewFrequency');
                R3[0].setValue(records[0].get('frequency'));
                if (!Ext.isEmpty(records[0].get('frequency'))) {
                    shouldIExpand = true;
                }
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misNewDeliveryChangePanel')[0].fireEvent('checkCollapsibility');
            }
            doMISNewLoadingPart5(PROJECT_SPECIFIED);
        }
    });
}

function doMISNewLoadingPart5(PROJECT_SPECIFIED) { /* Load MISNewDistributionChanges data and place in appropriate textboxes */
    var controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('MISNewDistributions');
    store.proxy.extraParams.mis_new_id = GLOBAL_currentProjectOpenMISNewID;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    var shouldIExpand = false;
    store.load({
        callback: function(records, operation, success) {
            if (success && (records.length > 0)) {

                var addEmailBox = Ext.ComponentQuery.query('viewMISNewDistributionAddEmail');
                var deleteEmailBox = Ext.ComponentQuery.query('viewMISNewDistributionDeleteEmail');

                for (i in records) {

                    shouldIExpand = true;

                    //console.log(records[i].get('add_or_delete'));
                    if (records[i].get('add_or_delete') == 'add') {
                        if (addEmailBox[0].getValue()) {
                            addEmailBox[0].setValue(addEmailBox[0].getValue() + '; ' + records[i].get('email1'));
                        } else {
                            addEmailBox[0].setValue(records[i].get('email1'));
                        }
                    } else if (records[i].get('add_or_delete') == 'delete') {
                        if (deleteEmailBox[0].getValue()) {
                            deleteEmailBox[0].setValue(deleteEmailBox[0].getValue() + '; ' + records[i].get('email1'));
                        } else {
                            deleteEmailBox[0].setValue(records[i].get('email1'));
                        }
                    }
                }
            }
            if (shouldIExpand) {
                Ext.ComponentQuery.query('#misNewDistributionChangePanel')[0].fireEvent('checkCollapsibility');
            }


            store = controller.getStore('DeliveryFormats');
            store.load({
                callback: function() {
                    store = controller.getStore('DeliveryFrequencies');
                    store.load({
                        callback: function() {
                            store = controller.getStore('DeliveryMethods');
                            store.load({
                                callback: function() {
                                    GLOBAL_hasMISNewTabBeenLoaded = true;
                                    console.log('mis new initial load complete; unmasking');
                                    Ext.getBody().unmask();
                                }
                            });
                        }
                    });
                }
            });

        }
    });
}


function doTrafficAndRoutingLoading(PROJECT_SPECIFIED) {
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasTrafficRoutingTabBeenLoaded == false) { /* Load TrafficRequirements data */
            var controller = GLOBAL_currentController.getController('Cookbook');
            store = controller.getStore('TrafficRequirements');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if ((records.length > 0) && success) {
                            var fields = Ext.ComponentQuery.query('viewTrafficRoutingIncludedInForecast');
                            if (records[0].get('forecast') == 0) {
                                fields[0].setValue('no');
                            } else {
                                fields[0].setValue('yes');
                            }
                            //fields[0].setValue(records[0].get('forecast'));

                            fields = Ext.ComponentQuery.query('viewTrafficRoutingIncrementalMinutesPerMonth');
                            fields[0].setValue(records[0].get('min_month'));

                            fields = Ext.ComponentQuery.query('viewTrafficRoutingIncrementalCallsPerMonth');
                            fields[0].setValue(records[0].get('calls_month'));

                            fields = Ext.ComponentQuery.query('viewTrafficRoutingBusyHourCalls');
                            fields[0].setValue(records[0].get('busy_hour_calls'));

                            fields = Ext.ComponentQuery.query('viewTrafficRoutingBusyHourCallPercentage');
                            fields[0].setValue(records[0].get('busy_hour_call_percentage'));

                            fields = Ext.ComponentQuery.query('viewTrafficRoutingAverageCallDuration');
                            fields[0].setValue(records[0].get('avg_call_duration'));
                        }
                    }
                    doTrafficAndRoutingLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('traffic routing has already been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doTrafficAndRoutingLoadingPart2(PROJECT_SPECIFIED) {
    //4a. RoutingRequirements store load triggered from BuffetProdInstallRequirements callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM"))) {
        readOnly = true;
    } /* Load RoutingRequirements data and place in appropriate grids */
    if (readOnly) {
        Ext.ComponentQuery.query('viewTrafficRoutingAddDnis')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    if (readOnly) {
        Ext.ComponentQuery.query('viewTrafficRoutingChangeDnis')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    if (readOnly) {
        Ext.ComponentQuery.query('viewTrafficRoutingRemoveDnis')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    var addgrid = Ext.ComponentQuery.query('viewTrafficRoutingAddDnis');
    var addstore = addgrid[0].getStore();
    addstore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    addstore.proxy.extraParams.permission = GLOBAL_permission;
    addstore.proxy.extraParams.user_name = GLOBAL_username;
    addstore.proxy.extraParams.read_only = readOnly; //smm
    var changegrid = Ext.ComponentQuery.query('viewTrafficRoutingChangeDnis');
    var changestore = changegrid[0].getStore();
    changestore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    changestore.proxy.extraParams.permission = GLOBAL_permission;
    changestore.proxy.extraParams.user_name = GLOBAL_username;
    changestore.proxy.extraParams.read_only = readOnly; //smm
    var removegrid = Ext.ComponentQuery.query('viewTrafficRoutingRemoveDnis');
    var removestore = removegrid[0].getStore();
    removestore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    removestore.proxy.extraParams.permission = GLOBAL_permission;
    removestore.proxy.extraParams.user_name = GLOBAL_username;
    removestore.proxy.extraParams.read_only = readOnly; //smm
    store = controller.getStore('RoutingRequirements');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (success && (records.length > 0)) {
                    //get the three grids
                    addstore.load({
                        callback: function(records, operation, success) {
                            if (success && (records.length > 0)) {
                                addgrid[0].expand(true);
                            }
                        }
                    });

                    changestore.load({
                        callback: function(records, operation, success) {
                            if (success && (records.length > 0)) {
                                changegrid[0].expand(true);
                            }
                        }
                    });

                    removestore.load({
                        callback: function(records, operation, success) {
                            if (success && (records.length > 0)) {
                                removegrid[0].expand(true);
                            }
                        }
                    });
                }
            }
            GLOBAL_hasTrafficRoutingTabBeenLoaded = true;
            console.log('traffic routing initial load complete; unmasking');
            Ext.getBody().unmask();
        }
    });
}

function doUATPRODInstallLoading(PROJECT_SPECIFIED, doBuffetLinkedProjects) {
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasUATProdInstallTabBeenLoaded == false) {
            readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                readOnly = true;
            }
            controller = GLOBAL_currentController.getController('Cookbook');
            store = controller.getStore('Nodes');
            store.load({
                callback: function(records, operation, success) {
                    store = controller.getStore('UatProdInstalls');
                    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
                    store.load({
                        callback: function(records, operation, success) {
                            if (records) {
                                if ((records.length > 0) && success) {
                                    console.log(records[0]);
                                    Ext.ComponentQuery.query('#uatprodinstallUATInstallNodes')[0].setValue(records[0].get('uat_install_node'));
                                    Ext.ComponentQuery.query('#uatprodinstallUATInstallDate')[0].setFullValue(records[0].get('uat_install_date'));
                                    Ext.ComponentQuery.query('#uatprodinstallUATInstallComments')[0].setValue(records[0].get('uat_install_comments'));

                                    Ext.ComponentQuery.query('#uatprodinstallUatDate')[0].setFullValue(records[0].get('uat_date'));
                                    Ext.ComponentQuery.query('#uatprodinstallUatNode')[0].setValue(records[0].get('uat_node'));
                                    Ext.ComponentQuery.query('#uatprodinstallUatUsanCCR')[0].setValue(records[0].get('uat_usan_ccr'));
                                    Ext.ComponentQuery.query('#uatprodinstallUatCCR')[0].setValue(records[0].get('uat_ccr'));
                                    Ext.ComponentQuery.query('#uatprodinstallUatMaintenanceStart')[0].setFullValue(records[0].get('uat_maintenance_start'));
                                    Ext.ComponentQuery.query('#uatprodinstallUatConferenceStart')[0].setFullValue(records[0].get('uat_conference_start'));
                                    Ext.ComponentQuery.query('#uatprodinstallUatConferenceBridge')[0].setValue(records[0].get('uat_conference_bridge'));
                                    Ext.ComponentQuery.query('#uatprodinstallProductionPostInstallNotification')[0].setValue(records[0].get('prod_post_install_notification'));
                                    Ext.ComponentQuery.query('#uatprodinstallProdInstallComments')[0].setValue(records[0].get('prod_install_comments'));

                                    Ext.ComponentQuery.query('#uatprodinstallSoakPostInstallNotification')[0].setValue(records[0].get('post_install_notification'));
                                    Ext.ComponentQuery.query('#uatprodinstallSoakInstallComments')[0].setValue(records[0].get('comments'));

                                    enableUatPanel = false;
                                    enableCPZPanel = false;
                                    enableWORPanel = false;
                                    enableSCUPanel = false;
                                    counter = 0;

                                    filetypes = ['SCUSoak', 'WORSoak', 'CPZSoak', 'Prod'];
                                    datatypes = ['scu', 'wor', 'cpz', 'prod'];

                                    for (i in filetypes) {
                                        dataPopulated = false;
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_node'))) {
                                            dataPopulated = true;
                                        }
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_date'))) {
                                            dataPopulated = true;
                                        }
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_usan_ccr'))) {
                                            dataPopulated = true;
                                        }
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_ccr'))) {
                                            dataPopulated = true;
                                        }
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_maintenance_start'))) {
                                            dataPopulated = true;
                                        }
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_conference_start'))) {
                                            dataPopulated = true;
                                        }
                                        if (!Ext.isEmpty(records[0].get(datatypes[i] + '_conference_bridge'))) {
                                            dataPopulated = true;
                                        }
                                        if (dataPopulated == true) {
                                            switch (counter) {
                                            case 0:
                                                enableSCUPanel = true;
                                                break;
                                            case 1:
                                                enableWORPanel = true;
                                                break;
                                            case 2:
                                                enableCPZPanel = true;
                                                break;
                                            case 3:
                                                enableUatPanel = true;
                                                break;
                                            default:
                                                break;
                                            }
                                        }
                                        counter++;
                                    }

                                    filetypes = [];
                                    datatypes = [];

                                    /*
                                     * soak install panel 1: scu
                                     * soak install panel 2: wor
                                     * soak install panel 3: cpz
                                     * soak install panel 4: prod
                                     */
                                    parentContainer = Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0];
                                    if (enableSCUPanel) {
                                        filetypes.push('SoakPanel1');
                                        datatypes.push('scu');
                                        title = records[0].get('column1');
                                        additionalPanel = Ext.create('uatProdInstallSoakPanel1');
                                        if (!Ext.isEmpty(title)) {
                                            additionalPanel.title = title;
                                        }
                                        parentContainer.add(additionalPanel);
                                    }
                                    if (enableWORPanel) {
                                        filetypes.push('SoakPanel2');
                                        datatypes.push('wor');
                                        title = records[0].get('column2');
                                        additionalPanel = Ext.create('uatProdInstallSoakPanel2');
                                        if (!Ext.isEmpty(title)) {
                                            additionalPanel.title = title;
                                        }
                                        parentContainer.add(additionalPanel);
                                    }
                                    if (enableCPZPanel) {
                                        filetypes.push('SoakPanel3');
                                        datatypes.push('cpz');
                                        title = records[0].get('column3');
                                        additionalPanel = Ext.create('uatProdInstallSoakPanel3');
                                        if (!Ext.isEmpty(title)) {
                                            additionalPanel.title = title;
                                        }
                                        parentContainer.add(additionalPanel);
                                    }
                                    if (enableUatPanel) {
                                        filetypes.push('SoakPanel4');
                                        datatypes.push('prod');
                                        title = records[0].get('column4');
                                        additionalPanel = Ext.create('uatProdInstallSoakPanel4');
                                        if (!Ext.isEmpty(title)) {
                                            additionalPanel.title = title;
                                        }
                                        parentContainer.add(additionalPanel);
                                    }
                                    //uatprodinstallSoakPanel4Node
                                    for (i in filetypes) {
                                        fields = Ext.ComponentQuery.query('#uatprodinstall' + filetypes[i] + 'Node');
                                        fields[0].setValue(records[0].get(datatypes[i] + '_node'));
                                        fields = Ext.ComponentQuery.query('#uatprodinstall' + filetypes[i] + 'Date');
                                        fields[0].setFullValue(records[0].get(datatypes[i] + '_date')); //(smm) changing rawValue to setFullValue for textDates
                                        fields = Ext.ComponentQuery.query('#uatprodinstall' + filetypes[i] + 'UsanCCR');
                                        fields[0].setValue(records[0].get(datatypes[i] + '_usan_ccr'));
                                        fields = Ext.ComponentQuery.query('#uatprodinstall' + filetypes[i] + 'CCR');
                                        fields[0].setValue(records[0].get(datatypes[i] + '_ccr'));
                                        fields = Ext.ComponentQuery.query('#uatprodinstall' + filetypes[i] + 'MaintenanceStart');
                                        fields[0].setFullValue(records[0].get(datatypes[i] + '_maintenance_start'));
                                    }
                                }
                            }
                            doUATPRODInstallLoadingPart2(PROJECT_SPECIFIED);
                        }
                    });
                }
            });
        } else {
            console.log('uat prod install tab already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doUATPRODInstallLoadingPart2(PROJECT_SPECIFIED) {
    controller = GLOBAL_currentController.getController('Cookbook');
    readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    store = controller.getStore('UATInstallRequirements');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.proxy.extraParams.read_only = readOnly;
    store.load({
        callback: function(records, operation, success) {
            store = controller.getStore('StagingFolders');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                if (records[i].get('type') == 'uat') {
                                    //to avoid a stupid ExtJS bug, get the values NOW before Hidden.js gets called when creating the container
                                    staging_id = records[i].get('staging_folder_id');
                                    folder = records[i].get('folder');
                                    notes = records[i].get('notes');

                                    container = Ext.ComponentQuery.query('#uatprodinstallUATInstallStagingFolderContainer')[0];
                                    newPanel = Ext.create('uatInstallDetailsStagingFolderPanel');

                                    newPanel.getComponent('uatInstallStagingFolderLink').setValue(folder);
                                    newPanel.getComponent('uatInstallStagingFolderNotes').setValue(notes);
                                    newPanel.down('hidden').setValue(staging_id);
                                    container.add(newPanel);
                                } else if (records[i].get('type') == 'prod') {
                                    staging_id = records[i].get('staging_folder_id');
                                    folder = records[i].get('folder');
                                    notes = records[i].get('notes');

                                    container = Ext.ComponentQuery.query('#uatprodinstallProdInstallStagingFolderContainer')[0];
                                    newPanel = Ext.create('productionInstallDetailsStagingFolderPanel');

                                    newPanel.getComponent('productionInstallStagingFolderLink').setValue(folder);
                                    newPanel.getComponent('productionInstallStagingFolderNotes').setValue(notes);
                                    newPanel.down('hidden').setValue(staging_id);
                                    container.add(newPanel);
                                } else if (records[i].get('type') == 'soak') {
                                    staging_id = records[i].get('staging_folder_id');
                                    folder = records[i].get('folder');
                                    notes = records[i].get('notes');

                                    container = Ext.ComponentQuery.query('#uatprodinstallSoakInstallStagingFolderContainer')[0];
                                    newPanel = Ext.create('soakInstallDetailsStagingFolderPanel');

                                    newPanel.getComponent('soakInstallStagingFolderLink').setValue(folder);
                                    newPanel.getComponent('soakInstallStagingFolderNotes').setValue(notes);
                                    newPanel.down('hidden').setValue(staging_id);
                                    container.add(newPanel);
                                }
                            }
                        }
                    }
                    doUATPRODInstallLoadingPart3(PROJECT_SPECIFIED);
                }
            });
        }
    });
}

function doUATPRODInstallLoadingPart3(PROJECT_SPECIFIED) {
    readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    controller = GLOBAL_currentController.getController('Cookbook');
    store = controller.getStore('ProdInstallRequirements');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.proxy.extraParams.read_only = readOnly;
    store.load({
        callback: function(records, operation, success) {
            store = controller.getStore('SoakInstallRequirements');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.proxy.extraParams.read_only = readOnly;
            store.load({
                callback: function(records, operation, success) {
                    GLOBAL_hasUATProdInstallTabBeenLoaded = true;
                    Ext.getBody().unmask();
                }
            });
        }
    });
}


function doBuffetProdInstallLoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * doBuffetProdInstallLoading//doBuffetProdInstallLoadingPart2//doBuffetProdInstallLoadingPart3
     *
     * Order of events - function name:
     * 1. Page is masked - doBuffetProdInstallLoading
     * 2a. Call to ProdInstallationBuffets store to load - doBuffetProdInstallLoading
     *      2b. ProdInstallationBuffets store contains a callback method to load StagingFolders Store
     * 3a. StagingFolders store load triggered from ProdInstallationBuffets callback method - doBuffetProdInstallLoadingPart2
     *      3b. StagingFolders store contains a callback method to load UATProdInstall Store
     * 4a. UATProdInstall store load triggered from StagingFolders callback method - doBuffetProdInstallLoadingPart3
     *      4b.UATProdInstall store contains a callback method to unmask page
     * 5. Page is unmasked triggered from UATProdInstall store callback method - doBuffetProdInstallLoadingPart3
     */
    if (PROJECT_SPECIFIED != null) {

        if (GLOBAL_hasBuffetProdInstallTabBeenLoaded == false) {
            //2a. Call to ProdInstallationBuffets store to load
            var controller = GLOBAL_currentController.getController('Cookbook');
            var store = controller.getStore('ProdInstallationBuffets');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            var R1 = Ext.ComponentQuery.query('viewBuffetProdInstallDate');
                            R1[0].setFullValue(records[0].get('date')); //(smm) changing rawValue to setFullValue for textDates
                            var R2 = Ext.ComponentQuery.query('viewBuffetProdInstallConferenceStart');

                            var time = records[0].get('conference_start');
                            //console.log('conf time|' + time);
                            if (time != null) {
                                if (time.indexOf(":") != -1) {
                                    time = time.substring(0, (time.indexOf(":") + 6));
                                    //console.log(time);
                                    R2[0].setFullValue(time);
                                } else {
                                    R2[0].setFullValue(time);
                                }
                            }

                            var R3 = Ext.ComponentQuery.query('viewBuffetProdInstallConferenceBridge');
                            R3[0].setValue(records[0].get('conference_bridge'));

                            var R4 = Ext.ComponentQuery.query('viewBuffetProdInstallNodes');
                            R4[0].setValue(records[0].get('nodes'));

                            var R5 = Ext.ComponentQuery.query('viewBuffetProdInstallComments');
                            R5[0].setValue(records[0].get('comments'));

                            var R8 = Ext.ComponentQuery.query('viewBuffetProdInstallPostMaintenanceMasterProject');
                            R8[0].setValue(records[0].get('post_maintenance_notification'));

                        }
                    }
                    //2b. ProdInstallationBuffets store contains a callback method to load StagingFolders Store
                    doBuffetProdInstallLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('uat prod install tab already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}


function doBuffetProdInstallLoadingPart2(PROJECT_SPECIFIED) {
    //3a. StagingFolders store load triggered from SWDSchedules callback method

    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('StagingFolders');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    for (i in records) {
                        if (records[i].get('is_buffet') == true) {
                            var container = Ext.ComponentQuery.query('viewBuffetProdInstallStagingFoldersContainer')[0];
                            var newPanel = Ext.create('stagingFolderPanel');
                            newPanel.getComponent('buffetProdInstallStagingFolderLink').setValue(records[i].get('folder'));
                            newPanel.getComponent('buffetProdInstallStagingNotes').setValue(records[i].get('notes'));
                            container.add(newPanel);
                        }
                    }
                }
            }
            //3b. StagingFolders store contains a callback method to load UATProdInstall Store
            doBuffetProdInstallLoadingPart3(PROJECT_SPECIFIED);
        }
    });
}

function doBuffetProdInstallLoadingPart3(PROJECT_SPECIFIED) {

    var controller = GLOBAL_currentController.getController('Cookbook');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
        readOnly = true;
    }
    store = controller.getStore('BuffetProdInstallRequirements');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.proxy.extraParams.read_only = readOnly; //smm
    store.load({
        callback: function(records, operation, success) {
            doBuffetProdInstallLoadingPart4(PROJECT_SPECIFIED);
        }
    });
}

function doBuffetProdInstallLoadingPart4(PROJECT_SPECIFIED) {
    console.log('buffet prod install initial load complete; unmasking');
    GLOBAL_hasBuffetProdInstallTabBeenLoaded = true;
    Ext.getBody().unmask();
}

function doStagingFolderMenuLinksLoading(PROJECT_SPECIFIED) {
    //NOT USED BY SUMMARY LOADING!!
    //this function is called by uat/buffet tabs!! 
    var controller = GLOBAL_currentController.getController('Cookbook');
    var uatMenuLabel = Ext.ComponentQuery.query('#uatProdInstallLinkLabel')[0];
    var prodMenuLabel = Ext.ComponentQuery.query('#buffetProdInstallLinkLabel')[0];
    var uatmenu = Ext.ComponentQuery.query('#uatProdInstallLinkMenu')[0];
    var prodmenu = Ext.ComponentQuery.query('#buffetProdInstallLinkMenu')[0];
    uatmenu.removeAll();
    prodmenu.removeAll();
    uatMenuLabel.disable();
    prodMenuLabel.disable();
    if (PROJECT_SPECIFIED != null && PROJECT_SPECIFIED != undefined) {
        var store = GLOBAL_currentController.getController('Cookbook').getStore('StagingFolders');
        store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
        var fields;
        store.load({
            callback: function(records, operation, success) {
                if (records) {
                    if (success && (records.length > 0)) {
                        for (i in records) {
                            if (records[i].get('type') == 'uat' || records[i].get('type') == 'prod' || records[i].get('type') == 'soak') {
                                if (records[i].get('notes') != null && records[i].get('notes') != undefined && records[i].get('notes') != '') {
                                    uatMenuLabel.enable();
                                    var folder = records[i].get('folder');
                                    uatmenu.add([{
                                        text: records[i].get('notes'),
                                        handler: function() {
                                            var thisValue = this.text;
                                            var store = GLOBAL_currentController.getController('Cookbook').getStore('StagingFolders');
                                            var indexOfRecord = store.find('notes', thisValue);
                                            var record = store.findRecord('notes', thisValue);
                                            if (record.get('is_buffet') != false) {
                                                record = store.findRecord('notes', thisValue, indexOfRecord + 1);
                                            }
                                            GLOBAL_currentController.openOpsExplorerWindow(null, null, null, record.get('folder'));
                                            //window.open(record.get('folder'), '_blank');
                                        }
                                    }]);
                                }
                            } else {
                                if (records[i].get('notes') != null && records[i].get('notes') != undefined && records[i].get('notes') != '') {
                                    prodMenuLabel.enable();
                                    var folder = records[i].get('folder');
                                    prodmenu.add([{
                                        text: records[i].get('notes'),
                                        handler: function() {
                                            var thisValue = this.text;
                                            var store = GLOBAL_currentController.getController('Cookbook').getStore('StagingFolders');
                                            var indexOfRecord = store.find('notes', thisValue);
                                            var record = store.findRecord('notes', thisValue);
                                            if (record.get('is_buffet') == false) {
                                                record = store.findRecord('notes', thisValue, indexOfRecord + 1);
                                            }
                                            GLOBAL_currentController.openOpsExplorerWindow(null, null, null, record.get('folder'));
                                            //window.open(record.get('folder'), '_blank');
                                        }
                                    }]);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}

function doSystemsLoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * doSystemsLoading//doSystemsLoadingPart2//doSystemsLoadingPart3
     *
     * Order of events - function name:
     * 1. Page is masked - doSystemsLoading
     * 2a. Call to SWDSchedules store to load - doSystemsLoading
     *      2b. SWDSchedules store contains a callback method to load SystemsAssessments Store
     * 3a. SystemsAssessments store load triggered from SWDSchedules callback method - doSystemsLoadingPart2
     *      3b. SystemsAssessments store contains a callback method load HardwareRequirements Store
     * 4a. HardwareRequirements store load triggered from SystemsAssessments callback method - doSystemsLoadingPart3
     *      4b. HardwareRequirements store contains a callback method to unmask page
     * 5. Page is unmasked triggered from HardwareRequirements store callback method - doSystemsLoadingPart3
     */

    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasSystemsTabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to SWDSchedules store to load 
            var store = controller.getStore('SWDSchedules');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                //comments
                                var comments = Ext.ComponentQuery.query('#systemsCommentsArea')[0];
                                comments.setValue(records[i].get('systems_comments'));
                            }
                        }
                    }
                    //2b. SWDSchedules store contains a callback method to load SystemsAssessments Store
                    doSystemsLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('systems tab already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doSystemsLoadingPart2(PROJECT_SPECIFIED) {
    //3a. SystemsAssessments store load triggered from SWDSchedules callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('SystemsAssessments');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "SYS") || (GLOBAL_permission == "OPM"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#sysTabSysEngineeringGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records.length > 0) {
                Ext.ComponentQuery.query('#sysTabSysEngineeringGrid')[0].expand(true);
                Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
                Ext.ComponentQuery.query('#Systems')[0].doLayout();
            }
            Ext.defer(function() {
                updateTotalSysDates();
            }, 1000);
            Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
            Ext.ComponentQuery.query('#Systems')[0].doLayout();
            //3b. SystemsAssessments store contains a callback method load HardwareRequirements Store
            store = controller.getStore('SystemsContacts');
            store.load({
                callback: function(records, operation, success) {
                    doSystemsLoadingPart3(PROJECT_SPECIFIED);
                }
            });
        }
    });
}

function doSystemsLoadingPart3(PROJECT_SPECIFIED) {
    //4a. HardwareRequirements store load triggered from SystemsAssessments callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('HardwareRequirements');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "SYS") || (GLOBAL_permission == "OPM"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#sysTabHardwareSoftwareGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records.length > 0) {
                Ext.ComponentQuery.query('#sysTabHardwareSoftwareGrid')[0].expand(true);
                Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
                Ext.ComponentQuery.query('#Systems')[0].doLayout();
            }
            console.log('systems tab initial lode complete; unmasking');
            GLOBAL_hasSystemsTabBeenLoaded = true;
            Ext.getBody().unmask();
            Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
            Ext.ComponentQuery.query('#Systems')[0].doLayout();
        }
    });
}



function doTLSLoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * doTLSLoading//doTLSLoadingPart2
     *
     * Order of events - function name:
     * 1. Page is masked - doTLSLoading
     * 2a. Call to SWDSchedules store to load - doTLSLoading
     *      2b. SWDSchedules store contains a callback method to load SWDAssessments Store
     * 3a. SWDAssessments store load triggered from SWDSchedules callback method - doTLSLoadingPart2
     *      3b. SWDAssessments store contains a callback method to unmask page
     * 4. Page is unmasked triggered from SWDAssessments store callback method - doTLSLoadingPart2
     */
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasTLSTabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to SWDSchedules store to load
            var store = controller.getStore('SWDSchedules');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                //comments
                                var comments = Ext.ComponentQuery.query('#tlsCommentsArea')[0];
                                comments.setValue(records[i].get('tls_comments'));
                            }
                        }
                    }
                    //2b. SWDSchedules store contains a callback method to load SWDAssessments Store
                    doTLSLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('tls tab already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doTLSLoadingPart2(PROJECT_SPECIFIED) {
    //3a. SWDAssessments store load triggered from SWDSchedules callback method - doTLSLoadingPart2
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('TLSIPAssessments');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#tlsTabTLSIPAssessmentsGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    Ext.ComponentQuery.query('#tlsTabTLSIPAssessmentsGrid')[0].expand(true);
                    Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#TLS')[0].doLayout();
                }
                updateTLSIPHours();
            }
            var store = controller.getStore('TLSContacts');
            store.load({
                callback: function(records, operation, success) {
                    controller.getStore('TLSContacts').sort('name', 'ASC');
                    Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#TLS')[0].doLayout();
                    doTLSLoadingPart3(PROJECT_SPECIFIED);
                }
            });
        }
    });
}

function doTLSLoadingPart3(PROJECT_SPECIFIED) {
    //3a. SWDAssessments store load triggered from SWDSchedules callback method - doTLSLoadingPart2
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('TLSSaaSAssessments');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TLS"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#tlsTabTLSSaaSAssessmentsGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    Ext.ComponentQuery.query('#tlsTabTLSSaaSAssessmentsGrid')[0].expand(true);
                    Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#TLS')[0].doLayout();
                }
                updateTLSSaaSHours();
            }
            Ext.ComponentQuery.query('#TLS')[0].doComponentLayout();
            Ext.ComponentQuery.query('#TLS')[0].doLayout();
            GLOBAL_currentController.getController('Cookbook').getStore('TLSContacts').sort('name', 'ASC');
            console.log('tls tab initial lode complete; unmasking');
            GLOBAL_hasTLSTabBeenLoaded = true;
            Ext.getBody().unmask();
            //4. Page is unmasked triggered from SWDAssessments store callback method - doTLSLoadingPart2
        }
    });
}

function doSWDLoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * doSWDLoading//doSWDLoadingPart2//doSWDLoadingPart3
     *
     * Order of events - function name:
     * 1. Page is masked - doSWDLoading
     * 2a. Call to SWDSchedules store to load - doSWDLoading
     *      2b. SWDSchedules store contains a callback method to load SWDAssessments Store
     * 3a. SWDAssessments store load triggered from SWDSchedules callback method - doSWDLoadingPart2
     *      3b. SWDAssessments store contains a callback method to load UATProdInstall Store
     * 4a. UATProdInstall store load triggered from SWDAssessments callback method - doSWDLoadingPart3
     *      4b. UATProdInstall store contains a callback method to unmask page
     * 5. Page is unmasked triggered from UATProdInstall store callback method - doSWDLoadingPart3
     */
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasSWDTabBeenLoaded == false) {
            GLOBAL_hasSWDLoaded = true; //do we use this var?? 
            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to SWDSchedules store to load
            var store = controller.getStore('SWDSchedules');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                //billable TM hours
                                var bphours = Ext.ComponentQuery.query('#billablePMHours')[0];
                                bphours.setValue(records[i].get('billable_pm_hours'));
                                //comments
                                var comments = Ext.ComponentQuery.query('#swdCommentsArea')[0];
                                comments.setValue(records[i].get('comments'));
                                //vendor
                                var svs = Ext.ComponentQuery.query('#scheduledVendorStart')[0];
                                svs.setFullValue(records[i].get('scheduled_vendor_start')); //(smm) changing rawValue to setFullValue for textDates
                                var svc = Ext.ComponentQuery.query('#scheduledVendorComplete')[0];
                                svc.setFullValue(records[i].get('scheduled_vendor_complete'));
                                var avc = Ext.ComponentQuery.query('#actualVendorComplete')[0];
                                avc.setFullValue(records[i].get('actual_vendor_complete'));
                                //ba
                                var sbs = Ext.ComponentQuery.query('#scheduledBAStart')[0];
                                sbs.setFullValue(records[i].get('scheduled_ba_start'));
                                var sbc = Ext.ComponentQuery.query('#scheduledBAComplete')[0];
                                sbc.setFullValue(records[i].get('scheduled_ba_complete'));
                                var abc = Ext.ComponentQuery.query('#actualBAComplete')[0];
                                abc.setFullValue(records[i].get('actual_ba_complete'));
                                //cf docs
                                var sdc = Ext.ComponentQuery.query('#scheduledCFDocsToCustomer')[0];
                                sdc.setFullValue(records[i].get('scheduled_docs_to_customer'));
                                var sda = Ext.ComponentQuery.query('#scheduledCFDocsApproval')[0];
                                sda.setFullValue(records[i].get('scheduled_docs_approval'));
                                var adc = Ext.ComponentQuery.query('#actualCFDocsToCustomer')[0];
                                adc.setFullValue(records[i].get('actual_docs_to_customer'));
                                var ada = Ext.ComponentQuery.query('#actualCFDocsApproval')[0];
                                ada.setFullValue(records[i].get('actual_docs_approval'));
                                //scripts
                                var tso = Ext.ComponentQuery.query('#targetScriptsOrdered')[0];
                                tso.setFullValue(records[i].get('target_scripts_ordered'));
                                var tsd = Ext.ComponentQuery.query('#targetScriptsDelivered')[0];
                                tsd.setFullValue(records[i].get('target_scripts_delivered'));
                                var asl = Ext.ComponentQuery.query('#actualScriptsLoaded')[0];
                                asl.setFullValue(records[i].get('actual_scripts_loaded'));
                                //dev
                                Ext.ComponentQuery.query('#scheduledDevStart')[0].setFullValue(records[i].get('scheduled_dev_start'));
                                Ext.ComponentQuery.query('#scheduledDevComplete')[0].setFullValue(records[i].get('scheduled_dev_complete'));
                                var adc2 = Ext.ComponentQuery.query('#actualDevComplete')[0];
                                adc2.setFullValue(records[i].get('actual_dev_complete'));
                                //qa
                                var aqc = Ext.ComponentQuery.query('#actualQAComplete')[0];
                                aqc.setFullValue(records[i].get('actual_qa_complete'));
                                //tls_SaaS
                                var sts = Ext.ComponentQuery.query('#scheduledTLSSAASStart')[0];
                                sts.setFullValue(records[i].get('scheduled_tls_start'));
                                var stc = Ext.ComponentQuery.query('#scheduledTLSSAASComplete')[0];
                                stc.setFullValue(records[i].get('scheduled_tls_complete'));
                                var atc = Ext.ComponentQuery.query('#actualTLSSAASComplete')[0];
                                atc.setFullValue(records[i].get('actual_tls_complete'));
                                //systems
                                var sss = Ext.ComponentQuery.query('#scheduledSystemsStart')[0];
                                sss.setFullValue(records[i].get('scheduled_systems_start'));
                                var ssc = Ext.ComponentQuery.query('#scheduledSystemsComplete')[0];
                                ssc.setFullValue(records[i].get('scheduled_systems_complete'));
                                var asc = Ext.ComponentQuery.query('#actualSystemsComplete')[0];
                                asc.setFullValue(records[i].get('actual_systems_complete'));
                                //uat
                                var sud = Ext.ComponentQuery.query('#scheduledUATDelivery')[0];
                                sud.setFullValue(records[i].get('scheduled_uat_delivery'));
                                var aud = Ext.ComponentQuery.query('#actualUATDelivery')[0];
                                aud.setFullValue(records[i].get('actual_uat_delivery'));
                                //production dates
                                var tpd = Ext.ComponentQuery.query('#SWDSummaryTargetProdDate')[0];
                                tpd.setFullValue(records[i].get('target_production_date'));
                                var apd = Ext.ComponentQuery.query('#SWDSummaryActualProdDate')[0];
                                apd.setFullValue(records[i].get('actual_production_date'));
                            }
                        }
                    }
                    //2b. SWDSchedules store contains a callback method to load SWDAssessments Store
                    doSWDLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        }
    }
}

function doSWDLoadingPart2(PROJECT_SPECIFIED) {
    //3a. SWDAssessments store load triggered from SWDSchedules callback method
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('SWDAssessments');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TC"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#swdTabSWDAssessmentsGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    Ext.ComponentQuery.query('#swdTabSWDAssessmentsGrid')[0].expand(true);
                    Ext.ComponentQuery.query('#SWD')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#SWD')[0].doLayout();
                }
            }
            Ext.ComponentQuery.query('#SWD')[0].doComponentLayout();
            Ext.ComponentQuery.query('#SWD')[0].doLayout();
            GLOBAL_currentController.getController('Cookbook').getStore('SWDContacts').sort('name', 'ASC');
            Ext.defer(function() {
                updateTotalDevHours();
                updateTotalDevDates();
                if (GLOBAL_hasSystemsTabBeenLoaded) {
                    updateTotalSysDates();
                }
            }, 1500)
            var store = controller.getStore('SWDContacts');
            store.load({
                callback: function(records, operation, success) {
                    controller.getStore('SWDContacts').sort('name', 'ASC');
                    doSWDLoadingPart3(PROJECT_SPECIFIED);
                }
            });
        }
    });
}

function doSWDLoadingPart3(PROJECT_SPECIFIED) {
    console.log('swd tab initial lode complete; unmasking');
    GLOBAL_hasSWDTabBeenLoaded = true;
    Ext.getBody().unmask();
}


function doRequirementsTabLoading(PROJECT_SPECIFIED) {

    //These stores are called in succession
    //looks crazy, but since no processing is going on other than a load function and callback,
    //it is easier (less space) to do this than make another 20 functions doing only 1 store load and callback
    //but no processing. 

    GLOBAL_currentController.getStore("Applications").load({
        callback: function(records, operation, success) {
            GLOBAL_currentController.getStore("BackofficeDBs").load({
                callback: function(records, operation, success) {
                    GLOBAL_currentController.getStore("ScraperTypes").load({
                        callback: function(records, operation, success) {
                            GLOBAL_currentController.getStore("BackofficeProcesses").load({
                                callback: function(records, operation, success) {
                                    GLOBAL_currentController.getStore("BackofficeWebservices").load({
                                        callback: function(records, operation, success) {
                                            GLOBAL_currentController.getStore("ConfigurationFiles").load({
                                                callback: function(records, operation, success) {
                                                    GLOBAL_currentController.getStore("Engines").load({
                                                        callback: function(records, operation, success) {
                                                            GLOBAL_currentController.getStore("ExtdbTables").load({
                                                                callback: function(records, operation, success) {
                                                                    GLOBAL_currentController.getStore("FaxForms").load({
                                                                        callback: function(records, operation, success) {
                                                                            GLOBAL_currentController.getStore("FileXferDownloads").load({
                                                                                callback: function(records, operation, success) {
                                                                                    GLOBAL_currentController.getStore("FileXferUploads").load({
                                                                                        callback: function(records, operation, success) {
                                                                                            GLOBAL_currentController.getStore("Grammars").load({
                                                                                                callback: function(records, operation, success) {
                                                                                                    GLOBAL_currentController.getStore("Managers").load({
                                                                                                        callback: function(records, operation, success) {
                                                                                                            GLOBAL_currentController.getStore("Scrapers").load({
                                                                                                                callback: function(records, operation, success) {
                                                                                                                    GLOBAL_currentController.getStore("ServiceIDs").load({
                                                                                                                        callback: function(records, operation, success) {
                                                                                                                            GLOBAL_currentController.getStore("Applications").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("BackofficeDBs").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("ScraperTypes").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("BackofficeProcesses").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("BackofficeWebservices").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("ConfigurationFiles").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("Engines").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("ExtdbTables").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("FaxForms").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("FileXferDownloads").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("FileXferUploads").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("Grammars").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("Managers").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("Scrapers").sort('name', 'ASC');
                                                                                                                            GLOBAL_currentController.getStore("ServiceIDs").sort('name', 'ASC');
                                                                                                                            GLOBAL_hasRequirementsTabBeenLoaded = true;
                                                                                                                            console.log('req tab initial lode complete; unmasking');
                                                                                                                            Ext.getBody().unmask();
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}


function doQALoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * doQALoading//doQALoadingPart2
     *
     * Order of events - function name:
     * 1. Page is masked - doSWDLoading
     * 2a. Call to SWDSchedules store to load -  doQALoading
     *      2b. SWDSchedules store contains a callback method to load SWDAssessments Store
     * 3a. SWDAssessments store load triggered from SWDSchedules callback method - doQALoadingPart2
     *      3b. SWDAssessments store contains a callback method to unmask page
     * 4. Page is unmasked triggered from SWDAssessments store callback method - doQALoadingPart2
     */
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasQATabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to SWDSchedules store to load 
            var store = controller.getStore('SWDSchedules');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                //comments
                                var comments = Ext.ComponentQuery.query('#qaCommentsArea')[0];
                                comments.setValue(records[i].get('qa_comments'));
                            }
                        }
                    }
                    //2b. SWDSchedules store contains a callback method to load SystemsAssessments Store
                    doQALoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('qa tab already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}


function doQALoadingPart2(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('OSGAssessments');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#osgTabOSGAssessmentGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    Ext.ComponentQuery.query('#osgTabOSGAssessmentGrid')[0].expand(true);
                    Ext.ComponentQuery.query('#OSG')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#OSG')[0].doLayout();
                }
            }
            var store = controller.getStore('OSGContacts');
            store.load({
                callback: function(records, operation, success) {
                    controller.getStore('OSGContacts').sort('name', 'ASC');
                    Ext.ComponentQuery.query('#OSG')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#OSG')[0].doLayout();
                    console.log('qa tab initial lode complete; unmasking');
                    GLOBAL_hasQATabBeenLoaded = true;
                    Ext.getBody().unmask();
                    updateQATotalHours();
                }
            });
        }
    });
}

function doNetworkOpsLoading(PROJECT_SPECIFIED) {
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasNetworkOpsTabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to SWDSchedules store to load 
            var store = controller.getStore('SWDSchedules');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                //comments
                                var comments = Ext.ComponentQuery.query('#networkOpsCommentsArea')[0];
                                comments.setValue(records[i].get('net_ops_comments'));
                            }
                        }
                    }
                    //2b. SWDSchedules store contains a callback method to load SystemsAssessments Store
                    doNetworkOpsLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('net ops already loaded before; unmasking');
            Ext.getBody().unmask();
        }
    }
}


function doNetworkOpsLoadingPart2(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('NetworkOpsAssessments');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.user_name = GLOBAL_username;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#netopsTabNetworkOpsAssessmentGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    Ext.ComponentQuery.query('#netopsTabNetworkOpsAssessmentGrid')[0].expand(true);
                    Ext.ComponentQuery.query('#NetworkOps')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#NetworkOps')[0].doLayout();
                }
            }
            var store = controller.getStore('NetworkOpsContacts');
            store.load({
                callback: function(records, operation, success) {
                    controller.getStore('NetworkOpsContacts').sort('name', 'ASC');
                    console.log('net ops initial lode complete; unmasking');
                    GLOBAL_hasNetworkOpsTabBeenLoaded = true;
                    Ext.ComponentQuery.query('#NetworkOps')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#NetworkOps')[0].doLayout();
                    updateNetworkOpsTotalHours();
                    Ext.getBody().unmask();
                }
            });
            //3b. SystemsAssessments store contains a callback method load HardwareRequirements Store
        }
    });
}

function doAccessUSANLoading(PROJECT_SPECIFIED) {
    /*UPDATED FUNCTION:
     * doAccessUSANLoading//doAccessUSANLoadingPart2
     *
     * Order of events - function name:
     * 1. Page is masked - doAccessUSANLoading
     * 2a. Call to SWDSchedules store to load -  doAccessUSANLoading
     *      2b. SWDSchedules store contains a callback method to load AccessUSANReq Store
     * 3a. AccessUSANReq store load triggered from SWDSchedules callback method - doAccessUSANLoadingPart2
     *      3b. AccessUSANReq store contains a callback method to unmask page
     * 4. Page is unmasked triggered from AccessUSANReq store callback method - doAccessUSANLoadingPart2
     */
    if (PROJECT_SPECIFIED != null) {

        if (GLOBAL_hasAccessUSANTabBeenLoaded == false) {
            if (GLOBAL_currentController.getStore("ExtdbTables").getCount() < 1) {
                GLOBAL_currentController.getStore("ExtdbTables").load()
                GLOBAL_currentController.getStore("ExtdbTables").sort('name', 'ASC');
            }

            var controller = GLOBAL_currentController.getController('Cookbook');
            //2a. Call to SWDSchedules store to load 
            var store = controller.getStore('SWDSchedules');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.load({
                callback: function(records, operation, success) {
                    if (records) {
                        if (records.length > 0) {
                            for (i in records) {
                                //comments
                                var comments = Ext.ComponentQuery.query('#accessUSANCommentsArea')[0];
                                comments.setValue(records[i].get('access_usan_comments'));
                            }
                        }
                    }
                    //2b. SWDSchedules store contains a callback method to load AccessUSANReq Store
                    doAccessUSANLoadingPart2(PROJECT_SPECIFIED);
                }
            });
        } else {
            console.log('access usan has already been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doAccessUSANLoadingPart2(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');
    var store = controller.getStore('AccessUSANReqs');
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
        readOnly = true;
    }
    store.proxy.extraParams.read_only = readOnly;
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    if (readOnly) {
        Ext.ComponentQuery.query('#accessUSANAssessmentsGrid')[0].on('beforeedit', function(plugin, edit) {
            return false;
        });
    }
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (records.length > 0) {
                    Ext.ComponentQuery.query('#accessUSANAssessmentsGrid')[0].expand(true);
                    Ext.ComponentQuery.query('#AccessUSAN')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#AccessUSAN')[0].doLayout();
                }
            }
            var store = controller.getStore('AccessUsanTables');
            store.load({
                callback: function(records, operation, success) {
                    controller.getStore('AccessUsanTables').sort('name', 'ASC');
                    var store = controller.getStore('AccessUsanContacts');
                    store.load({
                        callback: function(records, operation, success) {
                            controller.getStore('AccessUsanContacts').sort('name', 'ASC');
                            Ext.ComponentQuery.query('#AccessUSAN')[0].doComponentLayout();
                            Ext.ComponentQuery.query('#AccessUSAN')[0].doLayout();
                            GLOBAL_hasAccessUSANTabBeenLoaded = true;
                            console.log('access usan initial lode complete; unmasking');
                            Ext.getBody().unmask();
                        }
                    });
                }
            });
        }
    });
}

function doAssumptionsLoading(PROJECT_SPECIFIED) {
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasAssumptionsTabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');

            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM"))) {
                readOnly = true;
            }

            var store = controller.getStore('ProjectAssumptions');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.proxy.extraParams.read_only = readOnly; //smm
            store.load({
                callback: function() {
                    store = GLOBAL_currentController.getStore('Assumptions');
                    store.proxy.extraParams.user_name = GLOBAL_username;
                    store.load({
                        callback: function() {
                            store = GLOBAL_currentController.getStore('Categories');
                            store.load({
                                callback: function() {
                                    GLOBAL_hasAssumptionsTabBeenLoaded = true;
                                    console.log('assumptions tab initial loading complete');
                                    Ext.getBody().unmask();
                                }
                            });

                        }
                    });
                }
            });
        } else {
            console.log('assumptions tab already has been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doDeliverablesLoading(PROJECT_SPECIFIED) {
    if (PROJECT_SPECIFIED != null) {
        if (GLOBAL_hasDeliverablesTabBeenLoaded == false) {
            var controller = GLOBAL_currentController.getController('Cookbook');
            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "OPM"))) {
                readOnly = true;
            }

            var store = controller.getStore('ProjectDeliverables');
            store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
            store.proxy.extraParams.read_only = readOnly; //smm
            store.load({
                callback: function() {
                    store = GLOBAL_currentController.getStore('Deliverables');
                    store.proxy.extraParams.user_name = GLOBAL_username;
                    store.load({
                        callback: function() {
                            GLOBAL_hasDeliverablesTabBeenLoaded = true;
                            console.log('deliverables tab initial loading complete');
                            Ext.getBody().unmask();
                        }
                    });
                }
            });
        } else {
            console.log('deliverables tab already has been loaded; unmasking');
            Ext.getBody().unmask();
        }
    }
}

function doPsuedoLoading() {
    //this is to have unifrom masking even on tabs which require no loading (summary/prompts)
    console.log('psuedo loading complete');
    Ext.getBody().unmask();
}

function doChangeLogLoading(PROJECT_SPECIFIED) {
    if (PROJECT_SPECIFIED != null) {
        var controller = GLOBAL_currentController.getController('Cookbook');

        var store = controller.getStore('ChangeLogs');
        store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
        store.load();
    }
}

function doTrafficRoutingGridsReload(PROJECT_SPECIFIED) {
    var controller = GLOBAL_currentController.getController('Cookbook');

    controller.getStore('TrafficRoutingRemoveDnises').removeAll();
    controller.getStore('TrafficRoutingChangeDnises').removeAll();
    controller.getStore('TrafficRoutingAddDnises').removeAll();


    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
        readOnly = true;
    }

    Ext.getBody().mask("Please wait..."); /* Load RoutingRequirements data and place in appropriate grids */
    var addgrid = Ext.ComponentQuery.query('viewTrafficRoutingAddDnis');
    var addstore = addgrid[0].getStore();
    addstore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    addstore.proxy.extraParams.permission = GLOBAL_permission;
    addstore.proxy.extraParams.user_name = GLOBAL_username;
    addstore.proxy.extraParams.read_only = readOnly; //smm
    var changegrid = Ext.ComponentQuery.query('viewTrafficRoutingChangeDnis');
    var changestore = changegrid[0].getStore();
    changestore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    changestore.proxy.extraParams.permission = GLOBAL_permission;
    changestore.proxy.extraParams.user_name = GLOBAL_username;
    changestore.proxy.extraParams.read_only = readOnly; //smm
    var removegrid = Ext.ComponentQuery.query('viewTrafficRoutingRemoveDnis');
    var removestore = removegrid[0].getStore();
    removestore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    removestore.proxy.extraParams.permission = GLOBAL_permission;
    removestore.proxy.extraParams.user_name = GLOBAL_username;
    removestore.proxy.extraParams.read_only = readOnly; //smm
    store = controller.getStore('RoutingRequirements');
    store.proxy.extraParams.project_id = PROJECT_SPECIFIED;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if (success && (records.length > 0)) {
                    //get the three grids
                    addstore.load({
                        callback: function(records, operation, success) {
                            if (success && (records.length > 0)) {
                                addgrid[0].expand(true);
                            }
                        }
                    });

                    changestore.load({
                        callback: function(records, operation, success) {
                            if (success && (records.length > 0)) {
                                changegrid[0].expand(true);
                            }
                        }
                    });

                    removestore.load({
                        callback: function(records, operation, success) {
                            if (success && (records.length > 0)) {
                                removegrid[0].expand(true);
                            }
                        }
                    });
                }
            }
            Ext.getBody().unmask();
        }
    });
}