CreateUserWindow = Ext.extend(Ext.Window, {
	fp: '',
	record: '',
	contactTypeStore: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';

	    Ext.apply(this, {
		    // TAB main
            title:'Create User',
            //frame: true,
            width: 660,
            height: 250,
            anchor:'95%',
            bodyStyle: 'padding:20 20;',
            closable:false,
            modal: true,
            items: [this.fp]
		});
	    
    	CreateUserWindow.superclass.initComponent.call(this);
    	/*this.on('close', new function() {
	    	Ext.MessageBox.alert('Error','User was not created. Using guest account.');
    	}, this);*/
    	this.fp.buttons[0].on('click', this.onFormSubmit, this);
    	this.fp.buttons[1].on('click', this.onFormReset, this);
    	this.fp.buttons[2].on('click', this.onFormCancel, this);

    },
    constructor: function(realName) {
	    var eto = this;
	    
	    // run query on name
	    var contactStore = new Ext.data.Store({
			id: 'contactStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetContacts.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"contact_name": realName}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'contact_id'
			}, [
				{name: 'contact_id', type: "int", mapping: 'contact_id'},
				{name: 'contact_name', type: "string", mapping: 'contact_name'},
				{name: 'email', type: "string", mapping: 'email'},
				{name: 'phone', type: "string", mapping: 'phone'},
				{name: 'primary_type_id', type: "int", mapping: 'primary_type_id'},
				{name: 'primary_type', type: "string", mapping: 'primary_type'}
			])
		});
		
		contactTypeStore = new Ext.data.Store({
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
		
		contactTypeStore.load();

		this.fp = new Ext.FormPanel({
	        //frame: true,
	        //title:'User Creation',
	        bodyStyle: "background-color:#DFE8F6; padding:0 10px 0;",
	        border: false,
	        bodyBorder: false,
	        labelWidth: 150,
	        width: 600,
	        items: [

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
	                fieldLabel: 'Name (e.g. \"John Smith\")',
	                anchor: '95%'
	            },{
	                xtype: 'combo',
	                itemId:'typeCombo',
                    width:150,
		            name: 'primary_type',
		            fieldLabel: 'Contact Type',
		            store: contactTypeStore,
			        displayField:'type_name',
			        valueField: 'store_contact_type',
			        hiddenName:'primary_type',
			        allowBlank: false,
			        typeAhead: true,
			        mode: 'remote',
			        editable: 'false',
			        forceSelection: true,
			        triggerAction: 'all',
			        emptyText:'choose type...',
			        selectOnFocus:true
	            },{
	                xtype: 'textfield',
	                itemId:'phoneField',
	                name: 'phone',
	                fieldLabel: 'Phone',
	                anchor: '95%'
	            },{
	                xtype: 'textfield',
	                itemId:'emailField',
	                name: 'email',
	                fieldLabel: 'Email',
	                anchor: '95%'
	            },{
	                xtype: 'hidden',
	                disabled: true,
	                itemId: 'contactIDField',
	                name: 'contact_id'
	            },{
	                xtype: 'hidden',
	                disabled: false,
	                itemId: 'createUserFlag',
	                name: 'create_user',
	                value: 'true'
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
	    
		contactStore.on('load', function() {
			/*var count = contactStore.getTotalCount(); 
			if(count == 1) {
				var record1 = contactStore.getAt(0);
				Ext.MessageBox.confirm('Are you this person?','Contact with your name already exists! Are you the following person? <br>Name: \"' + record1.get("contact_name") + 
					'\"<br>Email: \"' + record1.get("email") +
					'\"<br>Phone: \"' + record1.get("phone") +
					'\"<br>Group: \"' + record1.get("primary_type") + '\"', function(btn) {
		        	if(btn == "yes") {
						eto.record = record1;
						eto.loadContact();
		        	}
        		});
			} else if(count > 1) {
				Ext.MessageBox.alert('Error', count+' contacts with the your name. Create new one or tell Alex to develop an interface to choose between multiple contacts =)');
			}*/
		});
		
		contactStore.load();
		
		CreateUserWindow.superclass.constructor.call(this);
    },
    onFormSubmit: function() {
	    var thisForm = this.fp;
	    if(thisForm.getForm().isValid()){
		    
			var submitObject = new Object();
			var arr = thisForm.find("name", "contact_name");
			if(arr.length > 0) {
				submitObject.contact_name = arr[0].getValue();
			}
			arr = thisForm.find("name", "primary_type");
			if(arr.length > 0) {
				submitObject.primary_type = arr[0].getValue();
			}
			arr = thisForm.find("name", "phone");
			if(arr.length > 0) {
				var phoneObject = new Object();
				phoneObject.phone = arr[0].getValue();
				phoneObject.type = "Default";
				submitObject.phone = new Array();
				submitObject.phone.push(phoneObject);
				submitObject.phone = Ext.util.JSON.encode(submitObject.phone);
			}
			arr = thisForm.find("name", "email");
			if(arr.length > 0) {
				var emailObject = new Object();
				emailObject.email = arr[0].getValue();
				emailObject.type = "Primary";
				emailObject.primary = true;
				submitObject.email = new Array();
				submitObject.email.push(emailObject);
				submitObject.email = Ext.util.JSON.encode(submitObject.email);
			}
			arr = thisForm.find("name", "title");
			if(arr.length > 0) {
				submitObject.title = arr[0].getValue();
			}
			submitObject.create_user = true;
			
			Ext.Ajax.request({
				url: 'UpdateContact.ashx',
			    method: 'POST',
			    params:  submitObject,
			    failure: function() {
				    Ext.MessageBox.alert('Error','Submission Error');
			    },
			    success: function() {
				    Ext.MessageBox.alert('Success','Contact Updated Successfully');
    				thisForm.ownerCt.close();
			    }
			});
		} else {
			Ext.Msg.alert('Not Complete', 'Fill out all required fields!');
		}
    },
    onFormReset: function() {
		this.loadContact();
    },
    onFormCancel: function() {
	    Ext.Msg.alert('User Not Created', 'Using GUEST account. If you want to create your own account you will need to reload the page and fill out this form.');
	    //mainToolbar.setLoginStatus("Logged In");
	    this.close();
    },
    loadContact: function() {
	    if(this.record) {
		    var fieldSet = fp.getComponent('mainFieldSet');
		    if(fieldSet) {
			    // updating name
			    var component = fieldSet.getComponent('nameField');
		    	if(component) {
			    	component.setValue(this.record.get("contact_name"));
		    	}
		    	
		    	//updating phone
		    	component = fieldSet.getComponent('phoneField');
			    if(component != null) {
			    	component.setValue(this.record.get("phone"));
		    	}
		    	
		    	component = fieldSet.getComponent('emailField');
			    if(component != null) {
			    	component.setValue(this.record.get("email"));
		    	}
				
		    	component = fieldSet.getComponent('typeCombo');
			    if(component != null) {
				    var id = this.record.get("primary_type_id");
			    	component.setValue(id,true);
			    	//component.select('2',true);
		    	}
		    	
		    	component = fieldSet.getComponent('contactIDField');
			    if(component != null) {
			    	component.setValue(this.record.get("contact_id"));
			    	component.enable();
			    	//component.select('2',true);
		    	}

	    	}
    	}
    }

});


