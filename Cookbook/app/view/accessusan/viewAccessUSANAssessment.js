var viewAccessUSANAssessmentGridCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
        edit: function() {
            var grid = Ext.ComponentQuery.query('#accessUSANAssessmentsGrid')[0];
            grid.getView().refresh();
        }
    }
});

Ext.define('CookBook.view.accessusan.ViewAccessUSANAssessment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewAccessUSANAssessment',
    width: 1410,
    height: 200,
    frame: true,
    collapsible: true,
    collapsed: true,
    title: 'AccessUSAN Assessments',
    itemId: 'accessUSANAssessmentsGrid',
    store: 'AccessUSANReqs',
    plugins: [viewAccessUSANAssessmentGridCellEditing],
    features: [{
        ftype: 'summary'
    }],
    columns: [{
        header: 'New?',
        sortable: false,
        flex: .5,
        dataIndex: 'new',
        tdCls: 'column-lines-enabled',
        editor: {
            xtype: 'checkbox'
        }
    }, {
        header: 'Contact Name',
        dataIndex: 'name',
        tdCls: 'column-lines-enabled',
        flex: 1.5,
        sortable: false,
        editor: {
            xtype: 'combobox',
            store: 'AccessUsanContacts',
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
                var value = records.length;
                return ((value === 0 || value > 1) ? '(' + value + ' Entries)' : '(1 Entry)');
            }
        }
    }, {
        xtype: 'actioncolumn',
        width: 22,
        tdCls: 'column-lines-enabled',
        items: [{
            icon: 'extjs/resources/themes/images/gray/grid/page-next.gif',
            tooltip: 'click to populate correpsonding email',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex).get('name');
                if (GLOBAL_currentController.getStore('AccessUsanContacts').findRecord('name', rec)) {
                    if (GLOBAL_currentController.getStore('AccessUsanContacts').findRecord('name', rec).get('email1')) {
                        email = GLOBAL_currentController.getStore('AccessUsanContacts').findRecord('name', rec).get('email1');
                        if (!Ext.isEmpty(email)) {
                            grid.getStore().getAt(rowIndex).set('email', email);
                        }
                    }
                }
            }
        }]
    }, {
        text: 'E-mail Address',
        flex: 1.5,
        dataIndex: 'email',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        text: 'Login ID',
        flex: 1,
        dataIndex: 'login_id',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        text: 'Table Permission Required',
        flex: 3,
        dataIndex: 'table_permission_required',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'combobox',
            store: 'AccessUsanTables',
            displayField: 'name',
            valueField: 'name',
            typeAhead: false,
            multiSelect: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local',
            emptyText: '',
            lastQuery: ''
        }
    }, {
        text: 'Report Access Required',
        flex: 1,
        dataIndex: 'report_access_required',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        text: 'Read Only Permission',
        flex: 1,
        dataIndex: 'read_only_permission',
        tdCls: 'column-lines-enabled',
        hideable: false,
        sortable: false,
        editor: {
            xtype: 'checkbox'
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
                if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
                    return;
                }
                Ext.defer(function() {
                    //updateTLSIPHours();
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
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM"))) {
                readOnly = true;
            }
            store.proxy.extraParams.read_only = readOnly;
            store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
            store.proxy.extraParams.user_name = GLOBAL_username; //ah 2-14-13 change logging
            store.load({
                callback: function(records, operation, success) {
                    Ext.ComponentQuery.query('#AccessUSAN')[0].doComponentLayout();
                    Ext.ComponentQuery.query('#AccessUSAN')[0].doLayout();
                    Ext.defer(function() {
                        //updateTLSIPHours();
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
                            if (gridPanel.collapsed) {
                                gridPanel.expand(true);
                            }
            gridPanel.getStore().add({
                project_id: GLOBAL_currentProjectOpenProjectID
            });
        }
    }],
    listeners: {
        expand: function() {
            Ext.ComponentQuery.query('#AccessUSAN')[0].doComponentLayout();
            Ext.ComponentQuery.query('#AccessUSAN')[0].doLayout();
        },
        collapse: function() {
            Ext.ComponentQuery.query('#AccessUSAN')[0].doComponentLayout();
            Ext.ComponentQuery.query('#AccessUSAN')[0].doLayout();
        }
    }
});