ProjectHistoryPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	projectName: '',
	tabContainer: '',
	
    initComponent:function() {
	    var xg = Ext.grid;
	    
	    function parseMessage(v, record) {
		    var message = record.message;
		    if(message) {
			    return message.replace(/\n/g,"<br>");
		    } else {
			    return '';
		    }
		}
		
		var projectHistoryStore = new Ext.data.Store({
			id: 'projectHistoryStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectHistory.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'changed', type: "date", mapping: 'changed'},
				{name: 'changed_by', type: "string", mapping: 'changed_by'},
				{name: 'message', type: "string", convert: parseMessage},
				{name: 'summary', type: "string", mapping: 'summary'}
			])
		});
		
		//projectHistoryStore.load();

	        // row expander
	    var expander = new xg.RowExpander({
	        tpl : new Ext.Template(
	            '<p><b>Details:</b><br> {message}</p>'
	        )
	    });
		
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    function dateRender(val){
    		return '<span style="text-align:center;">' + val.format('F j, Y H:i:s') + '</span>';
    	}
	    
	    var grid1 = new xg.GridPanel({
	        store: projectHistoryStore,
	        cm: new xg.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            expander,
		            new Ext.grid.DateColumn({header: "Date", width: 20, format: 'F j, Y H:i:s', dataIndex: 'changed'}),
		            {header: "Changed By", dataIndex: 'changed_by'},
		            {header: "Action", dataIndex: 'summary'}
	        	]
			}),
			sm: sm1,

			// inline toolbars
	        /*tbar: [{
		        text:'Open',
	            tooltip:'Open Selected Project',
	            iconCls:'open',
	            itemId: 'openBtn',
	            disabled:true,
	            //ownerCt: this,
	            handler: this.onOpenProject,
	            //scope: ownerCt
	        }, '->', {
		        text:'Create',
	            tooltip:'Create New Project',
	            iconCls:'add',
	            disabled: !permissions.createProject,
	            handler: function() {
					Cookbook.openCreateProjectForm();
				}
	        },'-',{
		        text:'Delete',
	            tooltip:'Delete Selected Project',
	            iconCls:'remove',
	            disabled:true,
	            handler: this.onDeleteProject
	        },{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}],*/
       		
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
	        title: 'Project History',
	        iconCls: 'icon-grid'
	    });
	    
	    this.on('activate', this.onActivated, grid1);
	    
	    
	    Ext.apply(this, {
		    // TAB main
            title: this.projectName+' History',
            frame: true,
            anchor:'95%',
            closable:true,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0',
            layout:'form',
            
            items: [grid1]
		});
	    
    	ProjectHistoryPanel.superclass.initComponent.call(this);
    },
    constructor: function(tabCont,projId,projName) {
	    this.tabContainer = tabCont;
        this.projectId = projId;
        this.projectName = projName;
        ProjectHistoryPanel.superclass.constructor.call(this);
    },
    onActivated: function(){        
        //Ext.Msg.alert('Activation','Activated!!!');
        this.getStore().reload();
    }
    
    
});