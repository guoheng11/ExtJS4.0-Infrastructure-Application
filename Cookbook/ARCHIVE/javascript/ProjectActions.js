ProjectActions = Ext.extend(Ext.Panel, {
    projectName:'',
    projectId: '',
    tabContainer: '',
    record: '',
    projectInfoStore: '',
    summaryPanel: '',

    slavePanel: '',
    masterPanel: '',
    datesPanel: '',

    initComponent: function() {
        var eto = this;
        initDataEnteryHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("CreateProjectForm",eto.projectId);
            }
        };
        contactEditHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("ProjectContactsPanel",eto.projectId,eto.projectName);
            }
        };
        firstRfqReviewHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("FirstRFQReviewPanel",eto.projectId,eto.projectName);
            }
        };
        secondRfqReviewHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("OptionMotherPanel",eto.projectId,eto.projectName);
            }
        };
        historyViewHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("ProjectHistoryPanel",eto.projectId,eto.projectName);
            }
        };
        statusHistoryHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("StatusHistoryPanel",eto.projectId);
            }
        };
        submasterHandler = function(button, event) {
            if(event) {
                eto.ownerCt.openNewTab("ProjectSMPanel",eto.projectId,eto.projectName);
            }
        };
        addMasterHandler = function(button, event) {
            if(event) {
                button.disable();
                var removeButton = button.ownerCt.find('itemId', 'removeMasterButton');
                if(removeButton[0]) {
                    removeButton[0].enable();
                }
            }
        };
        removeMasterHandler = function(button, event) {
            if(event) {
                button.disable();
                var setButton = button.ownerCt.find('itemId', 'setMasterButton');
                if(setButton[0]) {
                    setButton[0].enable();
                }
            }
        };
        appsHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("ApplicationsFrame",projId);
            }
        };
        summaryIngredientHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("ProjectIngredientsPanel",projId);
            }
        };
        sysHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("SystemIngredientsFrame",projId);
            }
        };
        exesHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("ExecutablesFrame",projId);
            }
        };
        tablesHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("TablesFrame",projId);
            }
        };
        tablesHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("TablesFrame",projId);
            }
        };
        otherIngredientHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("ProjectIngredientFrame",projId);
            }
        };
        routingHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("RoutingGrid",projId);
            }
        };
        misHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                eto.ownerCt.openNewTab("MISTab",projId);
            }
        };
        finalEntriesHandler = function(button, event) {
            if(event) {
                var projId = eto.projectId;
                var projRec = eto.record;
                eto.ownerCt.openNewTab("FinalEntriesPanel",projId,projRec);
            }
        };
        requestAssessmentHandler = function(button, event) {
            if(event) {
                var assessmentType = "SWD";
                if(button.text == "Request SWD Assessment") {
                    assessmentType = "SWD";
                } else if(button.text == "Request OPS Assessment") {
                    assessmentType = "OPS";
                }
                var optionArray = eto.record.get("options");
                var optionsWithThisAssessment = 0;
                if(optionArray instanceof Array) {
                    for(var a = 0; a < optionArray.length; a++) {
                        if(optionArray[a].assessments instanceof Array) {
                            for(var b = 0; b < optionArray[a].assessments.length; b++) {
                                var assObject = optionArray[a].assessments[b];
                                if(assObject.assessment_type == assessmentType) {
                                    optionsWithThisAssessment++;
                                }
                            }
                        }
                    }
                    if(optionsWithThisAssessment == 0) {
                        eto.ownerCt.openNewTab("CreateAssessmentForm",eto.projectId,assessmentType);
                    } else if(optionsWithThisAssessment == optionArray.length) {
                        Ext.Msg.alert('ERROR', 'Sorry but somebody already requested this assessment...');
                    } else {
                        Ext.Msg.confirm('Are you sure?', 'Some options in this project already have this assessment. Are you sure you want to request an assessment?', function(btn) {
                            if (btn == 'yes') {
                                eto.ownerCt.openNewTab("CreateAssessmentForm",eto.projectId,assessmentType);
                            }
                        });
                    }
                }
            }
        };
        optionRelatedHandler = function(button, event) {
            if(event) {
                var optionArray = eto.record.get("options");
                if(optionArray instanceof Array) {
                    var optionID = 0;
                    if(optionArray.length > 1) {
                        // ask for option
                        var newOptionArray = new Array();
                        for(var a = 0; a < optionArray.length; a++) {
                            var newEntry = new Object();
                            newEntry.name = optionArray[a].name;
                            newEntry.option_id = optionArray[a].option_id;
                            if(!newEntry.name) {
                                newEntry.name = "Unnamed (" + newEntry.option_id + ")";
                            }
                            newOptionArray.push(newEntry);
                        }
                        var optionsStore = new Ext.data.JsonStore({
                            fields: [{
                                name: 'name',
                                type: 'string'
                            },{
                                name: 'option_id',
                                type: 'int'
                            }
                            ],
                            data : newOptionArray
                        });

                        var myCombo = new Ext.form.ComboBox({
                            width:140,
                            store: optionsStore,
                            displayField:'name',
                            valueField: 'option_id',
                            //hiddenName:'biz_id',
                            fieldLabel: 'Select Option',
                            typeAhead: true,
                            mode: 'local',
                            editable: 'false',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText:'clickety click!',
                            listeners: {
                                'select': function(combo, record) {
                                    myPanel.buttons[0].enable();
                                    combo.secretValue = record.get('name');
                                }
                            },
                            selectOnFocus:true
                        });

                        var myPanel = new Ext.FormPanel({
                            labelWidth: 100,
                            border: false,
                            width: 250,
                            height: 70,
                            //bodyStyle: "'background-color': DFE8F6",
                            style: 'padding: 5',
                            bodyStyle: "background-color:#DFE8F6;",
                            buttonAlign: "center",
                            items: [myCombo],

                            buttons: [{
                                text: 'OK',
                                disabled: true,
                                handler: function() {
                                    win.close();
                                    win.destroy();
                                    innerOptionHandler(myCombo.getValue(), myCombo.secretValue, button.text);
                                }
                            },{
                                text: 'Cancel',
                                handler: function() {
                                    win.close();
                                    win.destroy();
                                }
                            }]
                        });
                        var win = new Ext.Window({
                            //id: 'promptFileUpload-'+this.optionId,
                            title: 'Choose Option',
                            closeAction: 'close',
                            layout: 'fit',
                            height: 100,
                            width: 400,
                            hidden: true,
                            modal: true,
                            items: [myPanel]
                        });
                        win.show();
                    } else if(optionArray.length == 1) {
                        var optionName = optionArray[0].name;
                        if(!optionName) {
                            optionName = "Unnamed (" + optionArray[0].option_id + ")";
                        }
                        innerOptionHandler(optionArray[0].option_id, optionName, button.text);
                    } else {
                        alert("ERROR: Project does not have any options!");
                    }

                } else {
                    alert("ERROR: Tell developer that 'optionArray is not an array'");
                }
            }
        };
        innerOptionHandler = function(optionId, optionName, token) {
            if(token == "Assumptions") {
                eto.ownerCt.openNewTab("AssumptionMotherPanel",optionId,optionName);
            } else if(token == "Deliverables") {
                eto.ownerCt.openNewTab("DeliverableFrame",eto.projectId, optionId, optionName);
            } else if(token == "Prompts") {
                eto.ownerCt.openNewTab("PromptsFrame",eto.projectId, optionId, optionName);
            } else {
                alert("Inner Option Handler. OptionID:" + optionId + " Token: " + token);
            }
        };
        generateIFQHandler = function(button, event) {
            if(event) {
                if(eto.record.get('project_name') && eto.record.get('project_number')) {
                    Ext.Ajax.request({
                        url: 'GenerateIFQ.ashx',
                        method: 'POST',
                        params: {
                            'project_id': eto.projectId
                        },
                        failure: function(response) {
                            Ext.MessageBox.alert('Error', "Could not generate IFQ. " + response.responseText);
                        },
                        success: function(response, opts) {
                            var jsonResponse = Ext.util.JSON.decode(response.responseText);
                            if(jsonResponse.success != null) {
                                if(jsonResponse.success) {
                                    Ext.MessageBox.alert('Success','IFQ Generated Successfully');
                                    eto.projectInfoStore.reload();
                                } else if(!jsonResponse.success) {
                                    if(jsonResponse.rows) {
                                        Ext.MessageBox.alert('Error', "Could not generate IFQ. " + response.responseText);
                                    }
                                }
                            } else {
                                Ext.Msg.alert('Failed', 'IFQ Generation Failed. No Success Flag.');
                            }
                        }
                    });
                }

            }
        };
        updateUatStageHandler = function(button, event) {
            if(event) {
                Ext.Msg.show({
                    title:'Enter UAT Staging Directory',
                    msg: 'Please paste UAT staging directory path:',
                    buttons: Ext.Msg.OKCANCEL,
                    prompt: true,
                    width: 500,
                    icon: Ext.MessageBox.QUESTION,
                    fn: function(btn, text) {
                        if (btn == 'ok') {
                            updateProjectFnct(null, null, null, text, null);
                            eto.projectInfoStore.reload();
                        }
                    }
                });
            }
        };
        updateProdStageHandler = function(button, event) {
            if(event) {
                Ext.Msg.show({
                    title:'Enter PROD Staging Directory',
                    msg: 'Please paste PROD staging directory path:',
                    buttons: Ext.Msg.OKCANCEL,
                    prompt: true,
                    width: 500,
                    icon: Ext.MessageBox.QUESTION,
                    fn: function(btn, text) {
                        if (btn == 'ok') {
                            updateProjectFnct(null, null, null, null, text);
                            eto.projectInfoStore.reload();
                        }
                    }
                });
            }
        };
        requestPromptsPOHandler = function(button, event) {
            if(event) {
                Ext.MessageBox.show({
                    title: 'Request Prompts Purchase Order',
                    msg: 'Note:',
                    width:300,
                    buttons: Ext.MessageBox.OKCANCEL,
                    multiline: true,
                    fn: function(btn, text) {
                        if(btn == "ok") {
                            Ext.Ajax.request({
                                url: 'RequestPromptPO.ashx',
                                method: 'POST',
                                params: {
                                    'project_id': eto.projectId,
                                    'po_description': text
                                },
                                failure: function(response) {
                                    var jsonResponse = Ext.util.JSON.decode(response.responseText);
                                    Ext.MessageBox.alert('Error', "Could not request P.O. : " + jsonResponse);
                                },
                                success: function(response, opts) {
                                    var jsonResponse = Ext.util.JSON.decode(response.responseText);
                                    if(jsonResponse.success != null) {
                                        if(jsonResponse.success) {
                                            Ext.MessageBox.alert('Success','P.O. Requested ');
                                            eto.projectInfoStore.reload();
                                        } else if(!jsonResponse.success) {
                                            if(jsonResponse.rows) {
                                                Ext.MessageBox.alert('Error', "Could not request P.O. : " + jsonResponse.rows);
                                            }
                                        }
                                    } else {
                                        Ext.Msg.alert('Failed', 'P.O. Request Failed. No Success Flag.');
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        cancelPORequestHandler = function(button, event) {
            if(event) {
                Ext.Msg.confirm('Are you sure?', 'Are you sure you want to cancel P.O. request?', function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: 'CancelPromptPO.ashx',
                            method: 'POST',
                            params: {
                                'project_id': eto.projectId
                            },
                            failure: function(response) {
                                Ext.MessageBox.alert('Error', "Could not cancel P.O. : " + response.responseText);
                            },
                            success: function(response, opts) {
                                var jsonResponse = Ext.util.JSON.decode(response.responseText);
                                if(jsonResponse.success != null) {
                                    if(jsonResponse.success) {
                                        Ext.MessageBox.alert('Success','P.O. Cancelled ');
                                        eto.projectInfoStore.reload();
                                    } else if(!jsonResponse.success) {
	                                    var errorMessage = "";
                                        if(jsonResponse.rows instanceof Array) {
	                                        if(jsonResponse.rows.length > 0) {
                                            	errorMessage = ": " + jsonResponse.rows[0];
                                        	}
                                        }
                                        Ext.MessageBox.alert('Error', "Could not cancel P.O. " + errorMessage);
                                    }
                                } else {
                                    Ext.Msg.alert('Failed', 'P.O. Cancel Failed. No Success Flag.');
                                }
                            }
                        });
                    }
                });
            }
        }
        approvePORequestHandler = function(button, event) {
            if(event) {
                Ext.Msg.prompt('P.O. Approval', 'Please enter P.O.#:', function(btn, text) {
                    if (btn == 'ok') {
                        text = parseInt(text);
                        if(text > 0) {
                            Ext.Ajax.request({
                                url: 'ApprovePromptPO.ashx',
                                method: 'POST',
                                params: {
                                    'project_id': eto.projectId,
                                    "po_number": text
                                },
                                failure: function(response) {
                                    var jsonResponse = Ext.util.JSON.decode(response.responseText);
                                    Ext.MessageBox.alert('Error', "Could not approve P.O. : " + jsonResponse.rows);
                                },
                                success: function(response, opts) {
                                    var jsonResponse = Ext.util.JSON.decode(response.responseText);
                                    if(jsonResponse.success != null) {
                                        if(jsonResponse.success) {
                                            Ext.MessageBox.alert('Success','P.O. Approved');
                                            eto.projectInfoStore.reload();
                                        } else if(!jsonResponse.success) {
                                            if(jsonResponse.rows) {
                                                Ext.MessageBox.alert('Error', "Could not approve P.O. : " + jsonResponse.rows);
                                            }
                                        }
                                    } else {
                                        Ext.Msg.alert('Failed', 'P.O. Approval Failed. No Success Flag.');
                                    }
                                }
                            });
                        } else {
                            Ext.Msg.alert('Error', "P.O.# should only contain digits. You should have known that ;)");
                        }
                    }
                });
            }
        }
        this.slavePanel = new Ext.Panel({
            layout:'table',
            autoHeight: true,
            autoWidth: true,
            hidden: true,
            items: []
        });

        this.masterPanel = new Ext.Panel({
            layout:'table',
            autoHeight: true,
            autoWidth: true,
            hidden: true,
            items: []
        });

        this.datesPanel = new OptionDatesSummaryPanel(null);
        this.datesPanel.hide();

        this.statusStore = new Ext.data.Store({
            id: 'statusStore',
            proxy: new Ext.data.HttpProxy({
                url: 'GetStatusTypes.ashx', // File to connect to
                method: 'GET'
            }),
            reader: new Ext.data.JsonReader({
                // we tell the datastore where to get his data from
                root: 'rows',
                totalProperty: 'total',
                id: 'status_type_id'
            }, [{
                name: 'status_type_id',
                type: "int",
                mapping: 'status_type_id'
            },{
                name: 'status_type',
                type: "string",
                mapping: 'status_type'
            }
            ])
        });

        this.statusStore.load();

        this.statusCB = new Ext.form.ComboBox({
            width:250,
            submitMe: true,
            fieldLabel: 'Status',
            store: this.statusStore,
            displayField:'status_type',
            valueField: 'status_type',
            typeAhead: true,
            mode: 'local',
            editable: 'false',
            forceSelection: true,
            triggerAction: 'all',
            emptyText:'enter status...',
            selectOnFocus:true
        });

        submitStatusFnct = function(statusType, dateType, dateValue) {
            var objectToSend = new Object();
            objectToSend.project_id = eto.projectId;
            objectToSend.status_type = statusType;
            if(dateValue && dateType) {
                objectToSend[dateType] = dateValue;
            }
            Ext.Ajax.request({
                url: 'UpdateStatus.ashx',
                method: 'POST',
                params: objectToSend,
                failure: function(response) {
                    Ext.MessageBox.alert('Error', "Could not update status: " + response.responseText);
                },
                success: function(response, opts) {
                    var jsonResponse = Ext.util.JSON.decode(response.responseText);
                    if(jsonResponse.success != null) {
                        if(jsonResponse.success) {
                            Ext.MessageBox.alert('Success','Status Updated!');
                            eto.projectInfoStore.reload();
                        } else if(!jsonResponse.success) {
                            if(jsonResponse.rows) {
                                Ext.MessageBox.alert('Error', "Could not update status: " + response.responseText);
                            }
                        }
                    } else {
                        Ext.Msg.alert('Failed', 'Could not update status. No Success Flag.');
                    }
                }
            });
        }
        updateProjectFnct = function(authDueDate, authReceivedDate, uatAcceptedDate, uatStageDir, prodStageDir) {
            var objectToSend = new Object();
            objectToSend.project_id = eto.projectId;
            if(authDueDate) {
                objectToSend.auth_due_date = authDueDate;
            }
            if(authReceivedDate) {
                objectToSend.auth_received_date = authReceivedDate;
            }
            if(uatAcceptedDate) {
                objectToSend.uat_accepted_date = uatAcceptedDate;
            }
            if(uatStageDir) {
                objectToSend.uat_staging_directory = uatStageDir;
                eto.record.set('uat_staging_directory', uatStageDir);
            }
            if(prodStageDir) {
                objectToSend.prod_staging_directory = prodStageDir;
                eto.record.set('prod_staging_directory', prodStageDir);
            }

            Ext.Ajax.request({
                url: 'UpdateProject.ashx',
                method: 'POST',
                params: objectToSend,
                failure: function(response) {
                    Ext.MessageBox.alert('Error', "Could not update project: " + response.responseText);
                },
                success: function(response, opts) {
                    var jsonResponse = Ext.util.JSON.decode(response.responseText);
                    if(jsonResponse.success != null) {
                        if(jsonResponse.success) {
                            Ext.MessageBox.alert('Success','Project Updated!');
                            eto.projectInfoStore.reload();
                        } else if(!jsonResponse.success) {
                            if(jsonResponse.rows) {
                                Ext.MessageBox.alert('Error', "Could not update project: " + response.responseText);
                            }
                        }
                    } else {
                        Ext.Msg.alert('Failed', 'Could not update project. No Success Flag.');
                    }
                }
            });
        }
        askDateFnct = function(dateType, statusType, valueToShow) {
            var label = 'Unknown Label';
            if(dateType == "auth_due_date") {
                label = 'Authorization Due Date';
            } else if(dateType == "auth_received_date") {
                label = 'Auth Received Date';
            } else if(dateType == "uat_accepted_date") {
                label = 'UAT Accepted Date';
            }
            var nosePicker = new Ext.form.DateField({
                xtype: 'datefield',
                width: 100,
                format: 'Y/m/d',
                fieldLabel: label,
                value: (valueToShow) ? valueToShow : "",
                listeners: {
                    'select': function() {
                        myPanel.buttons[0].enable();
                    }
                }
            });
            var myPanel = new Ext.FormPanel({
                labelWidth: 150,
                border: false,
                width: 280,
                height: 70,
                //bodyStyle: "'background-color': DFE8F6",
                style: 'padding: 5',
                bodyStyle: "background-color:#DFE8F6;",
                buttonAlign: "center",
                items: [nosePicker],

                buttons: [{
                    text: 'OK',
                    disabled: true,
                    handler: function() {
                        if(dateType == "auth_due_date") {
                            if(statusType) {
                                submitStatusFnct(statusType, "auth_due_date", nosePicker.getValue());
                            } else {
                                updateProjectFnct(nosePicker.getValue());
                            }
                        } else if(dateType == "auth_received_date") {
                            if(statusType) {
                                submitStatusFnct(statusType, "auth_received_date", nosePicker.getValue());
                            } else {
                                updateProjectFnct(null, nosePicker.getValue());
                            }
                        } else if(dateType == "uat_accepted_date") {
                            if(statusType) {
                                submitStatusFnct(statusType, "uat_accepted_date", nosePicker.getValue());
                            } else {
                                updateProjectFnct(null, null, nosePicker.getValue());
                            }
                        }
                        win.close();
                        win.destroy();
                    }
                },{
                    text: 'Cancel',
                    handler: function() {
                        win.close();
                        win.destroy();
                    }
                }]
            });
            var win = new Ext.Window({
                //id: 'promptFileUpload-'+this.optionId,
                title: 'Choose Date',
                height: 100,
                width: 400,
                closeAction: 'close',
                layout: 'fit',
                hidden: true,
                modal: true,
                items: [myPanel]
            });
            win.show();
        }
        this.statusCB.on('select', function(actualComboBox, selrec) {
            var statusType = selrec.get('status_type');
            if(statusType == "Quote Issued") {
                askDateFnct("auth_due_date", statusType);
            } else if(statusType == "Quote Authorized") {
                askDateFnct("auth_received_date", statusType);
            } else if(statusType == "UAT Accepted") {
                askDateFnct("uat_accepted_date", statusType);
            } else {
                submitStatusFnct(statusType);
            }
        });
        this.statusPanel = new Ext.Panel({
            layout:'table',
            autoHeight: true,
            autoWidth: true,
            items: [{
                xtype: 'displayfield',
                cls: 'x-form-item',
                style: 'padding-right: 80; font-weight: bold;',
                value: 'Status:'
            }, this.statusCB,{
                xtype: 'button',
                iconCls: 'info',
                handler: statusHistoryHandler,
                style: 'padding-left: 10;',
                text: 'View History'
            }]
        });

        this.poStatusDF = new Ext.form.DisplayField({
            cls: 'x-form-item',
            fieldLabel: 'Prompts P.O.',
            value: 'Not Requested'
        });

        this.uatStageDF = new Ext.form.DisplayField({
            fieldLabel: '',
            cls: 'x-form-item',
            width:500,
            itemId: 'uatStagingDirectoryField'
        });
        this.uatStagePanel = new Ext.Panel({
            layout:'table',
            autoHeight: true,
            autoWidth: true,
            items: [{
                xtype: 'displayfield',
                cls: 'x-form-item',
                width: 125,
                style: 'font-weight: bold;',
                value: 'UAT Staging Dir:'
            }, this.uatStageDF,{
                xtype: 'button',
                iconCls: 'submit',
                handler: updateUatStageHandler,
                style: 'padding-left: 10;',
                text: 'Update'
            }]
        });

        this.prodStageDF = new Ext.form.DisplayField({
            fieldLabel: '',
            cls: 'x-form-item',
            width: 500,
            itemId: 'prodStagingDirectoryField'
        });
        this.prodStagePanel = new Ext.Panel({
            layout:'table',
            autoHeight: true,
            autoWidth: true,
            items: [{
                xtype: 'displayfield',
                cls: 'x-form-item',
                width: 125,
                style: 'font-weight: bold;',
                value: 'Prod Staging Dir:'
            }, this.prodStageDF,{
                xtype: 'button',
                iconCls: 'submit',
                handler: updateProdStageHandler,
                style: 'padding-left: 10;',
                text: 'Update'
            }]
        });

        this.authDueDF = new Ext.form.DisplayField({
            fieldLabel: '',
            cls: 'x-form-item',
            width: 120,
            itemId: 'authDueField'
        });

        this.authReceivedDF = new Ext.form.DisplayField({
            fieldLabel: '',
            cls: 'x-form-item',
            width: 120,
            itemId: 'authReceivedField'
        });

        this.uatAcceptedDF = new Ext.form.DisplayField({
            fieldLabel: '',
            cls: 'x-form-item',
            width: 120,
            itemId: 'uatAcceptedField'
        });

        this.authDatePanel = new Ext.Panel({
            layout:'table',
            layoutConfig: {
                columns: 3
            },
            autoHeight: true,
            autoWidth: true,
            items: [{
                xtype: 'displayfield',
                cls: 'x-form-item',
                width: 125,
                style: 'font-weight: bold;',
                value: 'Authorization Due:'
            }, this.authDueDF,{
                xtype: 'button',
                iconCls: 'submit',
                handler: function() {
                    askDateFnct("auth_due_date", null, eto.record.get('auth_due_date'));
                },
                style: 'padding-left: 10;',
                text: 'Change'
            },{
                xtype: 'displayfield',
                cls: 'x-form-item',
                width: 125,
                style: 'font-weight: bold;',
                value: 'Auth Received:'
            }, this.authReceivedDF,{
                xtype: 'button',
                iconCls: 'submit',
                handler: function() {
                    askDateFnct("auth_received_date", null, eto.record.get('auth_received_date'));
                },
                style: 'padding-left: 10;',
                text: 'Change'
            },{
                xtype: 'displayfield',
                cls: 'x-form-item',
                width: 125,
                style: 'font-weight: bold;',
                value: 'UAT Accepted:'
            }, this.uatAcceptedDF,{
                xtype: 'button',
                iconCls: 'submit',
                handler: function() {
                    askDateFnct("uat_accepted_date", null, eto.record.get('uat_accepted_date'));
                },
                style: 'padding-left: 10;',
                text: 'Change'
            }]
        });

        this.summaryPanel = new Ext.Panel({
            layout:'form',
            itemId: 'summaryPanel',
            title: 'PROJECT SUMMARY',
            autoHeight: true,
            collapsible: true,
            //autoWidth: true,
            labelWidth: 120,
            width: 800,
            frame: true,
            style: 'padding-bottom: 10',
            defaultType:'displayfield',
            defaults: {
                labelStyle: 'font-weight:bold;'
            },
            items: [{
                fieldLabel: 'Number',
                itemId: 'numberField'
            },{
                fieldLabel: 'Name',
                itemId: 'nameField'
            },{
                fieldLabel: 'Created By',
                itemId: 'createdByField'
            },{
                fieldLabel: 'Company',
                itemId: 'compField'
            },{
                fieldLabel: 'Business Unit',
                itemId: 'bizField'
            },{
                fieldLabel: 'PM',
                itemId: 'pmField'
            },this.poStatusDF,{
                fieldLabel: 'Requested UAT',
                itemId: 'uatField'
            },this.authDatePanel,this.datesPanel,{
                fieldLabel: 'Project Directory',
                itemId: 'directoryField'
            },this.uatStagePanel, this.prodStagePanel,{
                fieldLabel: 'Latest IFQ Link',
                itemId: 'ifqLinkField'
            },this.statusPanel,this.masterPanel,this.slavePanel]
        });

        var eto = this;
        // getting project data
        var intNullConverter = function(var1) {
            return var1;
        }
        this.projectInfoStore = new Ext.data.Store({
            id: 'projectInfoStore',
            proxy: new Ext.data.HttpProxy({
                url: 'GetProject.ashx', // File to connect to
                method: 'POST'
            }),
            baseParams: {
                "project_id": eto.projectId
            }, // this parameter asks for listing
            reader: new Ext.data.JsonReader({
                // we tell the datastore where to get his data from
                root: 'rows',
                totalProperty: 'total',
                id: 'project_id'
            }, [{
                name: 'project_id',
                type: "int",
                mapping: 'project_id'
            },{
                name: 'project_name',
                type: "string",
                mapping: 'project_name'
            },{
                name: 'project_number',
                type: "string",
                mapping: 'project_number'
            },{
                name: 'project_status',
                type: "string",
                mapping: 'project_status'
            },{
                name: 'project_directory',
                type: "string",
                mapping: 'project_directory'
            },{
                name: 'uat_staging_directory',
                type: "string"
            },{
                name: 'prod_staging_directory',
                type: "string"
            },{
                name: 'business_unit_names',
                type: "string",
                mapping: 'business_unit_names'
            },{
                name: 'pm_name',
                type: "string",
                mapping: 'pm_name'
            },{
                name: 'created_by',
                type: "string",
                mapping: 'created_by'
            },{
                name: 'company_name',
                type: "string",
                mapping: 'company_name'
            },{
                name: 'master_project',
                mapping: 'master_project'
            },{
                name: 'sub_projects',
                mapping: 'sub_projects'
            },{
                name: 'options',
                mapping: 'options'
            },{
                name: 'quoted_uat_date',
                type: "date",
                mapping: 'quoted_uat_date'
            },{
                name: 'current_diff_filename',
                type: "string"
            },{
                name: 'current_orig_filename',
                type: "string"
            },{
                name: 'previous_diff_filename',
                type: "string"
            },{
                name: 'previous_orig_filename',
                type: "string"
            },{
                name: 'auth_due_date',
                type: "date"
            },{
                name: 'auth_received_date',
                type: "date"
            },{
                name: 'requested_uat_date',
                type: "string"
            },{
                name: 'requested_prod_date',
                type: "string"
            },{
                name: 'uat_acceptance_due_date',
                type: "string"
            },{
                name: 'uat_accepted_date',
                type: "date"
            },{
                name: 'ccr_received_date',
                type: "date"
            },{
                name: 'ccr_number',
                type: "string"
            },{
                name: 'po_number',
                type: "int",
                convert: intNullConverter
            }
            ])
        });

        
        this.projectInfoStore.on('exception', function(misc, var2, var3, var4, var5) {
            var madeIt = false;
            if(var5){
                if(var5.raw){
                    if(var5.raw.rows instanceof Array){
                        if(var5.raw.rows.length>0){
                            if(var5.raw.rows[0]){
                                var a1 = new String(var5.raw.rows[0]);
                                Ext.MessageBox.alert('Error',a1);
                                madeIt=true;
                            }
                        }
                    }
                }
            }
            
            if(madeIt=false){
                Ext.MessageBox.alert('Error','Shit hit the fan');
            }

            tabs.remove(eto.tabContainer);            
            tabs.setActiveTab(0);
          
        });
        
        this.projectInfoStore.on('load', function() {

            var count = eto.projectInfoStore.getTotalCount();
            if(count < 1) {
                Ext.MessageBox.alert('Error','Project Does Not Exist');
                eto.ownerCt.remove(eto);
            } else if(count > 1) {
                Ext.MessageBox.alert('Error','Multiple projects with the same ID');
                eto.ownerCt.remove(eto);
            } else {
                //Ext.MessageBox.alert('Success','Found Contact!');
                var errorHappened = true;
                eto.record = eto.projectInfoStore.getAt(0);
                if(eto.record.get('project_number')) {
                    var a2 = new String(eto.record.get('project_number'));
                    if(a2.length > 2) {
                        errorHappened = false;
                    }
                }
                if(errorHappened) {
                    Ext.MessageBox.alert('Error','Project Does Not Exist');
                    eto.ownerCt.remove(eto);
                } else {
                    if(eto.record instanceof Ext.data.Record) {
                        eto.tabContainer.setTitle('Project: ' + eto.record.get('project_number'));
                    }
                    eto.loadProject();
                }
            }

        });
        this.swdAssessmentButton = new Ext.Button({
            text: 'Request SWD Assessment',
            handler: requestAssessmentHandler,
            scale: 'medium',
            style: 'padding: 5'
        });

        this.opsAssessmentButton = new Ext.Button({
            text: 'Request OPS Assessment',
            handler: requestAssessmentHandler,
            scale: 'medium',
            style: 'padding: 5'
        });

        // Loading mask:
        var myMask = new Ext.LoadMask(Ext.getBody(), {
            store: this.projectInfoStore,
            msg:"Loading Project..."
        });
        myMask.show();

        //this.projectInfoStore.load();
        this.poRequestButton = new Ext.Button({
            text: 'PO Requests',
            scale: 'medium',
            menu: [{
                text: 'Request',
                scale: 'medium',
                handler: requestPromptsPOHandler
            },{
                text: 'Approve',
                scale: 'medium',
                handler: approvePORequestHandler
            },{
                text: 'Cancel',
                scale: 'medium',
                handler: cancelPORequestHandler
            }]
        });
        Ext.apply(this, {
            // TAB main
            title: 'Summary',
            frame: true,
            width: 600,
            closable:false,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0; width: 600;',
            layout:'form',
            items: [this.summaryPanel,{
                xtype:'fieldset',
                layout:'table',
                title: 'Main Information',
                //collapsed: true,
                collapsible: true,
                width: 800,
                autoHeight: true,
                defaultType:'button',
                defaults: {
                    style: 'margin-right: 10px'
                },
                items: [{
                    text: 'Project Information',
                    scale: 'medium',
                    handler: initDataEnteryHandler
                },{
                    text: 'Contacts',
                    scale: 'medium',
                    handler: contactEditHandler
                },{
                    text: 'Assumptions',
                    scale: 'medium',
                    handler: optionRelatedHandler
                },{
                    text: 'Prompts',
                    scale: 'medium',
                    handler: optionRelatedHandler
                },{
                    text: 'Deliverables',
                    scale: 'medium',
                    handler: optionRelatedHandler
                },{
                    text: 'Ingredients',
                    scale: 'medium',
                    split: false,
                    defaultType: 'right',
                    arrowAlign: 'right',
                    enableToggle : undefined,
                    menu : {
                        items: [{
                            text:'Summary',
                            handler: summaryIngredientHandler
                        },{
                            text:'Applications',
                            handler: appsHandler
                        },{
                            text:'Executables',
                            handler: exesHandler
                        },{
                            text:'Tables',
                            handler: tablesHandler
                        },{
                            text:'Systems',
                            handler: sysHandler
                        },{
                            text:'Other',
                            handler: otherIngredientHandler
                        }]
                    }
                },{
                    text: 'Routing & Traffic',
                    scale: 'medium',
                    handler: routingHandler
                },{
                    text: 'MIS',
                    scale: 'medium',
                    handler: misHandler
                },{
                    text: 'Final Entries',
                    scale: 'medium',
                    handler: finalEntriesHandler
                }]
            },{
                xtype:'fieldset',
                layout:'table',
                title: 'Project Actions',
                //collapsed: true,

                collapsible: true,
                width: 800,
                autoHeight: true,
                defaultType:'button',
                defaults: {

                    style: 'margin-right: 10px'
                },
                items: [{
                    text: 'Options',
                    scale: 'medium',
                    handler: secondRfqReviewHandler
                },this.swdAssessmentButton,this.opsAssessmentButton,{
                    text: 'Generate IFQ',
                    scale: 'medium',
                    handler: generateIFQHandler
                }, this.poRequestButton]
            },{
                xtype:'fieldset',
                layout:'table',
                style:'margin-top:15px;',
                title: 'General Project Options',
                //collapsed: true,
                collapsible: true,
                width: 800,
                autoHeight: true,
                defaultType:'button',
                defaults: {
                    style: 'margin-right: 10px'
                },
                items: [{
                    text: 'Project History',
                    scale: 'medium',
                    handler: historyViewHandler
                },{
                    text: 'Master Project Management',
                    scale: 'medium',
                    itemId: 'masterProjButton',
                    handler: submasterHandler
                }]
            },{
                xtype:'fieldset',
                layout:'table',
                title: 'Quote Actions',
                hidden: true,
                collapsible: true,
                collapsed: true,
                width: 800,
                autoHeight: true,
                cls: 'cook_checkbox_special',
                defaultType:'button',
                defaults: {
                    style: 'margin-right: 10px'
                },
                items: [{
                    text: 'Generate IFQ',
                    scale: 'medium',
                    handler: generateIFQHandler
                },{
                    text: 'ISSUE QUOTE/LOE',
                    disabled: true,
                    scale: 'medium'
                },{
                    text: 'CANCEL QUOTE',
                    disabled: true,
                    scale: 'medium'
                },{
                    text: 'AUTHORIZE QUOTE',
                    disabled: true,
                    scale: 'medium'
                }]
            },{
                xtype:'fieldset',
                layout:'table',
                title: 'Development Actions',
                collapsible: true,
                disabled: true,
                collapsed: true,
                width: 800,
                autoHeight: true,
                defaultType:'button',
                defaults: {
                    style: 'margin-right: 10px'
                },
                items: [{
                    text: 'PLACE HOLD ON DEVELOPMENT',
                    scale: 'medium'
                },{
                    text: 'CANCEL PROJECT',
                    scale: 'medium'
                }]
            },new NoteSetPanel(eto.projectId, '')
            ]
        });

        ProjectActions.superclass.initComponent.call(this);

        this.on('activate', this.onActivated, this);
    },
    constructor: function(tabCont,projId) {
        this.tabContainer = tabCont;
        this.projectId = projId;
        ProjectActions.superclass.constructor.call(this);
    },
    loadProject: function() {
        if(this.record != null) {
            if(this.summaryPanel) {
                // updating name

                var component = this.summaryPanel.getComponent('nameField');
                if(component) {
                    this.projectName = this.record.get("project_name");
                    component.setValue(this.projectName);
                    //this.setTitle(this.projectName);
                }

                component = this.summaryPanel.getComponent('numberField');
                if(component) {
                    component.setValue(this.record.get("project_number"));
                }

                component = this.summaryPanel.getComponent('bizField');
                if(component != null) {
                    component.setValue(this.record.get("business_unit_names"));
                }

                component = this.summaryPanel.getComponent('compField');
                if(component != null) {
                    component.setValue(this.record.get("company_name"));
                }

                component = this.summaryPanel.getComponent('pmField');
                if(component != null) {
                    var id = this.record.get("pm_name")
                    component.setValue(id,true);
                    //component.select('2',true);
                }

                component = this.summaryPanel.getComponent('createdByField');
                if(component != null) {
                    var id = this.record.get("created_by")
                    component.setValue(id);
                }

                component = this.summaryPanel.getComponent('uatField');
                if(component != null) {
                    var date = this.record.get("requested_uat_date");
                    component.setValue(date);
                    //if(date) {
                    //	component.setValue(date.format('F j, Y'));
                    //}
                    //component.select('2',true);
                }

                var date = this.record.get("auth_due_date");
                if(date) {
                    this.authDatePanel.items.items[0].show();
                    this.authDatePanel.items.items[1].show();
                    this.authDatePanel.items.items[2].show();
                    this.authDatePanel.items.items[1].setValue(date.format('F j, Y'));
                } else {
                    this.authDatePanel.items.items[0].hide();
                    this.authDatePanel.items.items[1].hide();
                    this.authDatePanel.items.items[2].hide();
                }

                var date = this.record.get("auth_received_date");
                if(date) {
                    this.authDatePanel.items.items[3].show();
                    this.authDatePanel.items.items[4].show();
                    this.authDatePanel.items.items[5].show();
                    this.authDatePanel.items.items[4].setValue(date.format('F j, Y'));
                } else {
                    this.authDatePanel.items.items[3].hide();
                    this.authDatePanel.items.items[4].hide();
                    this.authDatePanel.items.items[5].hide();
                }

                var date = this.record.get("uat_accepted_date");
                if(date) {
                    this.authDatePanel.items.items[6].show();
                    this.authDatePanel.items.items[7].show();
                    this.authDatePanel.items.items[8].show();
                    this.authDatePanel.items.items[7].setValue(date.format('F j, Y'));
                } else {
                    this.authDatePanel.items.items[6].hide();
                    this.authDatePanel.items.items[7].hide();
                    this.authDatePanel.items.items[8].hide();
                }

                component = this.summaryPanel.getComponent('directoryField');
                if(component != null) {
                    var directoryString = this.record.get("project_directory");
                    if(directoryString) {
                        component.setValue('<a href="file:///'+directoryString+'" target="_blank">'+directoryString+'</a>');
                    } else {
                        component.setValue("Project directory does not exist. Please fill out business unit, project name, and project number and directory will be created automatically.");
                    }
                    //component.select('2',true);
                }

                component = this.uatStageDF;
                if(component != null) {
                    var directoryString = this.record.get("uat_staging_directory");
                    if(directoryString) {
                        component.setValue('<a href="file:///'+directoryString+'" target="_blank">'+directoryString+'</a>');
                    } else {
                        component.setValue("UAT staging directory does not exist yet...");
                    }
                }

                component = this.prodStageDF;
                if(component != null) {
                    var directoryString = this.record.get("prod_staging_directory");
                    if(directoryString) {
                        component.setValue('<a href="file:///'+directoryString+'" target="_blank">'+directoryString+'</a>');
                    } else {
                        component.setValue("Prod staging directory does not exist yet...");
                    }
                }

                component = this.summaryPanel.getComponent('ifqLinkField');
                if(component != null) {
                    var directoryString = this.record.get("project_directory");
                    var ifqFilename = this.record.get("current_diff_filename");
                    if(directoryString && ifqFilename) {
                        var newString = '<a href="file:///'+directoryString+'/'+ifqFilename+'" target="_blank">'+ifqFilename+'</a>';
                        component.setValue(newString);
                    } else if(directoryString) {
                        component.setValue("N/A (IFQ has never been generated)");
                    } else if(ifqFilename) {
                        component.setValue("N/A (Directory is missing!!!! ZOMG!!!! You should NEVER see this!!! 2012 already or something?)");
                    } else {
                        component.setValue("N/A");
                    }
                    //component.select('2',true);
                }

                this.statusCB.setValue(this.record.get("project_status"));

                var master = this.record.get("master_project");
                if(master) {
                    openProjHandler = function(button, event) {
                        if(event) {
                            Cookbook.openProjectTab(master.id,master.name);
                        }
                    };
                    var buttonText = master.number;
                    if(buttonText) {
                        buttonText = buttonText + ': ';
                    }
                    buttonText = buttonText + master.name;
                    var masterButton = new Ext.Button({
                        text: buttonText,
                        style: 'padding-left: 10',
                        handler: openProjHandler
                    });
                    this.masterPanel.removeAll();
                    this.masterPanel.add({
                        hideLabel: true,
                        xtype:'displayfield',
                        value: 'Master Project:',
                        style: 'font-weight:bold;',
                        fieldClass: 'x-form-item'
                    });
                    this.masterPanel.add(masterButton);
                    this.masterPanel.show();
                    this.masterPanel.doLayout();
                } else {
                    this.masterPanel.hide();
                }

                var puppets = this.record.get("sub_projects");
                if(puppets instanceof Array) {
                    if(puppets.length > 0) {
                        this.slavePanel.removeAll();
                        this.slavePanel.add({
                            hideLabel: true,
                            xtype:'displayfield',
                            value: 'Sub-Projects:',
                            style: 'font-weight:bold;',
                            fieldClass: 'x-form-item'
                        });
                        for(var c = 0; c < puppets.length; c++) {
                            openProjHandler = function(button, event) {
                                if(event) {
                                    Cookbook.openProjectTab(button.openId,button.openName);
                                }
                            };
                            var buttonText = puppets[c].number;
                            if(buttonText) {
                                buttonText = buttonText + ': ';
                            }
                            buttonText = buttonText + puppets[c].name;
                            var slaveButton = new Ext.Button({
                                text: buttonText,
                                style: 'padding-left: 10',
                                handler: openProjHandler,
                                openId: puppets[c].id,
                                openName: puppets[c].name
                            });

                            this.slavePanel.add(slaveButton);
                        }
                        this.slavePanel.show();
                        this.slavePanel.doLayout();
                    } else {
                        this.slavePanel.hide();
                    }
                }

                var optionArray = this.record.get("options");
                if(optionArray instanceof Array) {
                    this.datesPanel.updateOptions(optionArray);
                    this.datesPanel.show();
                }
                this.summaryPanel.doLayout(false, true);

                if(this.poRequestButton.menu.items.length == 3) {
                    var poNumber = this.record.get("po_number");
                    if(poNumber == null) {
                        this.poStatusDF.setValue("Not Requested");
                        this.poStatusDF.removeClass("red");
                        this.poStatusDF.removeClass("green");
                        var ob = new Object();
                        ob["ext:qtip"] = null;
                        ob["ext:qtitle"] = null;
                        this.poStatusDF.el.set(ob);
                        this.poRequestButton.menu.items.items[0].enable();
                        this.poRequestButton.menu.items.items[2].disable();
                    } else {
                        if(poNumber > 0) {
                            this.poStatusDF.setValue("Approved (P.O.# " + poNumber + ")");
                            this.poStatusDF.addClass("green");
                            var ob = new Object();
                            ob["ext:qtip"] = poNumber;
                            ob["ext:qtitle"] = "P.O.#";
                            this.poStatusDF.el.set(ob);
                        } else {
                            var ob = new Object();
                            ob["ext:qtip"] = null;
                            ob["ext:qtitle"] = null;
                            this.poStatusDF.el.set(ob);
                            this.poStatusDF.addClass("red");
                            this.poStatusDF.setValue("Pending Approval");
                        }
                        this.poRequestButton.menu.items.items[0].disable();
                        this.poRequestButton.menu.items.items[2].enable();
                    }
                    if(poNumber < 0) {
                        this.poRequestButton.menu.items.items[1].enable();
                    } else {
                        this.poRequestButton.menu.items.items[1].disable();
                    }
                } else {
                    alert("Error... PO button has problems.");
                }
            }
        }
    },
    onActivated: function() {
        this.projectInfoStore.reload();
    }
});

OptionDatesSummaryPanel = Ext.extend(Ext.Panel, {
    optionArray: '',

    initComponent: function() {
        this.firstColumn = new Ext.Panel({
            //border: true,
            width: 125,
            defaults: {
                xtype:'displayfield',
                hideLabel: true,
                fieldClass: 'x-form-item'
            },
            items: []
        });
        this.secondColumn = new Ext.Panel({
            columnWidth: .20,
            defaults: {
                xtype:'displayfield',
                hideLabel: true,
                fieldClass: 'x-form-item'
            },
            items: []
        });
        this.thirdColumn = new Ext.Panel({
            columnWidth: .20,
            defaults: {
                xtype:'displayfield',
                hideLabel: true,
                fieldClass: 'x-form-item'
            },
            items: []
        });
        this.fourthColumn = new Ext.Panel({
            columnWidth: .20,
            defaults: {
                xtype:'displayfield',
                hideLabel: true,
                fieldClass: 'x-form-item'
            },
            items: []
        });
        this.fifthColumn = new Ext.Panel({
            columnWidth: .20,
            defaults: {
                xtype:'displayfield',
                hideLabel: true,
                fieldClass: 'x-form-item'
            },
            items: []
        });

        this.sixthColumn = new Ext.Panel({
            columnWidth: .20,
            defaults: {
                xtype:'displayfield',
                hideLabel: true,
                fieldClass: 'x-form-item'
            },
            items: []
        });
        Ext.apply(this, {
            frame: false,
            width: 800,
            closable:false,
            //autoWidth: true,
            //border:true,
            autoScroll: true,
            //bodyStyle:'padding:5px 5px 0; width: 600',
            layout:'column',
            items: [this.firstColumn,this.secondColumn,this.thirdColumn,this.fourthColumn,this.fifthColumn,this.sixthColumn]
        });
        //this.resetPanel();
        this.on('afterrender', function() {
            this.resetPanel();
        });
        OptionDatesSummaryPanel.superclass.initComponent.call(this);
    },
    constructor: function(optionArray) {
        this.optionArray = optionArray;
        OptionDatesSummaryPanel.superclass.constructor.call(this);
    },
    updateOptions: function(optionArray) {
        this.optionArray = optionArray;
        this.resetPanel();
        /*if(this.optionArray instanceof Array) {
         this.resetPanel();
         }*/
    },
    resetPanel: function() {
        this.firstColumn.removeAll(true);
        this.firstColumn.add({
            width: 125,
            value: 'Options Info:',
            style: 'font-weight:bold;'
        });
        this.secondColumn.removeAll(true);
        this.secondColumn.add({
            value: 'Option Name',
            style: 'font-weight:bold;'
        });
        this.thirdColumn.removeAll(true);
        this.thirdColumn.add({
            value: 'UAT Date',
            style: 'font-weight:bold;'
        });
        this.fourthColumn.removeAll(true);
        this.fourthColumn.add({
            value: 'PROD Date',
            style: 'font-weight:bold;'
        });
        this.fifthColumn.removeAll(true);
        this.fifthColumn.add({
            value: 'SWD Assessment',
            style: 'font-weight:bold;'
        });
        this.sixthColumn.removeAll(true);
        this.sixthColumn.add({
            value: 'OPS Assessment',
            style: 'font-weight:bold;'
        });
        if(this.optionArray instanceof Array) {
            if(this.optionArray.length < 1) {
                this.hide();
            }
            for(var a = 0; a < this.optionArray.length; a++) {
                var optionName = "N/A";
                var optionUAT = "N/A";
                var optionPROD = "N/A";
                var swdAssType = "Not Started";
                var opsAssType = "Not Started";
                if(this.optionArray[a].name) {
                    optionName = this.optionArray[a].name;
                }
                if(this.optionArray[a].quoted_uat_date) {
                    optionUAT = this.optionArray[a].quoted_uat_date;
                }
                if(this.optionArray[a].production_date) {
                    optionPROD = this.optionArray[a].production_date;
                }
                if(this.optionArray[a].assessments instanceof Array) {
                    for(var b = 0; b < this.optionArray[a].assessments.length; b++) {
                        var assObject = this.optionArray[a].assessments[b];
                        var completedDate = assObject.complete_date;
                        if(completedDate instanceof Date) {
                            completedDate = completedDate.format("Y/m/d");
                        }
                        if(assObject.assessment_type == "SWD") {
                            if(completedDate) {
                                swdAssType = completedDate;
                            } else {
                                swdAssType = "Requested";
                            }
                        } else if(assObject.assessment_type == "OPS") {
                            if(completedDate) {
                                opsAssType = completedDate;
                            } else {
                                opsAssType = "Requested";
                            }
                        }
                    }
                }
                this.secondColumn.add({
                    value: optionName
                });
                this.thirdColumn.add({
                    value: optionUAT
                });
                this.fourthColumn.add({
                    value: optionPROD
                });
                this.fifthColumn.add({
                    value: swdAssType
                });
                this.sixthColumn.add({
                    value: opsAssType
                });
            }
        } else {
            this.hide();
        }
        this.doLayout();
    }
});