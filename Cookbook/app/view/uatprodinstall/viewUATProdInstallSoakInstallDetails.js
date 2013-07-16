Ext.define('CookBook.view.uatprodinstall.ViewUATProdInstallSoakInstallDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewUATProdInstallSoakInstallDetails',
    bodyPadding: 5,
    bodyborder: false,
    frame: false,
    width: 1015,
    height: 750,
    title: 'Soak Install Details',
    collapsible: true,
    collapsed: false,
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox',
        pack: 'start',
        //align: 'stretch'
    },
    items: [{
        xtype: 'container',
        width: 1000,
        height: 175,
        itemId: 'soakMultiplePanelContainer',
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [{
            xtype: 'container',
            width: 200,
            height: 175,
            layout: {
                type: 'vbox',
                pack: 'start'
            },
            items: [{
                xtype: 'button',
                width: 180,
                height: 22,
                text: 'Add New Soak Install Panel',
                listeners: {
                    click: function() {
                        if (GLOBAL_readonly) {
                            return;
                        }
                        if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                            if (Ext.ComponentQuery.query('uatProdInstallSoakPanel1')[0]) {
                                if (Ext.ComponentQuery.query('uatProdInstallSoakPanel2')[0]) {
                                    if (Ext.ComponentQuery.query('uatProdInstallSoakPanel3')[0]) {
                                        if (Ext.ComponentQuery.query('uatProdInstallSoakPanel4')[0]) {} else {
                                            var additionalPanel = Ext.create('uatProdInstallSoakPanel4');
                                            Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].add(additionalPanel);
                                        }
                                    } else {
                                        var additionalPanel = Ext.create('uatProdInstallSoakPanel3');
                                        Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].add(additionalPanel);
                                    }
                                } else {
                                    var additionalPanel = Ext.create('uatProdInstallSoakPanel2');
                                    Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].add(additionalPanel);
                                }
                            } else {
                                var additionalPanel = Ext.create('uatProdInstallSoakPanel1');
                                Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].add(additionalPanel);
                            }
                        }
                    }
                }
            }, {
                html: '',
                xtype: 'label',
                height: 11
            }, {
                html: '<b>Soak Date:</b>',
                xtype: 'label',
                height: 27
            }, {
                html: '<b>Node / Environment(s):</b>',
                xtype: 'label',
                height: 28
            }, {
                html: '<b>USAN CCR#:</b>',
                xtype: 'label',
                height: 28
            }, {
                html: '<b>Customer CCR#:</b>',
                xtype: 'label',
                height: 27
            }, {
                html: '<b>Maintenance Start:</b>',
                xtype: 'label'
            }]
        }]
    }, {
        html: '',
        xtype: 'label',
        height: 11
    }, {
        xtype: 'combobox',
        store: 'Contacts',
        fieldLabel: '<b>Post-Install Notification</b>',
        labelAlign: 'left',
        labelWidth: 194,
        width: 990,
        typeAhead: false,
        displayField: 'name',
        multiSelect: true,
        valueField: 'email1',
        matchFieldWidth: true,
        listConfig: {
            //minHeight: 128,
            //maxHeight: 512,
            autoHeight: true,
            loadMask: false
        },
        queryMode: 'local',
        itemId: 'uatprodinstallSoakPostInstallNotification',
        name: 'uatprodinstallSoakPostInstallNotification'
    }, {
        xtype: 'grid',
        title: 'Soak Requirements Summary',
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
                        install_type: 'soak',
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
        store: 'SoakInstallRequirements',
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
        title: 'Soak Staging Folders',
        itemId: 'uatprodinstallSoakInstallStagingFolderContainer',
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
            tooltip: 'Add Soak Staging Folder',
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
                            install_type: 'soak'
                        },
                        jsonData: jsonBlob,
                        success: function(response) {
                            var obj = Ext.decode(response.responseText);
                            console.log(obj.rows[0].staging_folder_id);

                            var additionalPanel = Ext.create('soakInstallDetailsStagingFolderPanel');
                            additionalPanel.down('hidden').setValue(obj.rows[0].staging_folder_id);
                            thisPanel.add(additionalPanel);
                        }
                    });
                }
            }
        }]
    }, {
        xtype: 'textarea',
        fieldLabel: '<b>Soak Install Comments</b>',
        labelAlign: 'top',
        name: 'uatprodinstallSoakInstallComments',
        itemId: 'uatprodinstallSoakInstallComments',
        width: 1000,
        height: 120
    }]
});

Ext.define('soakInstallDetailsStagingFolderPanel', {
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyborder: false,
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        itemId: 'soakInstallStagingFolderLink',
        name: 'soakInstallStagingFolderLink',
        width: 400
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textfield',
        itemId: 'soakInstallStagingFolderNotes',
        name: 'soakInstallStagingFolderNotes',
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
        name: 'soakInstallDetailsStagingFolderId',
        itemId: 'soakInstallDetailsStagingFolderId',
        value: ''
    }]
});





