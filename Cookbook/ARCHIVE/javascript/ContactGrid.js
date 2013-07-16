Ext.ns("Cookbook.View");

ContactGrid = Ext.extend(Cookbook.View.uGridPanel, {
	expander: '',
	tabContainer: '',
	contactStore: '',
    initComponent:function() {
	    var eto = this;
	    
	    var allHandler = function(button, event) {
	    	if(event) {
		    	eto.findAll(eto);
	    	}
		};
		
		var bizFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.findGroup(button.menuId, eto);
	    	}
		};
		
		var companyFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.findCompany(button.menuId, eto);
	    	}
		};
		
		var liveSearchHandler = function(field, event) {
	    	if(event) {
		    	eto.findName(field.getValue(), eto);
    		}
		};
		
		var addContactHandler = function(button, event) {
	    	if(event) {
		    	if(typeof eto.tabContainer.openCreateContactForm == "function") {
			    	eto.tabContainer.openCreateContactForm();
		    	} else {
			    	eto.tabContainer.openNewTab("EditContactForm",null);
		    	}
    		}
		};
		
		var editContactHandler = function(button, event) {
	    	if(event) {
		    	if(permissions.editContact) {
				    var selectedRecord = eto.getSelectionModel().getSelected();
				    if(typeof eto.tabContainer.openEditContactForm == "function") {
				    	eto.tabContainer.openEditContactForm(selectedRecord.get("contact_id"));
			    	} else {
				    	eto.tabContainer.openNewTab("EditContactForm",selectedRecord.get("contact_id"));
			    	}
		    	}
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

		this.contactStore = new Ext.data.Store({
			id: 'contactStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetContacts.ashx', // File to connect to
				method: 'POST'
			}),
			reader: new Ext.data.JsonReader({   
				root: 'rows',
				totalProperty: 'total',
				id: 'contact_id'
			}, [
				{name: 'contact_id', type: "int", mapping: 'contact_id'},
				{name: 'contact_name', type: "string", mapping: 'contact_name'},
				{name: 'company', type: "string", mapping: 'company'},
				{name: 'email', convert: makeEmailString},
				{name: 'phone', convert: makePhoneString},
				{name: 'primary_type', type: "string", mapping: 'primary_type'},
				{name: 'title', type: "string", mapping: 'title'},
				{name: 'primary_email', mapping: 'primary_email'}
			])

		});
		
		//contactStore.load();
		
		var dynamicMenu = new Ext.menu.Menu({
		    items: [{
			    text: "All", handler: allHandler
		    }]
	    });
	    
	    var companyMenu = new Ext.menu.Menu({
		    items: [{
			    text: "All", handler: allHandler
		    }]
	    });	    
	    
		// CONTACT TYPE STORE
	    var contactTypeStore = new Ext.data.Store({
			id: 'contactTypeStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetContactTypes.ashx', // File to connect to
				method: 'GET'
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
		
		contactTypeStore.on('load', function(thisStore, recs, op) {
			thisStore.sort("type_name", "ASC");
			var rec = thisStore.getRange();
			for(var c = 0; c < rec.length; c++) {
				var menuItem = rec[c].get("type_name");
				var menuItemID = rec[c].get("store_contact_type");
				if(menuItem) {
					dynamicMenu.addMenuItem({text: menuItem, menuId: menuItemID, handler: bizFilterHandler});
				}
			}
		});
		
		contactTypeStore.load();
		
		// COMPANY TYPE STORE
	    var companyStore = new Ext.data.Store({
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
		
		companyStore.on('load', function(el, rec, op) {
			for(var c = 0; c < rec.length; c++) {
				var menuItem = rec[c].get("company_name");
				var menuItemID = rec[c].get("store_company_id");
				if(menuItem) {
					companyMenu.addMenuItem({text: menuItem, menuId: menuItemID, handler: companyFilterHandler});
				}
			}
		});
		
		companyStore.load();
		
	    // row expander
	    expander = new Ext.grid.RowExpander({
	        tpl : new Ext.Template(
	            '<p><b>Name:</b> {contact_name}</p>',
	            '<p><b>Company:</b> {company}</p>',	            
	            '<p><b>Title:</b> {title}</p>',
	            '<p><b>Email:</b> {email}</p>',
	            '<p><b>Phone:</b> {phone}</p>',
	            '<p><b>Type:</b> {primary_type}</p>'
        	)
	    });
		
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    this.on('rowdblclick', this.onRowDblClick, this);

	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
	    
	    this.on('activate', function() {
	    	this.refresh();
    	}, this);
    	
	    var liveSearchTF = new Ext.form.TextField({
		    emptyText: 'Search by name...',
		    enableKeyEvents: true
	    });
		liveSearchTF.on('keyup', liveSearchHandler);
	    
		this.editButton = new Ext.Button({
	        text:'Edit',
            tooltip:'Edit Selected Contact',
            iconCls:'open',
            disabled:true,
            //ownerCt: this,
            handler: editContactHandler
        });
        
		this.deleteButton = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected Contact',
            iconCls:'remove',
            handler: this.onDeleteContact,
            disabled:true
        });
	    Ext.apply(this, {
		    store: this.contactStore,
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            expander,
		            {id:'contact_name',header: "Contact", width: 40, dataIndex: 'contact_name'},
		            {header: "Type", dataIndex: 'primary_type'},
		            {header: "Company", dataIndex: 'company'}
	        	]
			}),
			sm: sm1,

			// inline toolbars
			tbar: [{
		        text:'View All',
	            tooltip:'View All Contacts',
	            iconCls:'add',
	            handler: allHandler
	        },{  
		        text:'Select Contact Type',
	            tooltip:'Filter by Contact Type',
	            iconCls:'open',
	            xtype: 'button',
	            menu: dynamicMenu
	        },{  
		        text:'Select Company',
	            tooltip:'Filter by Company',
	            iconCls:'open',
	            xtype: 'button',
	            menu: companyMenu
	        }, liveSearchTF,{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}],
	    	bbar: new Ext.PagingToolbar({
	            store: this.contactStore,
	            items: [this.editButton, '->', {
			        text:'Create',
		            tooltip:'Create New Contact',
		            iconCls:'add',
		            disabled: !permissions.createContact,
		            handler: addContactHandler
		        },'-',this.deleteButton,{
			    	xtype: 'tbspacer',
			    	width: '40'
		    	}]
	        }),       		
	        viewConfig: {
	            forceFit:true
	        },
	        autoWidth: true,
	        // set width and it will forceFit to it
	        width: 600,
	        autoHeight: true,
	        stripeRows: true,
	        plugins: expander,
	        //collapsible: true
	        //animCollapse: false,
	        //frame:true,
	        title: 'Contacts'
	        //iconCls: 'icon-grid'
		});
		
	    this.on('afterrender', function(p){
            this.on('resize', function(p){
	            p.resizeStore();
	            p.getStore().reload();
	        });
        });
        
    	ContactGrid.superclass.initComponent.call(this);
    },
	constructor: function(thisTabContainer,config) {
		Ext.apply(this, config);
		this.tabContainer = thisTabContainer;
        ContactGrid.superclass.constructor.apply(this);
    },
    onRowDblClick: function(g, rowIndex, e) {
	    if(permissions.editContact) {
	    	var selectedRecord = g.getStore().getAt(rowIndex);
	    	if(typeof this.tabContainer.openEditContactForm == "function") {
		    	this.tabContainer.openEditContactForm(selectedRecord.get("contact_id"));
	    	} else {
		    	this.tabContainer.openNewTab("EditContactForm",selectedRecord.get("contact_id"));
	    	}
    	}
    },
    /*onEditContact: function() {
	    if(permissions.editContact) {
		    var grid1 = this.ownerCt.ownerCt;
		    var selectedRecord = grid1.getSelectionModel().getSelected();
		    if(this.inTab) {
		    	this.ownerCt.ownerCt.openNewTab("EditContactForm",selectedRecord.get("contact_id"));
	    	} else {
	    		//Cookbook.openEditContactForm(selectedRecord.get("contact_id"));
	    		this.ownerCt.ownerCt.ownerCt.openEditContactForm(selectedRecord.get("contact_id"));
    		}
    	}
    },*/
    onRowSelect: function(sm, rowIndex, r) {
	    if(permissions.editContact) {
        	this.editButton.enable();
    	}
    	if(permissions.deleteContact) {
        	this.deleteButton.enable();
    	}
    },
    
    onRowDeselect: function(sm, rowIndex, r){        
        this.editButton.disable();
        this.deleteButton.disable();
    },
    onDeleteContact: function() {
	    var eto = this;
	    var grid1 = this.ownerCt.ownerCt;
	    var selectedRecord = grid1.getSelectionModel().getSelected();
	    //Ext.Msg.alert('Selection Made','You are trying to delete: ' + selectedRecord.get("project_id"));
	    Ext.MessageBox.confirm('Delete Contact?', 'Are you sure you want to delete contact named \"' + selectedRecord.get("contact_name") + '\"?', function(btn) {
        	if(btn == "yes") {
				var conn = new Ext.data.Connection();
				conn.request({
				    url: 'DeleteContact.ashx',
				    method: 'POST',
				    params: {"contact_id": selectedRecord.get("contact_id")},
				    failure: function() {
				        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
				    },
				    success: function(response, opts) {
					    var jsonResponse = Ext.util.JSON.decode(response.responseText);
					    if(jsonResponse.success != null) {
					    	if(jsonResponse.success) {
						    	Ext.Msg.alert('Success', 'Contact deleted!');
						    	grid1.getStore().reload();
						    	eto.deleteButton.disable();
				    		} else if(!jsonResponse.success) {
						    	if(jsonResponse.rows) {
						    		Ext.Msg.alert('Removal Failed', 'Contact in use or may be you do not have enough permissions to remove contacts.');
					    		}
				    		}
						} else {
				    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
			    		}
				    }
				});
				
        	}
    	});
    },
    
    findAll: function() {
	    this.setTitle("Contacts: All Contacts");
	    var store = this.getStore();
	    store.baseParams = {};
	    store.reload();
    },
    findGroup: function(groupId) {
	    this.setTitle("Contacts: Filter by Business Unit");
	    var store = this.getStore();
	    store.baseParams = {'primary_type': groupId};
	    store.reload();
    },    
    findCompany: function(companyId) {
	    this.setTitle("Contacts: Filter by Company");
	    var store = this.getStore();
	    store.baseParams = {'company_id': companyId};
	    store.reload();
    },
    findName: function(contactName) {
	    this.setTitle("Contacts: Filter by Name");
	    var store = this.getStore();
	    store.baseParams = {'contact_name': contactName};
	    store.reload();
    },
    
    refresh: function() {
	    var store = this.getStore();
	    store.reload();
    }

});

