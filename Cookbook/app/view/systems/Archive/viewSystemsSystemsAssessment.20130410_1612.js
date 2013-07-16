Ext.define('systemsEngineeringContainer', {
    alias: 'widget.systemsEngineeringContainer',
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyBorder: false,
    autoScroll: true,
    preventHeader: false,
    title: 'Systems Engineering',
    itemId: 'systemsEngineeringContainer',
    border: false,
    height: 170,
    collapsed: true,
    width: 1200,
    frame: true,
    items: [],
    bbar: [{
        xtype: 'label',
        width: 262,
        html: '<b>Total Systems Hours:</b>'
    }, {
        xtype: 'label',
        width: 110,
        text: '0',
        itemId: 'systemsEngineeringBilledLabel'
    }, {
        xtype: 'label',
        text: '0',
        itemId: 'systemsEngineeringBookedLabel'
    }],
    tbar: [{
        xtype: 'label',
        width: 20,
        html: ''
    }, {
        xtype: 'label',
        width: 96,
        html: '<b>Description</b>'
    }, {
        xtype: 'label',
        width: 30,
        html: ''
    }, {
        xtype: 'label',
        width: 86,
        html: '<b>Contact Name</b>'
    }, {
        xtype: 'label',
        width: 17,
        html: ''
    }, {
        xtype: 'label',
        width: 50,
        html: '<b>Billed Hours</b>'
    }, {
        xtype: 'label',
        width: 53,
        html: ''
    }, {
        xtype: 'label',
        width: 60,
        html: '<b>Booked Hours</b>'
    }, {
        xtype: 'label',
        width: 55, //set to 65 if need to move below
        html: ''
    }, {
        xtype: 'label',
        width: 65,
        html: '<b>Target Start</b>'
    }, {
        xtype: 'label',
        width: 75,
        html: ''
    }, {
        xtype: 'label',
        width: 90,
        html: '<b>Target Complete</b>'
    }, {
        xtype: 'label',
        width: 35, //set to 55 if need to move below
        html: ''
    }, {
        xtype: 'label',
        width: 90,
        html: '<b>Scheduled Start</b>'
    }, {
        xtype: 'label',
        width: 60,
        html: ''
    }, {
        xtype: 'label',
        width: 100,
        html: '<b>Scheduled Complete</b>'
    }, {
        xtype: 'label',
        width: 45, //set to 55 if need to move below
        html: ''
    }, {
        xtype: 'label',
        width: 100,
        html: '<b>Actual Complete</b>'
    }],
    tools: [{
        type: 'plus',
        tooltip: 'Add another row',
        handler: function(){
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "SYS")) {
                var jsonBlob = Ext.JSON.encode("{test: data}");
                var thisPanel = Ext.ComponentQuery.query('#systemsEngineeringContainer')[0];
                Ext.Ajax.request({
                    url: 'AddSystemsAssessment.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username,
                        permission: GLOBAL_permission
                    },
                    jsonData: jsonBlob,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        console.log(obj.rows[0].systems_req_id);
                        
                        var additionalPanel = Ext.create('systemsEngineeringPanel');
                        additionalPanel.down('hidden').setValue(obj.rows[0].systems_req_id);
                        additionalPanel.down('combobox').setValue(obj.rows[0].name);
                        thisPanel.add(additionalPanel);
                        if (thisPanel.collapsed) {
                            thisPanel.expand(true);
                        }
                    }
                });
            }
        }
    }],
    listeners: {
        checkCollapsibility: function(){
            if (this.items.length > 0 && this.collapsed) {
                this.expand(true);
            }
        }
    }
});