Ext.define('uatProdInstallSoakPanel1', {
    alias: 'widget.uatProdInstallSoakPanel1',
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    autoScroll: false,
    preventHeader: false,
    itemId: 'uatProdInstallSoakPanel1',
    title: 'Soak Panel 1',
    bodyStyle: 'background-color:#dfe8f5;',
    items: [{
        //xtype: 'viewUATProdInstallSCUSoakDate',
        xtype: 'textDate',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        name: 'uatprodinstallSoakPanel1Date',
        itemId: 'uatprodinstallSoakPanel1Date'
    }, {
        //xtype: 'viewUATProdInstallSCUSoakNode',
        xtype: 'combobox',
        store: 'Nodes',
        fieldLabel: '',
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
        name: 'uatprodinstallSoakPanel1Node',
        itemId: 'uatprodinstallSoakPanel1Node'
    }, {
        //xtype: 'viewUATProdInstallSCUSoakUsanCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel1UsanCCR',
        itemId: 'uatprodinstallSoakPanel1UsanCCR'
    }, {
        //xtype: 'viewUATProdInstallSCUSoakCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel1CCR',
        itemId: 'uatprodinstallSoakPanel1CCR'
    }, {
        //xtype: 'viewUATProdInstallSCUSoakMaintenanceStart',
        xtype: 'textTime',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        increment: 15,
        name: 'uatprodinstallSoakPanel1MaintenanceStart',
        itemId: 'uatprodinstallSoakPanel1MaintenanceStart'
    }, {
        xtype: 'hidden',
        name: 'uatProdInstallSoakPanel1Hidden',
        itemId: 'uatProdInstallSoakPanel1Hidden',
        value: 'Soak Panel 1'
    }],
    tools: [{
        type: 'minus',
        tooltip: 'Delete this panel',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var tab = this.up('panel').up('panel').up('form');
                Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].remove(this.up('panel'));
                //tab.updateUatProdInstall();
            }
        }
    }, {
        type: 'gear',
        tooltip: 'Change panel name',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var eto = this.up('panel');
                var tab = this.up('panel').up('panel').up('form');
                Ext.MessageBox.prompt('Enter New Panel Title', 'Please enter the desired <b>Title.</b>', function(button, msg) {
                    if (button === 'ok') {
                        if (!Ext.isEmpty(msg)) {
                            eto.setTitle(msg);
                            eto.down('hidden').setValue(msg);
                        }
                    }
                });
            }
        }
    }]
});

Ext.define('uatProdInstallSoakPanel2', {
    alias: 'widget.uatProdInstallSoakPanel2',
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    autoScroll: false,
    preventHeader: false,
    itemId: 'uatProdInstallSoakPanel2',
    title: 'Soak Panel 2',
    bodyStyle: 'background-color:#dfe8f5;',
    items: [{
        //xtype: 'viewUATProdInstallWORSoakDate',
        xtype: 'textDate',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        name: 'uatprodinstallSoakPanel2Date',
        itemId: 'uatprodinstallSoakPanel2Date'
    }, {
        //xtype: 'viewUATProdInstallWORSoakNode',
        xtype: 'combobox',
        store: 'Nodes',
        fieldLabel: '',
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
        name: 'uatprodinstallSoakPanel2Node',
        itemId: 'uatprodinstallSoakPanel2Node'
    }, {
        //xtype: 'viewUATProdInstallWORSoakUsanCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel2UsanCCR',
        itemId: 'uatprodinstallSoakPanel2UsanCCR'
    }, {
        //xtype: 'viewUATProdInstallWORSoakCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel2CCR',
        itemId: 'uatprodinstallSoakPanel2CCR'
    }, {
        //xtype: 'viewUATProdInstallWORSoakMaintenanceStart',
        xtype: 'textTime',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        increment: 15,
        name: 'uatprodinstallSoakPanel2MaintenanceStart',
        itemId: 'uatprodinstallSoakPanel2MaintenanceStart'
    }, {
        xtype: 'hidden',
        name: 'uatProdInstallSoakPanel2Hidden',
        itemId: 'uatProdInstallSoakPanel2Hidden',
        value: 'Soak Panel 2'
    }],
    tools: [{
        type: 'minus',
        tooltip: 'Delete this panel',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var tab = this.up('panel').up('panel').up('form');
                Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].remove(this.up('panel'));
                //tab.updateUatProdInstall();
            }
        }
    }, {
        type: 'gear',
        tooltip: 'Change panel name',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var eto = this.up('panel');
                var tab = this.up('panel').up('panel').up('form');
                Ext.MessageBox.prompt('Enter New Panel Title', 'Please enter the desired <b>Title.</b>', function(button, msg) {
                    if (button === 'ok') {
                        if (!Ext.isEmpty(msg)) {
                            eto.setTitle(msg);
                            eto.down('hidden').setValue(msg);
                        }
                    }
                });
            }
        }
    }]
});

