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
    title: 'Hardware / Software Requirements',
    itemId: 'sysTabHardwareSoftwareGrid',
    store: 'HardwareRequirements',
    plugins: [viewSystemsSoftwareHardwareGridCellEditing],
    features: [
        Ext.create('Ext.grid.feature.GroupingSummary', {
            id: 'groupSummary',
            groupHeaderTpl: '{name}'
        })       
    ],
    columns: [{
        text: 'Description',
        flex: 1,
        sortable: true,
        dataIndex: 'description',
        hideable: false,
        summaryType: 'count',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? '(' + value + ' Hardware/Software Entries)' : '(1 Hardware/Software Entry)');
        },
        editor: {
            xtype: 'textfield'
        }
    }, {

        header: 'Type',
        width: 20,
        sortable: true,
        dataIndex: 'requirement_type'
    }, {
        header: 'Cost Per Item',
        width: 80,
        sortable: true,
        dataIndex: 'cost_per_item',
        summaryType: 'sum',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return Ext.util.Format.usMoney(value);
        },
        field: {
            xtype: 'numberfield'
        },
        summaryRenderer: Ext.util.Format.usMoney
    }, {
        header: 'Quantity per Site',
        width: 75,
        sortable: true,
        dataIndex: 'quantity',
        summaryType: 'sum',
        field: {
            xtype: 'numberfield'
        },
        summaryRenderer: function(value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? value + ' items per site' : value + ' item per site');
        }
    }, {
        header: 'Number of Sites',
        width: 75,
        sortable: true,
        dataIndex: 'number_of_sites',
        summaryType: 'sum',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return value + ' sites';
        },
        field: {
            xtype: 'numberfield'
        }
    }, {
        header: 'Total Item Cost',
        width: 75,
        sortable: false,
        groupable: false,
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return Ext.util.Format.usMoney(record.get('cost_per_item') * record.get('quantity') * record.get('number_of_sites'));
        },
        dataIndex: 'total_item_cost',
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
        width: 80,
        sortable: true,
        dataIndex: 'target_order_date',
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
        width: 80,
        sortable: true,
        dataIndex: 'target_delivery',
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
        width: 80,
        sortable: true,
        dataIndex: 'actual_order_date',
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
        width: 80,
        sortable: true,
        dataIndex: 'actual_delivery_date',
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
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex) {
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
            }
        }]
    }],
    tools: [{
        type: 'gear',
        tooltip: 'test',
        handler: function(event, toolEl, panel) {
            var store = Ext.ComponentQuery.query('#sysTabHardwareSoftwareGrid')[0].getStore();
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load();
        }
    }, {
        type: 'plus',
        tooltip: 'Add another entry to this table',
        handler: function(event, toolEl, panel) {
            var gridPanel = panel.up();
            if (gridPanel.collapsed) {
                gridPanel.expand(true);
            }
            gridPanel.getStore().add({
                project_id: GLOBAL_currentProjectOpenProjectID
            }); //add an empty row
        }
    }]
});