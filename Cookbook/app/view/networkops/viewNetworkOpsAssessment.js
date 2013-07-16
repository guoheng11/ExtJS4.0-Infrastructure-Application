var viewNetOpsAssessmentGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#netopsTabNetworkOpsAssessmentGrid')[0];
            grid.getView().refresh();
        }
    }
});

function updateNetworkOpsTotalHours() {
    var grid = Ext.ComponentQuery.query('#netopsTabNetworkOpsAssessmentGrid')[0];
    var count = grid.getStore().getCount();

    var totalnetopshours = 0;

    var totalNetOpsTypesToCheck = new Array();
    totalNetOpsTypesToCheck.push("Network OPS");

    for (var k = 0; k < count; k++) {
        if (totalNetOpsTypesToCheck.indexOf(grid.getStore().getAt(k).get('type')) != -1) {
            totalnetopshours += grid.getStore().getAt(k).get('hours') * 1;
        }
    }

    Ext.ComponentQuery.query('#totalNetworkOpsHours')[0].setText(totalnetopshours);
    Ext.ComponentQuery.query('#submittedTotalNetworkOpsHours')[0].setValue(totalnetopshours);
}

Ext.define('CookBook.view.networkops.ViewNetworkOpsAssessment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewNetworkOpsAssessment',
    width: 1210,
    height: 200,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'Network Operations Assessments',
    itemId: 'netopsTabNetworkOpsAssessmentGrid',
    store: 'NetworkOpsAssessments',
    plugins: [viewNetOpsAssessmentGridCellEditing],
    features: [{
        ftype: 'summary'
    }],
    columns: [{
        text: 'Description',
        flex: 2,
        dataIndex: 'action',
        tdCls: 'column-lines-enabled',
        hideable: false,
        editor: {
            xtype: 'textfield'
        },
        summaryType: function(records) {
            if (records.length > 0) {
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
            store: 'NetworkOpsContacts',
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
            lastQuery: ''
        }
    }, {
        header: 'Billed Hours',
        dataIndex: 'hours',
        tdCls: 'column-lines-enabled',
        flex: .8,
        editor: {
            xtype: 'numberfield',
            minValue: 0,
            listeners: {
                blur: function() {
                    Ext.defer(function() {
                        updateNetworkOpsTotalHours();
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
        sortable: true,
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
        sortable: true,
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
                if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "QA"))) {
                    return;
                }
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
                updateNetworkOpsTotalHours();
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
            store.proxy.extraParams.user_name = GLOBAL_username; 
            store.load({
                callback: function(records, operation, success) {
                    Ext.ComponentQuery.query('#NetworkOps')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#NetworkOps')[0].doLayout();
                    Ext.defer(function() {
                        updateNetworkOpsTotalHours();
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
            Ext.ComponentQuery.query('#NetworkOps')[0].doComponentLayout();
            Ext.ComponentQuery.query('#NetworkOps')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#NetworkOps')[0].doComponentLayout();
            Ext.ComponentQuery.query('#NetworkOps')[0].doLayout();
        }
    }
});