Ext.define('hardwareRequirementsContainer', {
    alias: 'widget.hardwareRequirementsContainer',
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyBorder: false,
    autoScroll: true,
    preventHeader: false,
    title: 'Hardware / Software Requirements',
    itemId: 'hardwareRequirementsContainer',
    border: false,
    height: 170,
    collapsed: true,
    width: 1200,
    frame: true,
    items: [],
    bbar: [{
        xtype: 'label',
        width: 450,
        html: '<b>Total Hardware / Software Charges:</b>'
    }, {
        xtype: 'label',
        text: '$0.00',
        itemId: 'hardwareRequirementsTotalCost'
    }],
    tbar: [{
        xtype: 'label',
        width: 60,
        html: ''
    }, {
        xtype: 'label',
        width: 50,
        html: '<b>Description</b>'
    }, {
        xtype: 'label',
        width: 100,
        html: ''
    }, {
        xtype: 'label',
        width: 50,
        html: '<b>Cost Per Item</b>'
    }, {
        xtype: 'label',
        width: 50,
        html: ''
    }, {
        xtype: 'label',
        width: 60,
        html: '<b>Quantity</b>'
    }, {
        xtype: 'label',
        width: 55, //set to 65 if need to move below
        html: ''
    }, {
        xtype: 'label',
        width: 65,
        html: '<b>Total Item Cost</b>'
    }, {
        xtype: 'label',
        width: 75,
        html: ''
    }, {
        xtype: 'label',
        width: 90,
        html: '<b>Target Order Date</b>'
    }, {
        xtype: 'label',
        width: 35, //set to 55 if need to move below
        html: ''
    }, {
        xtype: 'label',
        width: 90,
        html: '<b>Target Delivery</b>'
    }, {
        xtype: 'label',
        width: 60,
        html: ''
    }, {
        xtype: 'label',
        width: 100,
        html: '<b>Actual Order Date</b>'
    }, {
        xtype: 'label',
        width: 45, //set to 55 if need to move below
        html: ''
    }, {
        xtype: 'label',
        width: 100,
        html: '<b>Actual Delivery</b>'
    }],
    tools: [{
        type: 'plus',
        tooltip: 'Add another row',
        handler: function(){
            if (GLOBAL_readonly) {
                return;
            }
            if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "SYS")) {
                var jsonBlob = Ext.JSON.encode("{test: data}");
                var thisPanel = Ext.ComponentQuery.query('#hardwareRequirementsContainer')[0];
                Ext.Ajax.request({
                    url: 'AddHardwareAssessment.ashx',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {
                        project_id: GLOBAL_currentProjectOpenProjectID,
                        user_name: GLOBAL_username,
                        permission: GLOBAL_permission
                    },
                    jsonData: jsonBlob,
                    success: function(response){
                        var obj = Ext.decode(response.responseText);
                        console.log(obj.rows[0].hardware_req_id);
                        
                        var additionalPanel = Ext.create('hardwareRequirementsPanel');
                        additionalPanel.down('hidden').setValue(obj.rows[0].hardware_req_id);
                        thisPanel.add(additionalPanel);
                        if (thisPanel.collapsed) {
                            thisPanel.expand(true);
                        }
                    }
                });
            }
        }
    }],
    listeners: {
        checkCollapsibility: function(){
            if (this.items.length > 0 && this.collapsed) {
                this.expand(true);
            }
        }
    }
});

Ext.define('CookBook.view.systems.ViewSystemsSystemsAssessment', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.viewSystemsSystemsAssessment',
    //preventHeader: true,
    title: 'Systems Assessment',
    border: false,
    height: 400,
    autoscroll: true,
    bodyborder: false,
    collapsible: true,
    frame: true,
    items: [{
        xtype: 'systemsEngineeringContainer'
    }, {
        xtype: 'hardwareRequirementsContainer'
    }]

});

