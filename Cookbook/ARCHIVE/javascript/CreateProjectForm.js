CreateProjectForm = Ext.extend(Ext.Panel, {
	projectId: '',
	record: '',
	mainFormPanel: '',
	addButton: '',
	removeButton: '',
	bizPanel: '',
	businessUnitStore: '',
	tabContainer: '',
	companyStore: '',
	primaryBizCB: '',
	companyCB: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    
	    addBizHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewBizCombo();
	    	}
		};
		
		removeBizHandler = function(button, event) {
	    	if(event) {
		    	eto.removeBizCombo();
	    	}
		};
		
		companyChangeHandler = function(field, newVal, oldVal) {
		    eto.companySelected();
		};
        
		this.companyStore = new Ext.data.Store({
			id: 'companyStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetCompanies.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'company_id'
			}, [
				{name: 'store_company_id', type: "int", mapping: 'company_id'},
				{name: 'company_name', type: "string", mapping: 'company_name'},
				{name: 'business_units', mapping: 'business_units'}
			])
		});
		
		this.companyStore.load();
		
		this.businessUnitStore = new Ext.data.ArrayStore({
		    fields: ['store_biz_id','biz_name']
		});
		
		var firstCombo = this.createBizCombo();
        this.bizPanel = new Ext.Panel({
	        submitMe: true,
	        name: 'biz_ids',
	        labelWidth: 110,
	        autoWidth: true,
	        layout: "column",
	        itemCount: 1,
	        disabled: true,
	        layoutConfig: {
			    columns: 4
			},
	        style: "margin: 10px 0px",
	        defaults: {
		        style: 'padding: 0px 10px'
	        },
	        items: [firstCombo]
        });
        
        this.addButton = new Ext.Button({
	        tooltip:'Add another business unit',
            iconCls:'add',
            handler: addBizHandler,
            disabled: true
        });
        
        this.removeButton = new Ext.Button({
            tooltip:'Remove last business unit',
            iconCls:'remove',
            handler: removeBizHandler,
            disabled: true
        });
        
        this.primaryBizCB = new Ext.form.ComboBox({
            width:127,
            submitMe: true,
            fieldLabel: 'Primary Business Unit',
            name: 'primary_biz_id',
            store: this.businessUnitStore,
	        displayField:'biz_name',
	        valueField: 'store_biz_id',
	        typeAhead: true,
	        mode: 'local',
	        disabled: true,
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'business unit...',
	        selectOnFocus:true
		});
		
		this.companyCB = new Ext.form.ComboBox({
            width:127,
            submitMe: true,
            fieldLabel: 'Company',
            name: 'company_id',
            store: this.companyStore,
	        displayField:'company_name',
	        valueField: 'store_company_id',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'company name...',
	        selectOnFocus:true
		});
		
		this.companyCB.on('change', companyChangeHandler);
        
		this.pmField = new ContactTextField(true, null, null, null, null, true);
		this.pmField.name = 'main_pm_id';
	    this.pmField.submitMe = true;
	    
		this.pmPanel = new Ext.Panel({
			layout: 'table',
			items: [{
				xtype: 'displayfield',
				value: 'PM Name (drag from contacts):',
				width: 155,
				cls: 'x-form-item'
			}, this.pmField]
		});
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'Creating a New Project',
	        labelWidth: 150,
	        width: 600,
	        //bodyStyle: 'padding: 10px;',
	        style: 'padding: 0 10px 0 0;',
	        items: [
	        /******* REQUIRED  FIELDS **********/
	        {
	            xtype:'fieldset',
	            title: 'Required Fields',
	            autoHeight: true,
	            layout: 'form',
	            defaults: {allowBlank: false},
	            items: [{
	                xtype: 'textfield',
	                name: 'project_number',
	                submitMe: true,
	                invalidText: "Invalid Project Number. Use something like 'CTG-1234', 'INT-666', or 'AHFC-1337'",
	                validator: function(val) {
		                var pattern = new RegExp("(^[A-Z0-9]{1,10}\\-[A-Z0-9]{1,10}$)|(^$)");
		                if(pattern.test(val)) {
			                return true;
		                } else {
			                return "Invalid Project Number. Use something like 'CTG-1234', 'INT-666', or 'AHFC-1337'";
		                }
	                },
	                fieldLabel: 'Project Number',
	                anchor: '95%'
	            },{
	                xtype: 'textfield',
	                name: 'project_name',
	                submitMe: true,
	                invalidText: "Project name cannot contain the following characters: \ / : < > \" *",
	                validator: function(val) {
		                var pattern = new RegExp("^[^\\\\/:<>\"*]+$");
		                if(pattern.test(val)) {
			                return true;
		                } else {
			                return "Project name cannot contain the following characters: \ / : < > \" *";
		                }
	                },
	                fieldLabel: 'Project Name',
	                anchor: '95%'
	            },{
                    xtype: 'datefield',
                    width: 127,
                    format: 'Y/m/d',
      		    	fieldLabel: 'Quote Due Date',
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
      		    	name: 'quote_due_date',
      		    	submitMe: true
                },{
                    xtype: 'datefield',
                    width: 127,
                    format: 'Y/m/d',
      		    	fieldLabel: 'Received RFQ Date',
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
      		    	name: 'rfq_received_date',
      		    	submitMe: true
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Requested UAT Date',
                    width: 127,
                    format: 'Y/m/d',
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
    		    	name: 'requested_uat_date',
    		    	submitMe: true
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Requested Production Date',
                    format: 'Y/m/d',
                    //validationEvent: false,
                    width: 127,
                    validator: function(val) {
	                    return true;
                    },
                    // mad override
                    validateValue: function(value) {				        
				        return true;
				    },
				    setValue : function(date){
				        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(date));
				    },
    		    	name: 'requested_prod_date',
    		    	submitMe: true
                },this.companyCB,this.primaryBizCB,this.pmPanel]
	        },{
		        /******* OPTIONAL FIELDS **********/
	            xtype:'fieldset',
	            title: 'Optional Fields',
	            autoHeight: true,
	            items: [{
			        xtype: "displayfield",
			        hideLabel: true,
			        value: 'Select secondary Business Units'
		        },this.bizPanel,{
		            layout: 'column',
		            autoWidth: true,
		            //width: 200,
		            defaults: {
			            column: 40,
			            style: 'padding-left: 10px;',
			            xtype: 'button'
		            },
		            items: [this.addButton,this.removeButton]
	            },{
	                xtype: 'textfield',
	                name: 'verizon_number',
	                submitMe: true,
	                fieldLabel: 'Verizon Project #',
	                anchor: '95%'
	            },{
                    xtype: 'datefield',
                    width: 127,
                    format: 'Y/m/d',
      		    	fieldLabel: 'Updated Spec Date',
      		    	name: 'updated_specs',
      		    	submitMe: true
                },{
	                xtype: 'checkbox',
	                fieldLabel: 'Expedite',
	                name: 'expedite',
	                submitMe: true,
	                inputValue: 'true'
             	},{
	                xtype: 'checkbox',
	                fieldLabel: 'Preapproved',
	                name: 'preapproved',
	                submitMe: true,
	                inputValue: 'true'

             	},{
	                xtype: 'checkbox',
	                fieldLabel: 'Conference Call Required',
	                name: 'conference_call',
	                submitMe: true,
	                inputValue: 'true'
             	}]
	        },{
                // FIELDSET Project Description
                xtype:'fieldset',
                title: 'Project Description',
                layout: 'form',
            	border:true,
                //bodyStyle:'padding:5px 5px 0',
    			width: 550,
    			height:235,
                items: [{
    				xtype:'htmleditor',
    				name: 'description',
    				height: 200,
    				submitMe: true,
    				hideLabel: true,
    				anchor:'99%'
                }]
			},{
                xtype: 'hidden',
                name: 'project_id',
                submitMe: true,
                value: this.projectId
            }],
	        
	        buttons: [{
	            text: 'Save'
	        },{
	            text: 'Reset'
            },{
	            text: 'Cancel'
            }]
	    });
	    
	    this.contactGrid = new ContactGrid(this.tabContainer,{
			rowspan: 2,
		    enableDragDrop: true,
		    ddGroup:'contactDD',
		    collapsible: true,
		    collapsed: false,
		    listeners: {
			}
		});
	    Ext.apply(this, {
		    // TAB main
            title:'New Project',
            //frame: true,
            anchor:'95%',
            layout: 'table',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [this.mainFormPanel, this.contactGrid]
		});
	    
    	
    	
    	if(this.projectId) {
	    	var eto = this;
	    	this.mainFormPanel.setTitle("Modifying Project's Basic Properties");
	    	this.on('afterrender', function() {
		        var projectInfoStore = new Ext.data.Store({
					id: 'projectInfoStore',
					proxy: new Ext.data.HttpProxy({
						url: 'GetProject.ashx', // File to connect to
						method: 'POST'
					}),
					baseParams:{"project_id": this.projectId}, // this parameter asks for listing
					reader: new Ext.data.JsonReader({   
						// we tell the datastore where to get his data from
						root: 'rows',
						totalProperty: 'total',
						id: 'project_id'
					}, [
						{name: 'project_id', type: "int", mapping: 'project_id'},
						{name: 'project_name', type: "string", mapping: 'project_name'},
						{name: 'created_by', type: "string", mapping: 'created_by'},
						{name: 'business_units', mapping: 'business_units'},
						{name: 'project_number', type: "string", mapping: 'project_number'},
						{name: 'verizon_number', type: "string", mapping: 'verizon_number'},
						{name: 'quote_due_date', type: "string"},
						{name: 'rfq_received_date', type: "string"},
						{name: 'updated_specs', type: "date"},
						{name: 'requested_uat_date', type: "string"},
						{name: 'requested_prod_date', type: "string"},
						{name: 'expedite', type: "boolean", mapping: 'expedite'},
						{name: 'preapproved', type: "boolean", mapping: 'preapproved'},
						{name: 'conference_call', type: "boolean", mapping: 'conference_call'},
						{name: 'description', type: "string", mapping: 'description'},
						{name: 'primary_biz_id', type: "int", mapping: 'primary_biz_id'},
						{name: 'company_id', type: "int", mapping: 'company_id'},
						{name: 'company_name', type: "string", mapping: 'company_name'}
					])
				});
				
				projectInfoStore.on('load', function() {
					var count = projectInfoStore.getTotalCount(); 
					if(count < 1) {
						Ext.MessageBox.alert('Error','Project Does Not Exist');
						eto.onFormCancel(eto);
					} else {
						eto.record = projectInfoStore.getAt(0);
						eto.loadProject();
					}
				});
				
				projectInfoStore.load();
			});
		}
    	
		CreateProjectForm.superclass.initComponent.call(this);
		
    	this.mainFormPanel.buttons[0].on('click', this.onFormSubmit, this);
    	this.mainFormPanel.buttons[1].on('click', this.onFormReset, this);
    	this.mainFormPanel.buttons[2].on('click', this.onFormCancel, this.mainFormPanel);
    },
    
    constructor: function(tabCont,projId) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		CreateProjectForm.superclass.constructor.call(this);
    },
    resetBiz: function() {
	    this.primaryBizCB.enable();
	    this.bizPanel.enable();
	    this.resetBizPanel();
	    this.primaryBizCB.clearValue();
    },
    resetCompany: function() {
	    this.primaryBizCB.disable();
	    this.bizPanel.disable();
	    this.primaryBizCB.clearValue();
	    this.businessUnitStore.removeAll();
    },
    companySelected: function() {
	    this.primaryBizCB.enable();
	    this.bizPanel.enable();
	    this.resetBizPanel();
	    this.primaryBizCB.clearValue();
	    if(this.companyCB.getValue() != "") {
		    this.setBusinessUnitStore(this.companyCB.getValue());
	    }
    },
    setBusinessUnitStore: function(companyId) {
	    var recordIndex = this.companyStore.find("store_company_id", companyId);
	    if(recordIndex >= 0) {
		    var myRecord = this.companyStore.getAt(recordIndex);
		    var bizArray = myRecord.get("business_units");
		    if(bizArray instanceof Array) {
			    // removing all business units from the biz store
			    this.businessUnitStore.removeAll();
			    // creating array that contains business unit records
			    var newRecArray = new Array();
			    // creating constructor for business unit records
				var BizRecord = Ext.data.Record.create([
				    {name: 'biz_name', mapping: 'biz_name'},
				    {name: 'store_biz_id', mapping: 'store_biz_id'}
				]);
				// for every business unit
			    for(var c = 0; c < bizArray.length; c++) {
				    var bizObject = bizArray[c];
				    // create a biz record
				    var newRec = new BizRecord({
				        biz_name: bizObject.biz_name,
				        store_biz_id: bizObject.biz_id
				    });
				    // add the record to the array
				    newRecArray.push(newRec);
			    }
			    // update the store with all the new records of business units
			    this.businessUnitStore.add(newRecArray);
			}
		}
		return true;
    },
    onFormSubmit: function() {
	    var thisForm = this.mainFormPanel;
		var eto = this;		
	    if(thisForm.getForm().isValid()){
		    var pmVal = this.pmField.getValue();
		    if(this.record || this.pmField.getValue()) {
				var submitObject = new Object();
				var fieldsToSubmit = thisForm.find("submitMe",true);
				for(var c = 0; c < fieldsToSubmit.length; c++) {
					if(fieldsToSubmit[c].name == 'biz_ids') {
						var submissionString = '';
						var firstOne = true;
						for(var i = 0; i < fieldsToSubmit[c].itemCount; i++) {
							var comboValue = fieldsToSubmit[c].get(i).getValue();
							if(comboValue) {
								if(firstOne) {
									submissionString = comboValue;
									firstOne = false;
								} else {
									submissionString = submissionString + ","+comboValue;
								}
							}
						}
						submitObject.biz_ids = ""+submissionString+"";
					} else if(fieldsToSubmit[c] instanceof Ext.form.DateField) {
						eval("submitObject."+fieldsToSubmit[c].name+"=\""+fieldsToSubmit[c].getRawValue()+"\";");
					} else if(fieldsToSubmit[c] instanceof Ext.form.HtmlEditor) {
						eval("submitObject."+fieldsToSubmit[c].name+"=\""+encodeURI(fieldsToSubmit[c].getValue())+"\";");
					}else if(fieldsToSubmit[c].getValue()) {
						eval("submitObject."+fieldsToSubmit[c].name+"=\""+fieldsToSubmit[c].getValue()+"\";");
					}
				}
				
				Ext.Ajax.request({
					url: 'UpdateProject.ashx',
				    method: 'POST',
				    params: submitObject,
				    failure: function() {
					    Ext.MessageBox.alert('Error','Submission Error');
				    },
				    success: function(response, opts) {
					    var jsonResponse = Ext.util.JSON.decode(response.responseText);
					    if(jsonResponse.success != null) {
					    	if(jsonResponse.success) {
						    	if(eto.projectId) {
							    	Ext.MessageBox.alert('Success','Project Updated Successfully');
						    	} else {
							    	Ext.MessageBox.alert('Success','Project Created Successfully');
						    	}
						    	thisForm.ownerCt.ownerCt.remove(thisForm.ownerCt);
				    		} else if(!jsonResponse.success) {
						    	if(jsonResponse.rows) {
							    	if(eto.projectId) {
						    			Ext.Msg.alert('Failed', 'Project Update Failed: ' + jsonResponse.rows);
					    			} else {
						    			Ext.Msg.alert('Failed', 'Project Creation Failed: ' + jsonResponse.rows);
					    			}
					    		} else {
						    		Ext.Msg.alert('Failed', 'Submission Failed...');
					    		}
				    		}
						} else {
				    		Ext.Msg.alert('Failed', 'Submission Failed. No Success Flag.');
			    		}
				    }
				});
			} else {
				Ext.Msg.alert('Not Complete', 'Please assign project manager.');
			}
		} else {
			Ext.Msg.alert('Not Complete', 'Please fill out all required fields correctly');
		}
    },
    onFormReset: function() {
	    if(this.projectId) {
		    this.resetBizPanel();
		    this.loadProject();
	    } else {
		    this.resetBizPanel();
		    this.resetCompany();
	    	this.mainFormPanel.getForm().reset();
    	}
    },
    onFormCancel: function() {
	    this.ownerCt.ownerCt.remove(this.ownerCt);
    },
    
    loadProject: function() {
	    var eto = this;
	    if(this.record != null) {
		    if(this.mainFormPanel) {
			    this.contactGrid.hide();
			    this.pmPanel.hide();
			    
			    this.primaryBizCB.enable();
	    		this.bizPanel.enable();
	    		
			    // updating name
			    var component = this.mainFormPanel.find('name','project_name');
		    	if(component[0] != null) {
			    	var projectName = this.record.get("project_name")
			    	component[0].setValue(projectName);
			    	this.setTitle(projectName + " Basic Properties");
		    	}
		    	
		    	component = this.mainFormPanel.find('name','company_id');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("company_id"), true);
		    	}
		    	if(this.setBusinessUnitStore(this.record.get("company_id"))) {
			    	var bizArray = new Array();
			    	bizArray = eto.record.get("business_units");
			    	var bizCount = bizArray.length;
			    	for(var c = 0; c < bizArray.length; c++) {
				    	if(c == 0) {
					    	eto.bizPanel.get(0).setValue(bizArray[c]);
		    				eto.addButton.enable();
				    	} else {
				    		eto.addNewBizCombo(bizArray[c]);
			    		}
		    		}
		    		if(bizCount > 0) {
			    		eto.removeButton.enable();
		    		}
		    		component = eto.mainFormPanel.find('name','primary_biz_id');
			    	if(component[0] != null) {
				    	component[0].setValue(eto.record.get("primary_biz_id"), true);
			    	}
		    	}
		    	component = this.mainFormPanel.find('name','project_number');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("project_number"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','verizon_number');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("verizon_number"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','quote_due_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("quote_due_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','rfq_received_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("rfq_received_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','updated_specs');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("updated_specs"));
		    	}		    	
		    	
		    	component = this.mainFormPanel.find('name','requested_uat_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("requested_uat_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','requested_prod_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("requested_prod_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','expedite');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("expedite"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','preapproved');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("preapproved"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','conference_call');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("conference_call"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','description');
		    	if(component[0] != null) {
			    	var decodedValue = decodeURI(this.record.get("description"));
			    	component[0].setValue(decodedValue);
		    	}
	    	}
    	}
    },
    
    addNewBizCombo: function(initValue) {
	    this.bizPanel.add(this.createBizCombo(initValue));
	    this.bizPanel.doLayout();
	    this.bizPanel.itemCount++;
	    this.removeButton.enable();
	    if(initValue) {
	    	this.addButton.enable();
    	} else {
	    	this.addButton.disable();
    	}
    },
    removeBizCombo: function() {
	    var lastComboIndex = this.bizPanel.itemCount - 1;
	    var comboToRemove = this.bizPanel.get(lastComboIndex);
	    if(this.bizPanel.itemCount == 1) {
		    comboToRemove.setValue('');
		    this.removeButton.disable();
		    this.addButton.disable();
		    comboToRemove.virgin = true;
	    } else {
	    	this.bizPanel.remove(comboToRemove,true);
	    	this.bizPanel.itemCount--;
	    	this.addButton.enable();
    	}
	    this.bizPanel.doLayout();
	    // should never be used...
	    if(this.bizPanel.itemCount <= 0) {
		    this.removeButton.disable();
	    }
	    this.bizPanel.doLayout();
    },
    
    resetBizPanel: function() {
	    for(var rIndex = this.bizPanel.itemCount - 1; rIndex > 0; rIndex--) {
	    	var comboToRemove = this.bizPanel.get(rIndex);
	    	this.bizPanel.remove(comboToRemove,true);
	    	this.bizPanel.itemCount--;
    	}
    	this.addButton.enable();
    	if(this.bizPanel.itemCount <= 1) {
	    	this.removeButton.disable();
	    	this.addButton.disable();
    	}
    	if(this.bizPanel.itemCount == 1) {
	    	this.bizPanel.get(0).clearValue();
	    	this.bizPanel.get(0).virgin = true;
    	}
	    this.bizPanel.doLayout();
	},
    createBizCombo: function(initValue) {
		var combo = new Ext.form.ComboBox({
            width:127,
            //name: 'biz_id'+this.bizPanel.itemCount,
            //itemId: 'bizIdCombo'+this.bizPanel.itemCount,
            store: this.businessUnitStore,
	        displayField:'biz_name',
	        valueField: 'store_biz_id',
	        //hiddenName:'biz_id',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'business unit...',
	        selectOnFocus:true,
	        virgin: true,
	        value: initValue
        });
        var eto = this;
        combo.on('select', function() {
	        if(this.virgin) {
	        	eto.addButton.enable();
	        	this.virgin = false;
        	}
        });
        return combo;
    }

});