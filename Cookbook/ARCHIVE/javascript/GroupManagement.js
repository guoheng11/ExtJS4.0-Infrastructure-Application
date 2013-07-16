ChooseProject = Ext.extend(Ext.Panel, {
    initComponent:function() {
	    var xg = Ext.grid;
	    
		var projectStore = new Ext.data.Store({
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
				{name: 'business_unit', type: "string", mapping: 'business_unit'},
				{name: 'project_status', type: "string", mapping: 'project_status'},
				{name: 'description', type: "string", mapping: 'description'}
			])
		});
		//projectStore.load();

	        // row expander
	    var expander = new xg.RowExpander({
	        tpl : new Ext.Template(
	            '<p><b>Project:</b> {project_name}</p>',
	            '<p><b>Summary:</b> {description}</p>'
	        )
	    });
		
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
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
	    var grid1 = new xg.GridPanel({
	        store: projectStore,
	        cm: new xg.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            expander,
		            {id:'project_name',header: "Project", width: 40, dataIndex: 'project_name'},
		            {header: "Number", dataIndex: 'project_number'},
		            {header: "Business Unit", dataIndex: 'business_unit'},
		            {header: "Status", dataIndex: 'project_status'}
	        	]
			}),
			sm: sm1,

			// inline toolbars
	        tbar: [this.openButton, '->', {
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
	    	}],
       		
	        viewConfig: {
	            forceFit:true
	        },
	        autoWidth: true,
	        // set width and it will forceFit to it
	        width: 600,
	        autoHeight: true,
        	//height:300,
	        stripeRows: true,
	        plugins: expander,
	        collapsible: false,
	        animCollapse: false,
	        frame:true,
	        title: 'USAN Projects',
	        iconCls: 'icon-grid'
	    });
	    
	    grid1.on('rowdblclick', this.onRowDblClick, this);
	    this.on('activate', this.onActivated, grid1);
	    //var toolBar1 = grid1.tbar;
	    //var toolBar1 = grid1.getTopToolbar();
	    //grid1.getTopToolbar().items.key('nextBtn')
	    sm1.on('rowselect', this.onRowSelect, grid1);
	    sm1.on('rowdeselect', this.onRowDeselect, grid1);
	    
	    
	    Ext.apply(this, {
		    // TAB main
            title:'Choose a Project',
            frame: true,
            anchor:'95%',
            closable:true,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0',
            layout:'form',
            //defaults: {width: 300},
            //defaultType: 'textfield',
            
            items: [grid1]
            /*items: [{
                layout:'column',
                items: [{
                    columnWidth:.70,
                    layout: 'form',
		    		items: [grid1]
                },{
                    columnWidth:.30,
                    layout: 'form',
                    bodyStyle: 'padding-left:10px;',
                    labelWidth: 150,
		    		items: [{
			    		
			    	}]
                        
                }] //end of column layout items
            }]*/
		});
	    
    	ChooseProject.superclass.initComponent.call(this);
	    // add in some dummy descriptions
    	this.addEvents('openproject', 'createnewproject');
    },
    /*onRender: function(ct, position) {
  		ChooseProject.superclass.onRender.call(this, ct, position);
  		var grid1 = this.getComponent('0');
  		var toolBar1 = grid1.getTopToolbar();
  		toolBar1.getComponent('0').on('click', this.onOpenProject, this);
	},*/

    onRowDblClick: function(g, rowIndex, e) {
	    var selectedRecord = g.getStore().getAt(rowIndex);
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.get("project"));
	    Cookbook.openProjectActions(selectedRecord.get("project_id"));
        g.fireEvent('openproject', selectedRecord);
        
    },
    onOpenProject: function() {
	    var grid1 = this.ownerCt.ownerCt;
	    var selectedRecord = grid1.getSelectionModel().getSelected();
	    //Ext.Msg.alert('Selection Made','You selected: ' + selectedRecord.id);
	    Cookbook.openProjectActions(selectedRecord.get("project_id"));
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
					    failure: function() {
					        Ext.Msg.alert('Error', 'Error deleting project.');
					    },
					    success: function() {
						    grid1.getStore().reload();
					    	Ext.Msg.alert('Success', 'Project deleted!');
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
        this.openButton.disable();
        this.deleteButton.disable();
    },
    onActivated: function(){        
        //Ext.Msg.alert('Activation','Activated!!!');
        this.getStore().reload();
    }

});

// Array data for the grid. Will be replaced by Database
Ext.grid.dummyData = [
    ['CTG-1000','Judy Kozma','Created','6/2/09'],
    ['CTG-1601','Judy Kozma','Finished','5/2/09'],
    ['CTG-1792','Gail Hecksel','In UAT','5/30/9'],
    ['INT-2000','Melanie Phillips','In-Progress','6/8/09'],
    ['CTG-3041','Donny Jackson','Created','6/5/09']
];