Ext.define('systemsEngineeringPanel', {
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyborder: false,
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        fieldLabel: '',
        width: 116,
        itemId: 'systemsEngineeringDescription',
        name: 'systemsEngineeringDescription'
    }, {
        xtype: 'label',
        width: 7,
        text: ''
    }, {
        xtype: 'combobox',
        store: 'Contacts',
        fieldLabel: '',
        width: 116,
        displayField: 'name',
        valueField: 'name',
        itemId: 'systemsEngineeringName',
        name: 'systemsEngineeringName',
        typeAhead: false,
        allowBlank: false,
        //forceSelection: true,  //smm
        //editable: false,       //smm
        matchFieldWidth: true,
        listConfig: {
            autoHeight: true,
            loadMask: false
        },
        queryMode: 'local',
        value: '',
        emptyText: '',
        lastQuery: '',
        validator: function(val){
            if (GLOBAL_currentController.getController('Cookbook').getStore('Contacts').find('name', val, 0, false, false, true) != -1) {
                return true;
            }
            else {
                return 'Contact not found. Record changes will not be saved!';
            }
        },
        listeners: {
            render: function(c){
                Ext.QuickTips.register({
                    target: c.getEl(),
                    text: 'Select a contact'
                });
            },
            'change': function(t, nv){
                if (Ext.isEmpty(nv)) {
                    t.setValue('');
                }
            },
            expand: function(){
                this.store.filter([{
                    property: 'company_name',
                    value: 'usan'
                }]);
            },
            collapse: function(){
                this.store.clearFilter();
            }
        }
    }, {
        xtype: 'label',
        width: 8,
        text: ''
    }, {
        xtype: 'numberfield',
        itemId: 'systemsEngineeringBilledHours',
        name: 'systemsEngineeringBilledHours',
        minValue: 0,
        width: 50,
        listeners: {
            change: function(){
                updateTotalSystemsHours();
            }
        }
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'numberfield',
        itemId: 'systemsEngineeringBookedHours',
        name: 'systemsEngineeringBookedHours',
        minValue: 0,
        width: 50,
        listeners: {
            change: function(){
                updateTotalSystemsHours();
            }
        }
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'systemsEngineeringTargetStart',
        name: 'systemsEngineeringTargetStart',
        width: 95
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'systemsEngineeringTargetComplete',
        name: 'systemsEngineeringTargetComplete',
        width: 95
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'systemsEngineeringScheduledStart',
        name: 'systemsEngineeringScheduledStart',
        width: 95,
        listeners: {
            change: function(){
                updateSystemsSchedule();
            }
        }
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'systemsEngineeringScheduledComplete',
        name: 'systemsEngineeringScheduledComplete',
        width: 95,
        listeners: {
            change: function(){
                updateSystemsSchedule();
            }
        }
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'systemsEngineeringActualComplete',
        name: 'systemsEngineeringActualComplete',
        width: 90
    }, {
        xtype: 'label',
        width: 13,
        text: ''
    }, {
        xtype: 'button',
        width: 22,
        icon: 'extjs/examples/restful/images/delete.png',
        tooltip: 'click to delete this row',
        listeners: {
            click: function(){
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "SYS")) {
                    var jsonBlob = Ext.JSON.encode("{test: data}");
                    var thisPanel = this.up('panel');
                    var panel = this.up('panel').up('panel');
                    
                    var assessmentId = this.up('panel').down('hidden').getValue();
                    console.log("AssessmentID to delete:  " + assessmentId);
                    
                    Ext.Ajax.request({
                        url: 'RemoveSystemsAssessment.ashx',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            project_id: GLOBAL_currentProjectOpenProjectID,
                            assessment_id: assessmentId,
                            user_name: GLOBAL_username,
                            permission: GLOBAL_permission
                        },
                        jsonData: jsonBlob,
                        success: function(){
                            var tab = thisPanel.up('panel').up('form');
                            thisPanel.up('panel').remove(thisPanel);
                            updateTotalSystemsHours();
                            updateSystemsSchedule();
                            if (panel.items.length == 0) {
                                panel.collapse(Ext.Component.DIRECTION_TOP, true);
                            }
                        }
                    });
                }
            }
        }
    }, { //smm
        xtype: 'hidden',
        itemId: 'systemsEngineeringAssessmentID',
        name: 'systemsEngineeringAssessmentID',
        value: ''
    }]
});

Ext.define('hardwareRequirementsPanel', {
    bodyPadding: 5,
    extend: 'Ext.panel.Panel',
    bodyborder: false,
    layout: 'hbox',
    items: [{
        xtype: 'textfield',
        itemId: 'hardwareRequirementsName',
        name: 'hardwareRequirementsName'
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'numberfield',
        itemId: 'hardwareRequirementsCostPerItem',
        name: 'hardwareRequirementsCostPerItem',
        minValue: 0,
        defaultValue: 0,
        width: 65,
        listeners: {
            change: function(){
                updateTotalItemCosts();
            }
        }
    }, {
        xtype: 'label',
        width: 45,
        text: ''
    }, {
        xtype: 'numberfield',
        itemId: 'hardwareRequirementsQuantity',
        name: 'hardwareRequirementsQuantity',
        minValue: 0,
        width: 50,
        defaultValue: 0,
        listeners: {
            change: function(){
                updateTotalItemCosts();
            }
        }
    }, {
        xtype: 'label',
        width: 50,
        text: ''
    }, {
        xtype: 'textfield',
        readOnly: true,
        itemId: 'hardwareRequirementsTotalItemCost',
        name: 'hardwareRequirementsTotalItemCost',
        width: 95,
        listeners: {
            change: function(){
            
            }
        }
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'hardwareRequirementsTargetOrderDate',
        name: 'hardwareRequirementsTargetOrderDate',
        width: 95
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'hardwareRequirementsTargetDelivery',
        name: 'hardwareRequirementsTargetDelivery',
        width: 95
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'hardwareRequirementsActualOrderDate',
        name: 'hardwareRequirementsActualOrderDate',
        width: 95
    }, {
        xtype: 'label',
        width: 55,
        text: ''
    }, {
        xtype: 'textDate', //(smm) 'datefield',
        itemId: 'hardwareRequirementsActualDelivery',
        name: 'hardwareRequirementsActualDelivery',
        width: 95
    }, {
        xtype: 'label',
        width: 23,
        text: ''
    }, {
        xtype: 'button',
        width: 22,
        icon: 'extjs/examples/restful/images/delete.png',
        tooltip: 'click to delete this row',
        listeners: {
            click: function(){
                if (GLOBAL_readonly) {
                    return;
                }
                if ((GLOBAL_permission == "PM") || (GLOBAL_permission == "OPM") || (GLOBAL_permission == "SYS")) {
                    var jsonBlob = Ext.JSON.encode("{test: data}");
                    var thisPanel = this.up('panel');
                    var panel = this.up('panel').up('panel');
                    
                    var assessmentId = this.up('panel').down('hidden').getValue();
                    console.log("AssessmentID to delete:  " + assessmentId);
                    
                    Ext.Ajax.request({
                        url: 'RemoveHardwareAssessment.ashx',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            project_id: GLOBAL_currentProjectOpenProjectID,
                            assessment_id: assessmentId,
                            user_name: GLOBAL_username,
                            permission: GLOBAL_permission
                        },
                        jsonData: jsonBlob,
                        success: function(){
                            var tab = thisPanel.up('panel').up('form');
                            thisPanel.up('panel').remove(thisPanel);
                            updateTotalItemCosts();
                            if (panel.items.length == 0) {
                                panel.collapse(Ext.Component.DIRECTION_TOP, true);
                            }
                        }
                    });
                }
            }
        }
    }, { //smm
        xtype: 'hidden',
        itemId: 'hardwareRequirementsAssessmentID',
        name: 'hardwareRequirementsAssessmentID',
        value: ''
    }]
});

