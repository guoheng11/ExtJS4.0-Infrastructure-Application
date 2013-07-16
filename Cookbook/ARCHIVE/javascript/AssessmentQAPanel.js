AssessmentQAPanel = Ext.extend(Ext.Panel, {
	objectId: '',
	assessmentStore: '',
	mainGrid: '',
	gridStore: '',
	bufferPanel: '',
	readOnly: false,
	schedulingPanel: false,
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    
	    var assessmentWording = "Scheduling";
		// scheduling doesn't need it
		if(!this.schedulingPanel) {
			assessmentWording = "Assessment";
		}
		this.fieldsArray = [
	            {name: 'assessment_hour_id', type: 'int'},
	            {name: 'hours', type: 'double'},
	            {name: 'hour_type', type: 'int'},
	            {name: 'hour_type_string', type: 'string'},
	            {name: 'description', type: 'string'},
	            {name: 'contact_name', type: 'string'},
	            {name: 'contact_id', type: 'int'},
	            {name: 'billed', type: 'boolean'},
	            {name: 'request_start', type: 'date'},
	            {name: 'request_complete', type: 'date'},
	            {name: 'booked_start', type: 'date'},
	            {name: 'booked_complete', type: 'date'}
	        ];
	    var reader = new Ext.data.JsonReader({
	        fields: this.fieldsArray
	    });
	    
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
	    this.mainGrid = new Ext.grid.GridPanel({
	        store: this.gridStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	        columns: [
	        	{
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
	                }
	            },{
	                header: "Hours",
	                width: 20,
	                sortable: true,
	                dataIndex: 'hours',
	                summaryType:'sum',
	                renderer : function(v){
	                    return v +' hours';
	                }
	            },{
	                
	                header: "Description",
	                width: 80,
	                sortable: true,
	                dataIndex: 'description',
	                hideable: false
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
	            //groupTextTpl: '{[values.rs[0] == true ? "Billable" : "Non-Billable"]}'
	        }),

	        plugins: summary,
	        height: 350,
	        //autoHeight: true,
	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Tasks'
	    });
	    this.mainGrid.on('afterrender', function() {
		    //this.getStore().removeAll();
		    if(eto.assessmentStore) {
				eto.loadRecord(eto);
			}
			eto.gridLoaded = true;
	    });
	    if(!this.schedulingPanel) {
	    	this.bufferPanel = new AssessmentOPSBufferFS(this.mainGrid);
	    } else {
	    	this.bufferPanel = new Ext.form.FormPanel({
			    layout: 'form',
			    labelWidth: 200,
			    bodyStyle: 'padding:0 10px 0;',
			    items:[{
	                xtype: 'datefield',
	                fieldLabel: 'Requested Start Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'request_start'
	            },{
	                xtype: 'datefield',
	                fieldLabel: 'Requested Complete Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'request_complete'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'Booked Start Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'booked_start'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'Booked Complete Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'booked_complete'
		    	}]
		    });
	    }
	    
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
	        title:'OPS '+assessmentWording+' Form',
	        collapsible: true,
	        labelWidth: 350,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [this.bufferPanel,this.mainGrid, this.hardwareGrid]
		});
    	
		AssessmentQAPanel.superclass.initComponent.call(this);
		this.addEvents('contentLoaded');
    },
    
    constructor: function(projId, schPanel, readOnly) {
		this.objectId = projId;
		this.schedulingPanel = schPanel;
		this.readOnly = readOnly;
		AssessmentQAPanel.superclass.constructor.call(this);
    },
    
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    if(!this.schedulingPanel) {
	    	// Project ID
	    	// hours
	    	var encodedHours = new Array();
	    	var count = this.mainGrid.getStore().getCount();
	    	for(var c = 0; c < count; c++) {
		    	var rec = this.mainGrid.getStore().getAt(c);
		    	var tempObj = new Object();
		    	tempObj.assessment_hour_id = rec.get('assessment_hour_id');
		    	tempObj.hours = rec.get('hours');
		    	tempObj.hour_type = rec.get('hour_type');
		    	tempObj.description = rec.get('description');
		    	encodedHours[c] =tempObj;
	    	}
	    	objectToSend.hours = Ext.encode(encodedHours);
	    	// hardware
	    	var hardwareEntries = new Array();
	    	var hardwareStore = this.hardwareGrid.getStore();
	    	var count = hardwareStore.getCount();
	    	for(var c = 0; c < count; c++) {
		    	var rec = hardwareStore.getAt(c);
		    	var tempObj = new Object();
		    	tempObj.hardware_id = rec.get('hardware_id');
		    	tempObj.unit_cost = rec.get('unit_cost');
		    	tempObj.quantity = rec.get('quantity');
		    	tempObj.description = rec.get('description');
		    	hardwareEntries[c] =tempObj;
	    	}
	    	objectToSend.hardware = Ext.encode(hardwareEntries);
    	} else {
	    	objectToSend = this.bufferPanel.getForm().getValues();
    	}
    	return objectToSend;
	},
	loadRecord: function() {
		this.gridStore.removeAll();
	    var count = this.assessmentStore.getCount();
	    if(count > 0) {
		    var rec = this.assessmentStore.getAt(0);
		    // Scheduling
	    	var foundObjects = this.find('name','request_start');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('request_start'));
		    }
	    	foundObjects = this.find('name','request_complete');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('request_complete'));
		    }
	    	foundObjects = this.find('name','booked_start');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('booked_start'));
		    }
	    	foundObjects = this.find('name','booked_complete');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('booked_complete'));
		    }
		    // hours
		    var recordArray = new Array();
		    var hourArray = rec.get('hours');
			var hourRecord = Ext.data.Record.create(this.fieldsArray);
		    if(hourArray instanceof Array) {
			    for(var c = 0; c < hourArray.length; c++) {
				    recordArray[c] = new hourRecord(hourArray[c]);
			    }
		    }
		    this.mainGrid.getStore().removeAll();
		    this.mainGrid.getStore().add(recordArray);
		    
		    var hardwareRecordArray = new Array();
		    var hardwareArray = rec.get('hardware');
			var hardwareRecord = Ext.data.Record.create(this.hardwareStore);
		    if(hourArray instanceof Array) {
			    for(var c = 0; c < hardwareArray.length; c++) {
				    hardwareRecordArray[c] = new this.hardwareStore.recordType(hardwareArray[c]);
			    }
		    }
		    this.hardwareStore.removeAll();
		    this.hardwareStore.add(hardwareRecordArray);
	    }
	    this.mainGrid.getStore().groupBy('billed',true);
	    this.fireEvent('contentLoaded', this);
    },
    setStore: function(store) {
	    this.assessmentStore = store;
	    if(this.gridLoaded) {
	    	this.loadRecord(this);
    	}
    }
});

