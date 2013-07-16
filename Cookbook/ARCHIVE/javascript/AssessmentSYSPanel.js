AssessmentSYSPanel = Ext.extend(Ext.Panel, {
	objectId: '',
	assessmentStore: '',
	mainGrid: '',
	gridStore: '',
	getGroupsStore: '',
	removeTaskButton: '',
	hardwareGrid: '',
	hardwareStore: '',
	removeHWButton: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    this.getGroupsStore = new Ext.data.Store({
			id: 'getGroupsStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetAssessmentHourTypes.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"hour_type": 'SYS'}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				idProperty: "assessment_hour_type_id"
			}, [
				{name: 'assessment_hour_type_id', type: "int", mapping: 'assessment_hour_type_id'},
				{name: 'assessment_hour_type', type: "string", mapping: 'assessment_hour_type'},
				{name: 'billed', type: "boolean", mapping: 'billed'},
				{name: 'booked', type: "boolean", mapping: 'booked'}
			])
		});
		this.getGroupsStore.load();
		
	    var reader = new Ext.data.JsonReader({
	        fields: [
	            {name: 'assessment_hour_id', type: 'int'},
	            {name: 'hours', type: 'double'},
	            {name: 'hour_type', type: 'int'},
	            {name: 'hour_type_string', type: 'string'},
	            {name: 'description', type: 'string'},
	            {name: 'contact_name', type: 'string'},
	            {name: 'contact_id', type: 'int'},
	            {name: 'billed', type: 'boolean'},
	            {name: 'booked', type: 'boolean'}
	        ]
	    });
	    var NewTask = Ext.data.Record.create([
	    	{name: 'assessment_hour_id', type: 'int'},
            {name: 'hours', type: 'int'},
            {name: 'hour_type', type: 'int'},
            {name: 'hour_type_string', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'contact_name', type: 'string'},
            {name: 'contact_id', type: 'int'},
            {name: 'billed', type: 'boolean'},
            {name: 'booked', type: 'boolean'}
      	]);
	    //var summary = new Ext.grid.GroupSummary();
	    this.gridStore = new Ext.data.GroupingStore({
            reader: reader,
            data: [{}],
            sortInfo:{field: 'hours', direction: "ASC"},
            groupField:'billed'
        });
	    var summary = new Ext.grid.GroupSummary();
	    billedRenderer = function(v) {
		    if(v == "true" || v == true) {
			    return "Billable";
		    } else {
			    return "Not Billable";
		    }
	    }
	    taskTypeRenderer = function(val) {
		    var rec = eto.getGroupsStore.getById(val);
		    if(rec) {
			    return rec.get('assessment_hour_type');
		    } else {
			    if(eto.getGroupsStore.find('assessment_hour_type',val) >= 0) {
				    return val;
			    } else {
			    	return "Default Type";
		    	}
		    }
		}
		var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
		this.removeTaskButton = new Ext.Button({
            text: 'Remove Task',
            iconCls: 'remove',
            disabled: true
        });
	    this.mainGrid = new Ext.grid.EditorGridPanel({
	        store: this.gridStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm1,
	        tbar: [{
	            text: 'Add Task',
	            iconCls: 'add',
	            handler : function(){
	                var p = new NewTask({
	                    hours: 0,
	                    hour_type: '',
	                    hour_type_string: '',
	                    description: '',
	                    billable: false,
	                    booked: false
	                });
	                eto.mainGrid.stopEditing();
	                eto.gridStore.insert(0, p);
	                eto.mainGrid.startEditing(0, 0);
	            }
            },this.removeTaskButton],
	        columns: [{
	                header: "Billing",
	                dataIndex: 'billed',
	                groupRenderer: function (v, o, record, rowIndex, colIndex, store) {
		                return billedRenderer(v);
					},
	                hidden: true
	            },{
	                header: "Task Type",
	                width: 50,
	                dataIndex: 'hour_type_string',
	                hidden: false,
	                summaryType: 'count',
	                summaryRenderer: function(v, params, data){
	                    return ((v === 0 || v > 1) ? '(' + v +' Tasks)' : '(1 Task)');
	                },
	                renderer: taskTypeRenderer,
					editor: new Ext.form.ComboBox({
			            width:200,
			            allowBlank: 'false',
			            store: this.getGroupsStore,
				        displayField:'assessment_hour_type',
				        valueField: 'assessment_hour_type_id',
				        typeAhead: true,
				        mode: 'local',
				        editable: 'false',
				        forceSelection: true,
				        triggerAction: 'all',
				        emptyText:'choose type.',
				        lazyRender:true,
				        selectOnFocus:true,
				        fieldLabel: 'Task Type'
			    	})
	            },{
	                header: "Hours",
	                width: 20,
	                sortable: true,
	                dataIndex: 'hours',
	                summaryType:'sum',
	                renderer : function(v){
	                    return v +' hours';
	                },
	                editor: new Ext.form.NumberField({
		               allowBlank: false,
		               allowNegative: false,
		               maxValue: 1000
		           })
	            },{
	                
	                header: "Description",
	                width: 80,
	                sortable: true,
	                dataIndex: 'description',
	                hideable: false,
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                dataIndex: 'assessment_hour_id',
	                hidden: true
	            },{
	                dataIndex: 'hour_type',
	                hidden: true
	            }
	        ],

	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            showGroupName: false,
	            enableNoGroups:false, // REQUIRED!
	            hideGroupedColumn: true
	        }),

	        plugins: summary,
	        height: 250,
	        //autoHeight: true,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Tasks'
	    });
	    sm1.on('rowselect', function() {eto.removeTaskButton.enable();});
	    sm1.on('rowdeselect', function() {eto.removeTaskButton.disable();});
	    var removeTaskHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.mainGrid.getSelectionModel().getSelected();
		    	eto.gridStore.remove(selectedRecord);
		    	eto.removeTaskButton.disable();
    		}
		};
	    this.removeTaskButton.on('click', removeTaskHandler);
	    
	    this.mainGrid.on('afterrender', function() {
		    this.getStore().removeAll();
		    if(eto.assessmentStore && eto.hwGridLoaded) {
				eto.loadRecord(eto);
			}
			eto.gridLoaded = true;
	    });
	    gridStoreEditHandler = function(objecto) {
	        if(objecto.field == "hour_type_string") {
		        if(eto.gridStore.find('hour_type',objecto.value) >= 0) {
			        return false;
		        }
		        var grpRec = eto.getGroupsStore.getById(objecto.value);
		        if(grpRec) {
			        objecto.record.set('booked',grpRec.get('booked'));
			        objecto.record.set('billed',grpRec.get('billed'));
			        objecto.record.set('hour_type',grpRec.get('assessment_hour_type_id'));
			        eto.gridStore.groupBy('billed',true);
		        }
	        }
        };
        this.mainGrid.on("validateedit", gridStoreEditHandler);
        
        /* HARDWARE */
        var harwareReader = new Ext.data.JsonReader({
	        fields: [
	            {name: 'hardware_id', type: 'int'},
	            {name: 'unit_cost', type: 'int'},
	            {name: 'quantity', type: 'int'},
	            {name: 'description', type: 'string'},
	            {name: 'groupType', type: 'string'}
	        ]
	    });
	    var NewHardware = Ext.data.Record.create([
	    	{name: 'hardware_id', type: 'int'},
            {name: 'unit_cost', type: 'int'},
            {name: 'quantity', type: 'int'},
            {name: 'description', type: 'string'},
            {name: 'groupType', type: 'string'}
      	]);
	    //var summary = new Ext.grid.GroupSummary();
	    this.hardwareStore = new Ext.data.GroupingStore({
            reader: harwareReader,
            data: [{}],
            sortInfo:{field: 'unit_cost', direction: "ASC"},
            groupField:'groupType'
        });
	    var hardwareSummary = new Ext.grid.GroupSummary();
		// define a custom summary function
	    Ext.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
	        return v + (record.data.unit_cost * record.data.quantity);
	    }
		var sm2 = new Ext.grid.RowSelectionModel({singleSelect:true});
		this.removeHWButton = new Ext.Button({
            text: 'Remove',
            iconCls: 'remove',
            disabled: true
        });
	    this.hardwareGrid = new Ext.grid.EditorGridPanel({
	        store: this.hardwareStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm2,
	        tbar: [{
	            text: 'Add',
	            iconCls: 'add',
	            handler : function(){
	                var p = new NewHardware({
	                    unit_cost: 0,
	                    quantity: 0,
	                    description: '',
	                    groupType: 'Default Hardware'
	                });
	                eto.hardwareGrid.stopEditing();
	                eto.hardwareStore.insert(0, p);
	                eto.hardwareGrid.startEditing(0, 0);
	            }
            },this.removeHWButton],
	        columns: [{
	                
	                header: "Description",
	                width: 80,
	                sortable: true,
	                dataIndex: 'description',
	                hideable: false,
	                summaryType: 'count',
	                summaryRenderer: function(v, params, data){
	                    return ((v === 0 || v > 1) ? '(' + v +' Units)' : '(1 Unit)');
	                },
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Unit Cost",
	                width: 20,
	                sortable: true,
	                dataIndex: 'unit_cost',
	                renderer: function(v, params, record){
	                    return Ext.util.Format.usMoney(v);
	                },
	                editor: new Ext.form.NumberField({
		               allowBlank: false,
		               allowNegative: false,
		               maxValue: 1000000000
		           })
	            },{
	                header: "Quantity",
	                width: 20,
	                sortable: true,
	                dataIndex: 'quantity',
	                summaryType:'sum',
	                editor: new Ext.form.NumberField({
		               allowBlank: false,
		               allowNegative: false,
		               maxValue: 1000000000
		           })
	            },{
	                header: "Total Cost",
	                width: 20,
	                sortable: false,
	                groupable: false,
	                renderer: function(v, params, record){
	                    return Ext.util.Format.usMoney(record.data.quantity * record.data.unit_cost);
	                },
	                dataIndex: 'cost',
	                summaryType:'totalCost',
	                summaryRenderer: Ext.util.Format.usMoney
	            },{
	                dataIndex: 'hardware_id',
	                hidden: true
	            },{
	                dataIndex: 'groupType',
	                hidden: true
	            }
	        ],

	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            showGroupName: false,
	            enableNoGroups:false,
	            hideGroupedColumn: true
	        }),

	        plugins: hardwareSummary,
	        height: 250,
	        //autoHeight: true,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Hardware'
	    });
	    sm2.on('rowselect', function() {eto.removeHWButton.enable();});
	    sm2.on('rowdeselect', function() {eto.removeHWButton.disable();});
	    var removeHWHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.hardwareGrid.getSelectionModel().getSelected();
		    	eto.hardwareStore.remove(selectedRecord);
		    	eto.removeHWButton.disable();
    		}
		};
	    this.removeHWButton.on('click', removeHWHandler);
	    
	    this.hardwareGrid.on('afterrender', function() {
		    this.getStore().removeAll();
		    if(eto.assessmentStore && eto.gridLoaded) {
				eto.loadRecord(eto);
			}
			eto.hwGridLoaded = true;
	    });
        
	    Ext.apply(this, {
		    frame: true,
	        title:'SYS Assessment Form',
	        collapsible: true,
	        labelWidth: 350,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [this.mainGrid, this.hardwareGrid]
		});
    	
		AssessmentSYSPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(projId) {
		this.objectId = projId;
		AssessmentSYSPanel.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	var encodedHours = new Array();
    	var count = this.mainGrid.getStore().getCount();
    	for(var c = 0; c < count; c++) {
	    	var rec = this.mainGrid.getStore().getAt(c);
	    	var tempObj = new Object();
	    	tempObj.assessment_hour_id = rec.get('assessment_hour_id');
	    	tempObj.hours = rec.get('hours');
	    	tempObj.hour_type = rec.get('hour_type');
	    	tempObj.description = rec.get('description');
	    	if(tempObj.hour_type != "") {
	    		encodedHours[c] =tempObj;
    		}
    	}
    	var encodedHardware = new Array();
    	count = this.hardwareGrid.getStore().getCount();
    	for(var c = 0; c < count; c++) {
	    	var rec = this.hardwareGrid.getStore().getAt(c);
	    	var tempObj = new Object();
	    	tempObj.unit_cost = rec.get('unit_cost');
	    	tempObj.quantity = rec.get('quantity');
	    	tempObj.hardware_id = rec.get('hardware_id');
	    	tempObj.description = rec.get('description');
	    	encodedHardware[c] =tempObj;
    	}
    	objectToSend.hardware = Ext.encode(encodedHardware);
    	objectToSend.hours = Ext.encode(encodedHours);
    	return objectToSend;
	},
	loadRecord: function() {
		this.mainGrid.getStore().removeAll();
	    var count = this.assessmentStore.getCount();
	    if(count > 0) {
		    var rec = this.assessmentStore.getAt(0);
		    var recordArray = new Array();
		    var hourArray = rec.get('hours');
		    if(hourArray instanceof Array) {
			    for(var c = 0; c < hourArray.length; c++) {
				    recordArray[c] = new Ext.data.Record(hourArray[c]);
			    }
		    }
		    this.mainGrid.getStore().add(recordArray);
		    /* hardware */
		    recordArray = new Array();
		    var hwArray = rec.get('hardware');
		    if(hwArray instanceof Array) {
			    for(var c = 0; c < hwArray.length; c++) {
				    recordArray[c] = new Ext.data.Record(hwArray[c]);
				    if(!recordArray[c].data.groupType) {
					    recordArray[c].data.groupType = "Default Hardware";
				    }
			    }
		    }
		    this.hardwareGrid.getStore().add(recordArray);
	    }
	    this.mainGrid.getStore().groupBy('billed',true);
	    this.hardwareGrid.getStore().groupBy('groupType',true);
    },
    setStore: function(store) {
	    this.assessmentStore = store;
	    if(this.gridLoaded && this.hwGridLoaded) {
	    	this.loadRecord(this);
    	}
    }
});