function updateTotalSystemsHours(){
    var totalBilledHours = 0;
    var totalBookedHours = 0;
    var i = 0;
    
    var totalSystemsBilled = Ext.ComponentQuery.query('#systemsEngineeringBilledHours');
    for (i = 0; i < totalSystemsBilled.length; i++) {
        totalBilledHours += totalSystemsBilled[i].getValue();
    }
    var totalSystemsBooked = Ext.ComponentQuery.query('#systemsEngineeringBookedHours');
    for (i = 0; i < totalSystemsBooked.length; i++) {
        totalBookedHours += totalSystemsBooked[i].getValue();
    }
    
    var systemsBilledLabel = Ext.ComponentQuery.query('#systemsEngineeringBilledLabel');
    systemsBilledLabel[0].setText(totalBilledHours);
    var systemsBookedLabel = Ext.ComponentQuery.query('#systemsEngineeringBookedLabel');
    systemsBookedLabel[0].setText(totalBookedHours);
    //systems charges for quote labels
    var totalSystemsBilledLabel = Ext.ComponentQuery.query('#billableSystemsHours');
    totalSystemsBilledLabel[0].setText(totalBilledHours);
}

function updateTotalItemCosts(){

    var costPerItem = Ext.ComponentQuery.query('#hardwareRequirementsCostPerItem');
    var quantity = Ext.ComponentQuery.query('#hardwareRequirementsQuantity');
    var totalItemCostField = Ext.ComponentQuery.query('#hardwareRequirementsTotalItemCost');
    var addingUpAllCosts = 0;
    for (var i = 0; i < totalItemCostField.length; i++) {
        var strVersion = (costPerItem[i].getValue() * quantity[i].getValue()) + '';
        addingUpAllCosts += costPerItem[i].getValue() * quantity[i].getValue();
        var formatted = Ext.util.Format.usMoney(strVersion);
        totalItemCostField[i].setValue(formatted);
    }
    
    /*for(var i=0;i<totalItemCostField.length;i++) {
     if (costPerItem[i].getValue() && quantity[i].getValue() && costPerItem[i].getValue() * quantity[i].getValue() > 0) {
     var strVersion = (costPerItem[i].getValue() * quantity[i].getValue()) + '';
     if((strVersion).indexOf('.') == -1) {
     totalItemCostField[i].setValue('$' + costPerItem[i].getValue() * quantity[i].getValue() + '.00');
     } else {
     totalItemCostField[i].setValue('$' + costPerItem[i].getValue() * quantity[i].getValue());
     }
     addingUpAllCosts += costPerItem[i].getValue() * quantity[i].getValue();
     } else {
     totalItemCostField[i].setValue('$0.00');
     }
     }*/
    var totalCosts = Ext.ComponentQuery.query('#hardwareRequirementsTotalCost');
    var totalCostLabel = Ext.ComponentQuery.query('#totalHardwareCharges');
    var addingUpString = addingUpAllCosts + '';
    
    totalCosts[0].setText(Ext.util.Format.usMoney(addingUpString));
    totalCostLabel[0].setText(Ext.util.Format.usMoney(addingUpString));
    /*if(addingUpString.indexOf('.') == -1) {
     totalCosts[0].setText('$' + addingUpAllCosts + '.00');
     totalCostLabel[0].setText('$'+addingUpAllCosts + '.00');
     } else {
     totalCosts[0].setText('$' + addingUpAllCosts);
     totalCostLabel[0].setText('$'+addingUpAllCosts);
     }
     */
}
