ContractDateFieldSet = Ext.extend(Ext.form.FieldSet, {	
    initComponent: function() {	    
	    var eto = this;
	    this.mandatoryDates = new Array("Contract Effective Date", "Term Effective Date", "Termination Date", "End of Contract Notice");
	    
        Ext.apply(this, {
	        title: "Dates",
	        anchor:'98%',
	        height: "auto",
	        autoHeight: true,
	        name: 'contract_dates',
	        items: [{
		        xtype: 'button',
		        text: 'Add Custom Date',
		        iconCls: 'add',
		        handler: function(button, event) {
			        if(event) {
				        var newDate = new ContractDateContainer();
				        eto.add(newDate);
				        eto.doLayout();
			        }
		        }
	        }]
	    });
	    this.on('afterrender', function() {
		    if(!this.editContract) {
			    for(var a = 0; a < this.mandatoryDates.length; a++) {
				    this.add(new ContractDateContainer(this.mandatoryDates[a], false));
			    }
			    this.doLayout();
		    }
	    });
        ContractDateFieldSet.superclass.initComponent.apply(this);
    },
    constructor: function(editContract) {
		this.editContract = false;
		if(editContract) {
			this.editContract = true;
		}
        ContractDateFieldSet.superclass.constructor.apply(this);
    },
    getValues: function() {
	    var retArray = new Array();
	    var foundContainers = this.find("dateContainer", true);
	    for(var a = 0; a < foundContainers.length; a++) {
		    retArray.push(foundContainers[a].getValue());
	    }
	    return retArray;
    },
    setValue: function(datesObject) {
	    if(datesObject instanceof Array) {
		    for(var a = 0; a < datesObject.length; a++) {
			    var removeEnabled = true;
			    for(var b = 0; b < this.mandatoryDates.length; b++) {
				    if(datesObject[a].date_name == this.mandatoryDates[b]) {
					    removeEnabled = false;
				    }
			    }
			    var newDate = new ContractDateContainer(datesObject[a].date_name, removeEnabled, datesObject[a].date_due, datesObject[a].alert_required, datesObject[a].alert_due, datesObject[a].date_id);
			    this.add(newDate);
		    }
		    this.doLayout();
	    }
    }
});

