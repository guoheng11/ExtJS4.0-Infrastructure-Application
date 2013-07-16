OptionMotherPanel = Ext.extend(Ext.Panel, {
	tabContainer: '',
	projectId: '',
	projectName: '',
	getOptionStore: '',
	topPanel: '',
	optionHolderPanel: '',

    initComponent:function() {
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    
		addOptionHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewOption();
	    	}
		};
		
		resetAuthorizationHandler = function(button, event) {
	    	if(event) {
		    	var mypane = eto.optionHolderPanel;
		    	for(var i = 0; i < eto.optionHolderPanel.items.length; i++) {
			    	if(typeof eto.optionHolderPanel.get(i).resetAuthorization == 'function') {
				    	eto.optionHolderPanel.get(i).resetAuthorization();
			    	}
		    	}
		    	eto.saveOptions();
	    	}
		};

	    this.topPanel = new Ext.Panel({
	        layout: 'table',
	        hideBorders: true,
            bodyBorder: false,
            border: false,
            layoutConfig: {
			    columns: 9
			},
	        items: [/*{
		        xtype: 'button',
		        text: 'Save Changes',
		        iconCls: 'save',
		        scale: 'medium',
		        style: 'padding: 5',
		        width: 120,
		        handler: saveOptionsHandler
	        },*/{
		        xtype: 'button',
		        text: 'Add New Option',
		        iconCls: 'add',
		        scale: 'medium',
		        style: 'padding: 5',
		        width: 120,
		        handler: addOptionHandler
	        },{
		        xtype: 'button',
		        text: 'Reset Authorization',
		        iconCls: 'reset',
		        scale: 'medium',
		        style: 'padding: 5',
		        width: 120,
		        handler: resetAuthorizationHandler
	        }]
	    });
	    
		this.optionHolderPanel = new Ext.Panel({
			optionCount: 0,
	        layout: 'form',
	        hideBorders: true,
            bodyBorder: false,
            border: false,
	        bodyStyle: 'padding:0 10px 0;',
	        items: []
	    });

	    Ext.apply(this, {
            title:'Options',
            anchor:'95%',
            closable:true,
            hideBorders: true,
            bodyBorder: false,
            border: false,
            //frame: true,
            bodyStyle: 'background:#D3E1F1;',
            defaults: {
	            bodyStyle: 'background:#D3E1F1;'
            },
            layout: 'form',
            items: [this.topPanel,this.optionHolderPanel]
		});
	    	
    	this.on('afterrender', function() {
	    	var myMask = new Ext.LoadMask(this.el, {msg:"Loading Options..."});
			
	        eto.getOptionStore = new Ext.data.Store({
				id: 'getOptionStore',
				proxy: new Ext.data.HttpProxy({
					url: 'GetOptions.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"project_id": this.projectId, "all": "true"}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total'
				}, [
					{name: 'option_id', type: "int", mapping: 'option_id'},
					{name: 'name', type: "string", mapping: 'name'},
					{name: 'quoted_uat_date', type: "string", mapping: 'quoted_uat_date'},
					{name: 'target_uat_date', type: "string", mapping: 'target_uat_date'},
					{name: 'production_date', type: "string", mapping: 'production_date'},
					{name: 'project_id', type: "int", mapping: 'project_id'},
					{name: 'selected', type: "boolean", mapping: 'selected'},
					{name: 'assessments', mapping: 'assessments'}
				])
			});
			eto.getOptionStore.on('beforeload', function() {
				myMask.show();
			});
			
			eto.getOptionStore.on('load', function() {
				eto.loadProject(eto);
				myMask.hide();
			});
			
			//eto.getOptionStore.load();
		});
		
    	activateHandler = function(panel) {
	    	if(panel) {
		    	eto.onActivated(eto);
	    	}
		};
		this.on('activate', activateHandler, this);
		OptionMotherPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId,projName) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.projectName = projName;
		OptionMotherPanel.superclass.constructor.call(this);
    },
    
    addNewOption: function(record, someAuthorized) {
		var eto = this;
		var newOption;
		if(record) {
			newOption = new OptionPanel(this.tabContainer, this.projectId, record, someAuthorized);
		} else {
			newOption = new OptionPanel(this.tabContainer, this.projectId, null, someAuthorized);
		}
    	newOption.on('deleteMe', function() {
	    	if(eto.optionHolderPanel.optionCount > 1) {
		    	eto.optionHolderPanel.optionCount--;
		    	eto.optionHolderPanel.remove(newOption, true);
		    	if(eto.optionHolderPanel.optionCount == 1) {
			    	var optionPanels = eto.optionHolderPanel.find('specialType','OptionPanel');
			    	for(var c = 0; c < optionPanels.length; c++) {
				    	optionPanels[c].nameField.hide();
			    	}
		    	}
		    	eto.saveOptions();
	    	} else {
		    	Ext.MessageBox.alert('Error','Sorry but a project has to have at least one option...');
	    	}
		});
		newOption.on('saveMe', function() {
	    	eto.saveOptions();
		});
		
    	this.optionHolderPanel.add(newOption);
    	this.optionHolderPanel.optionCount++;
    	if(this.optionHolderPanel.optionCount == 1) {
	    	newOption.nameField.hide();
    	}
    	if(this.optionHolderPanel.optionCount == 2) {
	    	var optionPanels = this.optionHolderPanel.find('specialType','OptionPanel');
	    	for(var c = 0; c < optionPanels.length; c++) {
		    	optionPanels[c].nameField.show();
	    	}
    	}
    	this.optionHolderPanel.doLayout();
    	if(!record) {
    		this.saveOptions();
		}
	},
	
    onActivated: function() {
	    if(this.getOptionStore instanceof Ext.data.Store) {
        	this.getOptionStore.reload();
    	}
    },
    
    loadProject: function() {
		this.optionHolderPanel.removeAll(true);
		this.optionHolderPanel.optionCount = 0;
		var someAuthorized = false;
		for(var c = 0; c < this.getOptionStore.getCount(); c++) {
			var record = this.getOptionStore.getAt(c);
			if(record.get('selected')) {
				someAuthorized = true;
			}
		}
	    for(var c = 0; c < this.getOptionStore.getCount(); c++) {
		    var record = this.getOptionStore.getAt(c);
		    this.addNewOption(record, someAuthorized);
	    }
	    this.doLayout();
    },
    saveOptions: function() {
	    var eto = this;
		var optionObjectArray = new Array();
    	var realCount = 0;
    	var mypane = eto.optionHolderPanel;
    	for(var i = 0; i < eto.optionHolderPanel.items.length; i++) {
	    	if(typeof eto.optionHolderPanel.get(i).getValueObject == 'function') {
		    	var optionObject = eto.optionHolderPanel.get(i).getValueObject();
		    	optionObjectArray[realCount] = optionObject;
		    	realCount++;
	    	}
    	}
    	var objToSend = new Object();
    	objToSend.project_id = eto.projectId;
    	objToSend.options = Ext.encode(optionObjectArray);
    	Ext.Ajax.request({
			url: 'UpdateOptions.ashx',
		    method: 'POST',
		    params: objToSend,
		    failure: function() {
			    Ext.MessageBox.alert('Error','Submission Error');
		    },
		    success: function(response, opts) {
			    var jsonResponse = Ext.util.JSON.decode(response.responseText);
			    if(jsonResponse.success != null) {
			    	if(jsonResponse.success) {
				    	//Ext.MessageBox.alert('Success','Options Updated');
				    	eto.getOptionStore.reload();
				    	//eto.ownerCt.remove(eto);
		    		} else if(!jsonResponse.success) {
				    	if(jsonResponse.rows) {
				    		Ext.Msg.alert('Failed', 'Options Update Failed...');
			    		}
		    		}
				} else {
		    		Ext.Msg.alert('Failed', 'Options Update Failed. No Success Flag.');
	    		}
		    }
		});
	}
});

