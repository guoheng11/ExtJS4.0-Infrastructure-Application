ContactTextField = Ext.extend(Ext.form.FieldSet, {
	blank: true,
    projectId: '',
    contactType: '',
	contactId: '',
    contactName: '',
	record: new Ext.data.Record({}),
	
	initComponent:function() {
		var eto = this;
		removeHandler = function(button, event) {
	    	if(event) {
		    	eto.removeEntry(eto);
		    	//eto.ownerCt.remove(eto, true); // auto destroy
	    	}
		};
		
		function makeEmailString(v, record) {
			var returnString = '';
			var emailArray = record.email;
			if(emailArray instanceof Array) {
				for(var c = 0; c < emailArray.length; c++) {
					if(emailArray[c].type) {
		    			returnString = returnString + "<br>"+ emailArray[c].type+":"+ emailArray[c].email;
	    			} else {
		    			returnString = returnString + "<br>"+emailArray[c].email + "<br>";
	    			}
	    		}
    		}
    		return returnString;
		}
		
		function makePhoneString(v, record) {
			var returnString = '';
			var phoneArray = record.phone;
			if(phoneArray instanceof Array) {
				for(var c = 0; c < phoneArray.length; c++) {
					if(phoneArray[c].type) {
		    			returnString = returnString + "<br>" + phoneArray[c].type+":"+ phoneArray[c].phone;
	    			} else {
		    			returnString = returnString  + "<br>"+ phoneArray[c].phone;
	    			}
	    		}
    		}
    		return returnString;
		}
		
		infoHandler = function(button, event) {
	    	if(event) {
		    	var getContactStore = new Ext.data.Store({
					id: 'getContactStore',
					proxy: new Ext.data.HttpProxy({
						url: 'GetContacts.ashx', // File to connect to
						method: 'POST'
					}),
					baseParams: {'contact_id':eto.contactId},
					reader: new Ext.data.JsonReader({   
						// we tell the datastore where to get his data from
						root: 'rows',
						totalProperty: 'total',
						id: 'contact_id'
					}, [
						{name: 'contact_id', type: "int", mapping: 'contact_id'},
						{name: 'contact_name', type: "string", mapping: 'contact_name'},
						{name: 'email', convert: makeEmailString},
						{name: 'phone', convert: makePhoneString},
						{name: 'primary_type', type: "string", mapping: 'primary_type'},
						{name: 'title', type: "string", mapping: 'title'}
					])
				});
				
				getContactStore.on('load', function(el, rec, op) {
					if(rec.length > 0) {
				    	Ext.MessageBox.alert('Contact Information','<b>Name:</b> ' + rec[0].get("contact_name") + 
				    		'<br><br><b>Title:</b> ' + rec[0].get("title") +
				    		'<br><br><b>Type:</b> ' + rec[0].get("primary_type") +
							'<br><br><b>Email:</b> ' + rec[0].get("email") +
							'<br><br><b>Phone:</b> ' + rec[0].get("phone") +
							 '');
					}
				});
				
				getContactStore.load();
	    	}
		};
		
		Ext.apply(this, {
			frame: false,
	        width: 250,
            title: '',
            defaultType:'displayfield',
            
            height: this.projectCreationField ? 25 : 45,
            style: {'margin-bottom': "3px",padding: "1px"},
            layout: 'table',
            items: [{
	            itemId:'nameField',
	            name: 'contact_name',
	            disabled: false,
	            fieldClass: 'cook_contact_text',
	            style: {padding: this.projectCreationField ? "3px" : "9px"},
	            //hideLabel: true,
	            //style: 'h1',
	            width: 200,
	            height: 15,
	            xtype: 'displayfield',
	            value: this.contactName//+this.fieldTextName
            },{
	            layout:'table',
	            xtype: 'panel',
	            bodyStyle: 'padding:9px 0px;',
	            hidden: this.projectCreationField,
	            items: [{
			    	xtype: 'button',
		            iconCls: 'info',
		            disabled: this.blank,
		            handler: infoHandler
			    },{
		            xtype: 'button',
		            iconCls: 'remove',
		            itemId: 'removeButton',
		            disabled: this.blank,
		            //scope: eto,
		            handler: removeHandler
            	}]
            }]
        });
        
        ContactTextField.superclass.initComponent.call(this);
        
        this.on('afterrender', function() {
	        var thisElement = this;
			var formPanelDropTargetEl = this.getEl();
			if(this.blank) {
				var formPanelDropTarget = new Ext.dd.DropTarget(formPanelDropTargetEl, {
					ddGroup     : 'contactDD',
					notifyEnter : function(ddSource, e, data) {
						thisElement.addClass('dragHighlight');
						//thisElement.removeClass('dragHighlight');
					},
					notifyOut : function(ddSource, e, data) {
						thisElement.removeClass('dragHighlight');
					},
					notifyDrop  : function(ddSource, e, data){
						var selectedRecord = ddSource.dragData.selections[0];
						thisElement.loadNewRecord(selectedRecord, thisElement);
						// Load the record into the form
						//formPanel.getForm().loadRecord(selectedRecord);	
						
						thisElement.blank = false;
						if(!thisElement.projectCreationField) {
							thisElement.enableRemove(true, thisElement);
						}
						
						// Delete record from the grid.  not really required.
						//ddSource.grid.store.remove(selectedRecord);	
						thisElement.removeClass('dragHighlight');
						
						return(true);
					}
				});
			}
		});
		
		this.addEvents('blankFilled', 'removedEntry');

    },
    constructor: function(blankus, projectId1, contactType1, contactId1, contactName1, projectCreationField1) {
        this.blank = blankus;
        this.projectId= projectId1;
        this.contactType = contactType1;
	    this.contactId= contactId1;
        this.contactName= contactName1;
        this.projectCreationField = projectCreationField1;
        ContactTextField.superclass.constructor.apply(this);
    },
    
    loadNewRecord: function(newRecord) {
	    if(newRecord) {
		    this.record = newRecord;
	    }
	    this.loadRecord();
	},
	loadRecord: function() {
		// name
	    var recordValue = this.record.get("contact_name");
		this.getComponent('nameField').setValue(recordValue);		
		var contactId = this.record.get("contact_id");
		
		if(!this.projectCreationField) {
			var eto = this;
			var conn = new Ext.data.Connection();
			conn.request({
			    url: 'AddProjectContact.ashx',
			    method: 'POST',
			    params: {"project_id": eto.projectId,
			    		"contact_id": contactId,
			    		"contact_type": eto.contactType},
			    failure: function(response, opts) {
				    eto.fireEvent('blankFilled', eto);
			    },
			    success: function(response, opts) {
				    eto.fireEvent('blankFilled', eto);
			    }
			});
		}

	},
	
	removeEntry: function() {
		var eto = this;
		if(!this.projectCreationField) {
			var conn = new Ext.data.Connection();
			conn.request({
			    url: 'RemoveProjectContact.ashx',
			    method: 'POST',
			    params: {"project_id": eto.projectId,
			    		"contact_id": eto.contactId,
			    		"contact_type": eto.contactType},
			    failure: function(response, opts) {
				    eto.fireEvent('removedEntry', eto);
			    },
			    success: function(response, opts) {
				    eto.fireEvent('removedEntry', eto);
			    }
			});
		}
	},
	
	enableRemove: function(enable) {
		var buttons = this.find('itemId','removeButton');
		if(buttons.length > 0) {
			if(enable) {
				buttons[0].enable();
			} else {
				buttons[0].disable();
			}
		}
	},
	getValue: function() {
		if(this.blank) {
			return null;
		} else {
			return this.record.get('contact_id');
		}
	}
});