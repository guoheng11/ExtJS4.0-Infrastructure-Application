UserVacationPanel = Ext.extend(Ext.Panel, {
	mainGrid: '',
	gridStore: '',
	approvalMenuButton: '',
	typeMenuButton: '',
	startDateField: '',
	endDateField: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    
	    var newVacationHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.openNewTab("VacationRequestPanel");
	    	}
		};
		
		var newFloaterHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.openNewTab("VacationFloatRequestPanel");
	    	}
		};
		
		var deleteVacationHandler = function(button, event) {
	    	if(event) {
		    	//eto.findReset(eto);
	    	}
		};
	    var resetFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.findReset(eto);
	    	}
		};
	    var statusFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.approvalMenuButton.setText("Approval: " + button.text);
		    	eto.findStatus(button.menuId, eto);
	    	}
		};
		
		var typeFilterHandler = function(button, event) {
	    	if(event) {
		    	eto.typeMenuButton.setText("Type: " + button.text);
		    	eto.findType(button.menuId, eto);
	    	}
		};
		
		
	    var reader = new Ext.data.JsonReader({
	        fields: [
	            {name: 'vacation_id', type: 'int'},
	            {name: 'name', type: 'string'},
	            {name: 'type', type: 'string'},
	            {name: 'start_date', type: 'date'},
	            {name: 'end_date', type: 'date'},
	            {name: 'approved', type: 'string'},
	            {name: 'request_date', type: 'date'},
	            {name: 'days_used', type: 'int'},
	            {name: 'backups', type: 'string'},
	            {name: 'approve_date', type: 'date'},
	            {name: 'approved_by', type: 'string'}
	        ]
	    });
	    var todaysDate = new Date();
	    var yearStartDate = new Date();
	    yearStartDate.setFullYear(todaysDate.getYear()+1900,0,1);
	    var yearEndDate = new Date();
	    yearEndDate.setFullYear(todaysDate.getYear()+1900,11,31);
	    //var summary = new Ext.grid.GroupSummary();
	    this.gridStore = new Ext.data.GroupingStore({
            reader: reader,
            proxy: new Ext.data.HttpProxy({
				url: 'GetVacations.ashx', // File to connect to
				method: 'GET'
			}),
			baseParams:{"start_date": yearStartDate.format('Y/m/d'), "end_date": yearEndDate.format('Y/m/d')},
            sortInfo:{field: 'start_date', direction: "ASC"},
            groupField:'type'
        });
        this.gridStore.load();
	    var summary = new Ext.grid.GroupSummary();
	    
	    var statusMenu = new Ext.menu.Menu({
		    items: [{
			    text: "ALL", menuId: '', handler: statusFilterHandler
		    },{
			    text: "Not Approved", menuId: 'null', handler: statusFilterHandler
		    },{
			    text: "Approved", menuId: 'true', handler: statusFilterHandler
		    },{
			    text: "Disapproved", menuId: 'false', handler: statusFilterHandler
		    }]
	    });
	    
	    var typeMenu = new Ext.menu.Menu({
		    items: [{
			    text: "BOTH", menuId: '', handler: typeFilterHandler
		    },{
			    text: "Floating Holiday", menuId: 'FLOATING', handler: typeFilterHandler
		    },{
			    text: "Regular Vacation", menuId: 'VACATION', handler: typeFilterHandler
		    }]
	    });
	    this.approvalMenuButton = new Ext.Button({
	        text:'Approval: ALL',
            tooltip:'Filter by status',
            iconCls:'open',
            menu: statusMenu
        });
        this.typeMenuButton = new Ext.Button({
	        text:'Type: BOTH',
            tooltip:'Filter by vacation type',
            iconCls:'open',
            menu: typeMenu
        });
	    this.startDateField = new Ext.form.DateField({
		    tooltip:'Filter by date range: Start Date',
            iconCls:'open',
            xtype: 'datefield',
            value: yearStartDate
        });
        
        this.endDateField = new Ext.form.DateField({
		    tooltip:'Filter by date range: End Date',
            iconCls:'open',
            xtype: 'datefield',
            value: yearEndDate
        });
        var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
        
        this.deleteButton = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected Vacation',
            iconCls:'delete',
            disabled: true,
            handler: deleteVacationHandler
        });
	    this.mainGrid = new Ext.grid.GridPanel({
	        store: this.gridStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm1,
	        columns: [
            {
	            id: 'name',
                header: "Person's Name",
                width: 200,
                sortable: true,
                dataIndex: 'name',
                //summaryType: 'count',
                hideable: false
            },{
                header: "Start Date",
                width: 100,
                dataIndex: 'start_date'
            },{
                header: "End Date",
                width: 100,
                dataIndex: 'end_date'
            },{
                header: "Days Used",
                width: 100,
                sortable: true,
                dataIndex: 'days_used',
                summaryType:'sum',
                renderer : function(v){
                    return v +' days';
                }
            },{
                
                header: "Approved?",
                width: 100,
                sortable: true,
                dataIndex: 'approved',
                hideable: false
            },{
                header: "Request Date",
                width: 100,
                dataIndex: 'request_date'
            },{
                header: "Approve Date",
                width: 100,
                dataIndex: 'approve_date'
            },{
                header: "Approved By",
                width: 200,
                dataIndex: 'approved_by'
            },{
                dataIndex: 'vacation_id',
                hidden: true
            },{
                dataIndex: 'type',
                hidden: true
            }
	        ],
			tbar: [{
		        text:'Reset',
	            tooltip:'View your vacations for this year',
	            iconCls:'reset',
	            handler: resetFilterHandler
	        },{
		    	xtype: 'tbspacer',
		    	width: '30'
	    	},this.approvalMenuButton,{
		    	xtype: 'tbspacer',
		    	width: '5'
	    	},this.typeMenuButton,{
		    	xtype: 'tbspacer',
		    	width: '30'
	    	},{
		    	xtype: 'tbtext', text: 'Start Date'
	    	},this.startDateField,{
		    	xtype: 'tbspacer',
		    	width: '15'
	    	},{
		    	xtype: 'tbtext', text: 'End Date'
	    	},this.endDateField,{
		    	xtype: 'tbspacer',
		    	width: '10'
	    	}],
	    	bbar: [{
		        text:'Request Vacation',
	            tooltip:'Request Standard Vacation',
	            iconCls:'add',
	            handler: newVacationHandler
	        },{
		    	xtype: 'tbspacer',
		    	width: '10'
	    	},{
		        text:'Request Floating Holiday',
	            tooltip:'Request Floating',
	            iconCls:'add',
	            handler: newFloaterHandler
	        },{
		    	xtype: 'tbspacer',
		    	width: '20'
	    	},this.deleteButton],
	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            showGroupName: false,
	            enableNoGroups:false, // REQUIRED!
	            hideGroupedColumn: true
	        }),

	        plugins: summary,
	        //height: 350,
	        width: 1100,
	        //autoHeight: true,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Vacations: All vacations for ' + (todaysDate.getYear()+1900)
	    });
	    this.mainGrid.on('afterrender', function() {
		    this.getStore().removeAll();
		    if(eto.assessmentStore) {
				eto.loadRecord(eto);
			}
	    });
	    
	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
	    
	    this.startDateField.on('change', function(field,newValue,oldValue) {
		    eto.findStartDate(newValue);
	    });
	    this.startDateField.on('select', function(field,newValue) {
		    eto.findStartDate(newValue);
	    });
	    this.endDateField.on('change', function(field,newValue,oldValue) {
		    eto.findEndDate(newValue);
	    });
	    this.endDateField.on('select', function(field,newValue) {
		    eto.findEndDate(newValue);
	    });
	    
	    Ext.apply(this, {
		    //frame: true,
	        title:'Personal Vacation Table',
	        closable: true,
	        labelWidth: 350,
	        //width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [this.mainGrid]
		});
    	
		UserVacationPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(projId) {
		this.projectId = projId;
		UserVacationPanel.superclass.constructor.call(this);
    },
    onRowSelect: function() {
	    this.deleteButton.enable();
    },
    onRowDeselect: function() {
	    this.deleteButton.disable();
    },
    findStatus: function(statusType) {
	    var store = this.gridStore;
	    store.baseParams.approved = statusType;
	    store.reload();
	    this.updateTitle();
    },
    findType: function(statusType) {
	    var store = this.gridStore;
	    store.baseParams.type = statusType;
	    store.reload();
	    this.updateTitle();
    },
    findStartDate: function(startDate) {
	    var store = this.gridStore;
	    store.baseParams.start_date = startDate.format('Y/m/d');
	    store.reload();
	    this.updateTitle();
    },
    findEndDate: function(endDate) {
	    var store = this.gridStore;
	    store.baseParams.end_date = endDate.format('Y/m/d');
	    store.reload();
	    this.updateTitle();
    },
    findReset: function(statusType) {
	    var todaysDate = new Date();
	    var yearStartDate = new Date();
	    yearStartDate.setFullYear(todaysDate.getYear()+1900,0,1);
	    var yearEndDate = new Date();
	    yearEndDate.setFullYear(todaysDate.getYear()+1900,11,31);
	    this.mainGrid.setTitle("Vacations: All vacations for " + (todaysDate.getYear()+1900));
	    var store = this.gridStore;
	    store.baseParams = {"start_date": yearStartDate.format('Y/m/d'), "end_date": yearEndDate.format('Y/m/d')};
	    store.reload();
	    this.approvalMenuButton.setText('Approval: ALL');
		this.typeMenuButton.setText('Type: BOTH');
		this.startDateField.setValue(yearStartDate);
		this.endDateField.setValue(yearEndDate);
    },
    updateTitle: function() {
	    this.mainGrid.setTitle("Filtered Vacations.   --- " + this.approvalMenuButton.text + " - - " +   this.typeMenuButton.text + " - - From " + this.gridStore.baseParams.start_date + " to " + this.gridStore.baseParams.end_date);
    }
});