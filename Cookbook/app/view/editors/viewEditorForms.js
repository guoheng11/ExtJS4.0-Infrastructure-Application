Ext.define('CookBook.view.editors.ViewEditorForms', {});

/*****************************************
 ***** Editor for Applications table ******
 *****************************************/

function openApplicationsEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    appWriterStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddApplications.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    appRemovalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveApplications.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Application List',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Applications',
        columns: [{
            header: 'Name (.APP)',
            width: 170,
            dataIndex: 'name',
            editor: {
                xtype: 'textfield'
            },
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    name = name.substring(0, name.length - 4);
                    changePanel.down('#appEditorName').setValue(name);
                    var Product = grid.getStore().getAt(rowIndex).get('Product');
                    var Division = grid.getStore().getAt(rowIndex).get('Division');
                    var Platform = grid.getStore().getAt(rowIndex).get('Platform');
                    var ServiceID = grid.getStore().getAt(rowIndex).get('ServiceID');
                    var appID = grid.getStore().getAt(rowIndex).get('applications_id');
                    changePanel.down('#appEditorAppID').setValue(appID);
                    changePanel.down('#appEditorProduct').setValue(Product);
                    changePanel.down('#appEditorDivision').setValue(Division);
                    changePanel.down('#appEditorPlatform').setValue(Platform);
                    changePanel.down('#appEditorServiceID').setValue(ServiceID);
                }
            }
        }, {
            header: 'Base Name',
            width: 100,
            dataIndex: 'base_name',
            editor: {
                xtype: 'textfield'
            },
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('base_name');
                    changePanel.down('#appEditorName').setValue(name);
                    var Product = grid.getStore().getAt(rowIndex).get('Product');
                    var Division = grid.getStore().getAt(rowIndex).get('Division');
                    var Platform = grid.getStore().getAt(rowIndex).get('Platform');
                    var ServiceID = grid.getStore().getAt(rowIndex).get('ServiceID');
                    var appID = grid.getStore().getAt(rowIndex).get('applications_id');
                    changePanel.down('#appEditorAppID').setValue(appID);
                    changePanel.down('#appEditorProduct').setValue(Product);
                    changePanel.down('#appEditorDivision').setValue(Division);
                    changePanel.down('#appEditorPlatform').setValue(Platform);
                    changePanel.down('#appEditorServiceID').setValue(ServiceID);
                }
            }
        }, {
            header: 'Product',
            width: 100,
            dataIndex: 'Product',
            editor: {
                xtype: 'textfield'
            },
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('base_name');
                    changePanel.down('#appEditorName').setValue(name);
                    var Product = grid.getStore().getAt(rowIndex).get('Product');
                    var Division = grid.getStore().getAt(rowIndex).get('Division');
                    var Platform = grid.getStore().getAt(rowIndex).get('Platform');
                    var ServiceID = grid.getStore().getAt(rowIndex).get('ServiceID');
                    var appID = grid.getStore().getAt(rowIndex).get('applications_id');
                    changePanel.down('#appEditorAppID').setValue(appID);
                    changePanel.down('#appEditorProduct').setValue(Product);
                    changePanel.down('#appEditorDivision').setValue(Division);
                    changePanel.down('#appEditorPlatform').setValue(Platform);
                    changePanel.down('#appEditorServiceID').setValue(ServiceID);
                }
            }
        }, {
            header: 'Division',
            width: 100,
            dataIndex: 'Division',
            editor: {
                xtype: 'textfield'
            },
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('base_name');
                    changePanel.down('#appEditorName').setValue(name);
                    var Product = grid.getStore().getAt(rowIndex).get('Product');
                    var Division = grid.getStore().getAt(rowIndex).get('Division');
                    var Platform = grid.getStore().getAt(rowIndex).get('Platform');
                    var ServiceID = grid.getStore().getAt(rowIndex).get('ServiceID');
                    var appID = grid.getStore().getAt(rowIndex).get('applications_id');
                    changePanel.down('#appEditorAppID').setValue(appID);
                    changePanel.down('#appEditorProduct').setValue(Product);
                    changePanel.down('#appEditorDivision').setValue(Division);
                    changePanel.down('#appEditorPlatform').setValue(Platform);
                    changePanel.down('#appEditorServiceID').setValue(ServiceID);
                }
            }
        }, {
            header: 'Platform',
            width: 100,
            dataIndex: 'Platform',
            editor: {
                xtype: 'textfield'
            },
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('base_name');
                    changePanel.down('#appEditorName').setValue(name);
                    var Product = grid.getStore().getAt(rowIndex).get('Product');
                    var Division = grid.getStore().getAt(rowIndex).get('Division');
                    var Platform = grid.getStore().getAt(rowIndex).get('Platform');
                    var ServiceID = grid.getStore().getAt(rowIndex).get('ServiceID');
                    var appID = grid.getStore().getAt(rowIndex).get('applications_id');
                    changePanel.down('#appEditorAppID').setValue(appID);
                    changePanel.down('#appEditorProduct').setValue(Product);
                    changePanel.down('#appEditorDivision').setValue(Division);
                    changePanel.down('#appEditorPlatform').setValue(Platform);
                    changePanel.down('#appEditorServiceID').setValue(ServiceID);
                }
            }
        }, {
            header: 'Service ID',
            width: 100,
            dataIndex: 'ServiceID',
            editor: {
                xtype: 'textfield'
            },
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('base_name');
                    changePanel.down('#appEditorName').setValue(name);
                    var Product = grid.getStore().getAt(rowIndex).get('Product');
                    var Division = grid.getStore().getAt(rowIndex).get('Division');
                    var Platform = grid.getStore().getAt(rowIndex).get('Platform');
                    var ServiceID = grid.getStore().getAt(rowIndex).get('ServiceID');
                    var appID = grid.getStore().getAt(rowIndex).get('applications_id');
                    changePanel.down('#appEditorAppID').setValue(appID);
                    changePanel.down('#appEditorProduct').setValue(Product);
                    changePanel.down('#appEditorDivision').setValue(Division);
                    changePanel.down('#appEditorPlatform').setValue(Platform);
                    changePanel.down('#appEditorServiceID').setValue(ServiceID);

                }
            }
        }],
        listeners: {
            itemcontextmenu: function(grid, record, item, index, event) {
                event.stopEvent();
                var menu = Ext.create('Ext.menu.Menu', {
                    items: [{
                        text: 'Refresh',
                        handler: function() {
                            var store = GLOBAL_currentController.getController('Cookbook').getStore('Applications');
                            store.removeAll();
                            store.load();
                        }
                    }]
                });
                menu.showAt(event.xy);
            }
        },
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            itemId: 'appEditorName',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Base Application Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'appEditorProduct',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Product',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'appEditorDivision',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Division',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'appEditorPlatform',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Platform',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'appEditorServiceID',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'ServiceID',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'appEditorAppID',
            hidden: true
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var valueBox = this.up().down('#appEditorName');
                var valueBox2 = this.up().down('#appEditorProduct');
                var valueBox3 = this.up().down('#appEditorDivision');
                var valueBox4 = this.up().down('#appEditorPlatform');
                var valueBox5 = this.up().down('#appEditorServiceID');
                var appName = valueBox.getValue();
                var product = this.up().down('#appEditorProduct').getValue();
                var division = this.up().down('#appEditorDivision').getValue();
                var platform = this.up().down('#appEditorPlatform').getValue();
                var serviceid = this.up().down('#appEditorServiceID').getValue();


                if (appName == "") {
                    alert("You must enter a name for the application you want to add");
                    return;
                }

                if (appName.match(/\./)) {
                    alert("Please enter only the application's name without the file extension");
                    return;
                }

                if (gridPanel.getStore().find('base_name', appName, 0, false, false, true) != -1) {
                    alert("That application already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + appName + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            //gridPanel.store.add({'name': appName + ".APP", 'base_name': appName});
                            //gridPanel.store.sync();
                            appWriterStore.proxy.extraParams.applications_id = 'add';
                            appWriterStore.proxy.extraParams.application = appName;
                            appWriterStore.proxy.extraParams.product = product;
                            appWriterStore.proxy.extraParams.division = division;
                            appWriterStore.proxy.extraParams.platform = platform;
                            appWriterStore.proxy.extraParams.serviceid = serviceid;

                            appWriterStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(appName + " successfully added");
                                    } else {
                                        alert("Couldn't add the new application");
                                    }
                                }
                            });
                            valueBox.setValue('');
                            valueBox2.setValue('');
                            valueBox3.setValue('');
                            valueBox4.setValue('');
                            valueBox5.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            margin: '0 0 10 10',
            handler: function() {
                var valueBox = this.up().down('#appEditorName');
                var valueBox2 = this.up().down('#appEditorProduct');
                var valueBox3 = this.up().down('#appEditorDivision');
                var valueBox4 = this.up().down('#appEditorPlatform');
                var valueBox5 = this.up().down('#appEditorServiceID');
                var valueBox6 = this.up().down('#appEditorAppID');
                var appName = valueBox.getValue();
                var product = this.up().down('#appEditorProduct').getValue();
                var division = this.up().down('#appEditorDivision').getValue();
                var platform = this.up().down('#appEditorPlatform').getValue();
                var serviceid = this.up().down('#appEditorServiceID').getValue();
                var appID = this.up().down('#appEditorAppID').getValue();

                if (appName == "") {
                    alert("You must enter a name for the application you want to edit");
                    return;
                }

                if (appName.match(/\./)) {
                    alert("Please enter only the application's name without the file extension");
                    return;
                }


                if (gridPanel.getStore().find('applications_id', appID, 0, false, false, true) != -1) {
                    var existingRecord = gridPanel.getStore().findRecord('applications_id', appID);
                    if (existingRecord.get('base_name') != appName) {
                        if (gridPanel.getStore().find('base_name', appName, 0, false, false, true) != -1) {
                            alert("The application name you are trying to edit to already exists!");
                            return;
                        }
                    }
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want these edits for \"' + appName + '\"?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            appWriterStore.proxy.extraParams.applications_id = appID;
                            appWriterStore.proxy.extraParams.application = appName;
                            appWriterStore.proxy.extraParams.product = product;
                            appWriterStore.proxy.extraParams.division = division;
                            appWriterStore.proxy.extraParams.platform = platform;
                            appWriterStore.proxy.extraParams.serviceid = serviceid;

                            appWriterStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(appName + " successfully edited");
                                    } else {
                                        alert("Couldn't edit the contact");
                                    }
                                }
                            });
                            valueBox.setValue('');
                            valueBox2.setValue('');
                            valueBox3.setValue('');
                            valueBox4.setValue('');
                            valueBox5.setValue('');
                            valueBox6.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var valueBox = this.up().down('textfield');
                var appName = valueBox.getValue();
                if (appName == "") {
                    alert("You must enter a name for the application you want to remove");
                    return;
                }

                if (appName.match(/\./)) {
                    alert("Please enter only the application's name without the file extension");
                    return;
                }

                if (gridPanel.getStore().find('base_name', appName, 0, false, false, true) == -1) {
                    alert("That application doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + appName + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            //var id = gridPanel.getStore().find('base_name', appName, 0, false, false, true);
                            //gridPanel.getStore().removeAt(id);

                            appRemovalStore.proxy.extraParams.application = appName;
                            appRemovalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(appName + " successfully removed");
                                    } else {
                                        alert("Couldn't delete application");
                                    }
                                }
                            });

                            valueBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Applications Editor',
        width: 900,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/*****************************************
 ***** Editor for BusinessUnit table  *****
 *****************************************/

function openBusinessUnitEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddBusinessUnit.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveBusinessUnit.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Business Units',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'BusinessUnits',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('combobox').setValue(company);
                }
            }
        }, {
            header: 'Company',
            width: 100,
            dataIndex: 'company_name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('combobox').setValue(company);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Business Unit Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'combobox',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Company',
            margin: '5 0 10 10',
            store: 'Companies',
            typeAhead: false,
            displayField: 'company_name',
            valueField: 'company_name',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                //minHeight: 128,
                //maxHeight: 512,
                autoHeight: true
            },
            queryMode: 'local'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('textfield');
                var companyBox = this.up().down('combobox');

                var buName = nameBox.getValue();
                var companyName = companyBox.getValue();

                if (buName == "") {
                    alert("You must enter a name for the business unit you want to add");
                    return;
                }

                if (companyName == "" || companyName == null) {
                    alert("You must enter the name of the company to which the business unit belongs.  Select one from the drop box");
                    return;
                }

                if (gridPanel.getStore().find('name', buName, 0, false, false, true) != -1) {
                    alert("That business unit already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + buName + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = buName;
                            writerStore.proxy.extraParams.company_name = companyName;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(buName + " successfully added");
                                    } else {
                                        alert("Couldn't add the new business unit");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            companyBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('textfield');
                var companyBox = this.up().down('combobox');

                var buName = nameBox.getValue();
                var companyName = companyBox.getValue();

                if (buName == "") {
                    alert("You must enter a name for the business unit you want to remove");
                    return;
                }

                if (gridPanel.getStore().find('name', buName, 0, false, false, true) == -1) {
                    alert("That business unit doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + buName + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = buName;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(buName + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the business unit");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            companyBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Business Unit Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}

function openCompanyEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddCompany.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveCompany.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Company List',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Companies',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'company_name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('textfield').setValue(company);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Company Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var companyBox = this.up().down('textfield');

                var companyName = companyBox.getValue();

                if (companyName == "" || companyName == null) {
                    alert("You must enter the name of the company you want to add.");
                    return;
                }

                if (gridPanel.getStore().find('company_name', companyName, 0, false, false, true) != -1) {
                    alert("That company already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + companyName + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.company_name = companyName;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(buName + " successfully added");
                                    } else {
                                        alert("Couldn't add the new company");
                                    }
                                }
                            });

                            companyBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var companyBox = this.up().down('textfield');

                var companyName = companyBox.getValue();

                if (gridPanel.getStore().find('company_name', companyName, 0, false, false, true) == -1) {
                    alert("That company doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + companyName + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.company_name = companyName;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(buName + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the business unit");
                                    }
                                }
                            });

                            companyBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Company Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}





