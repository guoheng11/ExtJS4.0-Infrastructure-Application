Ext.define('CookBook.view.uatprodinstall.ViewUATProdInstallProductionInstallDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewUATProdInstallProductionInstallDetails',
    bodyPadding: 5,
    bodyborder: false,
    frame: false,
    width: 1015,
    height: 755,
    title: 'Production Install Details',
    collapsible: true,
    collapsed: false,
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox',
        pack: 'start'
    },
    items: [{
        //xtype: 'viewUATProdInstallUatDate'
        xtype: 'textDate',
        fieldLabel: '<b>Prod Date</b>',
        allowBlank: true,
        labelWidth: 155,
        labelAlign: 'left',
        name: 'uatprodinstallUatDate',
        itemId: 'uatprodinstallUatDate',
        listeners: {
            change: function() {
                var swdActualDate = Ext.ComponentQuery.query('#SWDSummaryActualProdDate')[0];
                var sumActualDate = Ext.ComponentQuery.query('#summaryScheduledProdDate')[0];

                swdActualDate.setFullValue(Ext.ComponentQuery.query('#uatprodinstallUatDate')[0].getRawValue());
                sumActualDate.setFullValue(Ext.ComponentQuery.query('#uatprodinstallUatDate')[0].getRawValue());
            },
            render: function(c) {
                Ext.QuickTips.register({
                    target: c.getEl(),
                    text: 'This date is tied to the Scheduled Production Date fields on both Summary and SWD tabs'
                });
            }
        }
    }, {
        //viewUATProdInstallUatNode
        xtype: 'combobox',
        fieldLabel: '<b>Node / Environment</b>',
        labelAlign: 'left',
        typeAhead: false,
        labelWidth: 155,
        displayField: 'node1',
        valueField: 'node1',
        store: 'Nodes',
        matchFieldWidth: true,
        listConfig: {
            autoHeight: true,
            loadMask: false
        },
        queryMode: 'local',
        itemId: 'uatprodinstallUatNode',
        name: 'uatprodinstallUatNode'
    }, {
        //xtype: 'viewUATProdInstallUatUsanCCR'
        xtype: 'textfield',
        allowBlank: true,
        labelWidth: 155,
        fieldLabel: '<b>USAN CR#</b>',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        itemId: 'uatprodinstallUatUsanCCR',
        name: 'uatprodinstallUatUsanCCR'
    }, {
        //xtype: 'viewUATProdInstallUatCCR'
        xtype: 'textfield',
        allowBlank: true,
        labelWidth: 155,
        fieldLabel: '<b>Customer CCR#</b>',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        itemId: 'uatprodinstallUatCCR',
        name: 'uatprodinstallUatCCR'
    }, {
        //xtype: 'viewUATProdInstallUatMaintenanceStart'
        xtype: 'textTime',
        allowBlank: true,
        labelWidth: 155,
        fieldLabel: '<b>Maintenance Start</b>',
        labelAlign: 'left',
        increment: 15,
        itemId: 'uatprodinstallUatMaintenanceStart',
        name: 'uatprodinstallUatMaintenanceStart'
    }, {
        //xtype: 'viewUATProdInstallUatConferenceStart'
        xtype: 'textTime',
        allowBlank: true,
        labelWidth: 155,
        fieldLabel: '<b>Conference Start</b>',
        labelAlign: 'left',
        increment: 15,
        itemId: 'uatprodinstallUatConferenceStart',
        name: 'uatprodinstallUatConferenceStart'
    }, {
        //xtype: 'viewUATProdInstallUatConferenceBridge'
        xtype: 'textfield',
        allowBlank: true,
        labelWidth: 155,
        fieldLabel: '<b>Conference Bridge / PC</b>',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        itemId: 'uatprodinstallUatConferenceBridge',
        name: 'uatprodinstallUatConferenceBridge'
    }, {
        xtype: 'combobox',
        store: 'Contacts',
        fieldLabel: '<b>Post-Install Notification</b>',
        labelAlign: 'left',
        labelWidth: 155,
        width: 990,
        typeAhead: false,
        displayField: 'name',
        multiSelect: true,
        valueField: 'email1',
        matchFieldWidth: true,
        listConfig: {
            autoHeight: true,
            loadMask: false
        },
        queryMode: 'local',
        itemId: 'uatprodinstallProductionPostInstallNotification',
        name: 'uatprodinstallProductionPostInstallNotification'
    }, {
        xtype: 'grid',
        title: 'Prod Requirements Summary',
        width: 1000,
        height: 250,
        autoScroll: true,
        bbar: [{
            xtype: 'button',
            text: 'Load Requirements',
            handler: function() {
                if (GLOBAL_readonly) {
                    return;
                }
                jsonBlob = Ext.JSON.encode(GLOBAL_currentProjectOpenProjectID);
                reqGrid = this.up('grid');
                myMask = new Ext.LoadMask(reqGrid.getEl(), {
                    msg: "Populating..."
                });
                myMask.show();
                reqGridStore = reqGrid.getStore();
                reqGridStore.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                Ext.Ajax.request({
                    url: 'UpdateUATProjReqClearProjects.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        install_type: 'prod',
                        read_only: GLOBAL_readonly
                    },
                    jsonData: jsonBlob,
                    success: function(response) {
                        myMask.hide();
                        console.log("success");
                        reqGridStore.proxy.extraParams.read_only = GLOBAL_readonly;
                        reqGridStore.load();
                        var obj = Ext.decode(response.responseText);
                        if (obj.rows[0].indexOf('Error') != -1) {
                            alert(obj.rows[0]);
                        }
                    },
                    failure: function() {
                        alert('Requirements population failed. Please contact Cookbook Admin');
                        myMask.hide();
                    }
                });
            }
        }],
        store: 'ProdInstallRequirements',
        columns: [{
            header: 'File Name',
            dataIndex: 'filename',
            flex: 2
        }, {
            header: 'Additional Notes',
            dataIndex: 'additional_notes',
            editor: {
                xtype: 'textarea'
            },
            flex: 2
        }, {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: 'extjs/examples/restful/images/delete.png',
                tooltip: 'click to delete this row',
                handler: function(grid, rowIndex, colIndex) {
                    grid.getStore().removeAt(rowIndex);
                }
            }]
        }],
        selType: 'cellmodel',
        plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function(e) {
                    if (!(GLOBAL_permission == 'TC' || GLOBAL_permission == 'PM' || GLOBAL_permission == 'DEV')) {
                        console.log('cannot edit with permission:' + GLOBAL_permission);
                        return false;
                    }
                }
            }
        })]
    }, {
        xtype: 'panel',
        width: 1000,
        height: 123,
        title: 'Production Staging Folders',
        itemId: 'uatprodinstallProdInstallStagingFolderContainer',
        autoScroll: true,
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'label',
                html: '',
                width: 185
            }, {
                xtype: 'label',
                html: '<b>Link</b>'
            }, '->', {
                xtype: 'label',
                html: '<b>Notes</b>',
                width: 330
            }]
        }],
        tools: [{
            type: 'plus',
            tooltip: 'Add Production Staging Folder',
            handler: function() {
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                    var jsonBlob = Ext.JSON.encode("{test: data}");
                    var thisPanel = this.up('panel');
                    Ext.Ajax.request({
                        url: 'AddStagingFolder.ashx',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            project_id: GLOBAL_currentProjectOpenProjectID,
                            install_type: 'prod'
                        },
                        jsonData: jsonBlob,
                        success: function(response) {
                            var obj = Ext.decode(response.responseText);
                            console.log(obj.rows[0].staging_folder_id);

                            var additionalPanel = Ext.create('productionInstallDetailsStagingFolderPanel');
                            additionalPanel.down('hidden').setValue(obj.rows[0].staging_folder_id);
                            thisPanel.add(additionalPanel);
                        }
                    });
                }
            }
        }]
    }, {
        xtype: 'textarea',
        fieldLabel: '<b>Production Comments</b>',
        itemId: 'uatprodinstallProdInstallComments',
        name: 'uatprodinstallProdInstallComments',
        labelAlign: 'top',
        width: 1000,
        height: 120
    }]
});

