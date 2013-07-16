ProjectContactsPanel = Ext.extend(Ext.Panel, {
	contactPanel: '',
	projectContactForm: '',
    projectId: '',
    projectName: '',
    tabContainer: '',
    
    initComponent:function() {
	    var eto = this;
	    this.contactPanel = new ContactGrid(this.tabContainer,{
		    enableDragDrop: true,
		    ddGroup:'contactDD',
		    listeners: {
			}
		});
		
		var activateHandler = function(event) {
			if(event) {
				eto.onActivated();
			}
		};
		
		var selectViewHandler = function(viewId) {
	    	if(viewId >= 0) {
		    	eto.contactPanel.findGroup(viewId);
	    	} else {
		    	eto.contactPanel.findAll();
	    	}
		};
		
	    this.projectContactForm = new ProjectContactsMainPanel(this.projectId);
		this.projectContactForm.on('groupSelected', selectViewHandler, this);

	    Ext.apply(this, {
		    // TAB main
            title: this.projectName + ' Contacts',
            //frame: true,
            anchor:'95%',
            closable:true,
            //border:true,
            autoScroll: true,
            layout:'column',
            items: [{
	            width: 280,
	            border:false,
	            bodyStyle:'padding:5px 5px 0;',
	            items:[this.projectContactForm]
            },{
	            columnWidth: 0.99,
	            border:false,
	            //y: 30,
	            bodyStyle:'padding:5px 5px 0;',
	            items:[this.contactPanel]
            }]
		});
	    
    	ProjectContactsPanel.superclass.initComponent.call(this);
    	this.on('activate', function() {
	    	this.onActivated;
    	}, this);
    },
    
    constructor: function(tabCont,projID, projectNAME) {
	    this.tabContainer = tabCont;
        this.projectId = projID;
        this.projectName = projectNAME;
        ProjectContactsPanel.superclass.constructor.call(this);
    },
    
    onActivated: function() {
        this.contactPanel.refresh(this.contactPanel);
    }
});