////////////******************************
////////////******************************

OptionPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	buttonPanel: '',
	tabContainer: '',
	nameField: '',
	uatDateField: '',
	prodDateField: '',
	optionId: '',
	nameValue: '',
	uatValue: '',
	prodValue: '',
	specialType: 'OptionPanel',
	swdScheduleButton: '',
	opsScheduleButton: '',
	optionId: '',
	swdAssessmentButton: '',
	opsAssessmentButton: '',
	swdAssessmentDF: '',
	opsAssessmentDF: '',
	authorizeCB: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
		
		swdAssHandler = function(button, event) {
	    	if(event) {
		    	// eto.tabContainer.openNewTab("CreateAssessmentForm",eto.projectId,"SWD");
	    	}
		};
		
		opsAssHandler = function(button, event) {
	    	if(event) {
		    	// eto.tabContainer.openNewTab("CreateAssessmentForm",eto.projectId,"OPS");
	    	}
		};
		
		deleteHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('deleteMe', eto);
	    	}
		};	
		
		
		opsScheduleHandler = function(button, event) {
	    	if(event) {
	    	}
		};
		
		swdScheduleHandler = function(button, event) {
	    	if(event) {
	    	}
		};
		
		this.swdScheduleButton = new Ext.Button({
			text: 'SWD Schedule',
		    handler: swdScheduleHandler,
		    width: 130,
		    style: 'padding: 5',
		    disabled: true
	    });
	    
	    this.opsScheduleButton = new Ext.Button({
			text: 'OPS Schedule',
		    handler: opsScheduleHandler,
		    width: 130,
		    style: 'padding: 5',
		    disabled: true
	    });
	    
	    this.swdAssessmentButton = new Ext.Button({
			text: 'Request SWD Assessment',
		    handler: swdAssHandler,
		    hidden: true,
		    width: 130,
		    style: 'padding: 5'
	    });
	    
	    this.opsAssessmentButton = new Ext.Button({
			text: 'Request OPS Assessment',
		    handler: opsAssHandler,
		    hidden: true,
		    width: 130,
		    style: 'padding: 5'
	    });
		
		this.buttonPanel = new Ext.Container({
			layout: 'column',
			defaults: {
				xtype: 'button',
				style: 'padding: 5',
				width: 130
			},
	        items: [this.swdAssessmentButton,this.swdScheduleButton,this.opsAssessmentButton
	    	,this.opsScheduleButton,{
		    	xtype: 'button',
                text: 'Delete',
                iconCls: 'remove',
                width: 90,
                disabled: this.disabledPanel,
		    	handler: deleteHandler
	    	}]
    	});
    	
    	this.nameField = new Ext.form.TextField({
	        fieldLabel: 'Option Name',
	        disabled: this.disabledPanel,
	        enableKeyEvents: true,
	        value: this.nameValue,
	        onHide: function(){this.getEl().up('.x-form-item').setDisplayed(false);},
			onShow: function(){this.getEl().up('.x-form-item').setDisplayed(true);}
    	});
    	
    	this.authorizeCB = new Ext.form.Checkbox({
	    	fieldLabel: 'Authorized',
	    	disabled: this.disabledPanel,
	    	listeners: {
		    	'check': function(thisCB, checkedBool) {
			    	if(checkedBool) {
				    	Ext.Msg.confirm('Are you sure?', 'Are you sure you want to authorize this option?', function(btn){
						    if (btn == 'yes'){
						        eto.fireEvent('saveMe', eto);
						    } else {
							    thisCB.setValue(false);
						    }
						});
					} else {
						Ext.Msg.confirm('Are you sure?', 'Are you sure you want to reset authorizations?', function(btn){
						    if (btn == 'yes'){
						        eto.fireEvent('saveMe', eto);
						    } else {
							    thisCB.setValue(false);
						    }
						});
					}
			    	
		    	}
	    	},
	    	checked: this.selectedValue
    	});
    	
    	this.uatDateField = new Ext.form.DateField({
	        width: 127,
	        disabled: this.disabledPanel,
            format: 'Y/m/d',
	    	fieldLabel: 'Quoted UAT Date',
	    	enableKeyEvents: true,
            validator: function(val) {
                return true;
            },
            // mad override
            validateValue : function(value){
		        return true;
		    },
		    setValue : function(date){
		        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(date));
		    },
	    	value: this.uatValue
    	});
    	
    	this.targetUatDateField = new Ext.form.DateField({
	        width: 127,
	        disabled: this.disabledPanel,
            format: 'Y/m/d',
	    	fieldLabel: 'Target UAT Date',
	    	enableKeyEvents: true,
            validator: function(val) {
                return true;
            },
            // mad override
            validateValue : function(value){
		        return true;
		    },
		    setValue : function(date){
		        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(date));
		    },
	    	value: this.targetUatValue
    	});
    	
    	this.prodDateField = new Ext.form.DateField({
	        width: 127,
	        disabled: this.disabledPanel,
            format: 'Y/m/d',
	    	fieldLabel: 'Production Date',
	    	enableKeyEvents: true,
	    	validator: function(val) {
                return true;
            },
            // mad override
            validateValue : function(value){
		        return true;
		    },
		    setValue : function(date){
		        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(date));
		    },
	    	value: this.prodValue
    	});
    	this.nameField.on('keypress', function() {
	    	eto.setSaved(false);
    	});
    	this.uatDateField.on('keypress', function() {
	    	eto.setSaved(false);
    	});
    	this.targetUatDateField.on('keypress', function() {
	    	eto.setSaved(false);
    	});
    	this.prodDateField.on('keypress', function() {
	    	eto.setSaved(false);
    	});
    	this.uatDateField.on('select', function() {
	    	eto.setSaved(false);
    	});
    	this.targetUatDateField.on('select', function() {
	    	eto.setSaved(false);
    	});
    	this.prodDateField.on('select', function() {
	    	eto.setSaved(false);
    	});
    	this.nameField.on('blur', function() {
	    	//alert("changeD");
	    	eto.fireEvent('saveMe', eto);
    	});
    	this.uatDateField.on('blur', function() {
	    	//alert("changeD");
	    	eto.fireEvent('saveMe', eto);
    	});
    	this.targetUatDateField.on('blur', function() {
	    	//alert("changeD");
	    	eto.fireEvent('saveMe', eto);
    	});    	
    	this.prodDateField.on('blur', function() {
	    	//alert("changeD");
	    	eto.fireEvent('saveMe', eto);
    	});
    	
    	this.swdAssessmentDF = new Ext.form.DisplayField({
	        width: 127,
	    	fieldLabel: 'SWD Assessment',
	    	value: "Not Started"
    	});
    	
    	this.opsAssessmentDF = new Ext.form.DisplayField({
	        width: 127,
	    	fieldLabel: 'OPS Assessment',
	    	value: "Not Started"
    	});
    	
    	this.savedDF = new Ext.form.DisplayField({
	        width: 127,
	    	fieldLabel: 'Saved',
	    	cls: 'cook-green-text',
	    	value: "TRUE"
    	});
    	
		this.fieldContainer = new Ext.Container({
			layout: 'form',
			labelWidth: 130,
			defaults: {
			},
			style: 'padding: 5 5 5 10',
	        items: [this.authorizeCB, this.nameField,this.uatDateField,this.targetUatDateField,this.prodDateField,this.swdAssessmentDF,this.opsAssessmentDF,this.savedDF]
    	});
    	
	    Ext.apply(this, {
		    bodyStyle: 'background:#D3E1F1;',
            labelWidth: 160,
            autoWidth: true,
            layout: 'form',
            hideBorders: false,
            bodyBorder: true,
            border: true,
            style: 'padding: 20;',
            items: [this.fieldContainer,this.buttonPanel]
		});
	    	
    	this.on('afterrender', function() {
	        if(eto.assessmentArray instanceof Array) {
				if(eto.assessmentArray.length > 0) {
					var typeToId = new Array();
					for(var count = 0; count < eto.assessmentArray.length; count++) {
						var assessment = eto.assessmentArray[count];
						if(assessment.assessment_type == 'SWD') {
							typeToId['SWD'] = assessment.assessment_id;
							eto.swdAssessmentButton.show();
							if(assessment.complete_date) {
								eto.swdScheduleButton.enable();
								eto.swdAssessmentButton.setText("View SWD Assessment");
								eto.swdAssessmentDF.setValue("Completed");
								swdAssHandler = function(button, event) {
							    	if(event) {
								    	// figure out ID
								    	eto.tabContainer.openNewTab("AssessmentPanel",eto.optionId,"SWD",typeToId['SWD'],false, !eto.disabledPanel);
							    	}
								};
								eto.swdAssessmentButton.setHandler(swdAssHandler);
								swdSchedHandler = function(button, event) {
							    	if(event) {
								    	eto.tabContainer.openNewTab("AssessmentPanel",eto.optionId,"SWD",typeToId['SWD'],true, !eto.disabledPanel);
							    	}
								};
								eto.swdScheduleButton.setHandler(swdSchedHandler);
							} else {
								eto.swdAssessmentButton.setText("Perform SWD Assessment");
								eto.swdAssessmentDF.setValue("In-Progress");
								swdAssHandler = function(button, event) {
							    	if(event) {
								    	eto.tabContainer.openNewTab("AssessmentPanel",eto.optionId,"SWD",typeToId['SWD'],false, !eto.disabledPanel);
							    	}
								};
								eto.swdAssessmentButton.setHandler(swdAssHandler);
							}
						} else if(assessment.assessment_type == 'OPS') {
							typeToId['OPS'] = assessment.assessment_id;
							eto.opsAssessmentButton.show();
							if(assessment.complete_date) {
								eto.opsScheduleButton.enable();
								eto.opsAssessmentButton.setText("View OPS Assessment");
								eto.opsAssessmentDF.setValue("Completed");
								opsAssHandler = function(button, event) {
							    	if(event) {
								    	eto.tabContainer.openNewTab("AssessmentPanel",eto.optionId,"OPS",typeToId['OPS'],false, !eto.disabledPanel);
							    	}
								};
								eto.opsAssessmentButton.setHandler(opsAssHandler);
								
								opsSchedHandler = function(button, event) {
							    	if(event) {
								    	eto.tabContainer.openNewTab("AssessmentPanel",eto.optionId,"OPS",typeToId['OPS'],true, !eto.disabledPanel);
							    	}
								};
								eto.opsScheduleButton.setHandler(opsSchedHandler);
							} else {
								eto.opsAssessmentButton.setText("Perform OPS Assessment");
								eto.opsAssessmentDF.setValue("In-Progress");
								opsAssHandler = function(button, event) {
							    	if(event) {
								    	eto.tabContainer.openNewTab("AssessmentPanel",eto.optionId,"OPS",typeToId['OPS'],false, !eto.disabledPanel);
							    	}
								};
								eto.opsAssessmentButton.setHandler(opsAssHandler);
							}
						}
					}
				}
			}
		});
		
    	this.addEvents('deleteMe');
    	this.addEvents('saveMe');    	
    	
		OptionPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId, record, someAuthorized) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.disabledPanel = false;
		if(record) {
			this.optionId = record.get('option_id');
			this.nameValue = record.get('name');
			this.uatValue = record.get('quoted_uat_date');
			this.targetUatValue = record.get('target_uat_date');
			this.prodValue = record.get('production_date');
			this.assessmentArray = record.get('assessments');
			this.selectedValue = record.get('selected');
			if(this.selectedValue) {
				this.selectedValue = true;
			} else {
				this.selectedValue = false;
			}
			if(someAuthorized && !this.selectedValue) {
				this.disabledPanel = true;
			}
		}
		
		OptionPanel.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var valueObject = new Object();
	    valueObject.option_id = this.optionId;
	    valueObject.name = this.nameField.getValue();
	    valueObject.quoted_uat_date = this.uatDateField.getRawValue();
	    valueObject.target_uat_date = this.targetUatDateField.getRawValue();
	    valueObject.production_date = this.prodDateField.getRawValue();
	    if(this.authorizeCB.getValue()) {
	    	valueObject.selected = true;
    	} else {
	    	valueObject.selected = false;
    	}
	    return valueObject;
    },
    resetForm: function() {
	    this.nameField.setValue('');
	    this.nameField.setValue('');
	    this.nameField.setValue('');
    },
    resetAuthorization: function() {
	    this.authorizeCB.suspendEvents();
	    this.authorizeCB.setValue(false);
	    this.authorizeCB.resumeEvents();
    },
    setSaved: function(isSaved) {
	    if(isSaved) {
		    this.savedDF.setValue('TRUE');
		    this.savedDF.removeClass('cook-red-text');
		    this.savedDF.addClass('cook-green-text');
	    } else {
		    this.savedDF.setValue('FALSE');
		    this.savedDF.removeClass('cook-green-text');
		    this.savedDF.addClass('cook-red-text');
	    }
    }
});