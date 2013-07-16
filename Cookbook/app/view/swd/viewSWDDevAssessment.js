var viewSWDAssessmentGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#swdTabSWDAssessmentsGrid')[0];
            grid.getView().refresh();
        }
    }
});

function updateTotalDevDates() {
    var grid = Ext.ComponentQuery.query('#swdTabSWDAssessmentsGrid')[0];
    var count = grid.getStore().getCount();

    var scheduledBAStartDate = "";
    var scheduledBACompleteDate = "";
    var actualBACompleteDate = "";

    var scheduledDevStartDate = "";
    var scheduledDevCompleteDate = "";
    var actualDevCompleteDate = "";

    var scheduledQAStartDate = "";
    var scheduledQACompleteDate = "";
    var actualQACompleteDate = "";

    for (var k = 0; k < count; k++) {
        if (grid.getStore().getAt(k).get('type')) {
            if (grid.getStore().getAt(k).get('type') == "Design/Documentation") {
                //var v1data = Date.parse(v1.get('rfq_recd'));
                if (grid.getStore().getAt(k).get('scheduled_start_date')) {
                    if (scheduledBAStartDate == "") {
                        scheduledBAStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                    } else {
                        if (isNaN(Date.parse(scheduledBAStartDate))) {
                            scheduledBAStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_start_date')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('scheduled_start_date')) < Date.parse(scheduledBAStartDate)) {
                                    scheduledBAStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                                }
                            }
                        }
                    }
                }

                if (grid.getStore().getAt(k).get('scheduled_complete')) {
                    if (scheduledBACompleteDate == "") {
                        scheduledBACompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                    } else {
                        if (isNaN(Date.parse(scheduledBACompleteDate))) {
                            scheduledBACompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_complete')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('scheduled_complete')) > Date.parse(scheduledBACompleteDate)) {
                                    scheduledBACompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                                }
                            }
                        }
                    }
                }

                if (grid.getStore().getAt(k).get('actual_complete')) {
                    if (actualBACompleteDate == "") {
                        actualBACompleteDate = grid.getStore().getAt(k).get('actual_complete');
                    } else {
                        if (isNaN(Date.parse(actualBACompleteDate))) {
                            actualBACompleteDate = grid.getStore().getAt(k).get('actual_complete');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('actual_complete')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('actual_complete')) > Date.parse(actualBACompleteDate)) {
                                    actualBACompleteDate = grid.getStore().getAt(k).get('actual_complete');
                                }
                            }
                        }
                    }
                }

            } else if (grid.getStore().getAt(k).get('type') == "Coding" || grid.getStore().getAt(k).get('type') == "MIS Other") {
                if (grid.getStore().getAt(k).get('scheduled_start_date')) {
                    if (scheduledDevStartDate == "") {
                        scheduledDevStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                    } else {
                        if (isNaN(Date.parse(scheduledDevStartDate))) {
                            scheduledDevStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_start_date')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('scheduled_start_date')) < Date.parse(scheduledDevStartDate)) {
                                    scheduledDevStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                                }
                            }
                        }
                    }
                }

                if (grid.getStore().getAt(k).get('scheduled_complete')) {
                    if (scheduledDevCompleteDate == "") {
                        scheduledDevCompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                    } else {
                        if (isNaN(Date.parse(scheduledDevCompleteDate))) {
                            scheduledDevCompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_complete')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('scheduled_complete')) > Date.parse(scheduledDevCompleteDate)) {
                                    scheduledDevCompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                                }
                            }
                        }
                    }
                }

                if (grid.getStore().getAt(k).get('actual_complete')) {
                    if (actualDevCompleteDate == "") {
                        actualDevCompleteDate = grid.getStore().getAt(k).get('actual_complete');
                    } else {
                        if (isNaN(Date.parse(actualDevCompleteDate))) {
                            actualDevCompleteDate = grid.getStore().getAt(k).get('actual_complete');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('actual_complete')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('actual_complete')) > Date.parse(actualDevCompleteDate)) {
                                    actualDevCompleteDate = grid.getStore().getAt(k).get('actual_complete');
                                }
                            }
                        }
                    }
                }
            } else if (grid.getStore().getAt(k).get('type') == "QA") {
                if (scheduledQAStartDate == "") {
                    scheduledQAStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                } else {
                    if (isNaN(Date.parse(scheduledQAStartDate))) {
                        scheduledQAStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                    } else {
                        if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_start_date')))) {
                            if (Date.parse(grid.getStore().getAt(k).get('scheduled_start_date')) < Date.parse(scheduledQAStartDate)) {
                                scheduledQAStartDate = grid.getStore().getAt(k).get('scheduled_start_date');
                            }
                        }
                    }
                }

                if (grid.getStore().getAt(k).get('scheduled_complete')) {
                    if (scheduledQACompleteDate == "") {
                        scheduledQACompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                    } else {
                        if (isNaN(Date.parse(scheduledQACompleteDate))) {
                            scheduledQACompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_complete')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('scheduled_complete')) > Date.parse(scheduledQACompleteDate)) {
                                    scheduledQACompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                                }
                            }
                        }
                    }
                }

                if (grid.getStore().getAt(k).get('actual_complete')) {
                    if (actualQACompleteDate == "") {
                        actualQACompleteDate = grid.getStore().getAt(k).get('actual_complete');
                    } else {
                        if (isNaN(Date.parse(actualQACompleteDate))) {
                            actualQACompleteDate = grid.getStore().getAt(k).get('actual_complete');
                        } else {
                            if (!isNaN(Date.parse(grid.getStore().getAt(k).get('actual_complete')))) {
                                if (Date.parse(grid.getStore().getAt(k).get('actual_complete')) > Date.parse(actualQACompleteDate)) {
                                    actualQACompleteDate = grid.getStore().getAt(k).get('actual_complete');
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    !isNaN(Date.parse(scheduledBAStartDate)) ? Ext.ComponentQuery.query('#scheduledBAStart')[0].setRawValue(swdFormatDateObject(scheduledBAStartDate)) : Ext.ComponentQuery.query('#scheduledBAStart')[0].setRawValue(scheduledBAStartDate);
    !isNaN(Date.parse(scheduledBACompleteDate)) ? Ext.ComponentQuery.query('#scheduledBAComplete')[0].setRawValue(swdFormatDateObject(scheduledBACompleteDate)) : Ext.ComponentQuery.query('#scheduledBAComplete')[0].setRawValue(scheduledBACompleteDate);
    !isNaN(Date.parse(actualBACompleteDate)) ? Ext.ComponentQuery.query('#actualBAComplete')[0].setRawValue(swdFormatDateObject(actualBACompleteDate)) : Ext.ComponentQuery.query('#actualBAComplete')[0].setRawValue(actualBACompleteDate);

    !isNaN(Date.parse(scheduledDevStartDate)) ? Ext.ComponentQuery.query('#scheduledDevStart')[0].setRawValue(swdFormatDateObject(scheduledDevStartDate)) : Ext.ComponentQuery.query('#scheduledDevStart')[0].setRawValue(scheduledDevStartDate);
    !isNaN(Date.parse(scheduledDevCompleteDate)) ? Ext.ComponentQuery.query('#scheduledDevComplete')[0].setRawValue(swdFormatDateObject(scheduledDevCompleteDate)) : Ext.ComponentQuery.query('#scheduledDevComplete')[0].setRawValue(scheduledDevCompleteDate);
    !isNaN(Date.parse(actualDevCompleteDate)) ? Ext.ComponentQuery.query('#actualDevComplete')[0].setRawValue(swdFormatDateObject(actualDevCompleteDate)) : Ext.ComponentQuery.query('#actualDevComplete')[0].setRawValue(actualDevCompleteDate);

    !isNaN(Date.parse(scheduledQAStartDate)) ? Ext.ComponentQuery.query('#scheduledQAStart')[0].setRawValue(swdFormatDateObject(scheduledQAStartDate)) : Ext.ComponentQuery.query('#scheduledQAStart')[0].setRawValue(scheduledQAStartDate);
    !isNaN(Date.parse(scheduledQACompleteDate)) ? Ext.ComponentQuery.query('#scheduledQAComplete')[0].setRawValue(swdFormatDateObject(scheduledQACompleteDate)) : Ext.ComponentQuery.query('#scheduledQAComplete')[0].setRawValue(scheduledQACompleteDate);
    !isNaN(Date.parse(actualQACompleteDate)) ? Ext.ComponentQuery.query('#actualQAComplete')[0].setRawValue(swdFormatDateObject(actualQACompleteDate)) : Ext.ComponentQuery.query('#actualQAComplete')[0].setRawValue(actualQACompleteDate);

    Ext.defer(function() {
        //Ext.ComponentQuery.query('#SWD')[0].updateSWD(currentEarliestDate + "|" + currentLatestDate);
        Ext.ComponentQuery.query('#SWD')[0].updateSWD();
    }, 1500)
}

function swdFormatDateObject(incomingDate) {
    if (isNaN(Date.parse(incomingDate))) {
        return incomingDate;
    }
    pattern = /00:00:00/;
    if (pattern.test(incomingDate)) {
        //format is YYYY-MM-DDT00:00:00
        //          0123456789

        outgoingDate = incomingDate.substring(5, 7) + "/";
        outgoingDate += incomingDate.substring(8, 10) + "/";
        outgoingDate += incomingDate.substring(0, 4);
        return outgoingDate;
    } else {
        return incomingDate;
    }
}

function updateTotalDevHours() {
    //this function updates all swd hours scheduled/ hours for quotes labels
    var grid = Ext.ComponentQuery.query('#swdTabSWDAssessmentsGrid')[0];
    var count = grid.getStore().getCount();

    var totaldevbilled = 0;
    var totaldevbooked = 0;
    var totalcodingbilled = 0;
    var totaldevpreuatbilled = 0;
    var totaldevpreuatbooked = 0;

    var totaldevpostuatbilled = 0;
    var totaldevpostuatbooked = 0;

    var ddbilledhours = 0;
    var ddbookedhours = 0;

    var totalPreUATDevHoursTypesToCheck = new Array();
    totalPreUATDevHoursTypesToCheck.push("Workflow");
    totalPreUATDevHoursTypesToCheck.push("Requirements Clarification");
    totalPreUATDevHoursTypesToCheck.push("Coding");
    totalPreUATDevHoursTypesToCheck.push("MIS");
    totalPreUATDevHoursTypesToCheck.push("Testing/Implementation");
    totalPreUATDevHoursTypesToCheck.push("MIS Other");
    totalPreUATDevHoursTypesToCheck.push("QA");

    var totalDevHoursTypesToCheck = new Array();
    totalDevHoursTypesToCheck.push("Design/Documentation");
    totalDevHoursTypesToCheck.push("Workflow");
    totalDevHoursTypesToCheck.push("Requirements Clarification");
    totalDevHoursTypesToCheck.push("Coding");
    totalDevHoursTypesToCheck.push("MIS");
    totalDevHoursTypesToCheck.push("Testing/Implementation");
    totalDevHoursTypesToCheck.push("MIS Other");
    totalDevHoursTypesToCheck.push("QA");
    totalDevHoursTypesToCheck.push("UAT Support");
    totalDevHoursTypesToCheck.push("Project Overhead");

    for (var k = 0; k < count; k++) {
        if (totalDevHoursTypesToCheck.indexOf(grid.getStore().getAt(k).get('type')) != -1) {
            if (grid.getStore().getAt(k).get('type') == "Coding") {
                totalcodingbilled += grid.getStore().getAt(k).get('hours') * 1;

                totaldevbilled += grid.getStore().getAt(k).get('hours') * 1;
                totaldevbooked += grid.getStore().getAt(k).get('booked_hours') * 1;
            } else if (grid.getStore().getAt(k).get('type') == "Design/Documentation") {
                ddbilledhours += grid.getStore().getAt(k).get('hours') * 1;
                ddbookedhours += grid.getStore().getAt(k).get('booked_hours') * 1;

                totaldevbilled += grid.getStore().getAt(k).get('hours') * 1;
                totaldevbooked += grid.getStore().getAt(k).get('booked_hours') * 1;
            } else if (grid.getStore().getAt(k).get('type') == "Project Overhead" || grid.getStore().getAt(k).get('type') == "UAT Support") {
                totaldevpostuatbilled += grid.getStore().getAt(k).get('hours') * 1;
                totaldevpostuatbooked += grid.getStore().getAt(k).get('booked_hours') * 1;

                totaldevbilled += grid.getStore().getAt(k).get('hours') * 1;
                totaldevbooked += grid.getStore().getAt(k).get('booked_hours') * 1;
            } else {
                totaldevbilled += grid.getStore().getAt(k).get('hours') * 1;
                totaldevbooked += grid.getStore().getAt(k).get('booked_hours') * 1;
            }
        }

        if (totalPreUATDevHoursTypesToCheck.indexOf(grid.getStore().getAt(k).get('type')) != -1) {
            totaldevpreuatbilled += grid.getStore().getAt(k).get('hours') * 1;
            totaldevpreuatbooked += grid.getStore().getAt(k).get('booked_hours') * 1;
        }
    }
    Ext.ComponentQuery.query('#totalSWDBilledHoursLabel')[0].setText(totaldevbilled);
    Ext.ComponentQuery.query('#totalSWDBookedHoursLabel')[0].setText(totaldevbooked);

    if ((totaldevbilled - ddbilledhours * 1) < 0) {
        Ext.ComponentQuery.query('#TotalDevBilledLabel')[0].setText(0);
        Ext.ComponentQuery.query('#totalBillableDevHours')[0].setText(0);
    } else {
        Ext.ComponentQuery.query('#TotalDevBilledLabel')[0].setText(totaldevbilled - ddbilledhours * 1);
        Ext.ComponentQuery.query('#totalBillableDevHours')[0].setText(totaldevbilled - ddbilledhours * 1);
    }

    if ((totaldevbooked - ddbookedhours * 1) < 0) {
        Ext.ComponentQuery.query('#TotalDevBookedLabel')[0].setText(0);
    } else {
        Ext.ComponentQuery.query('#TotalDevBookedLabel')[0].setText(totaldevbooked - ddbookedhours * 1);
    }

    Ext.ComponentQuery.query('#billableCodingHours')[0].setText(totalcodingbilled);

    if ((totaldevbilled - ddbilledhours - totalcodingbilled * 1) < 0) {
        Ext.ComponentQuery.query('#billableOtherHours')[0].setText(0);
    } else {
        Ext.ComponentQuery.query('#billableOtherHours')[0].setText((totaldevbilled - ddbilledhours - totalcodingbilled * 1));
    }

    Ext.ComponentQuery.query('#TotalPreUATDevBilledLabel')[0].setText(totaldevpreuatbilled);
    Ext.ComponentQuery.query('#TotalPreUATDevBookedLabel')[0].setText(totaldevpreuatbooked);

    Ext.ComponentQuery.query('#TotalPostUATDevBilledLabel')[0].setText(totaldevpostuatbilled);
    Ext.ComponentQuery.query('#TotalPostUATDevBookedLabel')[0].setText(totaldevpostuatbooked);

    Ext.ComponentQuery.query('#TotalBATCBilledLabel')[0].setText(ddbilledhours);
    Ext.ComponentQuery.query('#TotalBATCBookedLabel')[0].setText(ddbookedhours);
    Ext.ComponentQuery.query('#billableBATCHours')[0].setText(ddbilledhours);

    if ((ddbookedhours - ddbilledhours * 1) < 0) {
        Ext.ComponentQuery.query('#nonBillableBATCHours')[0].setText(0);
    } else {
        Ext.ComponentQuery.query('#nonBillableBATCHours')[0].setText((ddbookedhours - ddbilledhours * 1));
    }
}

Ext.define('CookBook.view.swd.ViewSWDDevAssessment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewSWDDevAssessment',
    width: 1210,
    height: 450,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'SWD Assessments',
    itemId: 'swdTabSWDAssessmentsGrid',
    store: 'SWDAssessments',
    plugins: [viewSWDAssessmentGridCellEditing],
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        header: 'Contact Name',
        dataIndex: 'name',
        flex: 2,
        tdCls: 'column-lines-enabled',
        sortable: false,
        editor: {
            xtype: 'combobox',
            store: 'SWDContacts',
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
                var type = records[0].get('description');
                var value = records.length;
                return '';
                //return ((value === 0 || value > 1) ? '(' + value + ' ' + records[0].get('type') + ' Entries)' : '(1 ' + records[0].get('type') + ' Entry)');
            }
        }
    }, {
        header: 'Type',
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
                        updateTotalDevHours();
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
                        updateTotalDevHours();
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
                        updateTotalDevDates();
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
                        updateTotalDevDates();
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
                        updateTotalDevDates();
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
                    updateTotalDevHours();
                    updateTotalDevDates();
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
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "DEV") || (GLOBAL_permission == "TC"))) {
                readOnly = true;
            }
            store.proxy.extraParams.read_only = readOnly;
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load({
                callback: function(records, operation, success) {
                    Ext.ComponentQuery.query('#SWD')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#SWD')[0].doLayout();
                    Ext.defer(function() {
                        updateTotalDevHours();
                        updateTotalDevDates();
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
            var gridPanel = panel.up();
            Ext.create("Ext.Window", {
                title: "Add SWD Assessment",
                modal: true,
                width: 400,
                bodyStyle: "padding:10px",
                items: [{
                    xtype: 'label',
                    width: 375,
                    html: "<b>Please select which SWD Assessment type to add.</b><br /><br />"
                }, {
                    xtype: 'combobox',
                    width: 375,
                    editable: false,
                    store: {
                        fields: ['type'],
                        data: [{
                            'type': 'BA/TC Design & Documentation'
                        }, {
                            'type': 'Workflow'
                        }, {
                            'type': 'Requirements Clarification - Post Auth'
                        }, {
                            'type': 'Coding'
                        }, {
                            'type': 'MIS CF Labels'
                        }, {
                            'type': 'Testing/Implementation'
                        }, {
                            'type': 'MIS Other'
                        }, {
                            'type': 'QA'
                        }, {
                            'type': 'UAT Support'
                        }, {
                            'type': 'Project Overhead'
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
                    name: 'swdTabSWDAssessmentTypeCombobox',
                    itemId: 'swdTabSWDAssessmentTypeCombobox'
                }],
                buttons: [{
                    text: "Add Selected Assessment",
                    itemId: 'swdTabAddAssessmentButton',
                    handler: function() {
                        var eto = this;
                        var choice = Ext.ComponentQuery.query('#swdTabSWDAssessmentTypeCombobox')[0].getValue();
                        var submittedval = "";
                        switch (choice) {
                        case "BA/TC Design & Documentation":
                            {
                                submittedval = "Design/Documentation";
                                break;
                            }
                        case "Workflow":
                            {
                                submittedval = "Workflow";
                                break;
                            }
                        case "Requirements Clarification - Post Auth":
                            {
                                submittedval = "Requirements Clarification";
                                break;
                            }
                        case "Coding":
                            {
                                submittedval = "Coding";
                                break;
                            }
                        case "MIS CF Labels":
                            {
                                submittedval = "MIS";
                                break;
                            }
                        case "Testing/Implementation":
                            {
                                submittedval = "Testing/Implementation";
                                break;
                            }
                        case "MIS Other":
                            {
                                submittedval = "MIS Other";
                                break;
                            }
                        case "QA":
                            {
                                submittedval = "QA";
                                break;
                            }
                        case "UAT Support":
                            {
                                submittedval = "UAT Support";
                                break;
                            }
                        case "Project Overhead":
                            {
                                submittedval = "Project Overhead";
                                break;
                            }
                        default:
                            {
                                submittedval = "Workflow";
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
                            var choice = Ext.ComponentQuery.query('#swdTabAddAssessmentButton')[0].disable();
                            Ext.defer(function() {
                                if (Ext.ComponentQuery.query('#swdTabAddAssessmentButton')[0]) {
                                    var choice = Ext.ComponentQuery.query('#swdTabAddAssessmentButton')[0].enable();
                                }
                            }, 500);
                        } else {
                            console.log('choice is not valid');
                        }
                    }
                }, {
                    text: "Finished",
                    handler: function() {
                        var store = Ext.ComponentQuery.query('#swdTabSWDAssessmentsGrid')[0].getStore();
                        var readOnly = false;

                        store.proxy.extraParams.read_only = readOnly;
                        store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                        store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
                        store.load({
                            callback: function(records, operation, success) {
                                Ext.ComponentQuery.query('#SWD')[0].doComponentLayout();
                                Ext.ComponentQuery.query('#SWD')[0].doLayout();
                                Ext.defer(function() {
                                    updateTotalDevHours();
                                    updateTotalDevDates();
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
            Ext.ComponentQuery.query('#SWD')[0].doComponentLayout();
            Ext.ComponentQuery.query('#SWD')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#SWD')[0].doComponentLayout();
            Ext.ComponentQuery.query('#SWD')[0].doLayout();
        }
    }
});