ProjectContactsMainPanel = Ext.extend(Ext.Panel, {
	projectId: '',
    activePanel: '',
    summaryPanel: '',
    contactTypePanel: '',
    contactArray: '',
    contactTypeStore: '',
    projectContactStore: '',
    lastGroupId: '-1',
    lastGroupName: 'Summary',
    typeStoreLoaded: false,
    contactStoreLoaded: false,
    
    initComponent:function() {
	    var eto = this;
	    
	    var summaryPanelHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('groupSelected', -1);
		    	eto.showSummaryPanel(eto);
	    	}
		};
		
		var typePanelHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('groupSelected', button.menuId);
		    	eto.showTypePanel(button.menuId, button.text, eto);
	    	}
		};
		
	    var dynamicMenu = new Ext.menu.Menu({
		    items: [{
			    text: "Summary", handler: summaryPanelHandler
		    }]
	    });
	    
	    // CONTACT TYPE STORE
	    this.contactTypeStore = new Ext.data.Store({
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
		
		this.contactTypeStore.on('load', function(thisStore, recs, op) {
			thisStore.sort("type_name", "ASC");
			var rec = thisStore.getRange();
			for(var c = 0; c < rec.length; c++) {
				var menuItem = rec[c].get("type_name");
				var menuItemID = rec[c].get("store_contact_type");
				if(menuItem) {
					dynamicMenu.addMenuItem({text: menuItem, menuId: menuItemID, handler: typePanelHandler});
				}
			}
			if(eto.contactStoreLoaded) {
				eto.redrawContactTypePanel(-1,eto);
				eto.redrawSummaryPanel();
				
				if(eto.lastGroupId >= 0) {
			    	eto.showTypePanel(eto.lastGroupId,eto.lastGroupName);
		    	} else {
			    	eto.showSummaryPanel();
		    	}
	    	}				
			eto.typeStoreLoaded = true;
		});
		
		this.contactTypeStore.load();
		
		// PROJECT CONTACT STORE
		this.projectContactStore = new Ext.data.Store({
			id: 'projectContactStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectContacts.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				root: 'rows',
				totalProperty: 'total',
				id: 'contact_name'
			}, [
				{name: 'contact_name', type: "string", mapping: 'contact_name'},
				{name: 'contact_type_name', type: "string", mapping: 'contact_type_name'},
				{name: 'contact_type_id', type: "int", mapping: 'contact_type_id'},
				{name: 'contact_id', type: "int", mapping: 'contact_id'}
			])
		});
		
		this.projectContactStore.on('load', function(thisStore, rec, ops) {
			eto.contactArray = new Array();
			for(var c = 0; c < rec.length; c++) {
				var contactId = rec[c].get("contact_type_id");
				var groupName = rec[c].get("contact_type_name");
				var personName = rec[c].get("contact_name");
				var personId = rec[c].get("contact_id");
				if(contactId > 0) {
					var array = eto.contactArray;
					if(eto.contactArray[contactId] == undefined) {
						eto.contactArray[contactId] = new Array();
						var objecto = new Object();
						objecto.contactName = personName;
						objecto.contactId = personId;
						eto.contactArray[contactId] [0] = objecto;
						eto.contactArray[contactId].groupName = groupName;
						eto.contactArray[contactId].length = 1;
					} else {
						var objecto = new Object();
						objecto.contactName = personName;
						objecto.contactId = personId;
						eto.contactArray[contactId] [eto.contactArray[contactId].length] = objecto;
						//eto.contactArray[id][length].contactName = personName;
						//eto.contactArray[id][length].contactId = personId;
						eto.contactArray[contactId].length++;
					}
				}
			}
			if(eto.typeStoreLoaded) {
				eto.redrawContactTypePanel(-1,eto);
				eto.redrawSummaryPanel();
				
				if(eto.lastGroupId >= 0) {
			    	eto.showTypePanel(eto.lastGroupId,eto.lastGroupName);
		    	} else {
			    	eto.showSummaryPanel();
		    	}
	    	}
	    	eto.contactStoreLoaded = true;
		});
		
		this.projectContactStore.load();
		
		
		this.summaryPanel = new Ext.FormPanel({layout:'form',autoHeight:true});
		
		this.contactTypePanel = new Ext.FormPanel({layout:'form',autoHeight:true});
		
		this.activePanel = new Ext.Panel({
	        layout: 'card',
	        activeItem: 0,
	        autoHeight:true,
	        layoutConfig: {deferredRender: true},
	        items: [this.summaryPanel, this.contactTypePanel]
	    });
		var topToolbar = new Ext.Toolbar({
			style: {'border-bottom':'1px solid', 'border-bottom-color':'#99BBE8'},
			items: [{  
		        text:'View',
	            tooltip:'Select View',
	            iconCls:'open',
	            xtype: 'button',
	            menu: dynamicMenu
	        }, '->',{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}]
    	});
	    Ext.apply(this, {
		    title:'Contacts: Summary',
            frame: true,
            //width: 300,
            //autoWidth: true,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:3px 3px;',
            //layout:'column',
            //columns: 2,
            vertical: true,
            items: [this.activePanel
            ],
            
            tbar: topToolbar
		});
	    
    	ProjectContactsMainPanel.superclass.initComponent.call(this);
    	
    	this.addEvents('groupSelected');
    },
    
    constructor: function(projID) {
        this.projectId = projID;
        ProjectContactsMainPanel.superclass.constructor.call(this);
    },

    showSummaryPanel: function() {
	    this.activePanel.getLayout().setActiveItem(0);
		this.setTitle("Contacts: Summary");
		this.lastGroupId = -1;
		this.lastGroupName = "Summary";
		this.activePanel.doLayout();
    },
    
    showTypePanel: function(contactType, contactTypeName) {
	    //Ext.Msg.alert("Show", "Show TYPE:" + contactType);
	    this.activePanel.getLayout().setActiveItem(1);
	    this.redrawContactTypePanel(contactType);
	    this.setTitle("Contacts: " + contactTypeName);
	    this.lastGroupId = contactType;
		this.lastGroupName = contactTypeName;
	    //this.doLayout();
    },
    reloadThis: function() {
	    this.projectContactStore.reload();
    },
    
    redrawSummaryPanel: function() {
	    var buttonHandler = function(button, event) {
	    	if(event) {
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
		    	var getContactStore = new Ext.data.Store({
					id: 'getContactStore',
					proxy: new Ext.data.HttpProxy({
						url: 'GetContacts.ashx', // File to connect to
						method: 'POST'
					}),
					baseParams: {'contact_id':button.contactId},
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
						{name: 'primary_type', type: "string", mapping: 'primary_type'}
					])
				});
				
				getContactStore.on('load', function(el, rec, op) {
					if(rec.length > 0) {
				    	Ext.MessageBox.alert('Contact Information','<b>Name:</b> ' + rec[0].get("contact_name") + 
				    		'<br><br><b>Type:</b> ' + rec[0].get("primary_type") + 
							'<br><br><b>Email:</b> ' + rec[0].get("email") +
							'<br><br><b>Phone:</b> ' + rec[0].get("phone") +
							'');
					}
				});
				
				getContactStore.load();
	    	}
		};
		
	    this.summaryPanel.removeAll();
	    var count = 0;
	    for (var i in this.contactArray) {
		    if(i >= 0) {
			    count++;
			    var groupName = this.contactArray[i].groupName;
			    var fieldSet = new Ext.form.FieldSet({
				    title: ''+groupName,
	            	defaultType:'displayfield'
	        	});
	        	
			    for (var ii in this.contactArray[i]) {
				    if(ii >= 0) {
					    var objecto = this.contactArray[i][ii];
					    /*var dispField = new Ext.form.DisplayField({
						    value: objecto.contactName,
						    hideLabel: true
					    });*/
					    var dispButton = new Ext.Button({
						    contactId: objecto.contactId,
						    text: objecto.contactName,
						    hideLabel: true,
						    width: 230,
						    ctCls: 'cook_contactButton',
						    handler: buttonHandler
					    });
					    fieldSet.add(dispButton);
				    }
			    }
			    this.summaryPanel.add(fieldSet);
		    }
	    }
	    
	    if(count == 0) {
		    var dispField = new Ext.form.DisplayField({
				value: "<br>Contact List Is Empty. Change view to add contacts to specific views."
			});
			this.summaryPanel.add(dispField);
		}
		
		this.summaryPanel.doLayout();
		//this.activePanel.doLayout();
    },
    addBlankToContactTypePanel: function(groupId, groupName) {
	    var eto = this;
	    var blankCTF = new ContactTextField(true,eto.projectId,groupId);
		blankCTF.groupName = groupName;
		blankCTF.groupId = groupId;
		blankCTF.hide();
		blankCTF.on('blankFilled', function() {
			eto.reloadThis();
		});
		this.contactTypePanel.add(blankCTF);
	},
	
    redrawContactTypePanel: function(groupID) {
	    if(groupID >= 0) {
		    var count = this.contactTypePanel.items.getCount();
		    for(var i = 0; i < count; i++) {
			    var elemento = this.contactTypePanel.get(i);
			    if(elemento.groupId == groupID) {
				    elemento.show();
			    } else {
				    elemento.hide();
			    }
		    }
    	} else {
	    	var eto = this;
	    	this.contactTypePanel.removeAll();
	    	for (var i in this.contactArray) {
			    if(i >= 0) {
				    count++;
				    var groupName = this.contactArray[i].groupName;
				    for (var ii in this.contactArray[i]) {
					    if(ii >= 0) {
						    var objecto = eto.contactArray[i][ii];
						    var filledCTF = new ContactTextField(false, eto.projectId,i,objecto.contactId,objecto.contactName);
							filledCTF.groupName = groupName;
							filledCTF.groupId = i;
							filledCTF.on('removedEntry', function() {
								eto.reloadThis();
							});
							this.contactTypePanel.add(filledCTF);
					    }
				    }
			    }
		    }
		    
		    // create blanks
			var rec = this.contactTypeStore.getRange(0, this.contactTypeStore.getTotalCount());
			for(var c = 0; c < rec.length; c++) {
				var groupName = rec[c].get("type_name");
				var groupNumber = rec[c].get("store_contact_type");
				if(groupName) {
					this.addBlankToContactTypePanel(groupNumber,groupName);
				}
			}
    	}
		
		this.contactTypePanel.doLayout();
		//this.contactTypePanel.syncSize();
		//this.activePanel.doLayout();
    }
});