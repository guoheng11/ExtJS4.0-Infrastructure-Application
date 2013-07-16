EditContactForm = Ext.extend(Ext.Panel, {
	fp: '',
	notePanel: '',
	record: '',
	contactTypeStore: '',
	phonePanel: '',
	emailPanel: '',
	contactId: '',
	addPhoneButton: '',
	addEmailButton: '',
	tabContainer: '',
	primaryEmailString: 'Primary Email',

	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    Ext.apply(this, {
		    // TAB main
            title:'New Contact',
            //frame: true,
            anchor:'95%',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [this.fp]
		});
	    
    	EditContactForm.superclass.initComponent.call(this);
    	
    	this.fp.buttons[0].on('click', this.onFormSubmit, this);
    	this.fp.buttons[1].on('click', this.onFormReset, this);
    	this.fp.buttons[2].on('click', this.onFormCancel, this.fp);

    },
    constructor: function(tabCont,personID) {
	    var eto = this;
		this.tabContainer = tabCont;
		this.contactTypeStore = new Ext.data.Store({
			id: 'contactTypeStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetContactTypes.ashx', // File to connect to
				method: 'POST'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'contact_type'
			}, [
				{name: 'store_contact_type', type: "int", mapping: 'contact_type'},
				{name: 'type_name', type: "string", mapping: 'type_name'}
			])
		});
		
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
				{name: 'company_name', type: "string", mapping: 'company_name'}
			])
		});
		
		this.contactTypeStore.on('load', function(thisStore) {
			thisStore.sort("type_name", "ASC");
			eto.contactTypeLoaded = true;
			if(personID && eto.companyStoreLoaded) {
				eto.loadStoreContact(personID);
			}
		});
		
		this.companyStore.on('load', function() {
			eto.companyStoreLoaded = true;
			if(personID && eto.contactTypeLoaded) {
				eto.loadStoreContact(personID);
			}
		});
		
		this.contactTypeStore.load();
		this.companyStore.load();
		
		// PHONE STUFF
		addPhoneHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewPhone();
	    	}
		};
		
		this.addPhoneButton = new Ext.Button({
	        //tooltip:'Add a new phone',
            iconCls:'add',
            handler: addPhoneHandler,
            disabled: false,
            text: 'Add New Phone'
        });
        
        this.phonePanel = new Ext.form.FieldSet({
	        submitMe: true,
	        title: 'Phones',
	        name: 'phones',
	        labelWidth: 40,
	        autoWidth: true,
	        itemCount: 1,
	        /*
	        layout: "column",
	        layoutConfig: {
			    columns: 4
			},*/
	        style: "margin: 10px 0px",
	        defaults: {
		        style: 'margin: 0px 10px'
	        },
	        items: [this.addPhoneButton,new PhoneEmailContainer("Phone Number")]
        });
        
        // EMAIL STUFF
        addEmailHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewEmail();
	    	}
		};
		
		this.addEmailButton = new Ext.Button({
	        //tooltip:'Add a new email',
            iconCls:'add',
            handler: addEmailHandler,
            disabled: false,
            text: 'Add New Email'
        });
        
        this.emailPanel = new Ext.form.FieldSet({
	        submitMe: true,
	        title: 'Emails',
	        name: 'emails',
	        labelWidth: 40,
	        autoWidth: true,
	        itemCount: 1,
	        /*
	        layout: "column",
	        layoutConfig: {
			    columns: 4
			},*/
	        style: "margin: 10px 0px",
	        defaults: {
		        style: 'margin: 0px 10px'
	        },
	        /*items: [{
	            layout: 'column',
	            autoWidth: true,
	            //width: 200,
	            defaults: {
		            column: 40,
		            style: 'padding-left: 10px;',
		            xtype: 'button'
	            },
	            items: [this.addEmailButton]
            },new PhoneEmailContainer("Email Address")],*/
            items: [this.addEmailButton,new PhoneEmailContainer("Email Address")]
        });
        
		this.fp = new Ext.FormPanel({
	        frame: true,
	        title:'Creating a New Contact',
	        labelWidth: 150,
	        collapsible: true,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',	        
	        items: [
	        /******* REQUIRED  FIELDS **********/
	        {
	            xtype:'fieldset',
	            title: 'Contact Information',
	            autoHeight: true,
	            itemId: 'mainFieldSet',
	            layout: 'form',
	            items: [{
	                xtype: 'textfield',
	                itemId:'nameField',
	                name: 'contact_name',
	                allowBlank: false,
	                submitMe: true,
	                fieldLabel: 'Name (e.g. \"John Smith\")',
	                anchor: '95%'
	            },{
	                xtype: 'textfield',
	                itemId:'titleField',
	                name: 'title',
	                submitMe: true,
	                fieldLabel: 'Title',
	                anchor: '95%'
	            },{
	                xtype: 'combo',
	                itemId:'typeCombo',
                    width:150,
		            name: 'primary_type',
		            fieldLabel: 'Contact Type',
		            store: this.contactTypeStore,
			        displayField:'type_name',
			        valueField: 'store_contact_type',
			        hiddenName:'primary_type',
			        allowBlank: false,
			        typeAhead: true,
			        submitMe: true,
			        mode: 'remote',
			        editable: 'false',
			        forceSelection: true,
			        triggerAction: 'all',
			        emptyText:'choose type...',
			        selectOnFocus:true
	            },{
	                xtype: 'combo',
	                itemId:'companyCombo',
                    width:150,
		            name: 'company_id',
		            fieldLabel: 'Company',
		            store: this.companyStore,
			        displayField:'company_name',
			        valueField: 'store_company_id',
			        hiddenName:'company_id',
			        allowBlank: false,
			        typeAhead: true,
			        submitMe: true,
			        mode: 'remote',
			        editable: 'false',
			        forceSelection: true,
			        triggerAction: 'all',
			        emptyText:'choose company...',
			        selectOnFocus:true
	            },this.phonePanel,this.emailPanel,{
	                xtype: 'hidden',
	                itemId: 'contactIDField',
	                name: 'contact_id',
	                submitMe: true
	            }]
	        }],
	        
	        buttons: [{
	            text: 'Update'
	        },{
	            text: 'Reset'
            },{
	            text: 'Cancel'
            }]
	    });
		EditContactForm.superclass.constructor.call(this);
		this.onFormReset();
    },
    loadStoreContact: function(personID) {
	    var eto = this;
	    eto.contactId = personID;
	    var contactInfoStore = new Ext.data.Store({
			id: 'contactInfoStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetContacts.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"contact_id": personID}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'contact_id'
			}, [
				{name: 'contact_id', type: "int", mapping: 'contact_id'},
				{name: 'contact_name', type: "string", mapping: 'contact_name'},
				{name: 'email', mapping: 'email'},
				{name: 'company_id', type: "int", mapping: 'company_id'},
				{name: 'company_name', type: "string", mapping: 'company_name'},
				{name: 'phone', mapping: 'phone'},
				{name: 'primary_type', type: "string", mapping: 'primary_type'},
				{name: 'primary_type_id', type: "string", mapping: 'primary_type_id'},
				{name: 'title', type: "string", mapping: 'title'}
			])
		});
		
		contactInfoStore.on('load', function() {
			eto.fp.setTitle("Editing a Contact");
			var count = contactInfoStore.getTotalCount(); 
			if(count < 1) {
				Ext.MessageBox.alert('Error','Contact Does Not Exist');
				eto.ownerCt.remove(eto);
			} else if(count > 1) {
				Ext.MessageBox.alert('Error','Multiple contacts with the same ID');
				eto.ownerCt.remove(eto);
			} else {
				//Ext.MessageBox.alert('Success','Found Contact!');
				eto.record = contactInfoStore.getAt(0);
				eto.loadContact.apply(eto);
			}
			eto.doLayout();
		});
		
		contactInfoStore.load();
	},
    onFormSubmit: function() {
	    var thisForm = this.fp;
	    var eto = this;
	    if(thisForm.getForm().isValid()){
			
			var primaryCount = 0;
			var submitObject = new Object();
			var fieldsToSubmit = thisForm.find("submitMe",true);
			for(var c = 0; c < fieldsToSubmit.length; c++) {
				if(fieldsToSubmit[c].name == 'phones') {
					var objectArray = new Array();
					var phoneFindArray = fieldsToSubmit[c].find("typeId","phoneEmailContainer");
					for(var i = 0; i < phoneFindArray.length; i++) {
						var holderObject = new Object();
						holderObject.phone = phoneFindArray[i].getValue();
						holderObject.type = phoneFindArray[i].getKey();
						objectArray[i] = holderObject;
					}
					submitObject.phone = Ext.encode(objectArray);
				} else if(fieldsToSubmit[c].name == 'emails') {
					var objectArray = new Array();
					var phoneFindArray = fieldsToSubmit[c].find("typeId","phoneEmailContainer");
					for(var i = 0; i < phoneFindArray.length; i++) {
						var holderObject = new Object();
						holderObject.email = phoneFindArray[i].getValue();
						holderObject.type = phoneFindArray[i].getKey();
						if(holderObject.type == this.primaryEmailString) {
							primaryCount++;
							holderObject.primary = true;
						}
						objectArray[i] = holderObject;
					}
					submitObject.email = Ext.encode(objectArray);
				}else if(fieldsToSubmit[c] instanceof Ext.form.DateField) {
					eval("submitObject."+fieldsToSubmit[c].name+"=\""+fieldsToSubmit[c].getRawValue()+"\";");
				} else if(fieldsToSubmit[c] instanceof Ext.form.HtmlEditor) {
					eval("submitObject."+fieldsToSubmit[c].name+"=\""+encodeURI(fieldsToSubmit[c].getValue())+"\";");
				} else if(fieldsToSubmit[c].getValue()) {
					eval("submitObject."+fieldsToSubmit[c].name+"=\""+fieldsToSubmit[c].getValue()+"\";");
				}
			}
			if(primaryCount > 1) {
				Ext.MessageBox.alert('Error','Too many primary emails =)');
			} else {
				Ext.Ajax.request({
					url: 'UpdateContact.ashx',
				    method: 'POST',
				    params: submitObject,
				    failure: function() {
					    Ext.MessageBox.alert('Error','Submission Error');
				    },
				    success: function(response, opts) {
						var jsonResponse = Ext.util.JSON.decode(response.responseText);
						if(jsonResponse.success) {
						    Ext.MessageBox.alert('Success','Contact Updated Successfully');
		    				thisForm.ownerCt.ownerCt.remove(thisForm.ownerCt);
	    				} else {
		    				var errorMessage = "There was an error!";
		    				if(jsonResponse.rows instanceof Array) {
			    				if(jsonResponse.rows.length > 0) {
				    				errorMessage = jsonResponse.rows[0];
			    				}
		    				}			    				
		    				Ext.MessageBox.alert('Error',errorMessage);
	    				}
				    }
				});
			}
		} else {
			Ext.Msg.alert('Not Complete', 'Fill out all required fields!');
		}
    },
    onFormReset: function() {
	    if(this.contactId) {
			this.loadContact();
		} else {
		    this.resetPhonePanel();
		    this.resetEmailPanel();
	    	this.fp.getForm().reset();
    	}
    },
    onFormCancel: function() {
	    this.ownerCt.ownerCt.remove(this.ownerCt);
    },
    loadContact: function() {
	    if(this.record != null) {
		    
		    var fieldSet = this.fp.getComponent('mainFieldSet');
		    if(fieldSet) {
			    // updating name
			    var component = fieldSet.getComponent('nameField');
		    	if(component) {
			    	component.setValue(this.record.get("contact_name"));
			    	this.setTitle(this.record.get("contact_name"));
		    	}
		    	//updating phone
		    	var phoneArray = new Array();
		    	this.resetPhonePanel();
		    	phoneArray = this.record.get("phone");
		    	for(var c = 0; c < phoneArray.length; c++) {
			    	if(c == 0) {
				    	this.phonePanel.get(1).setValues(phoneArray[c].type, phoneArray[c].phone);
			    	} else {
			    		this.addNewPhone(phoneArray[c].type, phoneArray[c].phone);
		    		}
	    		}
				
	    		//updating email
		    	var emailArray = new Array();
		    	this.resetEmailPanel();
		    	emailArray = this.record.get("email");
		    	for(var c = 0; c < emailArray.length; c++) {
			    	if(c == 0) {
				    	this.emailPanel.get(1).setValues(emailArray[c].type, emailArray[c].email);
			    	} else {
			    		this.addNewEmail(emailArray[c].type, emailArray[c].email);
		    		}
	    		}
	    		
		    	component = fieldSet.getComponent('typeCombo');
			    if(component != null) {
				    var id = this.record.get("primary_type_id");
			    	component.setValue(id,true);
			    	//component.select('2',true);
		    	}
		    	
		    	component = fieldSet.getComponent('companyCombo');
			    if(component != null) {
				    var id = this.record.get("company_id");
				    if(id) {
			    		component.setValue(id,true);
		    		}
			    	//component.select('2',true);
		    	}
		    	
		    	component = fieldSet.getComponent('contactIDField');
			    if(component != null) {
			    	component.setValue(this.record.get("contact_id"));
			    	//component.select('2',true);
		    	}
		    	
		    	// updating title
			    component = fieldSet.getComponent('titleField');
		    	if(component != null) {
			    	component.setValue(this.record.get("title"));
		    	}

	    	}
    	}
    },
    
    
    addNewPhone: function(myKey, myValue) {
	    this.phonePanel.add(new PhoneEmailContainer("Phone Number",myKey,myValue));
	    this.phonePanel.doLayout();
	    this.phonePanel.itemCount++;
    },
    removePhone: function() {
	    var lastPhoneIndex = this.phonePanel.itemCount - 1;
	    var phoneToRemove = this.phonePanel.get(lastPhoneIndex);
	    this.phonePanel.remove(phoneToRemove,true);
	    this.phonePanel.doLayout();
	    this.phonePanel.itemCount--;
    },
    
    addNewEmail: function(myKey, myValue) {
	    this.emailPanel.add(new PhoneEmailContainer("Email Address",myKey, myValue));
	    this.emailPanel.doLayout();
	    this.emailPanel.itemCount++;
    },
    removeEmail: function(indexo) {
	    if(!indexo) {
		    indexo = this.emailPanel.itemCount - 1;
	    }
	    var emailToRemove = this.emailPanel.get(indexo);
	    this.emailPanel.remove(emailToRemove,true);
	    this.emailPanel.doLayout();
	    this.emailPanel.itemCount--;
    },
    
    resetPhonePanel: function() {
	    var eto = this;
	    this.phonePanel.removeAll(true);
	    addPhoneHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewPhone();
	    	}
		};
	    this.addPhoneButton = new Ext.Button({
            iconCls:'add',
            handler: addPhoneHandler,
            disabled: false,
            text: 'Add New Phone'
        });
	    this.phonePanel.insert(0,this.addPhoneButton);
	    this.phonePanel.insert(1,new PhoneEmailContainer("Phone Number"));
	    this.phonePanel.doLayout();
	},
	
	resetEmailPanel: function() {
		var eto = this;
	    this.emailPanel.removeAll(true);
	    addEmailHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewEmail();
	    	}
		};
	    this.addEmailButton = new Ext.Button({
            iconCls:'add',
            handler: addEmailHandler,
            disabled: false,
            text: 'Add New Email'
        });
	    this.emailPanel.add(this.addEmailButton);
	    this.emailPanel.add(new PhoneEmailContainer("Email Address", this.primaryEmailString));
	    this.emailPanel.doLayout();
	}
});

