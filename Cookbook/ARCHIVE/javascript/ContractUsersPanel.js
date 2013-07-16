ContractUsersFieldSet = Ext.extend(Ext.form.FieldSet, {	
    initComponent: function() {	    
	    var eto = this;
	    var user1 = new ContractUserContainer("Lindsey Bois", "lindsey.bois@usan.com", 2);
	    
	    var contactGrid = new ContactGrid(null,{
		    enableDragDrop: true,
		    ddGroup:'contactDD',
		    listeners: {
			}
		});
		
	    var contactsWindow = new Ext.Window({
	        title: 'Available Contacts (Drag and Drop into Contract)',
	        width: 600,
	        autoHeight: true,
	        closeAction: 'hide',
	        bodyStyle: {
	            backgroundColor: 'white',
	            margin: '0px',
	            border: '0px none'
	        },
	        items: contactGrid
	    });
    
	    var buttonPanel = new Ext.Panel({
		    border: false,
		    bodyBorder: false,
		    items: [{
		        xtype: 'button',
		        text: 'Add Contact',
		        iconCls: 'add',
		        handler: function(button, event) {
			        if(event) {
				        contactsWindow.show();
				        /*var newDate = new ContractDateContainer();
				        eto.add(newDate);
				        eto.doLayout();*/
			        }
		        }
	        }]
        });
        Ext.apply(this, {
	        title: "Contacts",
	        anchor:'98%',
	        height: "auto",
	        autoHeight: true,
	        items: [buttonPanel, user1]
	    });
	    this.on('afterrender', function() {
	        var thisElement = this;
			var formPanelDropTargetEl = this.getEl();
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
					if(selectedRecord instanceof Ext.data.Record) {
						eto.addNewContact(selectedRecord);
					}
					thisElement.removeClass('dragHighlight');
					
					return(true);
				}
			});
		});
        ContractUsersFieldSet.superclass.initComponent.apply(this);
    },
    constructor: function() {
        ContractUsersFieldSet.superclass.constructor.apply(this);
    },
    addNewContact: function(contactRecord) {
	    if(contactRecord instanceof Ext.data.Record) {
		    var contactArray = this.find('userContainer', true);
		    var searchID = contactRecord.get('contact_id');
		    if(Ext.isNumber(searchID) && searchID >= 0) {
			    var allowedCompanies = ["USAN", "ISI"];
			    var userCompanyAllowed = false;
			    for(var a = 0; a < allowedCompanies.length; a++) {
				    if(allowedCompanies[a] == contactRecord.get('company')) {
					    userCompanyAllowed = true;
				    }
			    }
			    if(userCompanyAllowed) {
				    var contactAlreadyExists = false;
				    for(var a = 0; a < contactArray.length; a++) {
					    if(contactArray[a].contactID == searchID) {
							contactAlreadyExists = true;
						}
					}
					if(!contactAlreadyExists) {
						var newUser = new ContractUserContainer(contactRecord.get('contact_name'), contactRecord.get('primary_email'), contactRecord.get('contact_id'));
						this.add(newUser);
						this.doLayout();
					} else {
						Ext.Msg.alert("Error", "Sorry, but '" + contactRecord.get('contact_name') + "' is already a part of this contract!");
					}
				} else {
					Ext.Msg.alert("Error", "Sorry, but '" + contactRecord.get('contact_name') + "' is not allowed to be in this contract because (s)he works for '"+ contactRecord.get('company') + "' !");
				}
			}
		}
	}
});

ContractUserContainer = Ext.extend(Ext.Panel, {	
    initComponent: function() {	    
	    var eto = this;
	    this.nameDF = new Ext.form.DisplayField({
		    width: 150,
		    cls: 'x-form-item',
		    style: 'padding-left: 5px;',
		    value: this.contactName
	    });
	    
	    this.emailDF = new Ext.form.DisplayField({
		    width: 250,
		    cls: 'x-form-item',
		    style: 'padding-left: 5px;',
		    value: this.contactEmail
	    });
	    
        Ext.apply(this, {
	        layout: 'hbox',
	        height: 30,
	        bodyStyle: 'padding-top: 5px;',
	        items: [{
		        xtype: 'displayfield',
		        cls: 'x-form-item',
		        value: 'Name:'
	        },this.nameDF,{
		        xtype: 'displayfield',
		        cls: 'x-form-item',
		        style: 'padding-left: 15px;',
		        value: 'Email:'
	        },this.emailDF,{
		        xtype: 'button',
		        style: 'padding-left: 10px;',
		        iconCls: 'reset',
		        handler: function(button, event) {
			        if(event) {
				        eto.ownerCt.remove(eto);
			        }
		        },
		        disabled: false
	        }]		        
	    });
	    this.userContainer = true;
        ContractUserContainer.superclass.initComponent.apply(this);
    },
    constructor: function(contactName, contactEmail, contactID) {
	    this.contactName = (contactName) ? contactName : "";
	    this.contactEmail = (contactEmail) ? contactEmail : "";
	    this.contactID = contactID;
        ContractUserContainer.superclass.constructor.apply(this);
    }
});