/*****************************************
 ***** Editor for Contacts table  *****
 *****************************************/

function openContactsEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddContact.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveContact.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Contact List',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Contacts',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('#company').setValue(company);
                    var email = grid.getStore().getAt(rowIndex).get('email1');
                    changePanel.down('#email').setValue(email);
                    var title = grid.getStore().getAt(rowIndex).get('title');
                    changePanel.down('#title').setValue(title);
                    var phone = grid.getStore().getAt(rowIndex).get('phone');
                    changePanel.down('#phone').setValue(phone);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var contactID = grid.getStore().getAt(rowIndex).get('contact_id');
                    changePanel.down('#contactID').setValue(contactID);
                }
            }
        }, {
            header: 'Type',
            width: 100,
            dataIndex: 'type',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('#company').setValue(company);
                    var email = grid.getStore().getAt(rowIndex).get('email1');
                    changePanel.down('#email').setValue(email);
                    var title = grid.getStore().getAt(rowIndex).get('title');
                    changePanel.down('#title').setValue(title);
                    var phone = grid.getStore().getAt(rowIndex).get('phone');
                    changePanel.down('#phone').setValue(phone);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var contactID = grid.getStore().getAt(rowIndex).get('contact_id');
                    changePanel.down('#contactID').setValue(contactID);
                }
            }
        }, {
            header: 'Company',
            width: 100,
            dataIndex: 'company_name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('#company').setValue(company);
                    var email = grid.getStore().getAt(rowIndex).get('email1');
                    changePanel.down('#email').setValue(email);
                    var title = grid.getStore().getAt(rowIndex).get('title');
                    changePanel.down('#title').setValue(title);
                    var phone = grid.getStore().getAt(rowIndex).get('phone');
                    changePanel.down('#phone').setValue(phone);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var contactID = grid.getStore().getAt(rowIndex).get('contact_id');
                    changePanel.down('#contactID').setValue(contactID);
                }
            }
        }, {
            header: 'Email',
            width: 100,
            dataIndex: 'email1',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('#company').setValue(company);
                    var email = grid.getStore().getAt(rowIndex).get('email1');
                    changePanel.down('#email').setValue(email);
                    var title = grid.getStore().getAt(rowIndex).get('title');
                    changePanel.down('#title').setValue(title);
                    var phone = grid.getStore().getAt(rowIndex).get('phone');
                    changePanel.down('#phone').setValue(phone);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var contactID = grid.getStore().getAt(rowIndex).get('contact_id');
                    changePanel.down('#contactID').setValue(contactID);
                }
            }
        }, {
            header: 'Title',
            width: 100,
            dataIndex: 'title',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('#company').setValue(company);
                    var email = grid.getStore().getAt(rowIndex).get('email1');
                    changePanel.down('#email').setValue(email);
                    var title = grid.getStore().getAt(rowIndex).get('title');
                    changePanel.down('#title').setValue(title);
                    var phone = grid.getStore().getAt(rowIndex).get('phone');
                    changePanel.down('#phone').setValue(phone);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var contactID = grid.getStore().getAt(rowIndex).get('contact_id');
                    changePanel.down('#contactID').setValue(contactID);
                }
            }
        }, {
            header: 'Phone',
            width: 100,
            dataIndex: 'phone',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    var company = grid.getStore().getAt(rowIndex).get('company_name');
                    changePanel.down('#company').setValue(company);
                    var email = grid.getStore().getAt(rowIndex).get('email1');
                    changePanel.down('#email').setValue(email);
                    var title = grid.getStore().getAt(rowIndex).get('title');
                    changePanel.down('#title').setValue(title);
                    var phone = grid.getStore().getAt(rowIndex).get('phone');
                    changePanel.down('#phone').setValue(phone);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var contactID = grid.getStore().getAt(rowIndex).get('contact_id');
                    changePanel.down('#contactID').setValue(contactID);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            itemId: 'name',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Contact\'s name',
            margin: '5 0 10 10'
        }, {
            xtype: 'combobox',
            itemId: 'type',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Contact Type (Role)',
            margin: '5 0 10 10',
            store: 'ContactTypes',
            typeAhead: false,
            displayField: 'type',
            valueField: 'type',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                //minHeight: 128,
                //maxHeight: 512,
                autoHeight: true
            },
            queryMode: 'local'
        }, {
            xtype: 'combobox',
            itemId: 'company',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Company',
            margin: '5 0 10 10',
            store: 'Companies',
            typeAhead: false,
            displayField: 'company_name',
            valueField: 'company_name',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                //minHeight: 128,
                //maxHeight: 512,
                autoHeight: true
            },
            queryMode: 'local'
        }, {
            xtype: 'textfield',
            itemId: 'email',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Contact\'s email address',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'title',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Contact\'s title',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'phone',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Contact\'s phone number',
            margin: '5 0 10 10'
        }, {
            xtype: 'hiddenfield',
            itemId: 'currentRow',
            width: 170
        }, {
            xtype: 'hiddenfield',
            itemId: 'contactID',
            width: 170
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('#name');
                var typeBox = this.up().down('#type');
                var companyBox = this.up().down('#company');
                var emailBox = this.up().down('#email');
                var titleBox = this.up().down('#title');
                var phoneBox = this.up().down('#phone');

                var name = nameBox.getValue();
                var type = typeBox.getValue();
                var company = companyBox.getValue();
                var email = emailBox.getValue();
                var title = titleBox.getValue();
                var phone = phoneBox.getValue();


                if (name == "") {
                    alert("You must enter a name for the contact you want to add");
                    return;
                }

                /*if (type == "" || type == null) {
                 alert("You must enter the contact's role (or type).  Please select one from the drop box");
                 return;
                 } (smm) type is no longer mandatory */
                if (company == "" || company == null) {
                    alert("You must enter the contact's company.  Please select one from the drop box");
                    return;
                }

                if (email == "") {
                    alert("You must enter the email address for the contact you want to add");
                    return;
                }

                if (!email.match('@')) {
                    alert("Email addresses must have the @ symbol, e.g. john.doe@usan.com");
                    return;
                }

                if (gridPanel.getStore().find('email1', email, 0, false, false, true) != -1) {
                    alert("A contact for that email address already exists!");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("A contact with that name already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + ' (' + email + ')?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.proxy.extraParams.type = type;
                            writerStore.proxy.extraParams.company_name = company;
                            writerStore.proxy.extraParams.email = email;
                            writerStore.proxy.extraParams.title = title;
                            writerStore.proxy.extraParams.phone = phone;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " (" + email + ") successfully added");
                                    } else {
                                        alert("Couldn't add the new contact");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                            companyBox.setValue('');
                            emailBox.setValue('');
                            titleBox.setValue('');
                            phoneBox.setValue('');

                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('#name');
                var typeBox = this.up().down('#type');
                var companyBox = this.up().down('#company');
                var emailBox = this.up().down('#email');
                var titleBox = this.up().down('#title');
                var phoneBox = this.up().down('#phone');

                var email = emailBox.getValue();

                if (email == "") {
                    alert("You must enter the email address for the contact you want to delete");
                    return;
                }

                var index = gridPanel.getStore().find('email1', email, 0, false, false, true);
                if (index == -1) {
                    alert("There are no contacts with that email address!");
                    return;
                }

                var name = gridPanel.getStore().getAt(index).get("name");

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + ' (' + email + ')?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.proxy.extraParams.email = email;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " (" + email + ") successfully removed");
                                    } else {
                                        alert("Couldn't delete the contact");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                            companyBox.setValue('');
                            emailBox.setValue('');
                            titleBox.setValue('');
                            phoneBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('#name');
                var typeBox = this.up().down('#type');
                var companyBox = this.up().down('#company');
                var emailBox = this.up().down('#email');
                var titleBox = this.up().down('#title');
                var phoneBox = this.up().down('#phone');
                var rowBox = this.up().down('#currentRow');
                var idBox = this.up().down('#contactID');

                var name = nameBox.getValue();
                var type = typeBox.getValue();
                var company = companyBox.getValue();
                var email = emailBox.getValue();
                var title = titleBox.getValue();
                var phone = phoneBox.getValue();

                var currentRow = rowBox.getValue();
                var contactID = idBox.getValue();


                if (name == "") {
                    alert("You must enter a name for the contact you want to edit");
                    return;
                }

                /*if (type == "" || type == null) {
                 alert("You must enter the contact's role (or type).  Please select one from the drop box");
                 return;
                 } (smm) type is no longer mandatory */
                if (company == "" || company == null) {
                    alert("You must enter the contact's company.  Please select one from the drop box");
                    return;
                }

                if (email == "") {
                    alert("You must enter the email address for the contact you want to edit");
                    return;
                }

                if (!email.match('@')) {
                    alert("Email addresses must have the @ symbol, e.g. john.doe@usan.com");
                    return;
                }

                if (gridPanel.getStore().find('email1', email, 0, false, false, true) != -1) {
                    //since this email exists, make sure it belongs to the person we're editing .. if not, don't allow the user to continue
                    if (gridPanel.getStore().getAt(currentRow).get('email1') != email) {
                        alert('A contact with this email address ( ' + email + ' ) already exists.');
                        return;
                    }
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want these edits for ' + name + ' (' + email + ')?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.proxy.extraParams.type = type;
                            writerStore.proxy.extraParams.company_name = company;
                            writerStore.proxy.extraParams.email = email;
                            writerStore.proxy.extraParams.title = title;
                            writerStore.proxy.extraParams.phone = phone;
                            writerStore.proxy.extraParams.contact_id = contactID;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " (" + email + ") successfully edited");
                                    } else {
                                        alert("Couldn't edit the contact");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                            companyBox.setValue('');
                            emailBox.setValue('');
                            titleBox.setValue('');
                            phoneBox.setValue('');
                            writerStore.proxy.extraParams.contact_id = null;
                            rowBox.setValue('');
                            idBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Contacts Editor',
        width: 1000,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
    //determine if this store has anything in it first .. if not, load it

    //check types
    if (GLOBAL_currentController.getStore('ContactTypes').getCount() == 0) {
        GLOBAL_currentController.getStore('ContactTypes').load();
    }

    //check companies
    if (GLOBAL_currentController.getStore('Companies').getCount() == 0) {
        GLOBAL_currentController.getStore('Companies').load();
    }

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }


}




