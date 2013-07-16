/*
 * Ext JS Library 2.2.1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */
 
Ext.namespace('Cookbook');
Cookbook.noteTypeArray = [
	['Other'],
    ['Prompts'],
    ['Assumptions (Standard)'],
    ['Assumptions (Project Specific)'],
    ['Customer Deliverables'],
    ['DEV Hours (billable)'],
    ['DEV Hours (unbillable)'],
    ['PM Hours'],
    ['TC Hours (billable)'],
    ['TC Hours (unbillable)'],
    ['TLS Hours'],
    ['QA Hours'],
    ['SYS Hours (billable)'],
    ['SYS Hours (unbillable)'],
    ['Hardware'],
    ['Dev Start Date'],
    ['Dev Complete Date'],
    ['Quoted Delivery']
];
Ext.enableFx = false;

var viewport;
var tabs;
var mainToolbar;
Cookbook.viewDefinitionStore;
Cookbook.projectLabelTranslationArray;
var userObject = new Object();

function PermissionList () {
	// example permissions - more will be added after GetUserPermissions call
	this.createProject = false;
	this.deleteProject = false;
	this.createContact = false;
	this.deleteContact = false;
	this.editContact = false;
	this.validateUsers = false;
	this.revokeUsers = false;
};

var permissions = new PermissionList();


