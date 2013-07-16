Ext.define('CookBook.view.editors.ViewEmailRequestForms', {});

function openEmailWindow(type) {
    centerPanel = Ext.create('Ext.form.Panel', {
        region: 'center',
        height: 590,
        width: 655,
        items: [{
            xtype: 'combobox',
            width: 650,
            itemId: 'emailTo',
            name: 'emailTo',
            labelAlign: 'left',
            fieldLabel: 'To',
            margin: '5 0 10 10',
            store: 'ContactsEmailWindow',
            //options
            typeAhead: false,
            displayField: 'email1',
            valueField: 'email1',
            matchFieldWidth: true,
            multiSelect: true,
            delimiter: '; ',
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            lastQuery: '',
            queryMode: 'local',
            listeners: {
                expand: function() {
                    this.store.clearFilter();
                },
                collapse: function() {
                    this.store.clearFilter();
                }
            }
        }, {
            xtype: 'combobox',
            width: 650,
            itemId: 'emailCc',
            name: 'emailCc',
            labelAlign: 'left',
            fieldLabel: 'Cc',
            margin: '5 0 10 10',
            store: 'ContactsEmailWindow',
            //options
            triggerAction: 'all',
            typeAhead: false,
            displayField: 'email1',
            valueField: 'email1',
            matchFieldWidth: true,
            multiSelect: true,
            delimiter: '; ',
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            lastQuery: '',
            queryMode: 'local',
            listeners: {
                expand: function() {
                    this.store.clearFilter();
                },
                collapse: function() {
                    this.store.clearFilter();
                }
            }
        }, {
            xtype: 'combobox',
            width: 650,
            itemId: 'emailBcc',
            name: 'emailBcc',
            labelAlign: 'left',
            fieldLabel: 'Bcc',
            margin: '5 0 10 10',
            store: 'ContactsEmailWindow',
            //options
            triggerAction: 'all',
            typeAhead: false,
            displayField: 'email1',
            valueField: 'email1',
            matchFieldWidth: true,
            multiSelect: true,
            delimiter: '; ',
            listConfig: {
                autoHeight: true,
                loadMask: false
            },
            lastQuery: '',
            queryMode: 'local',
            listeners: {
                expand: function() {
                    this.store.clearFilter();
                },
                collapse: function() {
                    this.store.clearFilter();
                }
            }
        }, {
            xtype: 'textfield',
            name: 'emailSubject',
            width: 650,
            itemId: 'emailSubject',
            labelAlign: 'left',
            fieldLabel: 'Subject',
            margin: '5 0 10 10'
        }, {
            xtype: 'htmleditor',
            name: 'emailBody',
            width: 650,
            height: 370,
            itemId: 'emailBody',
            margin: '5 0 10 10',
            listeners: {
                afterrender: function() {
                    this.setValue("");
                }
            }
        }, {
            xtype: 'button',
            text: 'Send',
            margin: '5 5 5 5',
            handler: function() {
                var form = this.up('panel').up('panel').getForm();
                var jsonBlob = Ext.JSON.encode(this.up('panel').up('panel').getForm().getValues(false, false, true));
                if (form.isValid()) {
                    console.log('valid, submitting');
                    form.submit({
                        url: 'GetEmailRequest.ashx',
                        waitMsg: 'Attempting to send Email...',
                        jsonData: jsonBlob,
                        params: {
                            user_name: GLOBAL_username,
                            jsonBlob: jsonBlob
                        },
                        success: function(fp, o) {
                            var obj = Ext.decode(o.response.responseText);
                            Ext.Msg.alert('Success', 'Your email has been sent.'); // + obj.rows[0]);

                            Ext.ComponentQuery.query('#emailMainPanel')[0].doLayout();

                            //(smm) Note the send in the project history
                            var store = GLOBAL_currentController.getStore('ProjectHistories');
                            store.add({
                                project_id: GLOBAL_currentProjectOpenProjectID,
                                user_name: GLOBAL_username,
                                date: new Date(),
                                description: 'Sent ' + type
                            });
                        },
                        failure: function(fp, action) {
                            var obj = Ext.decode(action.response.responseText);
                            Ext.Msg.alert('Failure', 'Your email was not sent.' + obj.rows[0]);

                            Ext.ComponentQuery.query('#emailMainPanel')[0].doLayout();
                        }
                    });
                }
            }
        }]
    });

    attachmentMainPanel = Ext.create('Ext.form.Panel', {
        region: 'east',
        collapsible: true,
        collapsed: true,
        xtype: 'panel',
        bodyPadding: 5,
        width: 355,
        height: 590,
        title: 'Attachments',
        layout: 'vbox',
        bbar: [{
            xtype: 'button',
            text: 'Attach Another Item',
            width: 350,
            handler: function() {
                var additionalPanel = Ext.create('attachmentPanelItem');
                this.up('panel').down('#attachmentPanel').add(additionalPanel);
            }
        }],
        items: [{
            xtype: 'panel',
            flex: 1,
            width: 350,
            name: 'attachmentPanel',
            autoScroll: true,
            itemId: 'attachmentPanel',
            items: []
        }],
        listeners: {
            afterrender: function() {
                var additionalPanel = Ext.create('attachmentPanelItem');
                this.down('#attachmentPanel').add(additionalPanel);
            }
        }
    });


    mainPanel = Ext.create('Ext.form.Panel', {
        width: 729,
        bodyPadding: 5,
        itemId: 'emailMainPanel',
        height: 566,
        layout: 'border',
        items: [centerPanel, attachmentMainPanel]
    });

    win = Ext.create('widget.window', {
        title: 'Create Email - ' + type + ' From ' + GLOBAL_username,
        width: 740,
        modal: true,
        resizable: false,
        height: 600,
        //layout: 'fit',
        items: [mainPanel],
        listeners: {
            beforeclose: function() {
                Ext.getBody().unmask();
            }
        }
    });

    Ext.define('attachmentPanelItem', {
        bodyPadding: 5,
        extend: 'Ext.panel.Panel',
        bodyborder: false,
        layout: 'hbox',
        items: [{
            xtype: 'filefield',
            name: 'uploaded_file1',
            fieldLabel: '',
            msgTarget: 'side',
            allowBlank: false,
            anchor: '100%',
            flex: 5,
            allowBlank: true,
            buttonText: 'Browse'
        }, {
            xtype: 'button',
            text: 'Delete',
            flex: 1,
            handler: function() {
                this.up('panel').up('panel').remove(this.up('panel'));
            }
        }]
    });

    if (GLOBAL_currentController.getStore('ContactsEmailWindow').getCount() < 1) {
        GLOBAL_currentController.getStore('ContactsEmailWindow').load({
            callback: function() {
                if (GLOBAL_currentController.getStore('EmailTemplates').getCount() < 1) {
                    GLOBAL_currentController.getStore('EmailTemplates').load({
                        callback: function() {
                            if (GLOBAL_projectCurrentlyOpen != false) {
                                doTemplateLoading(type);
                            }
                        }
                    });
                }
            }
        });
    } else {
        if (GLOBAL_currentController.getStore('EmailTemplates').getCount() < 1) {
            GLOBAL_currentController.getStore('EmailTemplates').load({
                callback: function() {
                    if (GLOBAL_projectCurrentlyOpen != false) {
                        doTemplateLoading(type);
                    }
                }
            });
        } else {
            doTemplateLoading(type);
        }
    }
}