PhoneEmailContainer = Ext.extend(Ext.Panel, {
	containerType: '',
	key: '',
	value: '',
	primary: false,
	typeId: 'phoneEmailContainer',
	initComponent:function() {
		var eto = this;
		removeHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.remove(eto,true);
	    		//eto.ownerCt.doLayout();
	    	}
		};
		var typeString = 'Type:';
		if(this.containerType == "Phone Number") {
			typeString =  "Type:";
		} else {
			typeString =  "Type:";
		}
	    Ext.apply(this, {
            bodyStyle: 'padding:5 5;',
            layout: 'table',
        	items: [{
                xtype: 'displayfield',
                fieldClass: 'cook_contact_text',
                value: this.containerType+':'
            },{
                xtype: 'textfield',
                itemId:'phoneNum',
                name: 'phoneNum',
                value: this.value,
                width: 200
            },{
                xtype: 'displayfield',
                value: typeString,
                style: 'padding-left: 30;',
                fieldClass: 'cook_contact_text'
            },{
                xtype: 'textfield',
                itemId:'phoneType',
                name: 'phoneType',
                //fieldLabel: 'Type',
                value: this.key,
                width: 80,
                disabled: this.primary
            },{
                xtype: 'button',
                itemId:'removeButton',
                style: 'padding-left: 10;',
	            iconCls:'remove',
	            handler: removeHandler,
	            disabled: this.primary
        	}]
		});
	    
    	PhoneEmailContainer.superclass.initComponent.call(this);
    },
    constructor: function(contType, thisKey, thisValue) {
	    var eto = this;
	    this.containerType = contType;
	    this.key = thisKey;
	    this.value = thisValue;
	    if(thisKey == "Primary Email") {
		    this.primary = true;
	    }
		PhoneEmailContainer.superclass.constructor.call(this);
    },
    
    getValue: function() {
	    var findArray = this.find("itemId","phoneNum");
	   	if(findArray.length > 0) {
		   	return findArray[0].getValue();
	   	} else {
		   	return '';
	   	}
   	},
   	
   	getKey: function() {
	    var findArray = this.find("itemId","phoneType");
	   	if(findArray.length > 0) {
		   	return findArray[0].getValue();
	   	} else {
		   	return '';
	   	}
   	},
   	
   	setValues: function(newKey, newValue) {
	   	// setting type
	   	var findArray = this.find("itemId","phoneType");
	   	if(findArray.length > 0) {
		   	findArray[0].setValue(newKey);
	   	}
	   	// setting email/phone
	   	findArray = this.find("itemId","phoneNum");
	   	if(findArray.length > 0) {
		   	findArray[0].setValue(newValue);
	   	}
   	}
});
