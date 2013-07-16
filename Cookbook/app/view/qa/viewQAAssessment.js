var viewOSGAssessmentGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#osgTabOSGAssessmentGrid')[0];
            grid.getView().refresh();
        }
    }
});


function updateQATotalHours() {
    var grid = Ext.ComponentQuery.query('#osgTabOSGAssessmentGrid')[0];
    var count = grid.getStore().getCount();

    var totalosghours = 0;

    var totalOSGTypesToCheck = new Array();
    totalOSGTypesToCheck.push("Non-SWD QA");
    totalOSGTypesToCheck.push("OSG Scripts");

    for (var k = 0; k < count; k++) {
        if (totalOSGTypesToCheck.indexOf(grid.getStore().getAt(k).get('type')) != -1) {
            totalosghours += grid.getStore().getAt(k).get('hours') * 1;
        }
    }

    Ext.ComponentQuery.query('#totalQAHours')[0].setText(totalosghours);
    Ext.ComponentQuery.query('#submittedTotalQAHours')[0].setValue(totalosghours);
}

Ext.define('CookBook.view.qa.ViewQAAssessment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewQAAssessment',
    width: 1210,
    height: 350,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'OSG Assessments',
    itemId: 'osgTabOSGAssessmentGrid',
    store: 'OSGAssessments',
    plugins: [viewOSGAssessmentGridCellEditing],
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        header: 'Contact Name',
        dataIndex: 'name',
        tdCls: 'column-lines-enabled',
        flex: 2,
        sortable: false,
        editor: {
            xtype: 'combobox',
            store: 'OSGContacts',
            displayField: 'name',
            valueField: 'name',
            typeAhead: false,
            allowBlank: false,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local',
            value: '',
            emptyText: '',
            lastQuery: '',
            listeners: {
                'change': function(t, nv) {
                    if (Ext.isEmpty(nv)) {
                        t.setValue('');
                    }
                },
                expand: function() {
                    this.store.filter([{
                        property: 'company_name',
                        value: 'usan'
                    }]);
                },
                collapse: function() {
                    this.store.clearFilter();
                }
            }
        },
        summaryType: function(records) {
            if (records.length > 0) {
                var type = records[0].get('type');
                var value = records.length;
                if (type == "Non-SWD QA") type = "OSG Other";
                return ((value === 0 || value > 1) ? '(' + value + ' ' + type + ' Entries)' : '(1 ' + type + ' Entry)');
            }
        }
    }, {
        header: 'Type',
        id: 'osgIdType',
        sortable: false,
        dataIndex: 'type'
    }, {
        text: 'Notes',
        flex: 2,
        dataIndex: 'action',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: 'Billed Hours',
        dataIndex: 'hours',
        tdCls: 'column-lines-enabled',
        flex: .8,
        sortable: false,
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        updateQATotalHours();
                    }, 1000);
                }
            }
        },
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('hours') * 1;
            }
            return total + " Billed";
        }
    }, {
        header: 'Booked Hours',
        dataIndex: 'booked_hours',
        tdCls: 'column-lines-enabled',
        flex: .8,
        sortable: false,
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        updateQATotalHours();
                    }, 1000);
                }
            }
        },
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('booked_hours') * 1;
            }
            return total + " Booked";
        }
    }, {
        header: 'Target Start',
        flex: 1,
        sortable: false,
        dataIndex: 'requested_start_date',
        tdCls: 'column-lines-enabled',
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
        editor: {
            xtype: 'textDate',
            format: 'm/d/y',
            validateOnChange: false,
            validateOnBlur: false
        },
        summaryType: 'min',
        summaryRenderer: function(value, metaData, dataIndex) {
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
        }
    }, {
        header: 'Target Complete',
        flex: 1,
        sortable: false,
        dataIndex: 'requested_complete',
        tdCls: 'column-lines-enabled',
        summaryType: 'max',
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
        editor: {
            xtype: 'textDate',
            format: 'm/d/y',
            validateOnChange: false,
            validateOnBlur: false
        },
        summaryRenderer: function(value, metaData, dataIndex) {
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
        }
    }, {
        header: 'Scheduled Start',
        flex: 1,
        sortable: false,
        dataIndex: 'scheduled_start_date',
        tdCls: 'column-lines-enabled',
        summaryType: 'min',
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
        editor: {
            xtype: 'textDate',
            format: 'm/d/y',
            validateOnChange: false,
            validateOnBlur: false,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        //updateTotalDevDates();
                    }, 1000);
                }
            }
        },
        summaryRenderer: function(value, metaData, dataIndex) {
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
        }
    }, {
        header: 'Scheduled Complete',
        flex: 1,
        sortable: false,
        dataIndex: 'scheduled_complete',
        tdCls: 'column-lines-enabled',
        summaryType: 'max',
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
        editor: {
            xtype: 'textDate',
            format: 'm/d/y',
            validateOnChange: false,
            validateOnBlur: false,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        //updateTotalDevDates();
                    }, 1000);
                }
            }
        },
        summaryRenderer: function(value, metaData, dataIndex) {
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
        }
    }, {
        header: 'Actual Complete',
        flex: 1,
        sortable: false,
        dataIndex: 'actual_complete',
        tdCls: 'column-lines-enabled',
        summaryType: 'max',
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
        editor: {
            xtype: 'textDate',
            format: 'm/d/y',
            validateOnChange: false,
            validateOnBlur: false,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        //updateTotalDevDates();
                    }, 1000);
                }
            }
        },
        summaryRenderer: function(value, metaData, dataIndex) {
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
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        sortable: false,
        hideable: false,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex) {
                if (GLOBAL_readonly) {
                    return;
                }
                Ext.defer(function() {
                    updateQATotalHours();
                }, 1000);
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
            }
        }]
    }],
    tools: [{
        type: 'refresh',
        tooltip: 'Sort',
        handler: function(event, toolEl, panel) {
            var store = panel.up().getStore();
            var readOnly = false;
            if (GLOBAL_readonly) {
                readOnly = true;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA"))) {
                readOnly = true;
            }
            store.proxy.extraParams.read_only = readOnly;
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load({
                callback: function(records, operation, success) {
                    Ext.ComponentQuery.query('#OSG')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#OSG')[0].doLayout();
                    Ext.defer(function() {
                        updateQATotalHours();
                    }, 1000)
                }
            });
        }
    }, {
        type: 'plus',
        tooltip: 'Add an entry to this table',
        handler: function(event, toolEl, panel) {
            if (GLOBAL_readonly) {
                return;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA"))) {
                return;
            }
            var gridPanel = panel.up();
            Ext.create("Ext.Window", {
                title: "Add OSG Assessment",
                modal: true,
                width: 400,
                bodyStyle: "padding:10px",
                items: [{
                    xtype: 'label',
                    width: 375,
                    html: "<b>Please select which OSG Assessment type to add.</b><br /><br />"
                }, {
                    xtype: 'combobox',
                    width: 375,
                    editable: false,
                    store: {
                        fields: ['type'],
                        data: [{
                            'type': 'Scripts'
                        }, {
                            'type': 'Other'
                        }]
                    },
                    multiSelect: false,
                    displayField: 'type',
                    valueField: 'type',
                    matchFieldWidth: true,
                    listConfig: {
                        autoHeight: true,
                        loadMask: false
                    },
                    name: 'osgTabOSGAssessmentTypeCombobox',
                    itemId: 'osgTabOSGAssessmentTypeCombobox'
                }],
                buttons: [{
                    text: "Add Selected Assessment",
                    itemId: 'osgTabOSGAssessmentButton',
                    handler: function() {
                        var eto = this;
                        var choice = Ext.ComponentQuery.query('#osgTabOSGAssessmentTypeCombobox')[0].getValue();
                        var submittedval = "";
                        switch (choice) {
                        case "Scripts":
                            {
                                submittedval = "OSG Scripts";
                                break;
                            }
                        case "Other":
                            {
                                submittedval = "Non-SWD QA";
                                break;
                            }
                        default:
                            {
                                submittedval = "Non-SWD QA";
                                break;
                            }
                        }
                        if (!Ext.isEmpty(choice)) {
                            if (GLOBAL_readonly) {
                                return;
                            }
                            console.log('choice made: ' + choice);
                            if (gridPanel.collapsed) {
                                gridPanel.expand(true);
                            }
                            gridPanel.getStore().add({
                                project_id: GLOBAL_currentProjectOpenProjectID,
                                type: submittedval
                            }); //add an empty row
                            var choice = Ext.ComponentQuery.query('#osgTabOSGAssessmentButton')[0].disable();
                            Ext.defer(function() {
                                if (Ext.ComponentQuery.query('#osgTabOSGAssessmentButton')[0]) {
                                    var choice = Ext.ComponentQuery.query('#osgTabOSGAssessmentButton')[0].enable();
                                }
                            }, 500);
                        } else {
                            console.log('choice is not valid');
                        }
                    }
                }, {
                    text: "Finished",
                    handler: function() {
                        var store = Ext.ComponentQuery.query('#osgTabOSGAssessmentGrid')[0].getStore();
                        var readOnly = false;
                        if (GLOBAL_readonly) {
                            readOnly = true;
                        }
                        if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA"))) {
                            readOnly = true;
                        }
                        store.proxy.extraParams.read_only = readOnly;
                        store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                        store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
                        store.load({
                            callback: function(records, operation, success) {
                                Ext.ComponentQuery.query('#OSG')[0].doComponentLayout();
                                Ext.ComponentQuery.query('#OSG')[0].doLayout();
                                Ext.defer(function() {
                                    updateQATotalHours();
                                }, 1000)
                            }
                        });
                        this.up('window').close();
                    }
                }]
            }).show();
        }
    }],
    listeners: {
        expand: function() {
            Ext.ComponentQuery.query('#OSG')[0].doComponentLayout();
            Ext.ComponentQuery.query('#OSG')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#OSG')[0].doComponentLayout();
            Ext.ComponentQuery.query('#OSG')[0].doLayout();
        }
    }
});