ContractDateContainer = Ext.extend(Ext.Panel, {	
    initComponent: function() {	    
	    var eto = this;
	    this.dateTypeTF = new Ext.form.TextField({
		    width: 200,
		    value: this.dateName
	    });
	    
	    this.dueDF = new Ext.form.DateField({
		    value: this.dateDue,
		    width: 120
	    });
	    
	    var dateTypeArray = [
		    ['day(s)', 1],
		    ['week(s)', 7],
		    ['month(s)', 30]
		];
		var dateTypeStore = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'type', type: 'string'},
		       {name: 'type_number', type: 'string'}
		    ],
	        data : dateTypeArray
	    });
	    
	    this.alertRequiredCB = new Ext.form.Checkbox({
		    checked: this.alertRequired,
		    listeners: {
			    'check': function(cb, checked) {
				    if(checked) {
					    //eto.alertDF1.enable();
					    eto.alertTF.enable();
					    eto.alertCB.enable();
					    //eto.alertDF2.enable();
				    } else {
					    //eto.alertDF1.disable();
					    eto.alertTF.disable();
					    eto.alertCB.disable();
					    //eto.alertDF2.disable();
				    }
			    }
		    }
	    });
	    
	    this.alertDF1 = new Ext.form.DisplayField({
		    style: 'padding-left: 5px; padding-right: 2px; padding-top: 3px;',
		    disabled: false,
		    value: 'Alert'
	    });
	    this.alertTF = new Ext.form.TextField({
		    //style: 'margin-left: 3px;',
		    width: 30,
		    disabled: (this.alertRequired) ? false : true,
		    value: (this.alertVal) ? this.alertVal : null,
		    maskRe: /[0-9]/
	    });
	    
	    this.alertCB = new Ext.form.ComboBox({
		    store: dateTypeStore,
		    width: 80,
	        displayField:'type',
	        valueField: 'type_number',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        disabled: (this.alertRequired) ? false : true,
	        triggerAction: 'all',
	        value: (this.alertMod) ? this.alertMod : null,
	        selectOnFocus:true
        });
        
	    this.alertDF2 = new Ext.form.DisplayField({
		    style: 'padding-left: 5px; padding-top: 3px;',
		    cls: 'x-form-item',
		    disabled: false,
		    value: 'before the due date'
	    });
        Ext.apply(this, {
	        layout: 'hbox',
	        height: 30,
	        bodyStyle: 'padding-top: 5px;',
	        items: [{
		        xtype: 'displayfield',
		        cls: 'x-form-item',
		        style: 'padding-top: 3px;',
		        value: 'Type:'
	        },this.dateTypeTF,{
		        xtype: 'displayfield',
		        cls: 'x-form-item',
		        style: 'padding-left: 15px; padding-top: 3px;',
		        value: 'Due:'
	        },this.dueDF,{
		        xtype: 'displayfield',
		        cls: 'x-form-item',
		        style: 'padding-left: 15px; padding-top: 3px;',
		        value: 'Alert Required:'
	        },this.alertRequiredCB,this.alertDF1,this.alertDF1,this.alertTF,this.alertCB,this.alertDF2,{
		        xtype: 'button',
		        style: 'padding-left: 10px;',
		        iconCls: 'reset',
		        handler: function(button, event) {
			        if(event) {
				        eto.ownerCt.remove(eto);
			        }
		        },
		        disabled: !this.removeEnabled
	        }]		        
	    });
	    this.dateContainer = true;
        ContractDateContainer.superclass.initComponent.apply(this);
    },
    constructor: function(dateName, removeEnabled, dateDue, alertRequired, alertDue, dateID) {
	    this.dateName = (dateName) ? dateName : "";
	    if(removeEnabled == undefined || removeEnabled == null) {
		    removeEnabled = true;
	    }
	    this.removeEnabled = removeEnabled;
	    this.dateDue = (dateDue) ? dateDue : "";
	    this.alertRequired = (alertRequired) ? true : false;
	    this.alertDue = (alertDue) ? alertDue : "";
	    // figure out modifier and value
	    this.alertVal = null;
	    this.alertMod = null;
	    if(this.alertDue instanceof Date && this.dateDue instanceof Date) {
		    if(this.alertDue.getFullYear() >= 2000) {
			    if(this.alertDue.getDate() == this.dateDue.getDate()) {
				    this.alertMod = 30;
				    this.alertVal =  this.dateDue.getMonth() - this.alertDue.getMonth();
			    } else {
				    var oneDay = 1000*60*60*24;
				    var daysDiff = Math.ceil((this.dateDue.getTime()-this.alertDue.getTime())/oneDay);
				    if(daysDiff % 7 == 0) {
					    this.alertMod = 7;
					    this.alertVal = daysDiff / 7;
				    } else {
					    this.alertMod = 1;
					    this.alertVal = daysDiff;
				    }
			    }
		    }
	    }
	    
	    this.dateID = dateID;
        ContractDateContainer.superclass.constructor.apply(this);
    },
    getValue: function() {
	    var retObj = new Object();
	    retObj.date_id = this.dateID;
	    retObj.date_name = this.dateTypeTF.getValue();
	    retObj.date_due = this.dueDF.getValue();
	    retObj.alert_required = this.alertRequiredCB.getValue();
	    if(retObj.date_due instanceof Date) {
		    var val = parseInt(this.alertTF.getValue());
		    var mult = this.alertCB.getValue();
		    if(val > 0 && mult > 0) {
		    	retObj.alert_due = this.dueDF.getValue();
		    	if(mult == 30) {
			    	retObj.alert_due.setMonth(retObj.alert_due.getMonth() - val);
		    	} else {
			    	retObj.alert_due.setDate(retObj.alert_due.getDate()-val*mult);
		    	}
	    	}
    	}
    	return retObj;
    }
});
