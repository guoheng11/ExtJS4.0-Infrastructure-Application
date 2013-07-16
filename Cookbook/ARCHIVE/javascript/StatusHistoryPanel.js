StatusHistoryPanel = Ext.extend(Cookbook.View.uGridPanel, {
	projectId: '',
	projectName: '',
	tabContainer: '',
	
    initComponent:function() {
		
		var statusHustoryStore = new Ext.data.Store({
			id: 'statusHustoryStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetStatusHistory.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'created', type: "date"},
				{name: 'project_status_id', type: "int"},
				{name: 'project_id', type: "int"},
				{name: 'status_type', type: "string"},
				{name: 'created_by', type: "string"}
			])
		});
		
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    Ext.apply(this, {
		    store: statusHustoryStore,
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					width: 20,
					sortable: true
				},
				columns: [
		            {header: "Date", dataIndex: 'created'},
		            {header: "Created By", dataIndex: 'created_by'},
		            {header: "Status", dataIndex: 'status_type'}
	        	]
			}),
			sm: sm1,
       		bbar: new Ext.PagingToolbar({
	            store: statusHustoryStore
	        }),       		
	        viewConfig: {
	            forceFit:true
	        },
	        width: 600,
        	height:400,
        	closable: true,
	        stripeRows: true,
	        title: 'Status History'
		});
		
	    this.on('afterrender', function(p){
            this.on('resize', function(p){
	            p.resizeStore();
	            p.getStore().reload();
	        });
        });
	    
    	StatusHistoryPanel.superclass.initComponent.call(this);
    },
    constructor: function(tabCont,projId) {
	    this.tabContainer = tabCont;
        this.projectId = projId;
        StatusHistoryPanel.superclass.constructor.call(this);
    }
    
    
});