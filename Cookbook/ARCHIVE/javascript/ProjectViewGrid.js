Ext.ns("Cookbook.View");

ProjectViewGrid = Ext.extend(Cookbook.View.uGridPanel, {
	statusTypeStore: '',
	liveSearchByProjName: '',
	liveSearchByAppName: '',
	liveSearchByPMName: '',
	searchDateStart: '',
	searchDateEnd: '',
	searchDateType: '',
	
	
    initComponent:function() {
	    var eto = this;
	    
	    var resetFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.findAll(eto);
	    	}
		};
		
		var activeHandler = function(button, event) {
	    	if(event) {
		    	eto.findActive(eto);
	    	}
		};
		
		
		var statusFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.findStatus(button.menuId, eto);
	    	}
		};
		
		var bizFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.findBiz(button.menuId, eto);
	    	}
		};
		
		var liveSearchProjHandler = function(field, event) {
	    	if(event) {
		    	if(field.timerObject) {
			    	clearTimeout(field.timerObject);
		    	}
				field.timerObject = setTimeout(function(){ 
		        	eto.findName(field.getValue(), eto);
				},800);
    		}
		};
		
		var liveSearchAppHandler = function(field, event) {
	    	if(event) {
		    	if(field.timerObject) {
			    	clearTimeout(field.timerObject);
		    	}
				field.timerObject = setTimeout(function(){ 
		        	eto.findAppName(field.getValue(), eto);
				},800);
    		}
		};
		
		var liveSearchPMHandler = function(field, event) {
	    	if(event) {
		    	if(field.timerObject) {
			    	clearTimeout(field.timerObject);
		    	}
				field.timerObject = setTimeout(function(){ 
		        	eto.findContactName(field.getValue(), eto); 
				},800);
    		}
		};
		
		var addContactHandler = function(button, event) {
	    	if(event) {
		    	if(eto.inTab) {
			    	eto.ownerCt.ownerCt.openEditContactForm();
		    	} else {
		    		//Cookbook.openCreateContactForm();
		    		eto.ownerCt.ownerCt.ownerCt.openEditContactForm();
	    		}
    		}
		};
		
	    function decodeDescription(v, record) {
		    if(record.description) {
		    	return decodeURI(record.description);
	    	} else {
		    	return '';
	    	}
	    }
	    
		var projectStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'ViewProjects.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"view_id": permissions.project_view_id}, // this parameter asks for listing
			reader: new Ext.data.DynamicJsonReader({root: 'rows'})
		});
		projectStore.on('beforeload', function(thisStore, ops) {
			//ops.view_id = permissions.project_view_id;
			//
			//projectStore.basesetBaseParam('view_id', permissions.project_view_id);
			projectStore.baseParams.view_id = permissions.project_view_id;
		});
		projectStore.on('load', function() {
			projectStore.recordType = projectStore.reader.recordType;
        	projectStore.fields = projectStore.recordType.prototype.fields;
			eto.reconfigure(projectStore, new Ext.grid.ProjectViewCM(projectStore));
	    });
	    
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    this.on('rowdblclick', this.onRowDblClick, this);
	    this.on('activate', this.onActivated, this);
	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
	    
	    var statusMenu = new Ext.menu.Menu({
		    items: [{
			    text: "Reset Filter", menuId: '', handler: statusFilterHandler
		    }]
	    });
	    
	    this.statusTypeStore = new Ext.data.Store({
			id: 'statusTypeStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectStatusTypes.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'status_type'
			}, [
				{name: 'status_type', type: "string", mapping: 'status_type'}
			])
		});
		
		this.statusTypeStore.on('load', function(el, rec, op) {
			statusMenu.removeAll();
			statusMenu.addMenuItem({text: 'All', menuId: '', handler: statusFilterHandler});
			for(var c = 0; c < rec.length; c++) {
				var menuItem = rec[c].get("status_type");
				if(menuItem) {
					statusMenu.addMenuItem({text: menuItem, menuId: menuItem, handler: statusFilterHandler});
				}
			}
		});
		
		this.statusTypeStore.load();
		
		var bizMenu = new Ext.menu.Menu({
		    items: [{
			    text: "All Companies", menuId: '', handler: bizFilterHandler
		    }]
	    });
		
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
				{name: 'company_id', type: "int", mapping: 'company_id'},
				{name: 'company_name', type: "string", mapping: 'company_name'},
				{name: 'business_units', mapping: 'business_units'}
			])
		});
		
		companyStore.on('load', function(el, rec, op) {
			for(var c = 0; c < rec.length; c++) {
				var menuItem = rec[c].get("company_name");
				var menuItemID = rec[c].get("company_id");
				if(menuItem) {
					var submenu = new Ext.menu.Menu();
					var biz_units = rec[c].get("business_units");
					if(biz_units instanceof Array) {
						for(var y = 0; y < biz_units.length; y++) {
							var submenuItem = biz_units[y].biz_name;
							var submenuItemId = biz_units[y].biz_id;
							submenu.addMenuItem({text: submenuItem, menuId: submenuItemId, handler: bizFilterHandler});
						}
						bizMenu.addMenuItem({text: menuItem, menuId: menuItemID, menu: submenu});
					}
				}
			}
		});
		
		companyStore.load();
		
	    this.liveSearchByProjName = new Ext.form.TextField({
		    emptyText: 'Search by project name/number...',
		    enableKeyEvents: true,
		    width: 180
	    });
		this.liveSearchByProjName.on('keyup', liveSearchProjHandler);
		
		this.liveSearchByAppName = new Ext.form.TextField({
		    emptyText: 'Search by application...',
		    enableKeyEvents: true,
		    width: 120
	    });
		this.liveSearchByAppName.on('keyup', liveSearchAppHandler);
		
		this.liveSearchByPMName = new Ext.form.TextField({
		    emptyText: 'Search by contact name...',
		    enableKeyEvents: true,
		    disabled: false
	    });
		this.liveSearchByPMName.on('keyup', liveSearchPMHandler);
	    
		this.openButton = new Ext.Button({
	        text:'Open',
            tooltip:'Open Selected Project',
            iconCls:'open',
            itemId: 'openBtn',
            disabled:true,
            //ownerCt: this,
            handler: this.onOpenProject
        });
        
        this.deleteButton = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected Project',
            iconCls:'remove',
            disabled:true,
            handler: this.onDeleteProject
        });
        
        this.downloadButton = new Ext.Button({
	        text:'Download',
            tooltip:'Download Filtered Projects',
            iconCls:'save',
            disabled:false,
            scope: this,
            handler: this.onDownloadProjects
        });
	    
	    var dateTypeArray = [
		    ["All","all"],
		    ["DEV Start","dev_start"],
		    ["DEV End","dev_end"],
		    ["UAT Due","uat"],
		    ["PROD Due","prod"]
		];
		var dateTypeStore = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'dateTypeString', type: 'string'},
		       {name: 'dateTypeValue', type: 'string'}
		    ],
	        data : dateTypeArray
	    });
	    
		this.dateTypeCombo = new Ext.form.ComboBox({
			colspan: 2,
			fieldLabel: 'Date Type',
	        store: dateTypeStore,
	        displayField:'dateTypeString',
	        valueField: 'dateTypeValue',
	        typeAhead: true,
	        width: 120,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        listeners:{
		    	'select': function(combo) {
			    	eto.searchDateType = combo.getValue();
			    	eto.checkDateButton();
		    	}
		    },
	        emptyText:'Select date type...',
	        selectOnFocus:true
	    });
    	this.dateStatusField = new Ext.form.DisplayField({
            width: 100,
            value: 'NOT ACTIVE',
            cls: 'cook-red-text'
        });
        this.dateStartField = new Ext.form.DateField({
            width: 100,
            style: 'padding: 2px;',
            format: 'Y/m/d',
            listeners:{
		    	'select': function(field) {
			    	eto.searchDateStart = field.getValue();
			    	eto.checkDateButton();
		    	}
		    }
	    });
	    this.dateEndField = new Ext.form.DateField({
            width: 100,
            style: 'padding: 2px;',
            format: 'Y/m/d',
            listeners:{
		    	'select': function(field) {
			    	eto.searchDateEnd = field.getValue();
			    	eto.checkDateButton();
		    	}
		    }
	    });
	    
	    Ext.apply(this, {
		    store: new Ext.data.ArrayStore({
		        fields: []
	        }),
	        cm: new Ext.grid.ColumnModel([]),
			sm: sm1,
			
			// inline toolbars
	        tbar: [{
	            xtype: 'buttongroup',
	            title: 'Main Filter Options',
	            columns: 2,
	            defaults: {
	                scale: 'small'
	            },
	            items: [{
			        text:'Reset Filters',
		            tooltip:'View all projects, Reset filters',
		            iconCls:'reset',
		            handler: resetFilterHandler
		        },{  
			        text:'Status',
		            tooltip:'Filter by status',
		            iconCls:'open',
		            xtype: 'button',
		            menu: statusMenu
		        },{  
			        text:'Business Units',
		            tooltip:'Filter by business units',
		            iconCls:'open',
		            xtype: 'button',
		            menu: bizMenu
		        },{
			        text:'Active Only',
		            tooltip:'View only active projects',
		            iconCls:'perform',
		            handler: activeHandler
		        }]
	        },{
	            xtype: 'buttongroup',
	            title: 'Date Filter',
	            columns: 4,
	            defaults: {
	                scale: 'small'
	            },
	            layoutConfig: {
		            style: 'padding: 2px',
		            tableAttrs: {
			            cellspacing: 3
		            }
	            },
	            items: [{
		            xtype: 'displayfield',
		            width: 30,
		            value: 'From:'
	            },this.dateStartField,{
		            xtype: 'displayfield',
		            width: 20,
		            style: 'padding: 2px;',
		            value: 'To:'
	            },this.dateEndField,{
		            xtype: 'displayfield',
		            width: 30,
		            style: 'padding: 2px;',
		            value: 'Type:'
	            },this.dateTypeCombo,this.dateStatusField]
            },{
	            xtype: 'buttongroup',
	            title: 'Text Search',
	            columns: 2,
	            defaults: {
	                scale: 'small',
	                style: 'margin: 2px'
	            },
	            items: [this.liveSearchByProjName,this.liveSearchByAppName, this.liveSearchByPMName]
            }],
	    	bbar: new Ext.PagingToolbar({
	            store: projectStore,
	            items: [{
			    	xtype: 'tbspacer',
			    	width: '40'
		    	}, this.openButton, {
			    	xtype: 'tbspacer',
			    	width: '20'
		    	}, {
			        xtype: 'button',
			        text:'Create',
		            tooltip:'Create New Project',
		            iconCls:'add',
		            disabled: !permissions.createProject,
		            handler: function() {
						Cookbook.openCreateProjectForm();
					}
		        },'-',this.deleteButton,'-',{
			    	xtype: 'tbspacer',
			    	width: '40'
		    	}, this.downloadButton]
	        }),
       		
	        viewConfig: {
	            forceFit:true
	        },
	        autoWidth: true,
	        stripeRows: true,
	        collapsible: false,
	        animCollapse: false,
	        closable: true,
	        title: 'USAN Projects'
		});
		
		this.on('afterrender', function(p){
            this.on('resize', function(p){
	            p.resizeStore(projectStore);
	            projectStore.load();
	        });
        });
	    
    	ProjectViewGrid.superclass.initComponent.call(this);
	    // add in some dummy descriptions
    	this.addEvents('openproject', 'createnewproject');
    },

    onRowDblClick: function(g, rowIndex, e) {
	    var selectedRecord = g.getStore().getAt(rowIndex);
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.get("project"));
	    Cookbook.openProjectTab(selectedRecord.get("project_id"),selectedRecord.get("project_number"));
        g.fireEvent('openproject', selectedRecord);
        
    },
    onOpenProject: function() {
	    var grid1 = this.ownerCt.ownerCt;
	    var selectedRecord = grid1.getSelectionModel().getSelected();
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.id);
	    Cookbook.openProjectTab(selectedRecord.get("project_id"),selectedRecord.get("project_number"));
        grid1.fireEvent('openproject', selectedRecord);

    },
    onDeleteProject: function() {
	    if(permissions.deleteProject) {
		    var grid1 = this.ownerCt.ownerCt;
		    var selectedRecord = grid1.getSelectionModel().getSelected();
		    Ext.MessageBox.confirm('Delete Project?', 'Are you sure you want to delete project \"' + selectedRecord.get("project_number") + ":" +selectedRecord.get("project_name") + '\"?', function(btn) {
	        	if(btn == "yes") {
					var conn = new Ext.data.Connection();
					conn.request({
					    url: 'DeleteProject.ashx',
					    method: 'POST',
					    params: {"project_id": selectedRecord.get("project_id")},
					    failure: function(response, opts) {
					        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
					    },
					    success: function(response, opts) {
						    var jsonResponse = Ext.util.JSON.decode(response.responseText);
						    if(jsonResponse.success != null) {
						    	if(jsonResponse.success) {
							    	Ext.Msg.alert('Success', "Project Deleted!");
							    	grid1.getStore().load();
					    		} else if(!jsonResponse.success) {
							    	if(jsonResponse.rows) {
							    		Ext.Msg.alert('Deletion Failed', 'Server read the request but did not delete the project.');
						    		}
					    		}
							} else {
					    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
				    		}
					    }
					});
	        	}
	    	});
		}
    },
    onDownloadProjects: function() {
	    var paramObject = this.getStore().baseParams;
	    paramObject.view_id = permissions.download_view_id;
		Ext.getCmp('report').load({
		  url: 'DownloadProjects.ashx',
		  params: paramObject
		});
    },
    onRowSelect: function(sm, rowIndex, r){        
        this.openButton.enable();
        if(permissions.deleteProject) {
        	this.deleteButton.enable();
    	}
    },
    
    onRowDeselect: function(sm, rowIndex, r){        
        this.deleteButton.disable();
        this.openButton.disable();
    },
    onActivated: function(){        
        //Ext.Msg.alert('Activation','Activated!!!');      
        var thisStore = this.getStore();
        if(!(thisStore instanceof Ext.data.ArrayStore)) {
	        thisStore.reload();
        }
        //this.statusTypeStore.reload();
    },
    
    findAll: function() {
	    this.setTitle("Projects: All Projects");
	    this.liveSearchByProjName.reset();
		this.liveSearchByAppName.reset();
		this.liveSearchByPMName.reset();
		this.dateStartField.reset();
		this.dateEndField.reset();
		this.dateTypeCombo.reset();
		this.searchDateStart = "";
		this.searchDateEnd = "";
		this.searchDateType = "";
	    var store = this.getStore();
	    store.baseParams = {"view_id": permissions.project_view_id};
	    store.load();
	    this.checkDateButton();
    },
    findStatus: function(statusType) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    if(statusType) {
		    var statusArray = new Array();
	    	statusArray.push(statusType);
	    	store.baseParams.project_status = Ext.encode(statusArray);
    	} else {
	    	if(store.baseParams.project_status) {
		    	store.baseParams.project_status = null;
		    	delete(store.baseParams.project_status);
	    	}
    	}
	    store.load();
    },
    findBiz: function(bizType) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.biz_id = bizType;
	    store.load();
    },
    findActive: function(statusType) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    var statusArray = new Array();
	    statusArray.push("Project Created");
	    statusArray.push("1st RFQ Review");
	    statusArray.push("2nd RFQ Review");
	    statusArray.push("Assessments Complete");
	    statusArray.push("RFQ On Hold (Customer)");
	    statusArray.push("RFQ On Hond (USAN)");
	    statusArray.push("IFQ Complete");
	    store.baseParams.project_status = Ext.encode(statusArray);
	    store.load();
    },    
    findName: function(projectName) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.project_name = projectName;
	    //store.setBaseParam('project_name', projectName);
	    store.load();
    },
    findAppName: function(applName) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.app_name = applName;
	    store.load();
    },
    findContactName: function(contactName) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.contact = contactName;
	    store.load();
    },
    refresh: function() {
	    var store = this.getStore();
	    store.load();
	    this.statusTypeStore.reload();
    },
    checkDateButton: function() {
	    if(this.searchDateStart instanceof Date && this.searchDateEnd instanceof Date && this.searchDateType) {
		    this.dateStatusField.removeClass('cook-red-text');
		    this.dateStatusField.addClass('cook-green-text');
		    this.dateStatusField.setValue("ACTIVE");
		    var store = this.getStore();
	    	store.baseParams.search_start_date = this.searchDateStart;
	    	store.baseParams.search_end_date = this.searchDateEnd;
	    	store.baseParams.search_date_type = this.searchDateType;
	    	store.load();
	    } else {
		    this.dateStatusField.removeClass('cook-green-text');
		    this.dateStatusField.addClass('cook-red-text');
		    this.dateStatusField.setValue("NOT ACTIVE");
	    }
    }
});