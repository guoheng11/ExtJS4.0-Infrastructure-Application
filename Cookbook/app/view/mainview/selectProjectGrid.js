Ext.define('CookBook.view.mainview.selectProjectGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.selectProjectGrid',
    scroll: false,
    viewConfig: {
        style: {
            overflow: 'auto',
            overflowX: 'hidden'
        }
    },
    store: 'ProjectInformationVitals',
    columns: [{
        header: 'USAN Project Number',
        dataIndex: 'project_number',
        flex: 3
    }, {
        header: 'Project Name',
        dataIndex: 'project_name',
        flex: 8
    }],
    listeners: {
        //for refresh option when right clicking
        itemcontextmenu: function(grid, record, item, index, event) {
            event.stopEvent();
            var menu = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: 'Refresh',
                    handler: function() {
                        var store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectInformationVitals');
                        store.load();
                    }
                }]
            });
            menu.showAt(event.xy);
        },
        //when user double clicks on a project
        itemdblclick: function(grid, record, it, index) {
            //reset preview panel results
            Ext.ComponentQuery.query('#searchTypes')[0].setText('Project Number');
            Ext.ComponentQuery.query('#navSearchField')[0].fireEvent('change');
            //if the user is read-only, just go ahead and open the project as read-only and bypass the locking
            if (GLOBAL_permission == "RDO") {
                loadNewProject(record, true, true);
                return;
            }
            if (GLOBAL_projectCurrentlyOpen == false) {
                processResult('yes', record);
            } else {
                Ext.Msg.show({
                    title: 'Project Conflict',
                    msg: 'You are attempting to open a project while one is already active. Would you like to close the active project and load the project selected?',
                    icon: Ext.Msg.QUESTION,
                    buttons: Ext.Msg.YESNO,
                    fn: function(button) {
                        Ext.Function.defer(processResult, 50, this, [button, record]);
                        return;
                    }
                });
            }
        }
    }
});

function processResult(button, record) {
    if (button == 'yes') {
        if (record != null) {
            var json = Ext.JSON.encode("Nothing to see here");
            Ext.Ajax.request({
                url: 'AcquireProjectLock.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: json,
                params: {
                    project_id: record.get('project_id'),
                    user_name: GLOBAL_username
                },
                success: function(request) {
                    var obj = Ext.decode(request.responseText);
                    if (obj.rows[0] != "Project successfully acquired") {
                        console.log("Should get a prompt to open as read-only");
                        if (Ext.getBody().isMasked()) { //possible mask from auto load message
                            Ext.getBody().unmask();
                        }
                        Ext.Msg.show({
                            title: 'Project Conflict',
                            msg: obj.rows[0] + '.  Would you like to open the project as Read-Only?',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.Msg.YESNO,
                            fn: function(button) {
                                if (button == 'yes') {
                                    loadNewProject(record, true, true);
                                }
                                return;
                            }
                        });
                    } else {
                        loadNewProject(record, false, true);
                    }
                },
                failure: function(response) {
                    var obj = Ext.decode(response.responseText);
                    alert("There was an error in opening the project: " + obj.rows[0]);
                    if (Ext.getBody().isMasked()) { //possible mask from auto load message
                        Ext.getBody().unmask();
                    }
                    return;
                }
            });
        } else {
            createNewProject(true);
        }
    }
}

function loadNewProject(record, isReadOnly, doDeferCall) {
    //check if user is currently in a read only project, if so, do NOT release project lock to current project.
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    var cont = Ext.ComponentQuery.query('splash')[0];
    Ext.getBody().mask("Loading project.  Please wait...");
    //if doDeferCall, then wait 50ms and apply a mask before continuing
    if (doDeferCall) {
        Ext.callback(function() {
            loadNewProject(record, isReadOnly, false);
        }, this, [], 50);
        return;
    }
    //smm (clear the GLOBAL_readonly flag as a precaution)
    GLOBAL_readonly = false;
    var prevProjectId = GLOBAL_currentProjectOpenProjectID; //previous project ID needed to release project
    if (GLOBAL_projectCurrentlyOpen == true) {
        console.log('A Project is Currently Open: ' + GLOBAL_projectCurrentlyOpen);
        var currentProj = Ext.ComponentQuery.query('mainCookView')[0];
        currentProj.destroy();
        var json = Ext.JSON.encode("Nothing to see here");
        if (!readOnly) {
            Ext.Ajax.request({
                url: 'ReleaseProjectLock.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: json,
                params: {
                    project_id: prevProjectId, //use previous project ID, not the current (new) one
                    user_name: GLOBAL_username
                },
                success: function(request) {
                    resetAllGlobalVariables();
                    removeAllStoreData();
                    var proj = Ext.widget('mainCookView');
                    cont.add(proj);
                    GLOBAL_projectCurrentlyOpen = true;
                    GLOBAL_currentProjectOpenProjectID = record.get('project_id');
                    GLOBAL_readonly = isReadOnly; //(smm)

                    if ((isReadOnly == true) || (GLOBAL_permission == "RDO")) {
                        Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('<b><font color="red">Read-Only</font></b>', false); //&nbsp&nbsp&nbsp&nbsp before Current??
                    } else {
                        Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
                    }
                    Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
                    doSummaryLoading(record.get('project_id'), true);
                    return;
                },
                failure: function(response) {
                    var obj = Ext.decode(response.responseText);
                    alert("There was an error in closing the project: " + obj.rows[0]);
                    return;
                }
            });
        } else {
            resetAllGlobalVariables();
            removeAllStoreData();
            var proj = Ext.widget('mainCookView');
            cont.add(proj);
            GLOBAL_projectCurrentlyOpen = true;
            GLOBAL_currentProjectOpenProjectID = record.get('project_id');
            GLOBAL_readonly = isReadOnly; //(smm)

            if ((isReadOnly == true) || (GLOBAL_permission == "RDO")) {
                Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('<b><font color="red">Read-Only</font></b>', false); //&nbsp&nbsp&nbsp&nbsp before Current??
            } else {
                Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
            }
            Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
            doSummaryLoading(record.get('project_id'), true);
            return;
        }

    } else {
        resetAllGlobalVariables();
        removeAllStoreData();
        cont.down('panel').destroy();
        var proj = Ext.widget('mainCookView');
        cont.add(proj);
        GLOBAL_projectCurrentlyOpen = true;
        GLOBAL_currentProjectOpenProjectID = record.get('project_id');
        GLOBAL_readonly = isReadOnly; //(smm)

        if ((isReadOnly == true) || (GLOBAL_permission == "RDO")) {
            Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('<b><font color="red">Read-Only</font></b>', false); //&nbsp&nbsp&nbsp&nbsp before Current??
        } else {
            Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
        }
        Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
        doSummaryLoading(record.get('project_id'), true);
    }
}

