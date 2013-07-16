Ext.define('CookBook.view.summary.ViewSummaryProjectStatusButton', {
    extend: 'Ext.Button',
    alias: 'widget.viewSummaryProjectStatusButton',

    //options
    text: 'Set Status',

    name: 'summaryProjectStatusButton',


    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Click to activate the chosen status'
            });
        },

        click: function() {
            //don't update anything if readOnly
            if (GLOBAL_readonly || (GLOBAL_permission == "RDO")) {
                return;
            }

            var chosenStatus = Ext.ComponentQuery.query('viewSummaryChooseProjectStatus');
            var chosenDate = Ext.ComponentQuery.query('viewSummaryProjectStatusDate');

            var currentDate = new Date();
            var formattedDate = Ext.Date.format(currentDate, 'Y-m-d\\TH:i:s');

            var chosenDateToBeSubmitted;

            var todaysDate = new Date();
            var todaysDateFormatted = Ext.Date.format(todaysDate, 'Y-m-d');
            var chosenDateFormatted = Ext.Date.format(chosenDate[0].getValue(), 'Y-m-d');


            if (chosenDateFormatted == todaysDateFormatted) {
                //console.log("Same Day");
                chosenDateToBeSubmitted = formattedDate;
            } else {
                //console.log("Different Days");
                chosenDateToBeSubmitted = chosenDate[0].getValue();
            }

            if (chosenDate[0].getValue() == undefined) {
                if (Ext.isEmpty(chosenDate[0].getValue())) {
                    alert('You must enter a date for this status');
                    return;
                }
                alert('You must enter a date for this status');
                return;
            }

            if (chosenStatus[0].getValue() == undefined) {
                if (Ext.isEmpty(chosenStatus[0].getValue())) {
                    alert('You must choose or enter a status');
                    return;
                }
                alert('You must choose or enter a status');
                return;
            }

            var obj = {
                'project_id': GLOBAL_currentProjectOpenProjectID,
                'type': chosenStatus[0].getValue(),
                'date': chosenDateToBeSubmitted,
                'name': GLOBAL_username
            };
            var jsonBlob = Ext.JSON.encode(obj);

            Ext.Ajax.request({
                url: 'UpdateProjectStatus.ashx',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                jsonData: jsonBlob,
                success: function(response) {
                    obj = Ext.decode(response.responseText);
                    console.log(obj.rows[0]);
                    if (obj.rows[0].indexOf('Error') != -1) {
                        alert(obj.rows[0]);
                    } else {
                        var store = GLOBAL_currentController.getStore("ProjectHistories");
                        var readOnly = false;
                        if (GLOBAL_readonly || (GLOBAL_permission == "RDO")) {
                            readOnly = true;
                        }
                        store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                        store.proxy.extraParams.read_only = readOnly;
                        store.load({
                            callback: function() {
                                store.sort('date', 'DESC');
                                if (store.getAt(0)) {
                                    if (store.getAt(0).get('date')) {
                                        try {
                                            store = GLOBAL_currentController.getController('Cookbook').getStore('ProjectStatuses');
                                            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                                            store.load({
                                                callback: function(records, operation, success) {
                                                    if (records) {
                                                        var fields = Ext.ComponentQuery.query('viewSummaryProjectStatus');
                                                        fields[0].setValue(chosenStatus[0].getValue());
                                                        /*
                                                        if (success && (records.length > 0)) {
                                                            if (store.getCount() > 0) {
                                                                if (store.getAt(0)) {
                                                                    if (store.getAt(0).get('type')) {
                                                                        store.sort('date', 'DESC');
                                                                        var fields = Ext.ComponentQuery.query('viewSummaryProjectStatus');
                                                                        fields[0].setValue(store.getAt(0).get('type'));
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    */
                                                    }
                                                }
                                            });
                                            /*
                                            var currTopDateFromStore = store.getAt(0).get('date');
                                            var proposedDate = chosenDateToBeSubmitted;
                                            if (proposedDate >= currTopDateFromStore) {
                                                var currentStatus = Ext.ComponentQuery.query('viewSummaryProjectStatus');
                                                currentStatus[0].setValue(chosenStatus[0].getValue());
                                            } else {
                                                console.log('New date (' + proposedDate + ') is earlier than top date (' + currTopDateFromStore + ')');
                                            }*/
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }
                                }
                            }
                        });
                    }

                    /*
                     * ah 2-5-13 this is now done in the handler
                     *
                     * store.add({
                     * //var historyText = 'Project status changed to "' + chosenStatus[0].getValue() + '"';
                     project_id: GLOBAL_currentProjectOpenProjectID,
                     description: historyText,
                     date: chosenDate[0].getValue(),
                     user_name: GLOBAL_username
                     });*/
                },
                failure: function(response) {
                    obj = Ext.decode(response.responseText);
                    alert(obj.rows[0]);
                    console.log(obj.rows[0]);
                }
            });
        }
    }

});