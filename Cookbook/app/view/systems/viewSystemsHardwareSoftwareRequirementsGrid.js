var viewSystemsSoftwareHardwareGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#sysTabHardwareSoftwareGrid')[0];
            grid.getView().refresh();
        }
    }
});

Ext.define('CookBook.view.systems.ViewSystemsHardwareSoftwareRequirementsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewSystemsHardwareSoftwareRequirementsGrid',
    width: 1210,
    height: 450,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'Hardware / Software Requirements',
    itemId: 'sysTabHardwareSoftwareGrid',
    store: 'HardwareRequirements',
    plugins: [viewSystemsSoftwareHardwareGridCellEditing],
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        text: 'Description',
        flex: 3,
        dataIndex: 'description',
        tdCls: 'column-lines-enabled',
        hideable: false,
        summaryType: function(records) {
            if (records.length > 0) {
                var type = records[0].get('requirement_type');
                var value = records.length;
                return ((value === 0 || value > 1) ? '(' + value + ' ' + type + ')' : '(1 ' + type + ')');
            }
        },
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: 'Type',
        dataIndex: 'requirement_type'
    }, {
        header: 'Cost Per Item',
        dataIndex: 'cost_per_item',
        tdCls: 'column-lines-enabled',
        flex: .8,
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('cost_per_item') * 1;
            }
            return total;
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return Ext.util.Format.usMoney(value);
        },
        editor: {
            xtype: 'numberfield',
            minValue: 0
        },
        summaryRenderer: Ext.util.Format.usMoney
    }, {
        header: 'Quantity Per Site',
        dataIndex: 'quantity',
        tdCls: 'column-lines-enabled',
        flex: 1,
        summaryType: 'sum',
        field: {
            xtype: 'numberfield',
            minValue: 0
        },
        summaryRenderer: function(value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? value + ' per site' : value + ' per site');
        }
    }, {
        header: 'Number of Sites',
        flex: 1,
        dataIndex: 'number_of_sites',
        tdCls: 'column-lines-enabled',
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? value + ' sites' : value + ' site');
        },
        field: {
            xtype: 'numberfield',
            minValue: 0
        }
    }, {
        header: 'Total Item Cost',
        flex: .8,
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return Ext.util.Format.usMoney(record.get('cost_per_item') * record.get('quantity') * record.get('number_of_sites'));
        },
        dataIndex: 'total_item_cost',
        tdCls: 'column-lines-enabled',
        summaryType: function(records) {
            var i = 0,
                length = records.length,
                total = 0,
                record;

            for (; i < length; ++i) {
                record = records[i];
                total += record.get('cost_per_item') * record.get('quantity') * record.get('number_of_sites');
            }
            return total;
        },
        summaryRenderer: Ext.util.Format.usMoney
    }, {
        header: 'Target Order Date',
        flex: 1,
        sortable: true,
        dataIndex: 'target_order_date',
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
        header: 'Target Delivery Date',
        flex: 1,
        sortable: true,
        dataIndex: 'target_delivery',
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
        header: 'Actual Order Date',
        flex: 1,
        sortable: true,
        dataIndex: 'actual_order_date',
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
        header: 'Actual Delivery Date',
        flex: 1,
        sortable: true,
        dataIndex: 'actual_delivery_date',
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
            var store = Ext.ComponentQuery.query('#sysTabHardwareSoftwareGrid')[0].getStore();
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load();
        }
    },*/
    {
        type: 'plus',
        tooltip: 'Add an entry to this table',
        handler: function(event, toolEl, panel) {
            if (GLOBAL_readonly) {
                return;
            }
            var gridPanel = panel.up();
            Ext.create("Ext.Window", {
                title: "Add Hardware / Software",
                modal: true,
                width: 400,
                bodyStyle: "padding:10px",
                items: [{
                    xtype: 'label',
                    width: 375,
                    html: "<b>Please select which Hardware / Software type to add.</b><br /><br />"
                }, {
                    xtype: 'combobox',
                    width: 375,
                    editable: false,
                    store: {
                        fields: ['type'],
                        data: [{
                            'type': 'One Time Charges'
                        }, {
                            'type': 'Monthly Recurring Charges'
                        }, {
                            'type': 'Annual Recurring Charges'
                        }, {
                            'type': 'Monthly Rental Charges'
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
                    name: 'systemsTabHardwareTypeCombobox',
                    itemId: 'systemsTabHardwareTypeCombobox'
                }],
                buttons: [{
                    text: "Add Selected Requirement",
                    itemId: 'sysTabAddRequirementButton',
                    handler: function() {
                        var eto = this;
                        var choice = Ext.ComponentQuery.query('#systemsTabHardwareTypeCombobox')[0].getValue();
                        if (!Ext.isEmpty(choice)) {
                            console.log('choice made: ' + choice);
                            if (gridPanel.collapsed) {
                                gridPanel.expand(true);
                            }
                            gridPanel.getStore().add({
                                project_id: GLOBAL_currentProjectOpenProjectID,
                                requirement_type: choice
                            }); //add an empty row
                            var choice = Ext.ComponentQuery.query('#sysTabAddRequirementButton')[0].disable();
                            Ext.defer(function() {
                                if (Ext.ComponentQuery.query('#sysTabAddRequirementButton')[0]) {
                                    var choice = Ext.ComponentQuery.query('#sysTabAddRequirementButton')[0].enable();
                                }
                            }, 500);
                        } else {
                            console.log('choice is not valid');
                        }
                    }
                }, {
                    text: "Finished",
                    handler: function() {

                        var store = Ext.ComponentQuery.query('#sysTabHardwareSoftwareGrid')[0].getStore();
                        var readOnly = false;
                        store.proxy.extraParams.read_only = readOnly;
                        store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
                        store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
                        store.load({
                            callback: function(records, operation, success) {
                                Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
                                Ext.ComponentQuery.query('#Systems')[0].doLayout();
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
            Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
            Ext.ComponentQuery.query('#Systems')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#Systems')[0].doComponentLayout();
            Ext.ComponentQuery.query('#Systems')[0].doLayout();
        }
    }
});