Ext.onReady(function(){

    Ext.QuickTips.init();
    // Loading mask:
	var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading Website..."});
	myMask.show();
	
	Cookbook.loadGlobalStores();
	var mainPanel = new InitialDataEntryForm();
    var welcomePanel = new WelcomeForm();
    mainToolbar = new MainToolbar({
	    region: 'north',
	    height:30
    });
    var permissionRequest = new Ext.data.Connection();
    permissionRequest.request({
	    url: 'GetUserPermissions.ashx',
	    method: 'GET',
	    //successProperty: 'success',
	    //params: {"project_id": selectedRecord.get("project_id")},
	    failure: function(response, opts) {
		    myMask.hide();
	        Ext.Msg.alert('Error', 'Login Error: Failed Request. Try again or contact an administrator');
	    },
	    success: function(response, opts) {
		    myMask.hide();
		    var jsonResponse = Ext.util.JSON.decode(response.responseText);
		    if(jsonResponse.success != null) {
			    var realName = '';			    
		    	if(jsonResponse.success) {
			    	var permissionGroup = '';
			    	if(jsonResponse.rows) {
				    	
				    	realName = jsonResponse.rows[0].name;
				    	var login1= jsonResponse.rows[0].login;
				    	userObject.login = jsonResponse.rows[0].login;
				    	userObject.name = jsonResponse.rows[0].name;
				    	//permissionGroup = jsonResponse.rows[0].group_name;
				    	//var validated = jsonResponse.rows[0].validated;
			    		//Ext.Msg.alert('Logged In', 'Welcome to USAN Project Management, '+realName);
			    		mainToolbar.setName(realName, login1);
			    		mainToolbar.setLoginStatus('Logged In');
			    		updatePermissions();
			    		//
			    		//mainToolbar.setValidated(validated);
		    		} else {
			    		Ext.Msg.alert('Error', 'Login Error: Server Response in Wrong Format (missing rows). Try again or contact an administrator');
		    		}
	    		} else if(!jsonResponse.success) {
			    	if(jsonResponse.rows) {
				    	realName = jsonResponse.rows[0].name;
				    	Ext.Msg.getDialog().on('beforehide', function() {
							var createUserWindow = new CreateUserWindow(realName);
							createUserWindow.show();
							createUserWindow.on('close', this.updatePermissions, this);
						}, this, {
							single:true
						});

			    		Ext.Msg.alert('First Time Login', realName+', welcome to USAN Project Management. This is your first time using this application, so you need to create an account.');
		    		} else {
			    		Ext.Msg.alert('Error', 'Login Error: Server Response in Wrong Format (missing rows). Try again or contact an administrator');
		    		}
	    		} else {
		    		Ext.Msg.alert('Error', 'Login Error: Server Response in Wrong Format (success flag incorrect). Try again or contact an administrator');
				}
			} else {
	    		Ext.Msg.alert('Error', 'Login Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
    		}
	    }
	});
    
    

    tabs = new Ext.TabPanel({
	    region: 'center',
        //resizeTabs:true, // turn on tab resizing
        minTabWidth: 120,
        //autoWidth:true,
        enableTabScroll:true,
        defaults: {autoScroll:true},
        activeTab:0,
        listeners: {
            'tabchange': function(tab, panel) {
	            //panel.fireEvent('activate');
            },
            'beforeremove': function(tab, panel) {
	    		panel.fireEvent('close');
    		}
        },
        items: [welcomePanel],
        openNewTab: function(className, contactID) {
			var paramString = 'this';
			if(contactID != null) {
				paramString = paramString + ','+contactID;
			}
			var itemArray = this.findById(className);
			if(itemArray) {
				this.activate(className);
			} else {
				var newTab = eval("new "+className+"("+paramString+")");
				newTab.id = className;
				this.add(newTab).show();
			}
		}
    });
    
    viewport = new Ext.Viewport({
        //frame: true,
        title:'Cookbook',
        renderHidden:false,
        //labelWidth: 110,
        //border:false,
        //renderTo:'form-ct',

        layout:'border',
		items: [{
		  id: 'report',
		  xtype: 'ux.report'
		},mainToolbar,{
		    region: 'west',
	        collapsible: true,
	        title: 'Navigation',
	        xtype: 'treepanel',
	        width: 150,
	        autoScroll: true,
	        //split: true,
	        loader: new Ext.tree.TreeLoader(),
	        root: new Ext.tree.AsyncTreeNode({
	            expanded: true,
	            children: [{
	                text: 'Projects',
	                leaf: true
	            },{
	                text: 'Contacts',
	                leaf: true
	            },{
	                text: 'Join Group',
	                leaf: true
	            },{
	                text: 'Users',
	                leaf: true
	            },{
	                text: 'Groups',
	                leaf: true
	            },{
	                text: 'Views',
	                leaf: true
	            },{
	                text: 'Backups',
	                leaf: true
	            },{
	                text: 'Contracts',
	                leaf: true
	            },{
	                text: 'Vacations',
	                disabled: true,
	                leaf: true
	            }]
	        }),
	        rootVisible: false,
	        listeners: {
	            click: function(n) {
		            if(n.attributes.text == "Projects") {
			            if(permissions.project_view_id) {
				            Cookbook.openTreeTab("ProjectViewGrid");
			            } else {
			            	Cookbook.openTreeTab("ProjectGrid");
		            	}
			            //Cookbook.openProjectChooser();
            		} else if(n.attributes.text == "Contacts") {
	            		Cookbook.openTreeTab("ChooseContactTab");
			            //Cookbook.openContactChooser();
            		} else if(n.attributes.text == "Join Group") {
	            		Cookbook.openTreeTab("RequestGroupForm");
			            //Cookbook.openRequestGroupForm();
            		} else if(n.attributes.text == "Users") {
	            		Cookbook.openTreeTab("UserManagementPanel");
			            //Cookbook.openUserManagementPanel();
            		} else if(n.attributes.text == "Groups") {
	            		Cookbook.openTreeTab("GroupManagementPanel");
			            //Cookbook.openGroupManagementPanel();
		        	} else if(n.attributes.text == "Views") {
	            		Cookbook.openTreeTab("ViewManagementGrid");
			            //Cookbook.openGroupManagementPanel();
		        	} else if(n.attributes.text == "Vacations") {
	            		Cookbook.openTreeTab("VacationsTab");
			            //Cookbook.openGroupManagementPanel();
            		} else if(n.attributes.text == "Backups") {
	            		Cookbook.openTreeTab("BackupTab");
			            //Cookbook.openGroupManagementPanel();
            		} else if(n.attributes.text == "Contracts") {
	            		Cookbook.openTreeTab("ContractsGrid");
			            //Cookbook.openGroupManagementPanel();
            		} else {
	                	Ext.Msg.alert('Navigation Tree Click', 'Sorry, but "' + n.attributes.text + '" is under development.');
            		}
	            }
	        }
		},tabs
		] // end of viewport items
    }); // end of viewport declaration
    viewport.doLayout(true);
    parseAddressBar();
});

parseAddressBar = function() {
    var eto = this;
    var com = window.location.href.substring(window.location.href.indexOf('?')+1);
    var search = com.substring(0,com.indexOf('='));
    var projId = com.substring(com.indexOf('=')+1);
    //Ext.Msg.alert('Test', 'com:'+com+' search:'+search);

    if(search == 'open_project') {
        Cookbook.openProjectTab(projId);
    }
}

updatePermissions = function() {
	var permissionStore = new Ext.data.Store({
		id: 'permissionStore',
		proxy: new Ext.data.HttpProxy({
			url: 'GetUserPermissions.ashx', // File to connect to
			method: 'GET'
		}),
		reader: new Ext.data.DynamicJsonReader({root: 'rows'})
	});
	
	permissionStore.on('load', function() {		
		permissionStore.recordType = permissionStore.reader.recordType;
        permissionStore.fields = permissionStore.recordType.prototype.fields;
        //var record = permissionStore.getAt(0);
		var fields = permissionStore.recordType.prototype.fields;
		if(fields.keys.length > 1) {
		    for (var i = 0; i < fields.keys.length; i++)
		    {
		        var fieldName = fields.keys[i];
		        var fieldValue = permissionStore.data.items[0].get(fieldName);
		        if(fieldName == "groups") {
		    		mainToolbar.setGroups(fieldValue);
	    		} else if(fieldName == "project_view_id") {
		    		permissions["project_view_id"] = fieldValue;
	    		} else if(fieldName == "download_view_id") {
		    		permissions["download_view_id"] = fieldValue;
	    		} else if(fieldName != "message" && fieldName != "name") {
			        if(fieldValue == true || fieldValue == false) {
				        permissions[fieldName] = fieldValue;
		        		//eval("permissions."+fieldName+"="+fieldValue); <-- lol?
	        		}
	    		} 
		    }
	    }

	});
	
	permissionStore.load();
}

// GLOBAL FUNCTIONS
Cookbook.openProjectTab = function(projectID,projName) {
	var itemArray = tabs.findById("ProjectNumber"+projectID);
	if(itemArray) {
		tabs.activate("ProjectNumber"+projectID);
	} else {
		var newTab = new ProjectTab(projectID,projName);
		newTab.id = "ProjectNumber"+projectID;
		tabs.add(newTab).show();
	}
}

Cookbook.openCreateContactForm = function() {
	tabs.add(new CreateContactForm()).show();
}

Cookbook.openEditContactForm = function(contactID) {
	var itemArray = tabs.findById("ContactNumber"+contactID);
	if(itemArray) {
		tabs.activate("ContactNumber"+contactID);
	} else {
		var newTab = new EditContactForm(this,contactID);
		newTab.id = "ContactNumber"+contactID;
		tabs.add(newTab).show();
	}
}

Cookbook.openCreateProjectForm = function() {
	tabs.add(new CreateProjectForm(tabs)).show();
}

Cookbook.openContractForm = function(contractID) {
	if(Ext.isNumber(contractID)) {
		tabs.add(new ContractPanel(contractID)).show();
	} else {
		tabs.add(new ContractPanel()).show();
	}
}



// AI for opening new tabs from navigation tree
Cookbook.openTreeTab = function(className) {
	if(typeof(eval("tabs."+className)) != "undefined") {
		if(eval("tabs."+className)) {
			var newTab = eval("new "+className+"()");
			eval("tabs."+className+" = false");
			newTab.on('close', function() {
				eval("tabs."+className+" = true");
			});
			newTab.id = className;
			tabs.add(newTab).show();
		} else {
			tabs.activate(className);
		}
	} else {
		//DEBUG
		var newTab = eval("new "+className+"()");
		eval("tabs."+className+" = false");
		newTab.on('close', function() {
			eval("tabs."+className+" = true");
		});
		newTab.id = className;
		tabs.add(newTab).show();
	}
}

Cookbook.loadGlobalStores = function() {
	Cookbook.viewDefinitionStore = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'GetViewColumns.ashx', // File to connect to
			method: 'GET'
		}),
		baseParams:{"column_id": "all"},
		reader: new Ext.data.JsonReader({   
			// we tell the datastore where to get his data from
			root: 'rows',
			totalProperty: 'total',
			id: 'column_id'
		}, [
			{name: 'column_id', type: "int", mapping: 'column_id'},
			{name: 'column_name', type: "string", mapping: 'column_name'},
			{name: 'project_property', type: "string"},
			{name: 'column_type', type: "string", mapping: 'column_type'}
		])
	});
	Cookbook.viewDefinitionStore.on('load', function(thisStore, recs) {
		Cookbook.projectLabelTranslationArray = new Array();
		for(var a = 0; a < recs.length; a++) {
			var newObjecto = new Object();
			newObjecto.column_name = recs[a].get('column_name');
			newObjecto.column_type = recs[a].get('column_type');
			Cookbook.projectLabelTranslationArray[recs[a].get('project_property')] = newObjecto;
		}
	});
	Cookbook.viewDefinitionStore.load();
}