Ext.define('CookBook.view.editors.ViewRFQReportView', {});

function launchRFQReportView() {
    if (GLOBAL_projectCurrentlyOpen == true) {
        alert("Please close any open projects before requesting the Project Status Report View");
        return;
    }

    var rfqReportViewHeight = 720; //window.screen.availHeight * .7;
    var rfqReportViewWidth = 1200; //window.screen.availWidth * .9;
    if ((window.screen.availWidth * .9) > 1200) {
        rfqReportViewWidth = window.screen.availWidth * .9;
    }

    var data = {
        text: 'Project Criteria',
        expanded: true,
        items: [{
            text: 'Project Statuses',
            expanded: true
        }
        /*, {
         text: 'Extra Criteria 1',
         items: [{
         text: 'Test Item 1',
         checked: false,
         leaf: true
         }]
         }, {
         text: 'Extra Criteria 2',
         items: [{
         text: 'Test Item 2',
         checked: false,
         leaf: true
         }]
     }*/
        ]
    };

    var treePanelStore = Ext.create('Ext.data.TreeStore', {
        model: 'ListItem',
        defaultRootProperty: 'items',
        root: data
    });

    Ext.define('rfqReportViewGridModel', {
        extend: 'Ext.data.Model',
        idProperty: 'fakeID',
        fields: [{
            name: 'fakeID',
            type: 'int'
        }, {
            name: 'project_id',
            type: 'int'
        }, {
            name: 'exp',
            type: 'string'
        }, {
            name: 'project_number',
            type: 'string'
        }, {
            name: 'project_name',
            type: 'string'
        }, {
            name: 'project_status',
            type: 'string'
        }, {
            name: 'business_unit',
            type: 'string'
        }, {
            name: 'tc',
            type: 'string'
        }, {
            name: 'pm',
            type: 'string'
        }, {
            name: 'flow',
            type: 'string'
        }, {
            name: 'rfq_recd',
            type: 'string'
        }, {
            name: 'quote_due',
            type: 'string'
        }, {
            name: 'req_uat',
            type: 'string'
        }, {
            name: 'req_prod',
            type: 'string'
        }]
    });

    var rfqReportViewGridStore = Ext.create('Ext.data.Store', {
        model: 'rfqReportViewGridModel',
        proxy: {
            type: 'ajax',
            actionMethods: {
                update: 'PUT',
                read: 'GET',
                destroy: 'DELETE',
                create: 'POST'
            },
            url: 'CommitRFQReportView.ashx',
            reader: {
                type: 'json',
                root: 'results',
                idProperty: 'fakeID',
                id: 'fakeID'
            }
        }
    });

    var tree = Ext.create('Ext.tree.Panel', {
        store: treePanelStore,
        region: 'west',
        rootVisible: true,
        width: rfqReportViewWidth * .18,
        useArrows: true,
        resizable: true,
        collapsible: true,
        frame: true,
        title: 'Project Criteria',
        dockedItems: [{
            xtype: 'toolbar',
            layout: {
                pack: 'center'
            },
            items: {
                text: 'Get Selected Projects',
                itemId: 'PRVgetSelectedProjectsButton',
                listeners: {
                    click: function() {
                        var records = tree.getView().getChecked(),
                            names = '';

                        Ext.Array.each(records, function(rec) {
                            names += rec.get('text') + '|';
                        });

                        if (names.length > 2) {
                            names = names.substring(0, names.length - 1);
                        } else {
                            alert('Please select valid criteria');
                            return;
                        }

                        var jsonBlob = Ext.JSON.encode(names);
                        var grid = Ext.ComponentQuery.query('#rfqReportViewGrid')[0];
                        var myMask = new Ext.LoadMask(grid.getEl(), {
                            msg: "Populating..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'RFQReportView.ashx',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            jsonData: jsonBlob,
                            success: function(serverResponse) {
                                rfqReportViewGridStore.removeAll();
                                var obj = Ext.decode(serverResponse.responseText);
                                if (obj.success == true) {
                                    var numRecords = obj.rows.length;
                                    for (x = 0; x < numRecords; x++) {
                                        //console.log(obj.rows[x].tc2);
                                        rfqReportViewGridStore.add({
                                            fakeID: x + 1,
                                            exp: obj.rows[x].exp,
                                            project_id: obj.rows[x].project_id,
                                            project_number: obj.rows[x].project_number,
                                            project_name: obj.rows[x].project_name,
                                            project_status: obj.rows[x].project_status,
                                            business_unit: obj.rows[x].business_unit,
                                            tc: obj.rows[x].tc,
                                            pm: obj.rows[x].pm,
                                            flow: obj.rows[x].flow,
                                            rfq_recd: obj.rows[x].rfq_recd,
                                            quote_due: obj.rows[x].quote_due,
                                            req_uat: obj.rows[x].req_uat,
                                            req_prod: obj.rows[x].req_prod
                                        });
                                    }
                                }
                                //Ext.ComponentQuery.query('#rfqReportViewGrid')[0].getStore().sort('rfq_recd', 'ASC');
                                Ext.ComponentQuery.query('#rfqReportViewGrid')[0].getStore().sort([{
                                    sorterFn: function(v1, v2) {
                                        try {
                                            var v1data = Date.parse(v1.get('rfq_recd'));
                                            var v2data = Date.parse(v2.get('rfq_recd'));
                                        } catch (err) {
                                            var v1data = v1.get('rfq_recd');
                                            var v2data = v2.get('rfq_recd');
                                        }

                                        if (Ext.isDate(v1data) && Ext.isDate(v2data)) {
                                            if (v1data === v2data) {
                                                return 0;
                                            } else {
                                                return v1data < v2data ? -1 : 1;
                                            }
                                        } else {
                                            if (v1data == v2data) {
                                                return 0;
                                            } else {
                                                if (isNaN(v1data) && !isNaN(v2data)) {
                                                    return 1;
                                                }
                                                if (!isNaN(v1data) && isNaN(v2data)) {
                                                    return -1;
                                                }
                                                return v1data < v2data ? -1 : 1
                                            }
                                        }
                                    }
                                }]);
                                myMask.hide();
                            },
                            failure: function(serverResponse) {
                                alert("Project population failed. Please contact Cookbook Admin.");
                                console.log(serverResponse);
                                myMask.hide();
                            }
                        });
                    }
                }
            }
        }]
    });

    var ds = GLOBAL_currentController.getStore('Statuses');
    if (ds.getCount() < 1) {
        ds.load({
            callback: function() {
                ds.sort('type', 'ASC');
                for (var i = 0; i < ds.getCount(); i++) {
                    var shouldIAdd = true;
                    var root = tree.getRootNode();
                    var projStatusFolder = tree.getRootNode().findChild('text', 'Project Statuses');
                    if (root != null) {
                        root.cascadeBy(function(r) {
                            if (ds.getAt(i).data.type == r.data.text) {
                                shouldIAdd = false;
                                return false;
                            }
                        });
                    }
                    if (shouldIAdd) {
                        if (ds.getAt(i).data.type.indexOf('RFQ') != -1) {
                            projStatusFolder.appendChild({
                                text: ds.getAt(i).data.type,
                                checked: true,
                                leaf: true
                            });
                        } else {
                            projStatusFolder.appendChild({
                                text: ds.getAt(i).data.type,
                                checked: false,
                                leaf: true
                            });
                        }
                    }
                }
            }
        })
    } else {
        ds.sort('type', 'ASC');
        for (var i = 0; i < ds.getCount(); i++) {
            var shouldIAdd = true;
            var root = tree.getRootNode();
            var projStatusFolder = tree.getRootNode().findChild('text', 'Project Statuses');
            if (root != null) {
                root.cascadeBy(function(r) {
                    if (ds.getAt(i).data.type == r.data.text) {
                        shouldIAdd = false;
                        return false;
                    }
                });
            }
            if (shouldIAdd) {
                if (ds.getAt(i).data.type.indexOf('RFQ') != -1) {
                    projStatusFolder.appendChild({
                        text: ds.getAt(i).data.type,
                        checked: true,
                        leaf: true
                    });
                } else {
                    projStatusFolder.appendChild({
                        text: ds.getAt(i).data.type,
                        checked: false,
                        leaf: true
                    });
                }
            }
        }
    }

    var rfqReportViewTopPanel = Ext.create('Ext.form.Panel', {
        region: 'north',
        layout: 'hbox',
        height: rfqReportViewHeight * .06,
        items: [{
            xtype: 'label',
            flex: 2,
            html: '<b><h2>RFQ Status</h2></b>',
            margin: '5 5 5 5'
        }, {
            xtype: 'label',
            flex: 10,
            margin: '5 5 5 5'
        }, {
            xtype: 'textfield',
            //fieldLabel: 'Filter',
            emptyText: 'filter by project number...',
            width: 300,
            margin: '5 5 5 5',
            flex: 2,
            listeners: {
                change: function() {
                    var gridToSearch = Ext.ComponentQuery.query('#rfqReportViewGrid')[0];
                    var searchField = 'project_number';
                    gridToSearch.getStore().clearFilter();
                    var regstr = new RegExp(this.getValue(), 'i');
                    //var searchType = Ext.ComponentQuery.query('#searchTypes')[0].text;

                    gridToSearch.getStore().filter({
                        id: searchField,
                        property: searchField,
                        value: regstr
                    });
                }
            }
        }]
    });

    var rfqReportViewBottomPanel = Ext.create('Ext.form.Panel', {
        region: 'south',
        layout: 'hbox',
        height: rfqReportViewHeight * .06,
        items: [{
            xtype: 'button',
            //fieldLabel: 'Filter',
            text: 'Export Current View as XLS',
            margin: '5 5 5 5',
            flex: 2,
            handler: function() {
                if (rfqReportViewGrid.getStore().getCount() < 1) {
                    alert('Please choose criteria and populate the Projects grid before exporting');
                    return;
                }
                var exportLocation = "\\\\nor2k3ops1\\e_drive\\Project Management\\Projects\\INT\\INT-551 Web Cookbook\\RFQ Exports";
                Ext.MessageBox.prompt('Export Location', 'Please enter the <b>full network path</b> of the location you want to save the XLS to.', function(btn, txt) {
                    if (btn == 'ok') {
                        exportLocation = txt;
                        var recsToEncode = new Array();
                        console.log("Store count: " + rfqReportViewGrid.getStore().getCount());
                        for (var i = 0; i < rfqReportViewGrid.getStore().getCount(); i++) {
                            var currRec = rfqReportViewGrid.getStore().getAt(i);
                            var temp1 = prvFormatDate(currRec.data.rfq_recd);
                            var temp2 = prvFormatDate(currRec.data.quote_due);
                            var temp3 = prvFormatDate(currRec.data.req_uat);
                            var temp4 = prvFormatDate(currRec.data.req_prod);
                            recsToEncode.push({
                                exp: currRec.data.exp,
                                project_id: currRec.data.project_id,
                                project_number: currRec.data.project_number,
                                project_name: currRec.data.project_name,
                                project_status: currRec.data.project_status,
                                business_unit: currRec.data.business_unit,
                                tc: currRec.data.tc,
                                pm: currRec.data.pm,
                                flow: currRec.data.flow,
                                rfq_recd: temp1,
                                quote_due: temp2,
                                req_uat: temp3,
                                req_prod: temp4
                            });
                        }
                        console.log(recsToEncode);
                        var jsonBlob = Ext.JSON.encode(recsToEncode);
                        var grid = Ext.ComponentQuery.query('#rfqReportViewGrid')[0];
                        var myMask = new Ext.LoadMask(grid.getEl(), {
                            msg: "Exporting..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'ExportRFQReportView.ashx',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                export_loc: exportLocation,
                                user_name: GLOBAL_username
                            },
                            jsonData: jsonBlob,
                            success: function(serverResponse) {
                                var obj = Ext.decode(serverResponse.responseText);
                                myMask.hide();
                                alert(obj.rows[0])
                            },
                            failure: function(serverResponse) {
                                myMask.hide();
                                alert("Export failed. Please contact Cookbook Admin.");
                                console.log(serverResponse);
                            }
                        });
                    } else {
                        return;
                    }
                }, this, false, exportLocation);
            }
        }, {
            xtype: 'button',
            flex: 1.5,
            text: 'Printer Friendly View',
            margin: '5 5 5 5',
            handler: function() {
                if (rfqReportViewGrid.getStore().getCount() < 1) {
                    alert('Please choose criteria and populate the Projects grid before opening the Printer Friendly View');
                    return;
                }
                Ext.ux.grid.Printer.mainTitle = 'RFQ Report View - Print View'; //optional
                Ext.ux.grid.Printer.print(rfqReportViewGrid);
            }
        }, {
            xtype: 'label',
            flex: 10,
            margin: '5 5 5 5'
        }, {
            xtype: 'button',
            //fieldLabel: 'Filter',
            text: 'Commit Changes',
            flex: 1.3,
            margin: '5 5 5 5',
            handler: function() {
                var modifiedRecs = rfqReportViewGrid.getStore().getUpdatedRecords();
                //console.log(modifiedRecs);
                if (modifiedRecs.length > 0) {
                    var shitToEncode = new Array();
                    for (var i = 0; i < modifiedRecs.length; i++) {
                        if (modifiedRecs[i].isModified("exp")) {
                            shitToEncode.push({
                                exp: modifiedRecs[i].data.exp,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("project_name")) {
                            shitToEncode.push({
                                project_name: modifiedRecs[i].data.project_name,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("project_status")) {
                            shitToEncode.push({
                                project_status: modifiedRecs[i].data.project_status,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("business_unit")) {
                            shitToEncode.push({
                                business_unit: modifiedRecs[i].data.business_unit,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("tc")) {
                            shitToEncode.push({
                                tc: modifiedRecs[i].data.tc,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("pm")) {
                            shitToEncode.push({
                                pm: modifiedRecs[i].data.pm,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("flow")) {
                            shitToEncode.push({
                                flow: modifiedRecs[i].data.flow,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("rfq_recd")) {
                            var temp = prvFormatDate(modifiedRecs[i].data.rfq_recd);
                            shitToEncode.push({
                                rfq_recd: temp,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("quote_due")) {
                            var temp = prvFormatDate(modifiedRecs[i].data.quote_due);
                            shitToEncode.push({
                                quote_due: temp,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("req_uat")) {
                            var temp = prvFormatDate(modifiedRecs[i].data.req_uat);
                            shitToEncode.push({
                                req_uat: temp,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                        if (modifiedRecs[i].isModified("req_prod")) {
                            var temp = prvFormatDate(modifiedRecs[i].data.req_prod);
                            shitToEncode.push({
                                req_prod: temp,
                                project_id: modifiedRecs[i].data.project_id
                            });
                        }
                    }
                    //console.log(shitToEncode);
                    var jsonBlob = Ext.JSON.encode(shitToEncode);
                    //console.log(jsonBlob);
                    var grid = Ext.ComponentQuery.query('#rfqReportViewGrid')[0];
                    var myMask = new Ext.LoadMask(grid.getEl(), {
                        msg: "Committing Changes..."
                    });
                    myMask.show();
                    Ext.Ajax.request({
                        url: 'CommitRFQReportView.ashx',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            user_name: GLOBAL_username,
                        },
                        jsonData: jsonBlob,
                        success: function(serverResponse) {
                            var obj = Ext.decode(serverResponse.responseText);
                            if (obj.success == true) {
                                var suc = obj.rows[0].succeededProjects;
                                var fail = obj.rows[0].failedProejcts;
                                var lock = obj.rows[0].lockedProjects
                                console.log("Succeeded: " + suc);
                                console.log("Failed: " + fail);
                                console.log("Locked: " + lock);
                                if (Ext.isEmpty(suc)) suc = 'none';
                                if (Ext.isEmpty(fail)) fail = 'none';
                                if (Ext.isEmpty(lock)) lock = 'none';

                                Ext.MessageBox.alert('Commit Results', '<b>Succeeded Fields:</b> ' + suc + '<br /><br />' + '<b>Failed Fields:</b> ' + fail + '<br /><br />' + '<b>Locked Projects:</b> ' + lock + '<br /><br />' + '<b>Note:</b> Locked Projects will have all field changes reverted to their original values!');

                                if (lock != 'none') {
                                    var lockArray = lock.split(';');
                                    for (var i = 0; i < lockArray.length; i++) {
                                        var lockedRecord = rfqReportViewGrid.getStore().findRecord('project_number', stringTrim(lockArray[i]));
                                        lockedRecord.reject();
                                    }
                                    rfqReportViewGrid.getStore().sync();
                                } else {
                                    rfqReportViewGrid.getStore().sync();
                                }
                            } else {
                                alert('Commit not successful - contact Cookbook Admin:' + obj.rows[0]);
                            }
                            myMask.hide();
                        },
                        failure: function(serverResponse) {
                            alert("Commit failed. Please contact Cookbook Admin.");
                            console.log(serverResponse);
                            myMask.hide();
                        }
                    });
                } else {
                    alert('No changes found in current view')
                }
            }
        }]
    });


    function columnWrap(val) {
        return '<div style="white-space:normal !important;">' + val + '</div>';
    }

    var rfqReportViewGrid = Ext.create('Ext.grid.Panel', {
        region: 'center',
        itemId: 'rfqReportViewGrid',
        title: 'Projects',
        store: rfqReportViewGridStore,
        stripeRows: true,
        columns: [{
            header: 'Exp?',
            dataIndex: 'exp',
            editor: {
                xtype: 'combobox',
                store: {
                    fields: ['new'],
                    data: [{
                        'new': 'True'
                    }, {
                        'new': 'False'
                    }]
                },
                multiSelect: false,
                editable: false,
                displayField: 'new',
                valueField: 'new',
                allowBlank: true,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local'
            },
            flex: .7
        }, {
            header: 'Project Number',
            dataIndex: 'project_number',
            renderer: columnWrap,
            flex: 1.2
        }, {
            header: 'Project Name',
            dataIndex: 'project_name',
            editor: {
                xtype: 'textarea'
            },
            renderer: columnWrap,
            flex: 1.5
        }, {
            header: 'Status',
            dataIndex: 'project_status',
            renderer: columnWrap,
            editor: {
                xtype: 'combobox',
                store: 'Statuses',
                triggerAction: 'all',
                editable: false,
                displayField: 'type',
                valueField: 'type',
                allowBlank: false,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local'
            },
            flex: 1.5
        }, {
            header: 'Bus Unit',
            dataIndex: 'business_unit',
            renderer: columnWrap,
            editor: {
                xtype: 'combobox',
                store: 'BusinessUnits',
                trigerAction: 'all',
                typeAhead: false,
                editable: false,
                displayField: 'name',
                valueField: 'name',
                allowBlank: false,
                matchFieldWidth: true,
                listConfig: {
                    //minHeight: 128,
                    //maxHeight: 512,
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local'
            },
            flex: 1.5
        }, {
            header: 'TC',
            dataIndex: 'tc',
            renderer: columnWrap,
            editor: {
                xtype: 'combobox',
                store: 'Contacts',
                displayField: 'name',
                valueField: 'name',
                allowBlank: true,
                multiSelect: true,
                matchFieldWidth: true,
                delimiter: ",",
                editable: false,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local',
                lastQuery: '',
                listeners: {
                    expand: function() {
                        this.store.filter([{
                            property: 'company_name',
                            value: 'USAN'
                        }]);
                    },
                    collapse: function() {
                        this.store.clearFilter();
                    }
                }
            },
            flex: 2
        }, {
            header: 'PM',
            dataIndex: 'pm',
            renderer: columnWrap,
            editor: {
                xtype: 'combobox',
                store: 'Contacts',
                displayField: 'name',
                valueField: 'name',
                allowBlank: true,
                multiSelect: true,
                matchFieldWidth: true,
                delimiter: ",",
                editable: false,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local',
                lastQuery: '',
                listeners: {
                    expand: function() {
                        this.store.filter([{
                            property: 'company_name',
                            value: 'USAN'
                        }]);
                    },
                    collapse: function() {
                        this.store.clearFilter();
                    }
                }
            },
            flex: 2
        }, {
            header: 'Flow?',
            dataIndex: 'flow',
            renderer: columnWrap,
            editor: {
                xtype: 'combobox',
                store: {
                    fields: ['flow'],
                    data: [{
                        'flow': 'N/A'
                    }, {
                        'flow': 'Visio'
                    }, {
                        'flow': 'VUI'
                    }, {
                        'flow': 'VUI/Visio'
                    }]
                },
                multiSelect: false,
                displayField: 'flow',
                valueField: 'flow',
                editable: false,
                allowBlank: true,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local'
            },
            flex: 1
        }, {
            header: 'RFQ Rec\'d',
            dataIndex: 'rfq_recd',
            editor: {
                xtype: 'textDate',
                format: 'm/d/y',
                validateOnChange: false,
                validateOnBlur: false
            },
            renderer: function(value, metaData) {
                if (value == null) {
                    return;
                }

                var pattern = /T00:00:00/;
                if (pattern.test(value.toString())) {
                    var datestring = value.substring(0, value.indexOf('T'));
                    var month = datestring.substring(5, 7);
                    var day = datestring.substring(8, 10);
                    var year = datestring.substring(0, 4);
                    return month + "/" + day + "/" + year;
                }

                pattern = /00:00:00/;
                if (pattern.test(value.toString())) {
                    return Ext.util.Format.date(value, 'm/d/Y');
                }

                return value;
            },
            flex: 1.5
        }, {
            header: 'Quote Due',
            dataIndex: 'quote_due',
            editor: {
                xtype: 'textDate',
                format: 'm/d/y',
                validateOnChange: false,
                validateOnBlur: false
            },
            renderer: function(value, metaData) {
                if (value == null) {
                    return;
                }

                var pattern = /T00:00:00/;
                if (pattern.test(value.toString())) {
                    var datestring = value.substring(0, value.indexOf('T'));
                    var month = datestring.substring(5, 7);
                    var day = datestring.substring(8, 10);
                    var year = datestring.substring(0, 4);
                    return month + "/" + day + "/" + year;
                }

                pattern = /00:00:00/;
                if (pattern.test(value.toString())) {
                    return Ext.util.Format.date(value, 'm/d/Y');
                }

                return value;
            },
            flex: 1.5
        }, {
            header: 'Req UAT',
            dataIndex: 'req_uat',
            editor: {
                xtype: 'textDate',
                format: 'm/d/y',
                validateOnChange: false,
                validateOnBlur: false
            },
            renderer: function(value, metaData) {
                if (value == null) {
                    return;
                }

                var pattern = /T00:00:00/;
                if (pattern.test(value.toString())) {
                    var datestring = value.substring(0, value.indexOf('T'));
                    var month = datestring.substring(5, 7);
                    var day = datestring.substring(8, 10);
                    var year = datestring.substring(0, 4);
                    return month + "/" + day + "/" + year;
                }

                pattern = /00:00:00/;
                if (pattern.test(value.toString())) {
                    return Ext.util.Format.date(value, 'm/d/Y');
                }

                return value;
            },
            flex: 1.5
        }, {
            header: 'Req PROD',
            dataIndex: 'req_prod',
            editor: {
                xtype: 'textDate',
                format: 'm/d/y',
                validateOnChange: false,
                validateOnBlur: false
            },
            renderer: function(value, metaData) {
                if (value == null) {
                    return;
                }

                var pattern = /T00:00:00/;
                if (pattern.test(value.toString())) {
                    var datestring = value.substring(0, value.indexOf('T'));
                    var month = datestring.substring(5, 7);
                    var day = datestring.substring(8, 10);
                    var year = datestring.substring(0, 4);
                    return month + "/" + day + "/" + year;
                }

                pattern = /00:00:00/;
                if (pattern.test(value.toString())) {
                    return Ext.util.Format.date(value, 'm/d/Y');
                }

                return value;
            },
            flex: 1.5
        }],
        tools: [{
            type: 'search',
            tooltip: 'True Sort by RFQ Recieved',
            handler: function() {
                Ext.ComponentQuery.query('#rfqReportViewGrid')[0].getStore().sort([{
                    sorterFn: function(v1, v2) {
                        try {
                            var v1data = Date.parse(v1.get('rfq_recd'));
                            var v2data = Date.parse(v2.get('rfq_recd'));
                        } catch (err) {
                            var v1data = v1.get('rfq_recd');
                            var v2data = v2.get('rfq_recd');
                            //console.log("% Error getting time: " + v1data + "|" + v2data);
                        }

                        if (Ext.isDate(v1data) && Ext.isDate(v2data)) {
                            if (v1data === v2data) {
                                //console.log("% V1 === v2: " + v1data + "|" + v2data);
                                return 0;
                            } else {
                                //console.log("% V1 < v2? " + v1data < v2data ? -1 : 1 + " [] " + v1data + "|" + v2data);
                                return v1data < v2data ? -1 : 1;
                            }
                        } else {
                            //console.log("% Not Date Objects: " + v1data + "|" + v2data);
                            if (v1data == v2data) {
                                return 0;
                            } else {
                                if (isNaN(v1data) && !isNaN(v2data)) {
                                    //console.log('val 1 was nan');
                                    return 1;
                                }
                                if (!isNaN(v1data) && isNaN(v2data)) {
                                    //console.log('val 2 was nan');
                                    return -1;
                                }
                                return v1data < v2data ? -1 : 1
                            }
                        }

                    }
                }]);
            }
        }, {
            type: 'close',
            tooltip: 'Clear Current View',
            handler: function() {
                this.up('grid').getStore().removeAll();
            }
        }, {
            type: 'refresh',
            tooltip: 'Refresh Current View',
            handler: function() {
                Ext.ComponentQuery.query('#PRVgetSelectedProjectsButton')[0].fireEvent('click');
            }
        }],
        selType: 'cellmodel',
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })],
    });

    win = Ext.create('widget.window', {
        title: 'USAN Web Cookbook RFQ Report View',
        width: rfqReportViewWidth,
        height: rfqReportViewHeight,
        resizable: true,
        modal: true,
        layout: 'border',
        autoScroll: true,
        bodyStyle: 'padding: 5px;',
        items: [rfqReportViewBottomPanel, rfqReportViewTopPanel, tree, rfqReportViewGrid],
        listeners: {
            beforeclose: function() {
                Ext.getBody().mask('Please wait...Refreshing Project Data');
                GLOBAL_currentController.getStore('ProjectInformationVitals').load({
                    callback: function (){
                        Ext.getBody().unmask();
                    }
                });
            }
        }
    });

    GLOBAL_currentController.getStore('Statuses').load({
        callback: function() {
            GLOBAL_currentController.getStore('Statuses').sort('type', 'ASC');
            GLOBAL_currentController.getStore('BusinessUnits').load({
                callback: function() {
                    GLOBAL_currentController.getStore('BusinessUnits').sort('name', 'ASC');
                    GLOBAL_currentController.getStore('Contacts').load({
                        callback: function() {
                            GLOBAL_currentController.getStore('Contacts').sort('name', 'ASC');
                            win.show();
                        }
                    });
                }
            });
        }
    })

}

function prvFormatDate(val) {
    if (Ext.isEmpty(val)) {
        return val;
    }

    pattern = /00:00:00/;
    if (pattern.test(val)) {
        var d1 = new Date(val);
        var curr_year = d1.getFullYear();

        var curr_month = d1.getMonth() + 1; //Months are zero based
        if (curr_month < 10) curr_month = "0" + curr_month;

        var curr_date = d1.getDate();
        if (curr_date < 10) curr_date = "0" + curr_date;

        var curr_hour = d1.getHours();
        if (curr_hour < 10) curr_hour = "0" + curr_hour;

        var curr_min = d1.getMinutes();
        if (curr_min < 10) curr_min = "0" + curr_min;

        var curr_sec = d1.getSeconds();
        if (curr_sec < 10) curr_sec = "0" + curr_sec;

        var newtimestamp = curr_month + "/" + curr_date + "/" + curr_year;
        return newtimestamp;
    } else {
        return val;
    }
}