/*****************************************
 ***** Editor for StatusType table  ****
 *****************************************/

function openStatusTypeEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddStatusType.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveStatusType.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Project Statuses',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Statuses',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'type',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('textfield').setValue(type);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Status Type',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var status = textBox.getValue();

                if (status == "") {
                    alert("You must enter the project status you want to add.");
                    return;
                }

                if (gridPanel.getStore().find('type', status, 0, false, false, true) != -1) {
                    alert("That status already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add the following status?  "' + status + '"',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.type = status;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert("Status successfully added");
                                    } else {
                                        alert("Couldn't add the new status");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var status = textBox.getValue();

                if (status == "") {
                    alert("You must enter the status you want to remove");
                    return;
                }

                if (gridPanel.getStore().find('type', status, 0, false, false, true) == -1) {
                    alert("That status doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete this status?  "' + status + '"',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.type = status;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert("Status successfully removed");
                                    } else {
                                        alert("Couldn't delete the status");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Project Status Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}





/*****************************************
 ***** Editor for ExtdbTable table     ****
 *****************************************/

function openExtdbTableEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddExtdbTable.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveExtdbTable.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Extdb Tables',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'ExtdbTables',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var type = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(type);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var id = grid.getStore().getAt(rowIndex).get('extdb_table_id');
                    changePanel.down('#id').setValue(id);
                }
            }
        }, {
            header: 'Type',
            width: 170,
            dataIndex: 'type',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var type = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('#name').setValue(type);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('#type').setValue(type);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var id = grid.getStore().getAt(rowIndex).get('extdb_table_id');
                    changePanel.down('#id').setValue(id);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            itemId: 'name',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Table Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'textfield',
            itemId: 'type',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Table Type',
            margin: '5 0 10 10'
        }, {
            xtype: 'hiddenfield',
            itemId: 'currentRow',
            width: 170
        }, {
            xtype: 'hiddenfield',
            itemId: 'id',
            width: 170
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('#name');
                var typeBox = this.up().down('#type');

                var name = nameBox.getValue();
                var type = typeBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the table you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That table already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.proxy.extraParams.type = type;
                            writerStore.proxy.extraParams.edit = null;
                            writerStore.proxy.extraParams.id = null;

                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new table");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');

                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('#name');
                var typeBox = this.up().down('#type');


                var name = nameBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the table you want to remove.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That table doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + ' successfully removed');
                                    } else {
                                        alert("Couldn't delete the table");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('#name');
                var typeBox = this.up().down('#type');
                var rowBox = this.up().down('#currentRow');
                var idBox = this.up().down('#id');


                var name = nameBox.getValue();
                var type = typeBox.getValue();
                var id = idBox.getValue();

                var currentRow = rowBox.getValue();

                if (name == "") {
                    alert("You must enter a name for the table you want to edit");
                    return;
                }

                /*if (type == "" || type == null) {
                 alert("You must enter the contact's role (or type).  Please select one from the drop box");
                 return;
                 } (smm) type is no longer mandatory */
                /*  
                 if (gridPanel.getStore().find('email1', email, 0, false, false, true) != -1) {
                 //since this email exists, make sure it belongs to the person we're editing .. if not, don't allow the user to continue
                 if (gridPanel.getStore().getAt(currentRow).get('email1') != email) {
                 alert('A contact with this email address ( ' + email + ' ) already exists.');
                 return;
                 }
                 }*/
                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want these edits for ' + name + ' (' + type + ')?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.proxy.extraParams.type = type;
                            writerStore.proxy.extraParams.edit = 'true';
                            writerStore.proxy.extraParams.id = id;

                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " (" + type + ") successfully edited");
                                    } else {
                                        alert("Couldn't edit the table");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                            rowBox.setValue('');
                            idBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Extb Table Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}





