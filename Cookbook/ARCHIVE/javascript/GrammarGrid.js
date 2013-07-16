Ext.ns("Cookbook.View");

GrammarGrid = Ext.extend(Cookbook.View.uGridPanel, {
	
    initComponent:function() {
	    var eto = this;
	    
		var grammarStore = new Ext.data.Store({
			id: 'projectStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjects.ashx', // File to connect to
				method: 'POST'
			}),
			//baseParams:{"biz_id": "1"}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'project_id'
			}, [
				{name: 'project_id', type: "int", mapping: 'project_id'},
				{name: 'project_name', type: "string", mapping: 'project_name'},
				{name: 'project_number', type: "string", mapping: 'project_number'},
				{name: 'business_unit', type: "string", mapping: 'business_units'},
				{name: 'company_name', type: "string", mapping: 'company_name'},
				{name: 'project_status', type: "string", mapping: 'project_status'},
				{name: 'description', type: "string", convert: decodeDescription}
			])
		});
		//projectStore.load();

	        // row expander
	    var expander = new Ext.grid.RowExpander({
	        tpl : new Ext.Template(
	            '<p><b>Project:</b> {project_name}</p>',
	            '<p><b>Summary:</b> {description}</p>'
	        )
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
		
		//this.statusTypeStore.load();
		
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
		    emptyText: 'Search by PM name...',
		    enableKeyEvents: true,
		    disabled: true
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
	    Ext.apply(this, {
		    store: projectStore,
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            expander,
		            {header: "Number", dataIndex: 'project_number'},
		            {header: "Project", width: 30, dataIndex: 'project_name'},
		            {header: "Company", width: 10, dataIndex: 'company_name'},
		            {header: "Business Unit", dataIndex: 'business_unit'},
		            {header: "Status", dataIndex: 'project_status'}
	        	]
			}),
			sm: sm1,
			
			// inline toolbars
	        tbar: [{
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
		    	xtype: 'tbspacer',
		    	width: '5'
	    	},{  
		        text:'Business Units',
	            tooltip:'Filter by business units',
	            iconCls:'open',
	            xtype: 'button',
	            menu: bizMenu
	        },'->', this.liveSearchByProjName,{
		    	xtype: 'tbspacer',
		    	width: '10'
	    	},this.liveSearchByAppName,{
		    	xtype: 'tbspacer',
		    	width: '10'
	    	},this.liveSearchByPMName,{
		    	xtype: 'tbspacer',
		    	width: '10'
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
	        width: 800,
	        //autoHeight: true,
        	height:400,
	        stripeRows: true,
	        plugins: expander,
	        collapsible: false,
	        animCollapse: false,
	        closable: true,
	        //frame:true,
	        title: 'Grammar Freezing Tool 3.0'
	        //iconCls: 'icon-grid'
		});
		
		this.on('afterrender', function(p){
            this.on('resize', function(p){
	            p.resizeStore();
	            p.getStore().reload();
	        });
        });
	    
    	GrammarGrid.superclass.initComponent.call(this);
	    // add in some dummy descriptions
    	this.addEvents('openproject', 'createnewproject');
    },

    onRowDblClick: function(g, rowIndex, e) {
	    var selectedRecord = g.getStore().getAt(rowIndex);
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.get("project"));
	    Cookbook.openProjectTab(selectedRecord.get("project_id"),selectedRecord.get("project_name"));
        g.fireEvent('openproject', selectedRecord);
        
    },
    onOpenProject: function() {
	    var grid1 = this.ownerCt.ownerCt;
	    var selectedRecord = grid1.getSelectionModel().getSelected();
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.id);
	    Cookbook.openProjectTab(selectedRecord.get("project_id"),selectedRecord.get("project_name"));
        grid1.fireEvent('openproject', selectedRecord);

    },
    onDeleteProject: function() {
	    if(permissions.deleteProject) {
		    var grid1 = this.ownerCt.ownerCt;
		    var selectedRecord = grid1.getSelectionModel().getSelected();
		    Ext.MessageBox.confirm('Delete Project?', 'Are you sure you want to delete project \"' + selectedRecord.get("project_name") + '\"?', function(btn) {
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
							    	grid1.getStore().reload();
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
        this.getStore().reload();
        this.statusTypeStore.reload();
    },
    
    findAll: function() {
	    this.setTitle("Projects: All Projects");
	    this.liveSearchByProjName.reset();
		this.liveSearchByAppName.reset();
		this.liveSearchByPMName.reset();
	    var store = this.getStore();
	    store.baseParams = {};
	    store.reload();
    },
    findStatus: function(statusType) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.project_status = statusType;
	    store.reload();
    },
    findBiz: function(bizType) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.biz_id = bizType;
	    store.reload();
    },
    
    findName: function(projectName) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.project_name = projectName;
	    store.reload();
    },
    findAppName: function(applName) {
	    this.setTitle("Projects: Filtered");
	    var store = this.getStore();
	    store.baseParams.app_name = applName;
	    store.reload();
    },
    
    refresh: function() {
	    var store = this.getStore();
	    store.reload();
	    this.statusTypeStore.reload();
    }

});