function doTemplateLoading(type) {
    Ext.getBody().mask("Loading Template...");
    var store = GLOBAL_currentController.getController('Cookbook').getStore('EmailTemplates');
    var fields;
    store.proxy.extraParams.type = type;
    store.proxy.extraParams.project_id = GLOBAL_currentProjectOpenProjectID;
    store.proxy.extraParams.urlinfo = GLOBAL_pageURL;
    store.load({
        callback: function(records, operation, success) {
            if (records) {
                if ((records.length > 0) && success) {
                    win.show(undefined, function() {
                        /*
                     console.log(records[0].get('template_type'));
                     console.log(records[0].get('template_to'));
                     console.log(records[0].get('template_cc'));
                     console.log(records[0].get('template_bcc'));
                     console.log(records[0].get('template_subject'));
                     console.log(records[0].get('template_body'));
                     */
                        var emailBody = Ext.ComponentQuery.query('#emailBody')[0];
                        emailBody.setValue(records[0].get('template_body'));
                        var emailTo = Ext.ComponentQuery.query('#emailTo')[0];
                        emailTo.setValue(records[0].get('template_to'));
                        var emailCc = Ext.ComponentQuery.query('#emailCc')[0];
                        emailCc.setValue(records[0].get('template_cc'));
                        var emailBcc = Ext.ComponentQuery.query('#emailBcc')[0];
                        emailBcc.setValue(records[0].get('template_bcc'));
                        var emailSubject = Ext.ComponentQuery.query('#emailSubject')[0];
                        emailSubject.setValue(records[0].get('template_subject'));
                    });
                }
                Ext.getBody().unmask();
            } else {
                win.show();
                Ext.getBody().unmask();
            }
        }
    });
}