/*****************************************
 ***** Editor for Scrapers table      *****
 *****************************************/

function openScraperEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddScraper.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveScraper.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Scraper List',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Scrapers',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('combobox').setValue(type);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var id = grid.getStore().getAt(rowIndex).get('scraper_id');
                    changePanel.down('#id').setValue(id);
                }
            }
        }, {
            header: 'Type',
            width: 100,
            dataIndex: 'type',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                    var type = grid.getStore().getAt(rowIndex).get('type');
                    changePanel.down('combobox').setValue(type);
                    changePanel.down('#currentRow').setValue(rowIndex);
                    var id = grid.getStore().getAt(rowIndex).get('scraper_id');
                    changePanel.down('#id').setValue(id);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Scraper Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'combobox',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Scraper Type',
            margin: '5 0 10 10',
            store: 'ScraperTypes',
            typeAhead: false,
            displayField: 'type',
            valueField: 'type',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                //minHeight: 128,
                //maxHeight: 512,
                autoHeight: true
            },
            queryMode: 'local'
        }, {
            xtype: 'hiddenfield',
            itemId: 'currentRow',
            width: 170
        }, {
            xtype: 'hiddenfield',
            itemId: 'id',
            width: 170
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('textfield');
                var typeBox = this.up().down('combobox');

                var name = nameBox.getValue();
                var type = typeBox.getValue();

                if (name == "") {
                    alert("You must enter a name for the scraper you want to add");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That scraper already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.proxy.extraParams.type = type;
                            writerStore.proxy.extraParams.edit = null;
                            writerStore.proxy.extraParams.id = null;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new scraper");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('textfield');
                var typeBox = this.up().down('combobox');

                var name = nameBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the scraper you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That scraper doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the scraper");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Edit',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('textfield');
                var typeBox = this.up().down('combobox');
                var idBox = this.up().down('#id');
                var rowBox = this.up().down('#currentRow');


                var name = nameBox.getValue();
                var type = typeBox.getValue();
                var id = idBox.getValue();

                var currentRow = rowBox.getValue();

                if (name == "") {
                    alert("You must enter a name for the scraper you want to edit");
                    return;
                }

                /*if (type == "" || type == null) {
                 alert("You must enter the contact's role (or type).  Please select one from the drop box");
                 return;
                 } (smm) type is no longer mandatory */
                /*  
                 if (gridPanel.getStore().find('email1', email, 0, false, false, true) != -1) {
                 //since this email exists, make sure it belongs to the person we're editing .. if not, don't allow the user to continue
                 if (gridPanel.getStore().getAt(currentRow).get('email1') != email) {
                 alert('A contact with this email address ( ' + email + ' ) already exists.');
                 return;
                 }
                 }*/
                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want these edits for ' + name + ' (' + type + ')?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.proxy.extraParams.type = type;
                            writerStore.proxy.extraParams.edit = 'true';
                            writerStore.proxy.extraParams.id = id;

                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " (" + type + ") successfully edited");
                                    } else {
                                        alert("Couldn't edit the scraper");
                                    }
                                }
                            });

                            nameBox.setValue('');
                            typeBox.setValue('');
                            rowBox.setValue('');
                            idBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Scraper Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    changePanel.down('combobox').store.load({
        callback: function(records, operation, success) {
            changePanel.down('combobox').store.clearFilter(true); //smm - clear any filtering prior to this editor
            gridPanel.store.load({
                callback: function(records, operation, success) {
                    gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
                    win.show();
                }
            });
        }
    });
}





