ContractPanel = Ext.extend(Ext.Panel, {	
    initComponent: function() {
	    var eto = this;
	    
	    var typeArray = [
		    ['Non-Disclosure Agreement'],
		    ['Master Services Agreement'],
		    ['Statement of Work'],
		    ['Consulting Agreement']
		];
		var typeStore = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'type', type: 'string'}
		    ],
	        data : typeArray
	    });
	    
	    var statusArray = [
		    ['Pending Execution'],
		    ['Fully Executed - Active'],
		    ['Terminated']
		];
		var statusStore = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'type', type: 'string'}
		    ],
	        data : statusArray
	    });
	    
	    var customerTypeStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'Contracts_GetCustomerTypes.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'customer_type_id'
			}, [
				{name: 'customer_type_id', type: "int", mapping: 'customer_type_id'},
				{name: 'customer_type_name', type: "string", mapping: 'customer_type_name'}
			])
		});
	    
	    var customerStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'Contracts_GetCustomers.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'customer_id'
			}, [
				{name: 'customer_id', type: "int", mapping: 'customer_id'},
				{name: 'customer_name', type: "string", mapping: 'customer_name'},
				{name: 'customer_type', type: "int", mapping: 'customer_type'}
			])
		});
	    
	    this.companyCombo = new Ext.form.ComboBox({
		    store: customerStore,
		    fieldLabel: 'Customer Name',
		    allowBlank: false,
		    name: 'customer_id',
		    width: 250,
	        displayField:'customer_name',
	        valueField: 'customer_id',
	        //typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: false,
	        disabled: true,
	        triggerAction: 'all',
	        selectOnFocus:true,
	        anchor:'95%'
        });
        
        this.customerTypeCombo = new Ext.form.ComboBox({
            fieldLabel: 'Customer Type',
            allowBlank: false,
            name: 'customer_type_id',
            store: customerTypeStore,
	        displayField:'customer_type_name',
	        valueField: 'customer_type_id',
	        hiddenValue: 'customer_type_id',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        listeners: {
		        'select': function(combo, rec) {
			        var custType = rec.get('customer_type_id');
			        var changed = false;
			        if(custType != currentType) {
				        currentType = custType;
				        customerStore.removeAll();
				        eto.companyCombo.setValue("");
				        //eto.companyCombo.fieldLabel = custType;
				        changed = true;
				        eto.companyCombo.disable();
			        }
			        if(changed) {
				        customerStore.setBaseParam("customer_type", custType);
				        customerStore.load();
			        	eto.companyCombo.enable();
		        	}
		        }
	        },
	        selectOnFocus:true,
	        anchor:'95%'
        });
        
        var currentType = "";
        
	    this.datePanel = new ContractDateFieldSet(this.contractID);
	    this.userPanel = new ContractUsersFieldSet(this.contractID);
	    
        this.mainForm = new Ext.FormPanel({
	        labelAlign: 'top',
	        bodyStyle:'padding:5px 5px 0',
	        frame:true,
	        width: 900,
	        items: [{
	            xtype: 'textfield',
	            fieldLabel: 'Contract Title',
	            allowBlank: false,
	            name: 'contract_title',
	            anchor:'98%'
            },{
	            layout:'column',
	            items:[{
	                columnWidth:.5,
	                layout: 'form',
	                items: [{
			            xtype: 'combo',
			            fieldLabel: 'Contract Type',
			            allowBlank: false,
			            name: 'contract_type',
			            store: typeStore,
				        displayField:'type',
				        valueField: 'type',
				        typeAhead: true,
				        mode: 'local',
				        editable: 'false',
				        forceSelection: false,
				        triggerAction: 'all',
				        selectOnFocus:true,
				        anchor:'95%'
		            },{
			            xtype: 'combo',
			            fieldLabel: 'Status',
			            allowBlank: false,
			            name: 'status',
			            store: statusStore,
				        displayField:'type',
				        valueField: 'type',
				        typeAhead: true,
				        mode: 'local',
				        editable: 'false',
				        forceSelection: false,
				        triggerAction: 'all',
				        selectOnFocus:true,
				        anchor:'95%'
		            }]
	            },{
	                columnWidth:.5,
	                layout: 'form',
	                items: [this.customerTypeCombo
		            , this.companyCombo]
	            }]
	        },{
	            xtype:'htmleditor',
	            fieldLabel:'Description',
	            allowBlank: false,
	            name: 'description',
	            height: 150,
	            anchor:'98%'
	        },{
	            xtype:'htmleditor',
	            fieldLabel:'Termination / Renewal Terms',
	            allowBlank: false,
	            name: 'terms',
	            height: 150,
	            anchor:'98%'
	        },{
	            xtype:'textfield',
	            anchor:'98%',
	            name: 'directory',
	            fieldLabel:'Contract Directory'
	        },this.datePanel, this.userPanel],
	
	        buttons: [{
	            text: 'Save',
	            handler: function(button, event) {
		            if(event) {
			            if(eto.mainForm.getForm().isValid()) {
				            var submitValues = eto.mainForm.getForm().getValues();
				            var custID = eto.companyCombo.getValue();
				            if(!Ext.isNumber(custID) || custID < 0) {
					            submitValues.customer_name = eto.companyCombo.getRawValue();
					            submitValues.customer_type_id = eto.customerTypeCombo.getValue();
					            submitValues.customer_id = null;
				            } else {
					            submitValues.customer_id = custID;
					            submitValues.customer_name = null;
					            submitValues.customer_type_id = null;
				            }
				            if(Ext.isNumber(eto.contractID)) {
					            submitValues.contract_id = eto.contractID;
				            }
				            submitValues.contract_dates = Ext.encode(eto.datePanel.getValues());
				            Ext.Ajax.request({
								url: 'Contracts_UpdateContract.ashx',
							    method: 'POST',
							    params:  submitValues,
							    failure: function() {
								    Ext.MessageBox.alert('Error','Submission Error');
							    },
							    success: function(response, opts) {
								    var jsonResponse = Ext.util.JSON.decode(response.responseText);
								    if(jsonResponse.success != null) {
								    	if(jsonResponse.success) {
									    	if(!eto.contractID) {
										    	Ext.MessageBox.alert('Success','Contract Created!');
									    	} else {
										    	Ext.MessageBox.alert('Success','Contract Saved!');
									    	}
						    				eto.ownerCt.remove(eto);
							    		} else if(!jsonResponse.success) {
									    	if(jsonResponse.rows) {
									    		Ext.Msg.alert('Error', 'Server error');
								    		}
							    		}
									} else {
							    		Ext.Msg.alert('Error', 'Error: (missing success flag). Try again or contact an administrator');
						    		}
							    }
							});
						} else {
							Ext.MessageBox.alert('Error','Please fill out the form correctly.');
						}
		            }
	            }
	        },{
	            text: 'Cancel',
	            handler: function(button, event) {
		            if(event) {
			            eto.ownerCt.remove(eto);
		            }
	            }
	        }]
	    });
        Ext.apply(this, {
            title: (Ext.isNumber(this.contractID)) ? "Editing Contract" : 'New Contract',
            border: false,
            autoScroll: true,
            bodyBorder: false,
            closable: true,
            bodyStyle: "padding: 10px; background-color: #d0e0f4;",
            items: [this.mainForm]
        
        });
        if(Ext.isNumber(this.contractID)) {
	        var thisContractStore = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({
					url: 'Contracts_GetContractInfo.ashx',
					method: 'GET'
				}),
				baseParams:{"contract_id": this.contractID},
				reader: new Ext.data.JsonReader({   
					root: 'rows',
					totalProperty: 'total'
				}, [
					{name: 'contract_id', type: "int"},
					{name: 'customer_id', type: "int"},
					{name: 'contract_title', type: "string"},
					{name: 'contract_type', type: "string"},
					{name: 'status', type: "string"},
					{name: 'description', type: "string"},
					{name: 'terms', type: "string"},
					{name: 'directory', type: "string"},
					{name: 'customer_name', type: "string"},
					{name: 'created_by', type: "string"},
					{name: 'contract_dates'},
					{name: 'customer_type_id', type: "int"}
				])
			});
			thisContractStore.on('load', function(store, recs) {
				if(recs instanceof Array) {
					if(recs.length > 0) {
						eto.loadData(recs[0].data);
					}
				}
			});
			customerTypeStore.on('load', function() {
				thisContractStore.load();
			});
		}
			
	    customerTypeStore.load();
	    
        ContractPanel.superclass.initComponent.apply(this);
    },
    constructor: function(contractID) {
	    if(Ext.isNumber(contractID)) {
		    this.contractID = contractID;
	    } else {
		    this.contractID = null;
	    }
	    this.compact = false;
        ContractPanel.superclass.constructor.apply(this);
    },
    loadData: function(dataObject) {
	    for(var a in dataObject) {
		    var foundArr = this.mainForm.find('name', a);
		    if(foundArr instanceof Array) {
			    if(foundArr.length > 0) {
				    if(a == "customer_id") {
					    foundArr[0].enable();
						foundArr[0].setValue(dataObject['customer_name']);
						var customerStore = foundArr[0].getStore();
						if(customerStore instanceof Ext.data.Store) {
							customerStore.setBaseParam("customer_type", dataObject['customer_type']);
				        	customerStore.load();
			        	}
					} else {
						foundArr[0].setValue(dataObject[a]);
					}
			    }
		    }
	    }
    }
});