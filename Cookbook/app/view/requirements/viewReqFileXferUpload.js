Ext.define('CookBook.view.requirements.ViewReqFileXferUpload', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.viewReqFileXferUpload',

    title: 'File Xfer - Upload',
    //collapsible: true,
    //collapseFirst: true,
    collapsed: true,

    store: 'FileXferRequirementUploads',

    columns: [{
        header: 'New?',
        dataIndex: 'new',
        width: 50,
        editor: {
            xtype: 'combobox',
            store: {
                fields: ['new'],
                data: [{
                    'new': 'true'
                }, {
                    'new': 'false'
                }]
            },
            multiSelect: false,
            displayField: 'new',
            valueField: 'new',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'Name',
        dataIndex: 'name',
        width: 250,
        editor: {
            xtype: 'combobox',
            store: 'FileXferUploads',
            multiSelect: false,
            displayField: 'name',
            valueField: 'name',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'UAT or PROD',
        dataIndex: 'uat_or_prod',
        width: 100,
        editor: {
            xtype: 'combobox',
            store: {
                fields: ['uat_or_prod'],
                data: [{
                    'uat_or_prod': 'UAT'
                }, {
                    'uat_or_prod': 'PROD'
                }]
            },
            multiSelect: false,
            displayField: 'uat_or_prod',
            valueField: 'uat_or_prod',
            allowBlank: true,
            matchFieldWidth: true,
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            queryMode: 'local'
        }
    }, {
        header: 'NDM File',
        dataIndex: 'ndm_file',
        editor: {
            xtype: 'textfield'
        },
        width: 200
    }, {
        header: 'Transmission Protocol',
        dataIndex: 'protocol',
        editor: {
            xtype: 'textfield'
        },
        width: 200
    }, {
        header: 'Transmission TimeFrame',
        dataIndex: 'timeframe',
        editor: {
            xtype: 'textfield'
        },
        width: 200
    }, {
        header: 'Sending Site',
        dataIndex: 'send_site',
        editor: {
            xtype: 'textfield'
        },
        width: 200
    }, {
        header: 'Recieving Site',
        dataIndex: 'recv_site',
        editor: {
            xtype: 'textfield'
        },
        width: 200
    }, {
        header: 'USAN Password',
        dataIndex: 'usan_password',
        editor: {
            xtype: 'textfield'
        },
        width: 200
    }, {
        header: 'Notes',
        dataIndex: 'notes',
        editor: {
            xtype: 'textarea'
        },
        width: 200
    }, {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: 'extjs/examples/restful/images/delete.png',
            tooltip: 'click to delete this row',
            handler: function(grid, rowIndex, colIndex) {
                if (GLOBAL_readonly) {
                    return;
                }
                if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                    return;
                }
                grid.getStore().removeAt(rowIndex);
                if (grid.getStore().count() < 1) {
                    this.up('panel').collapse(Ext.Component.DIRECTION_TOP, true);
                }
            }
        }]
    }],
    selType: 'cellmodel',
    plugins: [
    Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    })],
    tools: [{
        type: 'gear',
        tooltip: 'Open the editor utility',
        handler: function(event, toolEl, panel) {
            openFileXferUploadEditor();
        }
    }, {
        type: 'plus',
        tooltip: 'Add another entry to this table',
        handler: function(event, toolEl, panel) {
            if (GLOBAL_readonly) {
                return;
            }
            if (!((GLOBAL_permission == "PM") || (GLOBAL_permission == "TC") || (GLOBAL_permission == "DEV"))) {
                return;
            }
            var gridPanel = panel.up();
            if (gridPanel.collapsed) {
                gridPanel.expand(true);
            }
            gridPanel.getStore().add({
                project_id: GLOBAL_currentProjectOpenProjectID,
                upload_or_download: 'upload'
            }); //add an empty row
        }
    }
    /*,{
        type: 'refresh',
        handler: function(event, toolEl, panel) {
            var gridPanel = panel.up();
            gridPanel.getStore().sync();
        }
    }*/
    ]
});