/*****************************************
 ***** Editor for Engine table  ****
 *****************************************/

function openEngineEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddEngine.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveEngine.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Engines',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Engines',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Engine Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the engine you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That engine already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new engine");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the engine you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That engine doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the engine");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Engine Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}






/*****************************************
 ***** Editor for Manager table  ****
 *****************************************/

function openManagerEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddManager.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveManager.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Managers',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Managers',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Manager Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the manager you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That manager already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new manager");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the manager you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That manager doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the manager");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Manager Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/*****************************************
 ***** Editor for Grammars table  ****
 *****************************************/

function openGrammarEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddGrammar.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveGrammar.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Grammars',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Grammars',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Grammar Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the grammar you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That grammar already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new grammar");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the grammar you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That grammar doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the grammar");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Grammar Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/*****************************************
 ***** Editor for BackofficeDBs table  ****
 *****************************************/

function openBackofficeDBEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddBackofficeDB.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveBackofficeDB.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Backoffice Databases',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'BackofficeDBs',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Database Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the database you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That database already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new database");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the database you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That database doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the database");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Backoffice Database Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}



/*****************************************
 ***** Editor for BackofficeProcesses table  ****
 *****************************************/

function openBackofficeProcessEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddBackofficeProcess.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveBackofficeProcess.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Backoffice Processes',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'BackofficeProcesses',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Process Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the process you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That process already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new process");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the process you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That process doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the process");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Backoffice Process Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/*************************************************
 ***** Editor for BackofficeWebServices table  ****
 **************************************************/

function openBackofficeWebserviceEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddBackofficeWebservice.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveBackofficeWebservice.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Backoffice Webservices',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'BackofficeWebservices',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Webservice Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the webservice you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That webservice already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new webservice");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the webservice you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That webservice doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the webservice");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Backoffice Webservice Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/*****************************************
 ***** Editor for ConfigurationFiles table  ****
 *****************************************/

function openConfigurationFileEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddConfigurationFile.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveConfigurationFile.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Configuration Files',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'ConfigurationFiles',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'File Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the configuration file you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That file already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new configuration file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the configuration file you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That file doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the configuration file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Configuration File Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}



/************************************
 ***** Editor for FaxForms table  ****
 ************************************/

function openFaxFormEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddFaxForm.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveFaxForm.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Fax Forms',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'FaxForms',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Form Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the fax form you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That form already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new fax form");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the fax form you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That form doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the fax file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Fax Form Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/************************************
 ***** Editor for FileXferUpload table  ****
 ************************************/

function openFileXferUploadEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddFileXferUpload.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveFileXferUpload.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Transfer Upload Files',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'FileXferUploads',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 220,
            labelAlign: 'top',
            fieldLabel: 'Upload File Name (minus extension)',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the upload file you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That upload file already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new upload file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the upload file you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That upload file doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the upload file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Transfer Upload File Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}





/************************************
 ***** Editor for FileXferDownload table  ****
 ************************************/

function openFileXferDownloadEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddFileXferDownload.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveFileXferDownload.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Transfer Download Files',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'FileXferDownloads',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 220,
            labelAlign: 'top',
            fieldLabel: 'Download File Name (minus extension)',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the download file you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That download file already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new download file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the download file you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That download file doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the download file");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Transfer Download File Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/************************************
 ***** Editor for ReportNames table  ****
 ************************************/

function openReportNameEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddReportName.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveReportName.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Report Names',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'ReportNames',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Report Name',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the report you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That report already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new report");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the name of the report you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) == -1) {
                    alert("That report doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.name = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the report");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Report Names Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/************************************
 ***** Editor for DeliveryMethod table  ****
 ************************************/

function openDeliveryMethodEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddDeliveryMethod.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveDeliveryMethod.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Delivery Methods',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'DeliveryMethods',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'method',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('method');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Method',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the method you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('method', name, 0, false, false, true) != -1) {
                    alert("That method already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.method = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new method");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the method you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('method', name, 0, false, false, true) == -1) {
                    alert("That method doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.method = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the method");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Delivery Method Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}




