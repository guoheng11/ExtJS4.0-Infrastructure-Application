function removeAddedEntries() {
    //this function removes entries added when the user wants to filter on application, etc (advanced)
    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
    for (var i = gridStore.getCount() - 1; i > -1; i--) {
        if (gridStore.getAt(i).get('hiddenVal') == 'true') {
            //console.log('removed: ' + gridStore.getAt(i).get('project_number'));
            gridStore.removeAt(i);
        } else {
            //console.log('could not remove: ' + gridStore.getAt(i).get('project_number'));
        }
    }
}



Ext.define('CookBook.view.mainview.navToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.navToolbar',
    cls: 'usan_navtoolbar',
    items: [{
        xtype: 'textfield',
        name: 'searchField',
        itemId: 'navSearchField',
        hideLabel: true,
        emptyText: 'search projects...',
        listeners: {
            change: function() {
                var gridToSearch = Ext.ComponentQuery.query('selectProjectGrid')[0];
                var searchField = 'project_number';
                gridToSearch.getStore().clearFilter();
                var regstr = new RegExp(this.getValue(), 'i');
                var searchType = Ext.ComponentQuery.query('#searchTypes')[0].text;
                var additionalFilter = false;
                switch (searchType) {
                case 'Project Number':
                    {
                        searchField = 'project_number';
                        break;
                    }
                case 'Project Name':
                    {
                        searchField = 'project_name';
                        break;
                    }
                case 'Company':
                    {
                        searchField = 'company';
                        break;
                    }
                case 'Primary Business Unit':
                    {
                        searchField = 'primary_business_unit';
                        break;
                    }
                case 'Applications':
                    {
                        searchField = 'application';
                        additionalFilter = true;
                        break;
                    }
                case 'Tables':
                    {
                        searchField = 'table';
                        additionalFilter = true;
                        break;
                    }
                case 'Scrapers':
                    {
                        searchField = 'scraper';
                        additionalFilter = true;
                        break;
                    }
                case 'Engines':
                    {
                        searchField = 'engine';
                        additionalFilter = true;
                        break;
                    }
                case 'Managers':
                    {
                        searchField = 'manager';
                        additionalFilter = true;
                        break;
                    }
                case 'Grammars':
                    {
                        searchField = 'grammar';
                        additionalFilter = true;
                        break;
                    }
                case 'DNIS':
                    {
                        searchField = 'dnis';
                        additionalFilter = true;
                        break;
                    }
                default:
                    searchField = 'project_number';
                    break;
                }
                gridToSearch.getStore().filter({
                    id: searchField,
                    property: searchField,
                    value: regstr
                });
                if (additionalFilter) {
                    gridToSearch.getStore().filter({
                        property: 'hiddenVal',
                        value: 'true'
                    });
                } else {
                    removeAddedEntries();
                }
            }
        }
    }, {
        text: 'Project Number',
        itemId: 'searchTypes',
        tooltip: 'Choose a filter',
        icon: 'extjs/resources/themes/images/default/form/search-trigger.gif',
        menu: [{
            text: 'Project Number',
            icon: 'images/icons/stock_standard_filter.png',
            handler: function() {
                Ext.ComponentQuery.query('#searchTypes')[0].setText('Project Number');
                Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
            }
        }, {
            text: 'Project Name',
            icon: 'images/icons/stock_standard_filter.png',
            handler: function() {
                Ext.ComponentQuery.query('#searchTypes')[0].setText('Project Name');
                Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
            }
        }, {
            text: 'Company',
            icon: 'images/icons/stock_standard_filter.png',
            handler: function() {
                Ext.ComponentQuery.query('#searchTypes')[0].setText('Company');
                Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
            }
        }, {
            text: 'Primary Business Unit',
            icon: 'images/icons/stock_standard_filter.png',
            handler: function() {
                Ext.ComponentQuery.query('#searchTypes')[0].setText('Primary Business Unit');
                Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
            }
        }, {
            text: 'Advanced (Requires Loading)',
            icon: 'images/icons/stock_advanced_filter.png',
            menu: [{
                text: 'Applications',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('ApplicationRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('Applications');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('name'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                application: records[i].get('name'),
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }, {
                text: 'Tables',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('TableRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('Tables');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('name'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                table: records[i].get('name'),
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }, {
                text: 'Scrapers',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('ScraperRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('Scrapers');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('name'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                scraper: records[i].get('name'),
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }, {
                text: 'Engines',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('EngineRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('Engines');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('name'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                engine: records[i].get('name'),
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }, {
                text: 'Managers',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('ManagerRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('Managers');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('name'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                manager: records[i].get('name'),
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }, {
                text: 'Grammars',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('GrammarRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('Grammars');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('name'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                grammar: records[i].get('name'),
                                                company: gridStore.findRecord('project_id', records[i].get('project_id')).get('company') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('company') : null,
                                                primary_business_unit: gridStore.findRecord('project_id', records[i].get('project_id')).get('primary_business_unit') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('primary_business_unit') : null,
                                                additional_business_units: gridStore.findRecord('project_id', records[i].get('project_id')).get('additional_business_units') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('additional_business_units') : null,
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                quote_loe_due_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('quote_loe_due_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('quote_loe_due_date') : null,
                                                expedite: gridStore.findRecord('project_id', records[i].get('project_id')).get('expedite') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('expedite') : null,
                                                preapproved: gridStore.findRecord('project_id', records[i].get('project_id')).get('preapproved') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('preapproved') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }, {
                text: 'DNIS',
                icon: 'images/icons/stock_advanced_filter.png',
                handler: function() {
                    Ext.ComponentQuery.query('selectProjectGrid')[0].getStore().clearFilter();
                    Ext.getBody().mask("Please wait...");
                    var gridStore = Ext.ComponentQuery.query('selectProjectGrid')[0].getStore();
                    removeAddedEntries();
                    var store = GLOBAL_currentController.getController('Cookbook').getStore('RoutingRequirementsNav');
                    store.proxy.extraParams.project_id = null;
                    store.load({
                        callback: function(records, operation, success) {
                            Ext.ComponentQuery.query('#searchTypes')[0].setText('DNIS');
                            if (records) {
                                if (gridStore.count() > 0) {
                                    for (i in records) {
                                        if (!Ext.isEmpty(records[i].get('dnis'))) {
                                            gridStore.add({
                                                project_id: records[i].get('project_id'),
                                                project_number: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_number'),
                                                project_name: gridStore.findRecord('project_id', records[i].get('project_id')).get('project_name'),
                                                dnis: records[i].get('dnis'),
                                                company: gridStore.findRecord('project_id', records[i].get('project_id')).get('company') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('company') : null,
                                                primary_business_unit: gridStore.findRecord('project_id', records[i].get('project_id')).get('primary_business_unit') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('primary_business_unit') : null,
                                                additional_business_units: gridStore.findRecord('project_id', records[i].get('project_id')).get('additional_business_units') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('additional_business_units') : null,
                                                requested_uat_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_uat_date') : null,
                                                requested_prod_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('requested_prod_date') : null,
                                                rfq_loe_recv_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('rfq_loe_recv_date') : null,
                                                quote_loe_due_date: gridStore.findRecord('project_id', records[i].get('project_id')).get('quote_loe_due_date') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('quote_loe_due_date') : null,
                                                expedite: gridStore.findRecord('project_id', records[i].get('project_id')).get('expedite') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('expedite') : null,
                                                preapproved: gridStore.findRecord('project_id', records[i].get('project_id')).get('preapproved') ? gridStore.findRecord('project_id', records[i].get('project_id')).get('preapproved') : null,
                                                hiddenVal: 'true'
                                            });
                                        }
                                    }
                                }
                            }
                            gridStore.filter({
                                property: 'hiddenVal',
                                value: 'true'
                            });
                            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
                            Ext.getBody().unmask();
                        }
                    });
                }
            }]
        }]
    }, '-', {
        text: 'Project Options',
        itemId: 'projectOptions',
        icon: 'extjs/resources/themes/images/default/tree/leaf.gif',
        menu: [{
            // xtype: 'button', // default for Toolbars
            text: 'Create New Project',
            icon: 'extjs/resources/themes/images/access/dd/drop-add.gif',
            handler: function() {
                //only PMs can create a new project
                if (GLOBAL_permission != "PM") {
                    alert("Only development project managers can create a new project");
                    return;
                }

                if (GLOBAL_projectCurrentlyOpen == false) {
                    createNewProject(true);
                } else {
                    Ext.Msg.show({
                        title: 'Project Conflict',
                        msg: 'You are attempting to open a project while one is already active. Would you like to close the active project and load the project selected?',
                        icon: Ext.Msg.QUESTION,
                        buttons: Ext.Msg.YESNO,
                        fn: function(button) {
                            processResult(button, null);
                            return;
                        }
                    });
                }
            }
        }, { //(smm) provide a Close Project button
            text: 'Close Current Project',
            icon: 'extjs/examples/restful/images/delete.png',
            itemId: 'closeCurrentProjectButton',
            listeners: {
                click: function() {
                    var readOnly = false;
                    if (GLOBAL_readonly) {
                        readOnly = true;
                    }
                    if (GLOBAL_projectCurrentlyOpen == false) {
                        alert("You aren't currently viewing a project");
                        return; //do nothing if there isn't a project open
                    } else {
                        var controller = GLOBAL_currentController;
                        var prevProjectId = GLOBAL_currentProjectOpenProjectID;
                        doStagingFolderMenuLinksLoading(null); //this will clear out the staging folder links
                        removeAllStoreData();
                        resetAllGlobalVariables();
                        var currentProj = Ext.ComponentQuery.query('mainCookView')[0];
                        currentProj.destroy();

                        //add the usan logo screen back
                        var cont = Ext.ComponentQuery.query('splash')[0];
                        cont.add({
                            frame: false,
                            bodyCls: 'usan_logo',
                            html: 'USAN Project Management',
                            bodyStyle: {
                                "background-color": "#d0e0f4",
                                padding: '10px'
                            }
                        });

                        //now that we've destroyed everything about the previous project, we need to release the lock
                        if (!readOnly) {
                            var json = Ext.JSON.encode("Prev project to be unlocked project_id: " + prevProjectId);
                            Ext.Ajax.request({
                                url: 'ReleaseProjectLock.ashx',
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                jsonData: json,
                                params: {
                                    project_id: prevProjectId,
                                    user_name: GLOBAL_username
                                },
                                success: function(request) {
                                    //set current project label to empty
                                    Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
                                    //(smm) clear the ReadOnly text if it was there
                                    if (GLOBAL_readonly) {
                                        GLOBAL_readonly = false; //clear the flag while we're at it
                                        Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
                                    }
                                },
                                failure: function(response) {
                                    var obj = Ext.decode(response.responseText);
                                    alert("There was an error in closing the project: " + obj.rows[0]);
                                }
                            });
                        } else {
                            Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
                            if (GLOBAL_readonly) {
                                GLOBAL_readonly = false;
                                Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
                            }
                        }
                    }
                }
            }
        }]
    }, {
        xtype: 'label',
        itemId: 'readOnlyLabel',
        margins: '7 0 5 0',
        text: ''
    }, '->', {
        xtype: 'label',
        baseCls: 'current_project',
        margins: '7 0 5 0',
        itemId: 'currentProjNavLabel',
        text: ''
    },
    /*'-',
     {
     text: 'Save Current Project',
     icon: 'images/icons/save.jpg',
     handler: function(){
     console.log('saved');
     }
     },*/
    // begin using the right-justified button container
    '->', // same as { xtype: 'tbfill' }
    {
        text: 'Links Menu',
        icon: 'extjs/resources/themes/images/access/grid/group-by.gif',
        menu: [{
            text: 'Project Specific Links',
            menu: {
                items: [{
                    text: 'Project Folder',
                    handler: function() {
                        if (GLOBAL_currentProjectOpenProjectID != null && GLOBAL_currentProjectOpenProjectID != "") {
                            var field = Ext.ComponentQuery.query('viewSummaryProjectFolder')[0];
                            GLOBAL_currentController.openOpsExplorerWindow(null, null, null, field.getValue());
                            //window.open(field.getValue(), '_blank');
                        }
                    }
                }, {
                    text: 'Prompts',
                    handler: function() {
                        if (GLOBAL_currentProjectOpenProjectID != null && GLOBAL_currentProjectOpenProjectID != "") {
                            var field = Ext.ComponentQuery.query('viewPromptsPromptWorksheet')[0];
                            GLOBAL_currentController.openOpsExplorerWindow(null, null, null, field.getValue());
                            //window.open(field.getValue(), '_blank');
                        }
                    }
                }, {
                    text: 'UAT & Prod Install Links',
                    itemId: 'uatProdInstallLinkLabel',
                    disabled: true,
                    menu: {
                        itemId: 'uatProdInstallLinkMenu'
                    }
                }, {
                    text: 'Buffet Prod Install Links',
                    itemId: 'buffetProdInstallLinkLabel',
                    disabled: true,
                    menu: {
                        itemId: 'buffetProdInstallLinkMenu'
                    }
                }]
            }
        }, {
            text: 'Common',
            menu: {
                items: [{
                    text: 'Button',
                    handler: function() {
                        window.open('http://nor2k3rep4:8080/Button2/button.jsp', '_blank');
                    }
                }, {
                    text: 'AccessUSAN',
                    handler: function() {
                        window.open('http://1.22.6.171:9999/login.asp', '_blank');
                    }
                }, {
                    text: 'Visio Drop',
                    handler: function() {
                        GLOBAL_currentController.openOpsExplorerWindow(null, null, null, '//nor2k3sysinf1/e_drive/Visios');
                    }
                }, {
                    text: 'Footprints',
                    handler: function() {
                        window.open('http://nor2k8numara.usani.com/MRcgi/MRentrancePage.pl?DONT_USE_COOKIE=1&LOGGED_OUT=1', '_blank');
                    }
                }, {
                    text: 'Vision',
                    handler: function() {
                        window.open('http://norw7renb/usanapplications/', '_blank');
                    }
                }, {
                    text: 'Team Services RFQ Status',
                    handler: function() {
                        window.open('http://teamservices.usani.com/Lists/RFQ%20Status/AllItems.aspx', '_blank');
                    }
                }, {
                    text: 'Dev1 Prod Stage',
                    handler: function() {
                        GLOBAL_currentController.openOpsExplorerWindow(null, null, null, '//Nor2k3dev1/production_stage');
                    }
                }]
            }
        }, {
            text: 'Email Links',
            menu: {
                itemId: 'emailLinksMenu',
                items: [{
                    text: 'SWD Assessment Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('SWD Assessment Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'SWD Assessment Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('SWD Assessment Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'OPS Assessment Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('OPS Assessment Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'OPS Assessment Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('OPS Assessment Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Schedule Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Schedule Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Schedule Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Schedule Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'M# Assignment Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('M Assignment Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'M# Assignment Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('M Assignment Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'PO# Request GreatVoice',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('PO Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'PO# Request GM Voices',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('PO Request GM Voices');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Prompt Load Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Prompt Load Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Prompt Load Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Prompt Load Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Prompt Quote Request for GM Voices',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Request for Prompt Quote GM Voices');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Project Approved for Development',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Project Approved');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev UAT Staging Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev UAT Staging Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev UAT Staging Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev UAT Staging Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'UAT Handoff - Load Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('UAT Handoff Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'UAT Handoff - Load Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('UAT Handoff Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Prod Staging Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Prod Staging Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Prod Staging Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Prod Staging Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Prod Staging Request - Buffet',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Prod Staging Request Buffet');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Prod Staging Complete - Buffet',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Prod Staging Complete Buffet');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Production Handoff',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Production Handoff');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Production Handoff - Buffet',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Production Handoff Buffet');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Request for Prompt Quote GM Voices',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Request for Prompt Quote GM Voices');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Dev Complete',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Dev Complete');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Visio Approval Received',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Visio Approval Received');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Test Acct Request',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Test Acct Request');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Test Acct Received',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Test Acct Received');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Table Request UAT',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Table Request UAT');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Table Received UAT',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Table Received UAT');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }, {
                    text: 'Table Request PROD',
                    handler: function() {
                        if (GLOBAL_username != 'anonymous' && GLOBAL_username != 'undefined' && GLOBAL_username != null) {
                            openEmailWindow('Table Request PROD');
                        } else {
                            alert("You must be signed in to generate an email");
                            return;
                        }
                    }
                }]
            }
        }, {
            text: 'Generate IFQ',
            handler: function() {
                if (GLOBAL_permission != "PM") {
                    alert("Only development project managers can generate an IFQ");
                    return;
                }
                if (GLOBAL_currentProjectOpenProjectID == null || GLOBAL_currentProjectOpenProjectID == "" || GLOBAL_currentProjectOpenProjectID == 0) {
                    alert("You must log in to a project before generating an IFQ");
                    return;
                }

                //check for a project folder
                var folder = Ext.ComponentQuery.query("viewSummaryProjectFolder")[0].getValue();
                console.log(folder);

                if ((folder == "") || (folder == " ") || (folder == undefined)) {
                    alert("Before you can generate an IFQ, you must set a project folder in the Summary tab");
                    return;
                }

                var jsonBlob = Ext.JSON.encode("Nothing to see here");

                Ext.Ajax.request({
                    url: 'CreateIFQ.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID
                    },
                    jsonData: jsonBlob,
                    success: function(response) {
                        var obj = Ext.decode(response.responseText);
                        console.log(obj.rows[0]);

                        //(smm 09/05/12 - Return a success message if the IFQ succeeded, else display the error)
                        if (obj.rows[0] == "IFQ created") {
                            alert("The IFQ was successfully generated at " + folder);
                        } else {
                            alert("Error in generating the IFQ:\n" + obj.rows[0]);
                        }
                    }
                });
            }
        }, {
            text: 'Export Current Project as XLS',
            //icon: 'images/icons/application_go.png',
            handler: function() {
                if (GLOBAL_permission != "PM") {
                    alert("Only development project managers can export a project");
                    return;
                }

                if (GLOBAL_currentProjectOpenProjectID == 0 || GLOBAL_currentProjectOpenProjectID == null) {
                    alert("Please open a project before exporting");
                    return;
                }

                if (!Ext.isEmpty(GLOBAL_currentProjectOpenProjectID)) {
                    var jsonBlob = Ext.JSON.encode(GLOBAL_currentProjectOpenProjectID);

                    Ext.Ajax.request({
                        url: 'ExportCurrentProject.ashx',
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
                            var obj = Ext.decode(response.responseText);
                            if (obj.rows[0].indexOf("Error") == -1 && obj.rows[0].indexOf("error") == -1) {
                                alert(obj.rows[0]);
                                console.log("Project Exported");
                            } else {
                                alert('Error during Export Please contact Cookbook Admin ' + obj.rows[0]);
                                console.log("ERROR - Project NOT Exported");
                            }
                        }
                    });
                }
            }
        }, {
            text: 'RFQ Report View',
            handler: function() {
                launchRFQReportView();
            }
        }, {
            text: 'Routing Report View',
            handler: function() {
                launchRoutingReportView();
            }
        }]
    }, // add a vertical separator bar between toolbar items
    '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
    {
        text: 'Editors',
        icon: 'extjs/resources/themes/images/access/grid/columns.gif',
        menu: [{
            text: 'Requirement Editors',
            menu: {
                items: [{
                    text: 'Applications',
                    handler: function() {
                        openApplicationsEditor();
                    }
                }, {
                    text: 'Tables',
                    handler: function() {
                        openExtdbTableEditor();
                    }
                }, {
                    text: 'Scrapers',
                    handler: function() {
                        openScraperEditor();
                    }
                }, {
                    text: 'Engines',
                    handler: function() {
                        openEngineEditor();
                    }
                }, {
                    text: 'Managers',
                    handler: function() {
                        openManagerEditor();
                    }
                }, {
                    text: 'Grammars',
                    handler: function() {
                        openGrammarEditor();
                    }
                }, {
                    text: 'Service IDs',
                    handler: function() {
                        openServiceIDEditor();
                    }
                }, {
                    text: 'Back Office DBs',
                    handler: function() {
                        openBackofficeDBEditor();
                    }
                }, {
                    text: 'Back Office Processes',
                    handler: function() {
                        openBackofficeProcessEditor();
                    }
                }, {
                    text: 'Back Office Web Services',
                    handler: function() {
                        openBackofficeWebserviceEditor();
                    }
                }, {
                    text: 'Configuration Files',
                    handler: function() {
                        openConfigurationFileEditor();
                    }
                }, {
                    text: 'Fax Forms',
                    handler: function() {
                        openFaxFormEditor();
                    }
                }, {
                    text: 'File Xfers - Upload',
                    handler: function() {
                        openFileXferUploadEditor();
                    }
                }, {
                    text: 'File Xfers - Download',
                    handler: function() {
                        openFileXferDownloadEditor();
                    }
                }]
            }

        }, {
            text: 'Companies',
            handler: function() {
                openCompanyEditor();
            }
        }, {
            text: 'Business Units',
            handler: function() {
                openBusinessUnitEditor();
            }
        }, {
            text: 'Contacts',
            handler: function() {
                openContactsEditor();
            }
        }, {
            text: 'Status Types',
            handler: function() {
                openStatusTypeEditor();
            }
        }, {
            text: 'Report Names',
            handler: function() {
                openReportNameEditor();
            }
        }, {
            text: 'Delivery Types',
            menu: {
                items: [{
                    text: 'Delivery Methods',
                    handler: function() {
                        openDeliveryMethodEditor();
                    }
                }, {
                    text: 'Delivery Formats',
                    handler: function() {
                        openDeliveryFormatEditor();
                    }
                }, {
                    text: 'Delivery Frequencies',
                    handler: function() {
                        openDeliveryFrequencyEditor();
                    }
                }]
            }
        }, {
            text: 'Platforms',
            handler: function() {
                openPlatformEditor();
            }
        }, {
            text: 'Languages',
            handler: function() {
                openLanguageEditor();
            }
        }, {
            text: 'Nodes',
            handler: function() {
                openNodeEditor();
            }
        }, {
            text: 'Assumptions Categories',
            handler: function() {
                openCategoryEditor();
            }
        }/*, {
            text: 'Manage Assumptions',
            handler: function() {
                openAssumptionsEditor();
            }
        }, {
            text: 'Manage Deliverables',
            handler: function() {
                openDeliverablesEditor();
            }
        }*/]
    }, {
        xtype: 'tbspacer',
        width: 25
    }, {
        xtype: 'label',
        itemId: 'usernameLabel',
        text: 'anonymous'
    }, {
        xtype: 'tbspacer',
        width: 25
    }, {
        xtype: 'label',
        itemId: 'timerLabel',
        text: 'No Session Active'
    }, {
        xtype: 'tbspacer',
        width: 30
    }, 'USAN Cookbook v1.0']
});