function createNewProject(doDeferCall) {
    if (doDeferCall) {
        Ext.callback(function() {
            createNewProject(false);
        }, this, [], 50);
        return;
    }
    var readOnly = false;
    if (GLOBAL_readonly) {
        readOnly = true;
    }
    console.log('Creating a new Project');
    var cont = Ext.ComponentQuery.query('splash')[0];
    var prevProjectId = GLOBAL_currentProjectOpenProjectID; //previous project ID needed to release project

    if (GLOBAL_projectCurrentlyOpen == true) {
        if (!readOnly) {
            var json = Ext.JSON.encode("Nothing to see here");
            Ext.Ajax.request({
                url: 'ReleaseProjectLock.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: json,
                params: {
                    project_id: prevProjectId, //use previous project ID, not the current (new) one
                    user_name: GLOBAL_username
                },
                success: function(request) {
                    var obj = Ext.decode(request.responseText);
                    console.log(obj.rows[0]);
                    var json = Ext.JSON.encode("Nothing to see here");
                    Ext.Ajax.request({
                        url: 'CreateNewProject.ashx',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        jsonData: json,
                        params: {
                            user_name: GLOBAL_username
                        },
                        success: function(request) {
                            var currentProj = Ext.ComponentQuery.query('mainCookView')[0];
                            currentProj.destroy();
                            resetAllGlobalVariables();
                            removeAllStoreData();
                            var obj = Ext.decode(request.responseText);
                            if (obj.rows[0].project_id == undefined) {
                                alert("Couldn't create a new project");
                                return;
                            }
                            var proj = Ext.widget('mainCookView');
                            cont.add(proj);
                            GLOBAL_currentProjectOpenProjectID = obj.rows[0].project_id;
                            GLOBAL_projectCurrentlyOpen = true;
                            //set read only flag to false since user just created a new project...
                            GLOBAL_readonly = false;
                            Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
                            Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
                            doSummaryLoading(GLOBAL_currentProjectOpenProjectID, true);
                        }
                    });
                    return;
                },
                failure: function(response) {
                    var obj = Ext.decode(response.responseText);
                    alert("There was an error in closing the project: " + obj.rows[0]);
                    return;
                }
            });
        } else {
            var json = Ext.JSON.encode("Nothing to see here");
            Ext.Ajax.request({
                url: 'CreateNewProject.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: json,
                params: {
                    user_name: GLOBAL_username
                },
                success: function(request) {
                    var currentProj = Ext.ComponentQuery.query('mainCookView')[0];
                    currentProj.destroy();
                    resetAllGlobalVariables();
                    removeAllStoreData();
                    var obj = Ext.decode(request.responseText);
                    if (obj.rows[0].project_id == undefined) {
                        alert("Couldn't create a new project");
                        return;
                    }
                    var proj = Ext.widget('mainCookView');
                    cont.add(proj);
                    GLOBAL_currentProjectOpenProjectID = obj.rows[0].project_id;
                    GLOBAL_projectCurrentlyOpen = true;
                    //set read only flag to false since user just created a new project...
                    GLOBAL_readonly = false;
                    Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
                    Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
                    doSummaryLoading(GLOBAL_currentProjectOpenProjectID, true);
                }
            });
        }
    } else {
        var json = Ext.JSON.encode("Nothing to see here");
        Ext.Ajax.request({
            url: 'CreateNewProject.ashx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            jsonData: json,
            params: {
                user_name: GLOBAL_username
            },
            success: function(request) {
                cont.down('panel').destroy();
                resetAllGlobalVariables();
                removeAllStoreData();
                var obj = Ext.decode(request.responseText);
                if (obj.rows[0].project_id == undefined) {
                    alert("Couldn't create a new project");
                    return;
                }
                var proj = Ext.widget('mainCookView');
                cont.add(proj);
                GLOBAL_currentProjectOpenProjectID = obj.rows[0].project_id;
                GLOBAL_projectCurrentlyOpen = true;
                //set read only flag to false since user just created a new project...
                GLOBAL_readonly = false;
                Ext.ComponentQuery.query('#readOnlyLabel')[0].setText('');
                Ext.ComponentQuery.query('#currentProjNavLabel')[0].setText('');
                doSummaryLoading(GLOBAL_currentProjectOpenProjectID, true);
            }
        });
    }


}