AssumptionContainer = Ext.extend(Ext.form.FieldSet, {
	assumptionId: '',
	optionId: '',
	text: '',
	readOnly: false,
	standardCB: '',
	textArea: '',
	dragButton: '',
	removeDF: '',
	standard: '',
	topContainerPanel: '',
	savedLabel: '',
	saving: false,
	order: '',
	//debug orderLabel: '', //deleteme
	
	initComponent:function() {
		var eto = this;
		removeHandler = function(button, event) {
	    	if(event) {
		    	eto.onRemoval(eto);
	    	}
		};
		upHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('up', eto);
	    	}
		};
		downHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('down', eto);
	    	}
		};
		
		topHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('top', eto);
	    	}
		};
		
		bottomHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('bottom', eto);
	    	}
		};
		this.savedLabel = new Ext.form.DisplayField({
			value: (this.assumptionId < 0) ? 'NOT SAVED' : 'Saved',
			fieldClass: (this.assumptionId < 0) ? 'cook-red-text' : 'cook-green-text',
			style: 'padding-left: 20'
		});
		//debug this.orderLabel = new Ext.form.DisplayField({
		//debug 	value: this.order,
		//debug 	style: 'padding-left: 20',
		//debug });
		this.textArea = new Ext.form.TextArea({
            style: 'padding: 5',
            grow: true,
            growMin: 30,
            width: 515,
            //autoHeight: true,
            disabled: this.readOnly,
            enableKeyEvents: true,
            value: this.text
    	});
    	this.textArea.on('keyup', function(field, e) {
	    	eto.setSaved(false);
    	});
    	this.standardCB = new Ext.form.Checkbox({
            boxLabel: '<span style="font-size:11px">Standard</span>',
            inputValue: 'true',
            checked: this.standard
        });
        this.removeDF = new Ext.form.DisplayField({
            value: 'Remove',
            fieldClass: 'cook-normal-text'
        });
    	
    	this.upButton = new Ext.Button({
            iconCls:'up',
            style: 'padding-left: 5',
            handler: upHandler,
            disabled: false,
            tooltip: 'Move it up'
    	});
    	
    	this.downButton = new Ext.Button({
            iconCls:'down',
            style: 'padding-left: 5',
            handler: downHandler,
            disabled: false,
            tooltip: 'Move it down'
    	});
    	
    	this.topButton = new Ext.Button({
            iconCls:'top',
            style: 'padding-left: 5',
            handler: topHandler,
            disabled: false,
            tooltip: 'Move it to the top'
    	});
    	
    	this.bottomButton = new Ext.Button({
            iconCls:'bottom',
            style: 'padding-left: 5',
            handler: bottomHandler,
            disabled: false,
            tooltip: 'Move it to the bottom'
    	});
    	
    	this.topContainerPanel = new Ext.Panel({
	    	//bodyStyle: 'padding:5 5;',
	    	mainPanel: this,
            layout: 'table',
            style: 'padding: 0',
            layoutConfig: {
			    columns: 9
			},
            defaults: {
	            //style: 'padding: 10;'
            },
        	items: [this.standardCB,{
                xtype: 'button',
                itemId:'removeButton',
	            iconCls:'remove',
	            tooltip: 'Delete Note',
	            text: 'Remove',
	            style: 'padding-left: 5',
	            handler: removeHandler,
	            disabled: this.readOnly
        	}, {
	        	xtype: 'displayfield',
	        	style: 'padding-left: 10; padding-right: 10;',
	        	cls: 'cook-normal-text',
	        	value: "<b>Created By:</b> "+this.createdBy
        	}, this.savedLabel]
    	});
    	this.rightContainerPanel = new Ext.Panel({
	    	//bodyStyle: 'padding:5 5;',
	    	style: "vertical-align:bottom",
	    	mainPanel: this,
	    	rowspan: 2,
            layout: 'table',
            layoutConfig: {
			    columns: 1
			},
            defaults: {
	            //style: 'padding: 10;'
            },
        	items: [this.topButton, this.upButton, this.downButton, this.bottomButton]
    	});
    	
	    Ext.apply(this, {
		    myType: 'AssumptionContainer',
		    layout: 'table',
		    listeners: {
			    change: function(field,newValue,oldValue) {
				    eto.saving = true;
				    eto.submitInfo(eto);
			    }
		    },
		    layoutConfig: {
			    columns: 2
			},
		    animCollapse: false,
		    style: 'padding: 2px',
		    items: [this.topContainerPanel,this.rightContainerPanel,this.textArea]
		});
		
	    this.addEvents('changed');
	    this.standardCB.on('afterrender', function() {
		    eto.standardCB.on('check', function() {
			    eto.submitInfo(eto);
		    });
	    });
	    this.on('afterrender', function() {
		    /*eto.textArea.on('change', function(field,newValue,oldValue) {
			    eto.saving = true;
			    eto.submitInfo(eto);
		    });*/
		    eto.textArea.on('blur', function() {
			    if(!eto.saving) {
			    	eto.submitInfo(eto);//eto.setSaved(true);
		    	}
		    });
		    
		    /*eto.standardCB.on('check', function() {
			    eto.submitInfo(eto);
		    });*/
		    
		    if(eto.assumptionId < 0) {
			    //eto.setSaved(false);
		    }
		});
		this.addEvents('up', 'down', 'top', 'bottom');

    	AssumptionContainer.superclass.initComponent.call(this);
    },
    constructor: function(optionId,thisText,stand,thisAssumptionId, orderNum, createdBy) {
	    var eto = this;
	    this.optionId = optionId;
	    this.assumptionId = thisAssumptionId;
    	this.standard = stand;
	    if(thisText) {
	    	this.text = thisText;
    	}
    	this.createdBy = createdBy;
	    this.order = orderNum;
		AssumptionContainer.superclass.constructor.call(this);
    },
    onRemoval: function() {
	    var eto = this;
	    if(eto.assumptionId >= 0) {
		    Ext.Ajax.request({
				url: 'DeleteAssumption.ashx',
			    method: 'POST',
			    params: {'assumption_id': eto.assumptionId},
			    failure: function() {
				    Ext.MessageBox.alert('Error','Submission Error');
			    },
			    success: function(response, opts) {
				    var jsonResponse = Ext.util.JSON.decode(response.responseText);
				    if(jsonResponse.success != null) {
				    	if(jsonResponse.success) {
					    	eto.ownerCt.removedThisOne(eto.text);
					    	eto.ownerCt.remove(eto);
			    		} else if(!jsonResponse.success) {
					    	if(jsonResponse.rows) {
					    		Ext.Msg.alert('Failed', 'Deletion Failed');
				    		}
			    		}
					} else {
			    		Ext.Msg.alert('Failed', 'Deletion Failed. No Success Flag.');
		    		}
			    }
			});
	    } else {
		    eto.ownerCt.remove(eto);
	    }
    },
    submitInfo: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    if(this.assumptionId >= 0) {
	    	objectToSend.assumption_id = this.assumptionId;
    	} else {
	    	objectToSend.option_id = this.optionId;
    	}
	    objectToSend.text = this.textArea.getValue();
	    if(this.standardCB.getValue() == true) {
		    objectToSend.standard = "true";
	    } else {
		    objectToSend.standard = "false";
	    }
	    objectToSend.order = this.order;
	    
	    Ext.Ajax.request({
			url: 'UpdateAssumption.ashx',
		    method: 'POST',
		    params: objectToSend,
		    failure: function() {
			    Ext.MessageBox.alert('Error','Submission Error');
		    },
		    success: function(response, opts) {
			    var jsonResponse = Ext.util.JSON.decode(response.responseText);
			    if(jsonResponse.success != null) {
			    	if(jsonResponse.success) {
				    	if(eto.assumptionId < 0) {
				    		if(jsonResponse.rows[0]) {
					    		eto.assumptionId = jsonResponse.rows[0].assumption_id;
				    		}
			    		}
			    		eto.setSaved(true);
			    		eto.saving = false;
			    		eto.ownerCt.updateOrders(jsonResponse.rows[0].assumption_order);
		    		} else if(!jsonResponse.success) {
				    	if(jsonResponse.rows) {
				    		Ext.Msg.alert('Failed', 'Submission Failed');
			    		}
			    		eto.saving = false;
		    		}
				} else {
		    		Ext.Msg.alert('Failed', 'Submission Failed. No Success Flag.');
		    		eto.saving = false;
	    		}
		    }
		});
	},
	    
    getText: function() {
	    return this.textArea.getValue();
    },
    getCreatedBy: function() {
	    return this.createdBy;
    },
    getStandard: function() {
	    return this.standardCB.getValue();
    },
    getMyId: function() {
	    return this.assumptionId;
    },
    setSaved: function(saved) {
	    if(saved) {
		    this.savedLabel.setValue("Saved");
		    this.savedLabel.removeClass("cook-red-text");
		    this.savedLabel.addClass("cook-green-text");
		    this.doLayout();
		} else {
			this.savedLabel.setValue("NOT SAVED");
		    this.savedLabel.removeClass("cook-green-text");
		    this.savedLabel.addClass("cook-red-text");
		    this.doLayout();
		}
	}
});