Ext.ns("Cookbook.View");

ContractsGrid = Ext.extend(Cookbook.View.uGridPanel, {
    initComponent: function() {	    
	    var eto = this;
		
	    var contractStore = new Ext.data.Store({
		    proxy: new Ext.data.HttpProxy({
				url: 'Contracts_GetContracts.ashx', // File to connect to
				method: 'POST'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'contract_id'
			}, [
				{name: 'contract_title', type: 'string'},
	           {name: 'contract_type', type: 'string'},
	           {name: 'status', type: 'string'},
	           {name: 'contract_id', type: 'int'},
	           {name: 'description', type: 'string'},
	           {name: 'terms', type: 'int'},
	           {name: 'directory', type: 'string'},
	           {name: 'created_by', type: 'string'},
	           {name: 'customer_name', type: 'string'}
			])
	    });
	    
	    var newContractHandler = function(button, event) {
		    if(event) {
			    Cookbook.openContractForm();
		    }
	    }
	    
        Ext.apply(this, {
	        store: contractStore,
	        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	        columns: [
	            {
	                header   : 'Title', 
	                width    : 160, 
	                sortable : true, 
	                dataIndex: 'contract_title'
	            },
	            {
	                header   : 'Customer Name', 
	                width    : 75, 
	                sortable : true,
	                dataIndex: 'customer_name'
	            },
	            {
	                header   : 'Type', 
	                width    : 75, 
	                sortable : true, 
	                dataIndex: 'type'
	            },
	            {
	                header   : 'Status', 
	                width    : 75, 
	                sortable : true,  
	                dataIndex: 'status'
	            },
	            {
	                header   : 'Created By', 
	                width    : 75, 
	                sortable : true,  
	                dataIndex: 'created_by'
	            }
	        ],
	        bbar: new Ext.PagingToolbar({
	            store: contractStore
	        }),
	        viewConfig: {
		        forceFit: true
		    },
		    tbar: [{
			    xtype: 'button',
			    iconCls: 'add',
			    handler: newContractHandler,
			    text: 'New'
		    }],
	        stripeRows: true,
	        closable: true,
	        title: 'Contracts'
	    });
	    
	    this.on('afterrender', function(p){
            this.on('resize', function(p){
	            p.resizeStore(contractStore);
	            contractStore.load();
	        });
        });
	    
	    this.on('rowdblclick', function(thisGrid, rowIndex) {
		    var selRec = this.getSelectionModel().getSelected();
		    if(selRec instanceof Ext.data.Record) {
			    Cookbook.openContractForm(selRec.get("contract_id"));
		    }
	    });
	    this.on('activate', this.onActivated, this);
        ContractsGrid.superclass.initComponent.apply(this);
    },
    constructor: function() {
        ContractsGrid.superclass.constructor.apply(this);
    },
    onActivated: function(){        
        var thisStore = this.getStore();
        thisStore.load();
    },
});