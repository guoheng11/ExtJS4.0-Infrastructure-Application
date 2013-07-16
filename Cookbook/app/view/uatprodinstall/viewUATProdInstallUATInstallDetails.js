Ext.define('CookBook.view.uatprodinstall.ViewUATProdInstallUATInstallDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewUATProdInstallUATInstallDetails',
    bodyPadding: 5,
    bodyborder: false,
    frame: false,
    width: 1015,
    height: 605,
    title: 'UAT Install Details',
    collapsible: true,
    collapsed: false,
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox',
        pack: 'start'
    },
    items: [{
        xtype: 'textDate',
        width: 300,
        fieldLabel: '<b>UAT Date</b>',
        itemId: 'uatprodinstallUATInstallDate',
        name: 'uatprodinstallUATInstallDate',
        labelWidth: 155
    }, {
        xtype: 'combobox',
        width: 300,
        labelWidth: 155,
        fieldLabel: '<b>Node / Environment</b>',
        store: 'Nodes',
        labelAlign: 'left',
        typeAhead: false,
        displayField: 'node1',
        valueField: 'node1',
        matchFieldWidth: true,
        listConfig: {
            autoHeight: true,
            loadMask: false
        },
        queryMode: 'local',
        itemId: 'uatprodinstallUATInstallNodes',
        name: 'uatprodinstallUATInstallNodes'
    }, {
        xtype: 'grid',
        title: 'UAT Requirements Summary',
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
                        install_type: 'uat',
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
        store: 'UATInstallRequirements',
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
        title: 'UAT Staging Folders',
        itemId: 'uatprodinstallUATInstallStagingFolderContainer',
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
            tooltip: 'Add UAT Staging Folder',
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
                            install_type: 'uat'
                        },
                        jsonData: jsonBlob,
                        success: function(response) {
                            var obj = Ext.decode(response.responseText);
                            console.log(obj.rows[0].staging_folder_id);

                            var additionalPanel = Ext.create('uatInstallDetailsStagingFolderPanel');
                            additionalPanel.down('hidden').setValue(obj.rows[0].staging_folder_id);
                            thisPanel.add(additionalPanel);
                        }
                    });
                }
            }
        }]
    }, {
        xtype: 'textarea',
        fieldLabel: '<b>UAT Comments</b>',
        itemId: 'uatprodinstallUATInstallComments',
        name: 'uatprodinstallUATInstallComments',
        labelAlign: 'top',
        width: 1000,
        height: 120
    }]
});

Ext.define('uatInstallDetailsStagingFolderPanel', {
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyborder: false,
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        itemId: 'uatInstallStagingFolderLink',
        name: 'uatInstallStagingFolderLink',
        width: 400
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textfield',
        itemId: 'uatInstallStagingFolderNotes',
        name: 'uatInstallStagingFolderNotes',
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
        name: 'uatInstallDetailsStagingFolderId',
        itemId: 'uatInstallDetailsStagingFolderId',
        value: ''
    }]
});