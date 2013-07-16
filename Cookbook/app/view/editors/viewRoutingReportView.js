Ext.define('CookBook.view.editors.ViewRoutingReportView', {});

function launchRoutingReportView() {
    if (GLOBAL_projectCurrentlyOpen == true) {
        alert("Please close any open projects before requesting the Project Status Report View");
        return;
    }

    var routingReportViewHeight = 720; //window.screen.availHeight * .7;
    var routingReportViewWidth = 1200; //window.screen.availWidth * .9;
    if ((window.screen.availWidth * .9) > 1200) {
        routingReportViewWidth = window.screen.availWidth * .9;
    }

    Ext.define('routingReportViewGridModel', {
        extend: 'Ext.data.Model',
        idProperty: 'fakeID',
        fields: [{
            name: 'fakeID',
            type: 'int'
        }, {
            name: 'project_id',
            type: 'int'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'project_number',
            type: 'string'
        }, {
            name: 'project_name',
            type: 'string'
        }, {
            name: 'description',
            type: 'string'
        }, {
            name: 'prod_date',
            type: 'string'
        }, {
            name: 'dnis',
            type: 'string'
        }, {
            name: 'app',
            type: 'string'
        }, {
            name: 'platform',
            type: 'string'
        }]
    });

    var routingReportViewGridStore = Ext.create('Ext.data.Store', {
        model: 'routingReportViewGridModel',
        proxy: {
            type: 'ajax',
            actionMethods: {
                update: 'PUT',
                read: 'GET',
                destroy: 'DELETE',
                create: 'POST'
            },
            url: 'CommitRoutingReportView.ashx',
            reader: {
                type: 'json',
                root: 'results',
                idProperty: 'fakeID',
                id: 'fakeID'
            }
        }
    });

    var criteriaPanel = Ext.create('Ext.panel.Panel', {
        region: 'west',
        width: routingReportViewWidth * .328,
        //resizable: true,
        collapsible: true,
        frame: true,
        title: 'Routing Criteria',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            layout: {
                pack: 'center'
            },
            items: {
                xtype: 'label',
                html: '<b>Please Select Routing Criteria</b>'
            }
        }, {
            xtype: 'toolbar',
            dock: 'bottom',
            layout: {
                pack: 'center'
            },
            items: {
                text: 'Get Selected Projects',
                itemId: 'routingReportViewGetSelectedProjectsButton',
                listeners: {
                    click: function() {
                        jsonBlobToSubmit = "";
                        typesToSubmit = Ext.ComponentQuery.query('#routingReportViewDNISTypeCombo')[0].getValue();

                        if (Ext.isEmpty(typesToSubmit)) {
                            alert('Please select at least one valid criteria');
                            return;
                        }

                        jsonBlobToSubmit += "[T]" + typesToSubmit + "|";

                        doWeSubmitApplication = Ext.ComponentQuery.query('#routingReportViewAppCheckbox')[0].getValue();
                        doWeSubmitPlatform = Ext.ComponentQuery.query('#routingReportViewPlatformCheckbox')[0].getValue();
                        doWeSubmitDates = Ext.ComponentQuery.query('#routingReportViewDateCheckbox')[0].getValue();
                        doWeSubmitDNIS = Ext.ComponentQuery.query('#routingReportViewDNISCheckbox')[0].getValue();

                        if (doWeSubmitApplication == true) {
                            jsonBlobToSubmit += "|[A]" + Ext.ComponentQuery.query('#routingReportViewAppCombo')[0].getValue() + "|";
                        }

                        if (doWeSubmitPlatform == true) {
                            jsonBlobToSubmit += "|[P]" + Ext.ComponentQuery.query('#routingReportViewPlatformCombo')[0].getValue() + "|";
                        }

                        if (doWeSubmitDNIS == true) {
                            jsonBlobToSubmit += "|[D]" + Ext.ComponentQuery.query('#routingReportViewDNISTextfield')[0].getValue() + "|";
                        }

                        if (doWeSubmitDates == true) {
                            try {
                                if (!Ext.isEmpty(Ext.ComponentQuery.query('#routingReportViewDateStart')[0].getValue())) {
                                    jsonBlobToSubmit += "|[DS]" + Ext.Date.format(Ext.ComponentQuery.query('#routingReportViewDateStart')[0].getValue(), 'd-m-Y') + "|";
                                } else {
                                    jsonBlobToSubmit += "|[DS] 01-01-1901|"
                                }

                                if (!Ext.isEmpty(Ext.ComponentQuery.query('#routingReportViewDateEnd')[0].getValue())) {
                                    jsonBlobToSubmit += "[DE]" + Ext.Date.format(Ext.ComponentQuery.query('#routingReportViewDateEnd')[0].getValue(), 'd-m-Y') + "|";
                                } else {
                                    jsonBlobToSubmit += "|[DE] 01-01-2101|"
                                }
                            } catch (Exception) {
                                alert("invalid dates selected");
                                return;
                            }
                        }


                        console.log(jsonBlobToSubmit);
                        var jsonBlob = Ext.JSON.encode(jsonBlobToSubmit);
                        var grid = Ext.ComponentQuery.query('#routingReportViewGrid')[0];
                        var myMask = new Ext.LoadMask(grid.getEl(), {
                            msg: "Populating..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'RoutingReportView.ashx',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            jsonData: jsonBlob,
                            success: function(serverResponse) {
                                routingReportViewGridStore.removeAll();
                                var obj = Ext.decode(serverResponse.responseText);
                                if (obj.success == true) {
                                    var numRecords = obj.rows.length;
                                    Ext.ComponentQuery.query('#routingReportViewResultsCounter')[0].setText('<b>' + numRecords + " results found.</b>", false);
                                    for (x = 0; x < numRecords; x++) {
                                        //console.log(obj.rows[x].tc2);
                                        routingReportViewGridStore.add({
                                            fakeID: x + 1,
                                            project_id: obj.rows[x].project_id,
                                            project_number: obj.rows[x].project_number,
                                            project_name: obj.rows[x].project_name,
                                            type: obj.rows[x].type,
                                            app: obj.rows[x].app,
                                            description: obj.rows[x].description,
                                            prod_date: obj.rows[x].prod_date,
                                            dnis: obj.rows[x].dnis,
                                            platform: obj.rows[x].platform
                                        });
                                    }
                                }
                                Ext.ComponentQuery.query('#routingReportViewGrid')[0].getStore().sort([{
                                    sorterFn: function(v1, v2) {
                                        try {
                                            var v1data = Date.parse(v1.get('prod_date'));
                                            var v2data = Date.parse(v2.get('prod_date'));
                                        } catch (err) {
                                            var v1data = v1.get('prod_date');
                                            var v2data = v2.get('prod_date');
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
                            failure: function() {
                                alert("Routing population failed. Please contact Cookbook Admin.");
                                console.log(serverResponse);
                                myMask.hide();
                            }
                        });
                    }
                }
            }
        }],
        layout: {
            type: 'vbox',
            align: 'left'
        },
        items: [{
            xtype: 'panel',
            width: routingReportViewWidth * .32,
            layout: 'hbox',
            bodyborder: false,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 3,
            items: [{
                xtype: 'combobox',
                itemId: 'routingReportViewDNISTypeCombo',
                fieldLabel: 'DNIS type',
                store: {
                    fields: ['type'],
                    data: [{
                        'type': 'Add'
                    }, {
                        'type': 'Change'
                    }, {
                        'type': 'Remove'
                    }]
                },
                multiSelect: true,
                editable: false,
                displayField: 'type',
                valueField: 'type',
                allowBlank: true,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local',
                //value: 'Add, Change',
                flex: 8
            }]
        }, {
            xtype: 'panel',
            width: routingReportViewWidth * .32,
            layout: 'hbox',
            bodyborder: false,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 3,
            items: [{
                xtype: 'checkbox',
                itemId: 'routingReportViewAppCheckbox',
                flex: .5,
                listeners: {
                    change: function(eto, newVal, oldVal) {
                        if (newVal == true) {
                            Ext.ComponentQuery.query('#routingReportViewAppCombo')[0].enable();
                        } else {
                            Ext.ComponentQuery.query('#routingReportViewAppCombo')[0].disable();
                        }
                    }
                }
            }, {
                xtype: 'combobox',
                disabled: true,
                itemId: 'routingReportViewAppCombo',
                store: 'Applications',
                displayField: 'name',
                valueField: 'name',
                fieldLabel: 'Application',
                labelPad: 1,
                /*fieldDefaults: {
                    labelPad: 1
                },*/
                typeAhead: false,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local',
                value: '',
                emptyText: '',
                lastQuery: '',
                flex: 8
            }]
        }, {
            xtype: 'panel',
            width: routingReportViewWidth * .32,
            layout: 'hbox',
            bodyborder: false,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 3,
            items: [{
                xtype: 'checkbox',
                flex: .5,
                itemId: 'routingReportViewPlatformCheckbox',
                listeners: {
                    change: function(eto, newVal, oldVal) {
                        if (newVal == true) {
                            Ext.ComponentQuery.query('#routingReportViewPlatformCombo')[0].enable();
                        } else {
                            Ext.ComponentQuery.query('#routingReportViewPlatformCombo')[0].disable();
                        }
                    }
                }
            }, {
                xtype: 'combobox',
                disabled: true,
                itemId: 'routingReportViewPlatformCombo',
                store: 'Platforms',
                displayField: 'platform1',
                valueField: 'platform1',
                fieldLabel: 'Platform',
                labelPad: 1,
                /*fieldDefaults: {
                    labelPad: 1
                },*/
                typeAhead: false,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true,
                    loadMask: false
                },
                queryMode: 'local',
                value: '',
                emptyText: '',
                lastQuery: '',
                flex: 8
            }]
        }, {
            xtype: 'panel',
            width: routingReportViewWidth * .32,
            layout: 'hbox',
            bodyborder: false,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 3,
            items: [{
                xtype: 'checkbox',
                itemId: 'routingReportViewDateCheckbox',
                flex: .6,
                listeners: {
                    change: function(eto, newVal, oldVal) {
                        if (newVal == true) {
                            Ext.ComponentQuery.query('#routingReportViewDateStartLabel')[0].enable();
                            Ext.ComponentQuery.query('#routingReportViewDateStart')[0].enable();
                            Ext.ComponentQuery.query('#routingReportViewDateEndLabel')[0].enable();
                            Ext.ComponentQuery.query('#routingReportViewDateEnd')[0].enable();
                        } else {
                            Ext.ComponentQuery.query('#routingReportViewDateStartLabel')[0].disable();
                            Ext.ComponentQuery.query('#routingReportViewDateStart')[0].disable();
                            Ext.ComponentQuery.query('#routingReportViewDateEndLabel')[0].disable();
                            Ext.ComponentQuery.query('#routingReportViewDateEnd')[0].disable();
                        }
                    }
                }
            }, {
                xtype: 'label',
                html: 'Start:',
                itemId: 'routingReportViewDateStartLabel',
                disabled: true,
                flex: 1.5
            }, {
                xtype: 'datefield',
                itemId: 'routingReportViewDateStart',
                disabled: true,
                //labelPad: 1,
                //fieldLabel: 'Start',
                flex: 2.5
            }, {
                xtype: 'label',
                flex: 1.5
            }, {
                xtype: 'label',
                html: 'End:',
                itemId: 'routingReportViewDateEndLabel',
                disabled: true,
                flex: 1.5
            }, {
                xtype: 'datefield',
                itemId: 'routingReportViewDateEnd',
                disabled: true,
                //labelPad: 3,
                //fieldLabel: 'End',
                flex: 2.5
            }]
        }, {
            xtype: 'panel',
            width: routingReportViewWidth * .32,
            layout: 'hbox',
            bodyborder: false,
            frame: false,
            bodyStyle: 'background-color:#dfe8f5;',
            bodyPadding: 3,
            items: [{
                xtype: 'checkbox',
                flex: .5,
                itemId: 'routingReportViewDNISCheckbox',
                listeners: {
                    change: function(eto, newVal, oldVal) {
                        if (newVal == true) {
                            Ext.ComponentQuery.query('#routingReportViewDNISTextfield')[0].enable();
                        } else {
                            Ext.ComponentQuery.query('#routingReportViewDNISTextfield')[0].disable();
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                disabled: true,
                itemId: 'routingReportViewDNISTextfield',
                fieldLabel: 'DNIS',
                flex: 8
            }]
        }]
    });

    var routingReportViewTopPanel = Ext.create('Ext.form.Panel', {
        region: 'north',
        layout: 'hbox',
        height: routingReportViewHeight * .06,
        items: [{
            xtype: 'label',
            flex: 2,
            html: '<b><h2>Routing Status</h2></b>',
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
                    var gridToSearch = Ext.ComponentQuery.query('#routingReportViewGrid')[0];
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

    var routingReportViewBottomPanel = Ext.create('Ext.form.Panel', {
        region: 'south',
        layout: 'hbox',
        height: routingReportViewHeight * .06,
        items: [{
            xtype: 'button',
            //fieldLabel: 'Filter',
            text: 'Export Current View as XLS',
            margin: '5 5 5 5',
            flex: 2,
            handler: function() {
                if (routingReportViewGrid.getStore().getCount() < 1) {
                    alert('Please choose criteria and populate the Projects grid before exporting');
                    return;
                }
                var exportLocation = "\\\\nor2k3ops1\\e_drive\\Project Management\\Projects\\INT\\INT-551 Web Cookbook\\Routing Exports";
                Ext.MessageBox.prompt('Export Location', 'Please enter the <b>full network path</b> of the location you want to save the XLS to.', function(btn, txt) {
                    if (btn == 'ok') {
                        exportLocation = txt;
                        var recsToEncode = new Array();
                        console.log("Store count: " + routingReportViewGrid.getStore().getCount());
                        for (var i = 0; i < routingReportViewGrid.getStore().getCount(); i++) {
                            var currRec = routingReportViewGrid.getStore().getAt(i);
                            recsToEncode.push({
                                project_id: currRec.data.project_id,
                                project_number: currRec.data.project_number,
                                project_name: currRec.data.project_name,
                                type: currRec.data.type,
                                app: currRec.data.app,
                                description: currRec.data.description,
                                prod_date: currRec.data.prod_date,
                                dnis: currRec.data.dnis,
                                platform: currRec.data.platform
                            });
                        }
                        console.log(recsToEncode);
                        var jsonBlob = Ext.JSON.encode(recsToEncode);
                        var grid = Ext.ComponentQuery.query('#routingReportViewGrid')[0];
                        var myMask = new Ext.LoadMask(grid.getEl(), {
                            msg: "Exporting..."
                        });
                        myMask.show();
                        Ext.Ajax.request({
                            url: 'ExportRoutingReportView.ashx',
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
                if (routingReportViewGrid.getStore().getCount() < 1) {
                    alert('Please choose criteria and populate the Projects grid before opening the Printer Friendly View');
                    return;
                }
                Ext.ux.grid.Printer.mainTitle = 'Routing Report View - Print View'; //optional
                Ext.ux.grid.Printer.print(routingReportViewGrid);
            }
        }, {
            xtype: 'label',
            flex: 10,
            margin: '5 5 5 5'
        }, {
            xtype: 'label',
            itemId: 'routingReportViewResultsCounter',
            html: '',
            flex: 2,
            margin: '5 5 5 5'
        }]
    });


    function columnWrap(val) {
        return '<div style="white-space:normal !important;">' + val + '</div>';
    }

    var routingReportViewGrid = Ext.create('Ext.grid.Panel', {
        region: 'center',
        itemId: 'routingReportViewGrid',
        title: 'Projects',
        store: routingReportViewGridStore,
        stripeRows: true,
        columns: [{
            header: 'Type',
            dataIndex: 'type',
            flex: 1
        }, {
            header: 'APP',
            dataIndex: 'app',
            renderer: columnWrap,
            flex: 2
        }, {
            header: 'Project Number',
            dataIndex: 'project_number',
            renderer: columnWrap,
            flex: 1.3
        }, {
            header: 'Project Name',
            dataIndex: 'project_name',
            editor: {
                xtype: 'textarea'
            },
            renderer: columnWrap,
            flex: 1.5
        }, {
            header: 'Description',
            dataIndex: 'description',
            renderer: columnWrap,
            flex: 1.5
        }, {
            header: 'Prod Rtg Date',
            dataIndex: 'prod_date',
            renderer: columnWrap,
            flex: 1.5
        }, {
            header: 'DNIS',
            dataIndex: 'dnis',
            renderer: columnWrap,
            flex: 2
        }, {
            header: 'Platform',
            dataIndex: 'platform',
            renderer: columnWrap,
            flex: 1
        }],
        tools: [{
            type: 'close',
            tooltip: 'Clear Current View',
            handler: function() {
                this.up('grid').getStore().removeAll();
            }
        }, {
            type: 'refresh',
            tooltip: 'Refresh Current View',
            handler: function() {
                Ext.ComponentQuery.query('#routingReportViewGetSelectedProjectsButton')[0].fireEvent('click');
            }
        }, {
            type: 'search',
            tooltip: 'True Sort by Prod Rtg Date',
            handler: function() {
                Ext.ComponentQuery.query('#routingReportViewGrid')[0].getStore().sort([{
                    sorterFn: function(v1, v2) {
                        try {
                            var v1data = Date.parse(v1.get('prod_date'));
                            var v2data = Date.parse(v2.get('prod_date'));
                        } catch (err) {
                            var v1data = v1.get('prod_date');
                            var v2data = v2.get('prod_date');
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
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'USAN Web Cookbook Routing Report View',
        width: routingReportViewWidth,
        height: routingReportViewHeight,
        resizable: true,
        modal: true,
        layout: 'border',
        autoScroll: true,
        bodyStyle: 'padding: 5px;',
        items: [routingReportViewBottomPanel, routingReportViewTopPanel, criteriaPanel, routingReportViewGrid],
        listeners: {
            beforeclose: function() {

            },
            afterrender: function() {
                console.log('afterrender');
                Ext.ComponentQuery.query('#routingReportViewDNISTypeCombo')[0].select(['Add', 'Change']);
            }
        }
    });

    GLOBAL_currentController.getStore('Platforms').load({
        callback: function() {
            GLOBAL_currentController.getStore('Platforms').sort('name', 'ASC');
            GLOBAL_currentController.getStore('Applications').load({
                callback: function() {
                    GLOBAL_currentController.getStore('Applications').sort('name', 'ASC');
                    win.show();
                }
            });
        }
    });

}