Ext.define('uatProdInstallSoakPanel3', {
    alias: 'widget.uatProdInstallSoakPanel3',
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    autoScroll: false,
    preventHeader: false,
    itemId: 'uatProdInstallSoakPanel3',
    title: 'Soak Panel 3',
    bodyStyle: 'background-color:#dfe8f5;',
    items: [{
        //xtype: 'viewUATProdInstallCPZSoakDate',
        xtype: 'textDate',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        name: 'uatprodinstallSoakPanel3Date',
        itemId: 'uatprodinstallSoakPanel3Date'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakNode',
        xtype: 'combobox',
        store: 'Nodes',
        fieldLabel: '',
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
        name: 'uatprodinstallSoakPanel3Node',
        itemId: 'uatprodinstallSoakPanel3Node'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakUsanCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel3UsanCCR',
        itemId: 'uatprodinstallSoakPanel3UsanCCR'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel3CCR',
        itemId: 'uatprodinstallSoakPanel3CCR'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakMaintenanceStart',
        xtype: 'textTime',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        increment: 15,
        name: 'uatprodinstallSoakPanel3MaintenanceStart',
        itemId: 'uatprodinstallSoakPanel3MaintenanceStart'
    }, {
        xtype: 'hidden',
        name: 'uatProdInstallSoakPanel3Hidden',
        itemId: 'uatProdInstallSoakPanel3Hidden',
        value: 'Soak Panel 3'
    }],
    tools: [{
        type: 'minus',
        tooltip: 'Delete this panel',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var tab = this.up('panel').up('panel').up('form');
                Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].remove(this.up('panel'));
                //tab.updateUatProdInstall();
            }
        }
    }, {
        type: 'gear',
        tooltip: 'Change panel name',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var eto = this.up('panel');
                var tab = this.up('panel').up('panel').up('form');
                Ext.MessageBox.prompt('Enter New Panel Title', 'Please enter the desired <b>Title.</b>', function(button, msg) {
                    if (button === 'ok') {
                        if (!Ext.isEmpty(msg)) {
                            eto.setTitle(msg);
                            eto.down('hidden').setValue(msg);
                        }
                    }
                });
            }
        }
    }]
});

Ext.define('uatProdInstallSoakPanel4', {
    alias: 'widget.uatProdInstallSoakPanel4',
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    autoScroll: false,
    preventHeader: false,
    itemId: 'uatProdInstallSoakPanel4',
    title: 'Soak Panel 4',
    bodyStyle: 'background-color:#dfe8f5;',
    items: [{
        //xtype: 'viewUATProdInstallCPZSoakDate',
        xtype: 'textDate',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        name: 'uatprodinstallSoakPanel4Date',
        itemId: 'uatprodinstallSoakPanel4Date'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakNode',
        xtype: 'combobox',
        store: 'Nodes',
        fieldLabel: '',
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
        name: 'uatprodinstallSoakPanel4Node',
        itemId: 'uatprodinstallSoakPanel4Node'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakUsanCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel4UsanCCR',
        itemId: 'uatprodinstallSoakPanel4UsanCCR'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakCCR',
        xtype: 'textfield',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        regex: new RegExp("\\d+"),
        name: 'uatprodinstallSoakPanel4CCR',
        itemId: 'uatprodinstallSoakPanel4CCR'
    }, {
        //xtype: 'viewUATProdInstallCPZSoakMaintenanceStart',
        xtype: 'textTime',
        allowBlank: true,
        fieldLabel: '',
        labelAlign: 'left',
        increment: 15,
        name: 'uatprodinstallSoakPanel4MaintenanceStart',
        itemId: 'uatprodinstallSoakPanel4MaintenanceStart'
    }, {
        xtype: 'hidden',
        name: 'uatProdInstallSoakPanel4Hidden',
        itemId: 'uatProdInstallSoakPanel4Hidden',
        value: 'Soak Panel 4'
    }],
    tools: [{
        type: 'minus',
        tooltip: 'Delete this panel',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var tab = this.up('panel').up('panel').up('form');
                Ext.ComponentQuery.query('#soakMultiplePanelContainer')[0].remove(this.up('panel'));
                //tab.updateUatProdInstall();
            }
        }
    }, {
        type: 'gear',
        tooltip: 'Change panel name',
        handler: function() {
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV")) {
                var eto = this.up('panel');
                var tab = this.up('panel').up('panel').up('form');
                Ext.MessageBox.prompt('Enter New Panel Title', 'Please enter the desired <b>Title.</b>', function(button, msg) {
                    if (button === 'ok') {
                        if (!Ext.isEmpty(msg)) {
                            eto.setTitle(msg);
                            eto.down('hidden').setValue(msg);
                        }
                    }
                });
            }
        }
    }]
});