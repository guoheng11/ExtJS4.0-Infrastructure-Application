var viewSystemsEngineeringGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#sysTabSysEngineeringGrid')[0];
            grid.getView().refresh();
        }
    }
});

function updateTotalSysDates() {
    var grid = Ext.ComponentQuery.query('#sysTabSysEngineeringGrid')[0];
    var count = grid.getStore().getCount();

    var scheduledSysStartDate = "";
    var scheduledSysCompleteDate = "";
    var actualSysCompleteDate = "";

    for (var k = 0; k < count; k++) {
        if (grid.getStore().getAt(k)) {
            if (grid.getStore().getAt(k).get('scheduled_start')) {
                if (scheduledSysStartDate == "") {
                    scheduledSysStartDate = grid.getStore().getAt(k).get('scheduled_start');
                } else {
                    if (isNaN(Date.parse(scheduledSysStartDate))) {
                        scheduledSysStartDate = grid.getStore().getAt(k).get('scheduled_start');
                    } else {
                        if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_start')))) {
                            if (Date.parse(grid.getStore().getAt(k).get('scheduled_start')) < Date.parse(scheduledSysStartDate)) {
                                scheduledSysStartDate = grid.getStore().getAt(k).get('scheduled_start');
                            }
                        }
                    }
                }
            }

            if (grid.getStore().getAt(k).get('scheduled_complete')) {
                if (scheduledSysCompleteDate == "") {
                    scheduledSysCompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                } else {
                    if (isNaN(Date.parse(scheduledSysCompleteDate))) {
                        scheduledSysCompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                    } else {
                        if (!isNaN(Date.parse(grid.getStore().getAt(k).get('scheduled_complete')))) {
                            if (Date.parse(grid.getStore().getAt(k).get('scheduled_complete')) > Date.parse(scheduledSysCompleteDate)) {
                                scheduledSysCompleteDate = grid.getStore().getAt(k).get('scheduled_complete');
                            }
                        }
                    }
                }
            }

            if (grid.getStore().getAt(k).get('actual_complete')) {
                if (actualSysCompleteDate == "") {
                    actualSysCompleteDate = grid.getStore().getAt(k).get('actual_complete');
                } else {
                    if (isNaN(Date.parse(actualSysCompleteDate))) {
                        actualSysCompleteDate = grid.getStore().getAt(k).get('actual_complete');
                    } else {
                        if (!isNaN(Date.parse(grid.getStore().getAt(k).get('actual_complete')))) {
                            if (Date.parse(grid.getStore().getAt(k).get('actual_complete')) > Date.parse(actualSysCompleteDate)) {
                                actualSysCompleteDate = grid.getStore().getAt(k).get('actual_complete');
                            }
                        }
                    }
                }
            }
        }
    }!isNaN(Date.parse(scheduledSysStartDate)) ? Ext.ComponentQuery.query('#scheduledSystemsStart')[0].setRawValue(prvFormatDate(scheduledSysStartDate)) : Ext.ComponentQuery.query('#scheduledSystemsStart')[0].setRawValue(scheduledSysStartDate);
    !isNaN(Date.parse(scheduledSysCompleteDate)) ? Ext.ComponentQuery.query('#scheduledSystemsComplete')[0].setRawValue(prvFormatDate(scheduledSysCompleteDate)) : Ext.ComponentQuery.query('#scheduledSystemsComplete')[0].setRawValue(scheduledSysCompleteDate);
    !isNaN(Date.parse(actualSysCompleteDate)) ? Ext.ComponentQuery.query('#actualSystemsComplete')[0].setRawValue(prvFormatDate(actualSysCompleteDate)) : Ext.ComponentQuery.query('#actualSystemsComplete')[0].setRawValue(actualSysCompleteDate);
}

Ext.define('CookBook.view.systems.ViewSystemsSystemsAssessment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewSystemsSystemsAssessment',
    width: 1210,
    height: 200,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'System Engineering',
    itemId: 'sysTabSysEngineeringGrid',
    store: 'SystemsAssessments',
    plugins: [viewSystemsEngineeringGridCellEditing],
    features: [{
        ftype: 'summary'
    }],
    columns: [{
        text: 'Description',
        flex: 2,
        dataIndex: 'description',
        tdCls: 'column-lines-enabled',
        hideable: false,
        editor: {
            xtype: 'textfield'
        },
        summaryType: function(records) {
            if (records.length > 0) {
                var type = records[0].get('description');
                var value = records.length;
                return ((value === 0 || value > 1) ? '(' + value + ' Entries)' : '(1 Entry)');
            }
        }
    }, {
        header: 'Contact Name',
        dataIndex: 'name',
        tdCls: 'column-lines-enabled',
        flex: 2,
        editor: {
            xtype: 'combobox',
            store: 'SystemsContacts',
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
        }
    }, {
        header: 'Billed Hours',
        dataIndex: 'billed_hours',
        tdCls: 'column-lines-enabled',
        flex: .8,
        editor: {
            xtype: 'numberfield',
            minValue: 0
        },
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('billed_hours') * 1;
            }
            return total + " Billed";
        }
    }, {
        header: 'Booked Hours',
        dataIndex: 'booked_hours',
        tdCls: 'column-lines-enabled',
        flex: .8,
        editor: {
            xtype: 'numberfield',
            minValue: 0
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
        sortable: true,
        dataIndex: 'target_start',
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
        summaryType: 'max',
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
        sortable: true,
        dataIndex: 'target_complete',
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
        sortable: true,
        dataIndex: 'scheduled_start',
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
                        updateTotalSysDates();
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
        sortable: true,
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
                        updateTotalSysDates();
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
        sortable: true,
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
                        updateTotalSysDates();
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

        hideable: false,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex) {

                if (GLOBAL_readonly) {
                    return;
                }
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
            }
        }]
    }],
    tools: [
    /*{
        type: 'gear',
        tooltip: 'test',
        handler: function(event, toolEl, panel) {
            var store = Ext.ComponentQuery.query('#sysTabSysEngineeringGrid')[0].getStore();
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load();
        }
    }, */
    {
        type: 'plus',
        tooltip: 'Add an entry to this table',
        handler: function(event, toolEl, panel) {
            if (GLOBAL_readonly) {
                return;
            }
            var gridPanel = panel.up();
            if (gridPanel.collapsed) {
                gridPanel.expand(true);
            }
            gridPanel.getStore().add({
                project_id: GLOBAL_currentProjectOpenProjectID
            }); //add an empty row
        }
    }],
    listeners: {
        expand: function() {
            Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
            Ext.ComponentQuery.query('#Systems')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
            Ext.ComponentQuery.query('#Systems')[0].doLayout();
        }
    }
});