/***** BUFFER FIELD SET *****/
AssessmentOPSBufferFS = Ext.extend(Ext.form.FieldSet, {
	mainGrid: '',
	tasktypeChosen: false,
	hoursEntered: false,
	getGroupsStore: '',
	taskTypeCombo: '',
	hoursTF: '',
	descriptionTA: '',
	billableField: '',
	contactId: '',
	openedIndex: '',
	editingMode: false,
	
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
			baseParams:{"hour_type": 'OPS'}, // this parameter asks for listing
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
		this.getGroupsStore.on('load', function(thisStore) {
			thisStore.sort("assessment_hour_type", "ASC");
		});
		this.getGroupsStore.load();
		
		this.taskTypeCombo = new Ext.form.ComboBox({
            width:200,
            //name: 'biz_id'+this.bizPanel.itemCount,
            //itemId: 'bizIdCombo'+this.bizPanel.itemCount,
            store: this.getGroupsStore,
	        displayField:'assessment_hour_type',
	        valueField: 'assessment_hour_type_id',
	        //hiddenName:'biz_id',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'choose type.',
	        selectOnFocus:true,
	        virgin: true,
	        fieldLabel: 'Task Type'
    	});
    	selectHandler = function(combo,record,indexRecord) {
	    	if(record) {
		    	eto.billableField.setValue(record.get('billed'));
	    	}
		};
    	this.taskTypeCombo.on('select', selectHandler,this);
	    	
		this.hoursTF = new Ext.form.TextField({
            width: 400,
            fieldLabel: 'Hours',
            value: '',
            //vtype: 'decimalNumber',
            validator: function(val) {
                var pattern = new RegExp("(^[0-9]{1,10}(\\.[0-9]{1,10})?$)|(^$)");
                if(pattern.test(val)) {
	                return true;
                } else {
	                return "Needs to be a number...";
                }
            },
            //maskRe: /[0-9\.]/,
            name: 'hour'
    	});
    	this.descriptionTA = new Ext.form.TextArea({
            width: 400,
            fieldLabel: 'Description',
            disabled: false,
            value: '',
            name: 'descriptionTA'
    	});
    	this.billableField = new Ext.form.DisplayField({
            name: 'billed',
            hidden: true
    	});
    	
    	addHandler = function(event,button) {
	    	if(event) {
		    	eto.onAdd1(eto);
	    	}
		};
		
		removeHandler = function(event,button) {
	    	if(event) {
		    	eto.onRemove1(eto);
	    	}
		};
		
	    Ext.apply(this, {
		    bodyStyle: 'padding:10',
		    items: [this.taskTypeCombo,
	    	this.hoursTF,
	    	this.descriptionTA, {
	        	layout: 'column',
	        	items:[{
		        	xtype: 'button',
		        	text: 'Add To The List',
		        	iconCls: 'add',
		        	disabled: true,
		        	width: 100,
		        	handler: addHandler,
		        	name: 'addButton'
	        	},{
		        	xtype: 'button',
		        	style: 'padding-left: 20',
		        	text: 'Remove',
		        	iconCls: 'remove',
		        	disabled: true,
		        	width: 100,
		        	handler: removeHandler,
		        	name: 'removeButton'
	        	},{
		        	xtype: 'button',
		        	style: 'padding-left: 20',
		        	text: 'Reset',
		        	iconCls: 'reset',
		        	disabled: false,
		        	width: 100,
		        	handler: eto.resetForm,
		        	scope: eto,
		        	name: 'resetButton'
	        	}]
        	},this.billableField]
		});
		
		changeHourHandler = function(thisForm,newValue,oldValue) {
	    	if(newValue > 0) {
		    	eto.hoursEntered = true;
		    	eto.checkAddButton();
	    	}
		};
		changeTaskHandler = function(thisForm,newValue,oldValue) {
	    	if(newValue > 0) {
		    	eto.tasktypeChosen = true;
		    	eto.checkAddButton();
	    	}
		};
		
		rowClickHandler = function(grid,rowIndex,event) {
	    	eto.transformAddToUpdate(true,eto);
	    	eto.enableAdd(true);
	    	eto.enableRemove(true);
	    	var record = grid.getStore().getAt(rowIndex);
	    	eto.billableField.setValue(record.get('billed'));
	    	eto.taskTypeCombo.setValue(record.get('hour_type'));
	    	eto.hoursTF.setValue(record.get('hours'));
	    	eto.descriptionTA.setValue(record.get('description'));
	    	eto.openedIndex = rowIndex;
		};
    	this.on('afterrender', function() {
	    	eto.hoursTF.on('change',changeHourHandler,eto);
	    	eto.taskTypeCombo.on('change',changeTaskHandler,eto);
			eto.mainGrid.on('rowdblclick', rowClickHandler);
		});
		AssessmentOPSBufferFS.superclass.initComponent.call(this);
    },
    enableAdd: function(enable) {
	    var foundObjects = this.find('name','addButton');
	    if(foundObjects.length > 0) {
	    	if(enable) {
			    foundObjects[0].enable();
		    } else {
			    foundObjects[0].disable();
		    }
	    }
    },
    enableRemove: function(enable) {
	    var foundObjects = this.find('name','removeButton');
	    if(foundObjects.length > 0) {
	    	if(enable) {
			    foundObjects[0].enable();
		    } else {
			    foundObjects[0].disable();
		    }
	    }
    },
    transformAddToUpdate: function(straightTransform) {
	    var eto = this;
	    var foundObjects = this.find('name','addButton');
	    if(foundObjects.length > 0) {
	    	if(straightTransform) {
		    	eto.editingMode = true;
		    	updateHandler = function(event,button) {
			    	if(event) {
				    	eto.onUpdate(eto);
			    	}
				};
			    foundObjects[0].setHandler(updateHandler);
			    foundObjects[0].setText("Update Entry");
			    foundObjects[0].setIconClass('perform');
		    } else {
			    eto.editingMode = false;
			    addHandler = function(event,button) {
			    	if(event) {
				    	eto.onAdd1(eto);
			    	}
				};
			    foundObjects[0].setHandler(addHandler);
			    foundObjects[0].setText("Add To The List");
			    foundObjects[0].setIconClass('add');
		    }
	    }
    },
    checkAddButton: function() {
	    if(!this.editingMode) {
		    if(this.tasktypeChosen && this.hoursEntered) {
			    this.enableAdd(true);
		    } else {
			    this.enableAdd(false);
		    }
	    }
    },
    onAdd1: function() {
	    var store = this.mainGrid.getStore();
	    var hourTypeId = this.taskTypeCombo.getValue();
	    searchFunction = function(record,id) {
    		if(record.get('hour_type') == hourTypeId) {
		    	return true;
	    	} else {
		    	return false;
	    	}
		};
	    var foundId = store.findBy(searchFunction);
	    if(foundId >= 0) {
		    Ext.Msg.alert('Error', 'This entry already exists. Just double click on it and change details.');
	    } else {
		    var newDataRecord = {
			    hour_type: this.taskTypeCombo.getValue(),
				hours: parseFloat(this.hoursTF.getValue()),
				hour_type_string: this.taskTypeCombo.getRawValue(),
				description: this.descriptionTA.getValue(),
				billed: this.billableField.getValue()
			};
			store.add(new store.reader.recordType(newDataRecord));
			store.groupBy('billed',true);
			this.resetForm();
		}
	},
	onUpdate: function() {
	    var store = this.mainGrid.getStore();
	    var oldDataRecord = store.getAt(this.openedIndex);
	    oldDataRecord.set('hours',parseFloat(this.hoursTF.getValue()));
	    oldDataRecord.set('billed',this.billableField.getValue());
	    oldDataRecord.set('description',this.descriptionTA.getValue());
	    oldDataRecord.set('hour_type',this.taskTypeCombo.getValue());
	    oldDataRecord.set('hour_type_string',this.taskTypeCombo.getRawValue());
	    //oldDataRecord.set('hour_type',this.taskTypeCombo.getRawValue());
	    store.groupBy('billed',true);
	},
	onRemove1: function() {
		//var deleteRow = this.mainGrid.getSelectionModel().getSelected();
		if(typeof(this.openedIndex) != 'undefined') {
			this.mainGrid.getStore().removeAt(this.openedIndex);
		}
		this.resetForm();
	},
	resetForm: function() {
		this.enableAdd(false);
		this.enableRemove(false);
		this.transformAddToUpdate(false,this);
		this.tasktypeChosen = false;
		this.hoursEntered = false;
		this.taskTypeCombo.setValue("");
		this.hoursTF.setValue("");
		this.descriptionTA.setValue("");
		this.billableField.setValue("");
		this.contactId ="";
	},
    constructor: function(grid) {
		this.mainGrid = grid;
		AssessmentOPSBufferFS.superclass.constructor.call(this);
    }
});

var decimalNumberTest = /^[0-9]+(\.[0-9]{0,2})?$/;
Ext.apply(Ext.form.VTypes, {
	decimalNumber: function(v) {
		return decimalNumberTest.test(v);
	},
	decimalNumberText: 'Invalid number (X+.YY)',
	decimalNumberMask: /[0-9.]/
});