/************************************
 ***** Editor for DeliveryFormat table  ****
 ************************************/

function openDeliveryFormatEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddDeliveryFormat.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveDeliveryFormat.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Delivery Formats',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'DeliveryFormats',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'format',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('format');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Format (examples: .txt, .csv)',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the format you want to add.");
                    return;
                }

                if (!name.match(/\./)) {
                    alert("You must enter a format in the form of a file extension, which is a period followed by alphanumerics.  Examples are .txt and .csv");
                    return;
                }

                if (gridPanel.getStore().find('format', name, 0, false, false, true) != -1) {
                    alert("That format already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.format = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new format");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the format you want to remove");
                    return;
                }

                if (!name.match(/\./)) {
                    alert("You must enter a format in the form of a file extension, which is a period followed by alphanumerics.  Examples are .txt and .csv");
                    return;
                }

                if (gridPanel.getStore().find('format', name, 0, false, false, true) == -1) {
                    alert("That format doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.format = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the format");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Delivery Format Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}



/************************************
 ***** Editor for DeliveryFrequency table  ****
 ************************************/

function openDeliveryFrequencyEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddDeliveryFrequency.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveDeliveryFrequency.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Delivery Frequencies',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'DeliveryFrequencies',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'frequency',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('frequency');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Frequency',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the frequency you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('frequency', name, 0, false, false, true) != -1) {
                    alert("That frequency already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.frequency = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new frequency");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the frequency you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('frequency', name, 0, false, false, true) == -1) {
                    alert("That frequency doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.frequency = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the frequency");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Delivery Frequency Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}



/************************************
 ***** Editor for Platform table  ****
 ************************************/

function openPlatformEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddPlatform.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemovePlatform.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Platforms',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Platforms',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'platform1',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('platform1');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Platform',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the platform you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('platform1', name, 0, false, false, true) != -1) {
                    alert("That platform already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.platform = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new platform");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the platform you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('platform1', name, 0, false, false, true) == -1) {
                    alert("That platform doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.platform = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the platform");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Platform Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}



/************************************
 ***** Editor for Language table  ****
 ************************************/

function openLanguageEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddLanguage.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    removalStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'RemoveLanguage.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Languages',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Languages',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'language1',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('language1');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Language',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the language you want to add.");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('language1', name, 0, false, false, true) != -1) {
                    alert("That language already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.language = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new language");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the language you want to remove");
                    return;
                }

                if (name.match(/\./)) {
                    alert("Please don't enter file extensions");
                    return;
                }

                if (gridPanel.getStore().find('language1', name, 0, false, false, true) == -1) {
                    alert("That language doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            removalStore.proxy.extraParams.language = name;
                            removalStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully removed");
                                    } else {
                                        alert("Couldn't delete the language");
                                    }
                                }
                            });

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Language Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}





/************************************
 ***** Editor for Nodes table  ****
 ************************************/

function openNodeEditor() {

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Nodes',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Nodes',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'node1',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('node1');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Node',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the node you want to add.");
                    return;
                }

                if (gridPanel.getStore().find('node1', name, 0, false, false, true) != -1) {
                    alert("That node already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.add({
                                node1: name
                            });
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the node you want to remove");
                    return;
                }

                var index = gridPanel.getStore().find('node1', name, 0, false, false, true);
                if (index == -1) {
                    alert("That node doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.removeAt(index);
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Node Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }



}



/*****************************************
 ***** Editor for ServiceIDs table      *****
 *****************************************/

function openServiceIDEditor() {

    Ext.define('AppName', {
        extend: 'Ext.data.Model',
        fields: ['application']
    });

    writerStore = Ext.create('Ext.data.Store', {
        model: 'AppName',
        proxy: {
            type: 'ajax',
            url: 'AddServiceID.ashx',
            timeout: 60000,
            actionMethods: {
                update: 'POST',
                read: 'POST',
                destroy: 'DELETE',
                create: 'POST'
            },
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        }
    });

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Service IDs',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'ServiceIDs',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'name',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('name');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Service ID',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var nameBox = this.up().down('textfield');

                var name = nameBox.getValue();

                if (name == "") {
                    alert("You must enter a name for the Service ID you want to add");
                    return;
                }

                if (gridPanel.getStore().find('name', name, 0, false, false, true) != -1) {
                    alert("That Service ID already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            writerStore.proxy.extraParams.name = name;
                            writerStore.load({
                                callback: function(records, operation, success) {
                                    if (success) {
                                        gridPanel.store.load();
                                        alert(name + " successfully added");
                                    } else {
                                        alert("Couldn't add the new Service ID");
                                    }
                                }
                            });

                            nameBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Service ID Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });


    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}
/************************************
 ***** Editor for Categories table  ****
 ************************************/