Ext.define('productionInstallDetailsStagingFolderPanel', {
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyborder: false,
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        itemId: 'productionInstallStagingFolderLink',
        name: 'productionInstallStagingFolderLink',
        width: 400
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textfield',
        itemId: 'productionInstallStagingFolderNotes',
        name: 'productionInstallStagingFolderNotes',
        width: 400
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'button',
        width: 22,
        icon: 'extjs/examples/restful/images/delete.png',
        tooltip: 'click to delete this row',
        listeners: {
            click: function() {
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                    var jsonBlob = Ext.JSON.encode("{test: data}");
                    var thisPanel = this.up('panel');

                    var stagingFolderId = this.up('panel').down('hidden').getValue();
                    console.log(stagingFolderId);

                    Ext.Ajax.request({
                        url: 'RemoveStagingFolder.ashx',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            project_id: GLOBAL_currentProjectOpenProjectID,
                            staging_folder_id: stagingFolderId
                        },
                        jsonData: jsonBlob,
                        success: function() {
                            thisPanel.up('container').remove(thisPanel);
                            doStagingFolderMenuLinksLoading(GLOBAL_currentProjectOpenProjectID);
                        }
                    });
                }
            }
        }
    }, {
        xtype: 'hidden',
        name: 'productionInstallDetailsStagingFolderId',
        itemId: 'productionInstallDetailsStagingFolderId',
        value: ''
    }]
});