function openCategoryEditor() {

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Categories',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Categories',
        columns: [{
            header: 'Name',
            width: 170,
            dataIndex: 'category1',
            listeners: {
                'click': function(grid, view, rowIndex, colIndex) {
                    var name = grid.getStore().getAt(rowIndex).get('category1');
                    changePanel.down('textfield').setValue(name);
                }
            }
        }],
        selType: 'cellmodel',
        viewConfig: {
            stripeRows: true
        }
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Category',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the category you want to add.");
                    return;
                }

                if (gridPanel.getStore().find('category1', name, 0, false, false, true) != -1) {
                    alert("That category already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.add({
                                category1: name
                            });
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the category you want to remove");
                    return;
                }

                var index = gridPanel.getStore().find('category1', name, 0, false, false, true);
                if (index == -1) {
                    alert("That category doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.removeAt(index);
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Assumptions Category Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel, changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}

/****************************************
 ***** Editor for Assumptions table  *****
 ****************************************/

function openAssumptionsEditor() {

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Assumptions',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Assumptions',
        columns: [{
            header: 'Owner',
            width: 144,
            dataIndex: 'user_name'
        }, //can't edit user names
        {
            header: 'Assumption',
            width: 170,
            flex: 1,
            dataIndex: 'assumption1',
            editor: {
                xtype: 'textfield'
            }
        }, {
            header: 'Category',
            width: 144,
            dataIndex: 'category',
            editor: {
                xtype: 'combobox',
                store: 'Categories',
                multiSelect: false,
                displayField: 'category1',
                valueField: 'category1',
                allowBlank: true,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true
                },
                queryMode: 'local'
            }
        }, {
            header: 'BusinessUnit',
            width: 144,
            dataIndex: 'business_unit',
            editor: {
                xtype: 'combobox',
                store: 'BusinessUnits',
                multiSelect: false,
                displayField: 'name',
                valueField: 'name',
                allowBlank: true,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true
                },
                queryMode: 'local'
            }
        }, {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: 'extjs/examples/restful/images/delete.png',
                tooltip: 'click to delete this row',
                handler: function(grid, rowIndex, colIndex) {
                    if (grid.getStore().getAt(rowIndex).get('user_name') != GLOBAL_username) {
                        return;
                    }

                    grid.getStore().removeAt(rowIndex);
                }
            }]
        }],
        selType: 'cellmodel',
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function(e) {
                    if (e.record.get('user_name') != GLOBAL_username) {
                        return false;
                    }
                }
            }
        })],
        viewConfig: { //stripeRows: true
        },
        tools: [{
            type: 'plus',
            tooltip: 'Add another entry to this table',
            handler: function(event, toolEl, panel) {
                var gridPanel = panel.up();
                gridPanel.getStore().add({
                    user_name: GLOBAL_username
                }); //add an empty row
            }
        }, {
            type: 'refresh',
            handler: function(event, toolEl, panel) {
                var gridPanel = panel.up();
                gridPanel.getStore().sync();
            }
        }]
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Category',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the category you want to add.");
                    return;
                }

                if (gridPanel.getStore().find('category1', name, 0, false, false, true) != -1) {
                    alert("That category already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.add({
                                category1: name
                            });
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the category you want to remove");
                    return;
                }

                var index = gridPanel.getStore().find('category1', name, 0, false, false, true);
                if (index == -1) {
                    alert("That category doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.removeAt(index);
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Assumptions Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel,
        changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}

/****************************************
 ***** Editor for Deliverables table  *****
 ****************************************/

function openDeliverablesEditor() {

    gridPanel = Ext.create('Ext.grid.Panel', {
        title: 'Deliverables',
        region: 'west',
        //clicksToEdit: 2,
        //loadMask: true,
        store: 'Deliverables',
        columns: [{
            header: 'Owner',
            width: 144,
            dataIndex: 'user_name'
        }, //can't edit user names
        {
            header: 'Deliverable',
            width: 170,
            flex: 1,
            dataIndex: 'deliverable_text',
            editor: {
                xtype: 'textfield'
            }
        }, {
            header: 'BusinessUnit',
            width: 144,
            dataIndex: 'business_unit',
            editor: {
                xtype: 'combobox',
                store: 'BusinessUnits',
                multiSelect: false,
                displayField: 'name',
                valueField: 'name',
                allowBlank: true,
                matchFieldWidth: true,
                listConfig: {
                    autoHeight: true
                },
                queryMode: 'local'
            }
        }, {
            xtype: 'actioncolumn',
            width: 22,
            items: [{
                icon: 'extjs/examples/restful/images/delete.png',
                tooltip: 'click to delete this row',
                handler: function(grid, rowIndex, colIndex) {
                    if (grid.getStore().getAt(rowIndex).get('user_name') != GLOBAL_username) {
                        return;
                    }

                    grid.getStore().removeAt(rowIndex);
                }
            }]
        }],
        selType: 'cellmodel',
        columnLines: true,
        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function(e) {
                    if (e.record.get('user_name') != GLOBAL_username) {
                        return false;
                    }
                }
            }
        })],
        viewConfig: { //stripeRows: true
        },
        tools: [{
            type: 'plus',
            tooltip: 'Add another entry to this table',
            handler: function(event, toolEl, panel) {
                var gridPanel = panel.up();
                gridPanel.getStore().add({
                    user_name: GLOBAL_username
                }); //add an empty row
            }
        }, {
            type: 'refresh',
            handler: function(event, toolEl, panel) {
                var gridPanel = panel.up();
                gridPanel.getStore().sync();
            }
        }]
    });

    changePanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        items: [{
            xtype: 'textfield',
            width: 170,
            labelAlign: 'top',
            fieldLabel: 'Category',
            margin: '5 0 10 10'
        }, {
            xtype: 'button',
            text: 'Add',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the category you want to add.");
                    return;
                }

                if (gridPanel.getStore().find('category1', name, 0, false, false, true) != -1) {
                    alert("That category already exists!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to add ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.add({
                                category1: name
                            });
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }, {
            xtype: 'button',
            text: 'Remove',
            margin: '0 0 10 10',
            handler: function() {
                var textBox = this.up().down('textfield');

                var name = textBox.getValue();

                if (name == "") {
                    alert("You must enter the category you want to remove");
                    return;
                }

                var index = gridPanel.getStore().find('category1', name, 0, false, false, true);
                if (index == -1) {
                    alert("That category doesn't exist!");
                    return;
                }

                Ext.Msg.show({
                    title: 'Are you sure?',
                    msg: 'Are you sure you want to delete ' + name + '?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button) {
                        if (button == 'no') {
                            return;
                        } else {
                            gridPanel.store.removeAt(index);
                            gridPanel.store.sync();

                            textBox.setValue('');
                        }
                    }
                });
            }
        }]
    });

    win = Ext.create('widget.window', {
        title: 'Deliverables Editor',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [gridPanel,
        changePanel]
    });

    if (gridPanel.getStore().getCount() < 1) {
        gridPanel.getStore().load({
            callback: function() {
                win.show();
            }
        });
    } else {
        gridPanel.getStore().clearFilter(true); //smm - clear any filtering prior to this editor
        win.show();
    }
}