SWDAssessmentPanel = Ext.extend(Ext.Panel, {
	objectId: '',
	assessmentStore: '',
	mainGrid: '',
	gridStore: '',
	bufferPanel: '',
	totalsPanel: '',
	schedulingPanel: false,
	emptyContainer: '',
	readOnly: false,
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    var assessmentWording = "Scheduling";
		// scheduling doesn't need it
		if(!this.schedulingPanel) {
			assessmentWording = "Assessment";
		}
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
	            {name: 'request_start', type: 'date'},
	            {name: 'request_complete', type: 'date'},
	            {name: 'booked_start', type: 'date'},
	            {name: 'booked_complete', type: 'date'}
	        ]
	    });
	    
	    //var summary = new Ext.grid.GroupSummary();
	    this.gridStore = new Ext.data.GroupingStore({
            reader: reader,
            data: [{}],
            sortInfo:{field: 'hours', direction: "ASC"},
            groupField:'hour_type_string'
        });
        
	    var summary = new Ext.grid.GroupSummary();
	    this.mainGrid = new Ext.grid.GridPanel({
	        store: this.gridStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	        columns: [
	            {
		            id: 'contact_name',
	                header: "Person's Name",
	                width: 40,
	                sortable: true,
	                dataIndex: 'contact_name',
	                summaryType: 'count',
	                hideable: false,
	                summaryRenderer: function(v, params, data){
	                    return ((v === 0 || v > 1) ? '(' + v +' People)' : '(1 Person)');
	                }
	            },{
	                header: "Hour Type",
	                width: 50,
	                dataIndex: 'hour_type_string',
	                hidden: true
	            },{
	                header: "Hours",
	                width: 20,
	                sortable: true,
	                dataIndex: 'hours',
	                summaryType:'sum',
	                renderer : function(v){
		                return ((v === 0 || v > 1) ? '(' + v +' hours)' : '(1 hour)');
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
		    eto.mainGrid.getStore().removeAll();
		    if(eto.assessmentStore) {
				eto.loadRecord(eto);
			}
			eto.gridLoaded = true;
	    });
	    if(!this.schedulingPanel) {
	    	this.bufferPanel = new AssessmentSWDBufferFS(this.mainGrid);
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
		    
	    this.reqsReviewPanel = new Ext.Panel({
		    layout: 'form',
		    bodyStyle: 'padding:0 10px 0;',
		    items:[{
			    xtype: 'checkbox',
			    hideLabel: true,
			    disabled: this.schedulingPanel,
			    boxLabel: 'MIS Required',
			    name: 'misRequiredCB'
		    },{
			    xtype: 'checkbox',
			    hideLabel: true,
			    disabled: this.schedulingPanel,
			    boxLabel: 'Vision Required',
			    name: 'visionRequiredCB'
		    },{
			    xtype: 'checkbox',
			    hideLabel: true,
			    disabled: this.schedulingPanel,
			    boxLabel: 'Requirements Review With Customer Required',
			    name: 'reviewWithCustomerCB'
		    },{
			    xtype: 'checkbox',
			    hideLabel: true,
			    disabled: this.schedulingPanel,
			    boxLabel: 'Requirements Review Internal Meeting Required',
			    name: 'reviewInternalMeetingCB'
		    }]
	    });
	    this.totalsPanel = new AssessmentTotalHourPanel(this.gridStore);
	    this.emptyContainer = new Ext.Container();
	    Ext.apply(this, {
		    frame: true,
	        title:'SWD '+assessmentWording+' Form',
	        collapsible: true,
	        labelWidth: 350,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [this.reqsReviewPanel,
		        this.bufferPanel,
		        this.mainGrid,
		        this.totalsPanel
		    ]
		});
    	
		SWDAssessmentPanel.superclass.initComponent.call(this);
		this.addEvents('contentLoaded');
    },
    
    constructor: function(projId, schPanel, readOnly) {
		this.objectId = projId;
		this.schedulingPanel = schPanel;
		this.readOnly = readOnly;
		SWDAssessmentPanel.superclass.constructor.call(this);
    },
    
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    if(!this.schedulingPanel) {
		    // MIS
		    var foundObjects = this.find('name','misRequiredCB');
		    if(foundObjects.length > 0) {
		    	objectToSend.mis_required = foundObjects[0].getValue();
	    	}
	    	
	    	// Vision
		    var foundObjects = this.find('name','visionRequiredCB');
		    if(foundObjects.length > 0) {
		    	objectToSend.vision_required = foundObjects[0].getValue();
	    	}
		    
		    // Review With Customer
		    var foundObjects = this.find('name','reviewWithCustomerCB');
		    if(foundObjects.length > 0) {
		    	objectToSend.customer_reqs_review = foundObjects[0].getValue();
	    	}
	    	
	    	// Internal Meeting Review
	    	foundObjects = this.find('name','reviewInternalMeetingCB');
		    if(foundObjects.length > 0) {
		    	objectToSend.internal_reqs_review = foundObjects[0].getValue();
	    	}
	    	
	    	// Project ID
	    	var encodedHours = new Array();
	    	var count = this.mainGrid.getStore().getCount();
	    	for(var c = 0; c < count; c++) {
		    	var rec = this.mainGrid.getStore().getAt(c);
		    	var tempObj = new Object();
		    	tempObj.assessment_hour_id = rec.get('assessment_hour_id');
		    	tempObj.hours = rec.get('hours');
		    	tempObj.hour_type = rec.get('hour_type');
		    	tempObj.contact_id = rec.get('contact_id');
		    	tempObj.description = rec.get('description');
		    	encodedHours[c] =tempObj;
	    	}
	    	objectToSend.hours = Ext.encode(encodedHours);
    	} else {
	    	objectToSend = this.bufferPanel.getForm().getValues();
    	}
    	return objectToSend;
	},
	loadRecord: function() {
	    var count = this.assessmentStore.getCount();
	    if(count > 0) {
		    var rec = this.assessmentStore.getAt(0);
		    // MIS 
		    var foundObjects = this.find('name','misRequiredCB');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('mis_required'));
		    }
		    
		    // Vision
		    var foundObjects = this.find('name','visionRequiredCB');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('vision_required'));
		    }
		    
		    // Review With Customer
		    var foundObjects = this.find('name','reviewWithCustomerCB');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('customer_reqs_review'));
		    }
		    
		    // Internal Meeting Review
	    	foundObjects = this.find('name','reviewInternalMeetingCB');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('internal_reqs_review'));
		    }
		    
			// Scheduling
	    	foundObjects = this.find('name','request_start');
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
		    
		    var recordArray = new Array();
		    var hourArray = rec.get('hours');
			
		    if(hourArray instanceof Array) {
			    for(var c = 0; c < hourArray.length; c++) {
				    var objToPass = hourArray[c];
				    var obb = hourArray[c];
				    recordArray[c] = new Ext.data.Record(hourArray[c]);
			    }
		    }
		    this.mainGrid.getStore().removeAll();
		    this.mainGrid.getStore().add(recordArray);
	    }
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
AssessmentSWDBufferFS = Ext.extend(Ext.form.FieldSet, {
	mainGrid: '',
	contactSelected: false,
	tasktypeChosen: false,
	hoursEntered: false,
	getGroupsStore: '',
	taskTypeCombo: '',
	hoursTF: '',
	descriptionTA: '',
	nameField: '',
	contactId: '',
	openedIndex: '',
	editingMode: false,
	billed: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    this.getGroupsStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'GetAssessmentHourTypes.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"hour_type": 'SWD'}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'assessment_hour_type_id', type: "int", mapping: 'assessment_hour_type_id'},
				{name: 'assessment_hour_type', type: "string", mapping: 'assessment_hour_type'},
				{name: 'billed', type: "boolean", mapping: 'billed'},
				{name: 'booked', type: "boolean", mapping: 'booked'}
			])
		});
		this.getGroupsStore.load();
		
		
    	selectHandler = function(combo,record,indexRecord) {
	    	if(record) {
		    	eto.billed = record.get('billed');
	    	}
		};
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
	        emptyText:'choose type...',
	        selectOnFocus:true,
	        virgin: true,
	        listeners: {
		        'change': changeTaskHandler
	        },
	        fieldLabel: 'Task Type'
    	});
		this.taskTypeCombo.on('select', selectHandler,this);
		
		this.hoursTF = new Ext.form.TextField({
            width: 390,
            fieldLabel: 'Hours',
            value: '',
            //vtype: 'decimalNumber',
            validator: function(val) {
	            var pattern = new RegExp("(^[0-9]{1,10}(\\.[0-9]{1,10})?$)|(^\\.[0-9]{1,10}?$)|(^$)");
                //var pattern = new RegExp("(^[0-9]{1,10}(\\.[0-9]{1,10})?$)|(^$)");
                if(pattern.test(val)) {
	                return true;
                } else {
	                return "Needs to be a number...";
                }
            },
            listeners: {
            	'change': changeHourHandler
        	},
            name: 'hour'
    	});
    	this.descriptionTA = new Ext.form.TextArea({
            width: 390,
            fieldLabel: 'Description',
            disabled: false,
            value: '',
            name: 'descriptionTA'
    	});
    	this.nameField = new Ext.form.DisplayField({
            fieldLabel: 'Person\'s Name',
            disabled: false,
            value: 'Drag from Contact Panel...',
            name: 'nameLabel'
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
		var addButton = new Ext.Button({
        	xtype: 'button',
        	text: 'Add To The List',
        	iconCls: 'add',
        	disabled: true,
        	width: 100,
        	handler: addHandler,
        	name: 'addButton'
    	});
	    Ext.apply(this, {
		    bodyStyle: 'padding:10',
		    items: [this.taskTypeCombo,
		    this.nameField,
	    	this.hoursTF,
	    	this.descriptionTA, {
	        	layout: 'column',
	        	items:[addButton,{
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
        	}]
		});
		this.on('beforedestroy', function() {			
			this.remove(this.taskTypeCombo, true);
		});
		
		
		
		rowClickHandler = function(grid,rowIndex,event) {
	    	eto.transformAddToUpdate(true,eto);
	    	eto.enableAdd(true);
	    	eto.enableRemove(true);
	    	var record = grid.getStore().getAt(rowIndex);
	    	eto.nameField.setValue(record.get('contact_name'));
	    	eto.taskTypeCombo.setValue(record.get('hour_type'));
	    	eto.hoursTF.setValue(record.get('hours'));
	    	eto.descriptionTA.setValue(record.get('description'));
	    	eto.openedIndex = rowIndex;
	    	eto.contactId = record.get('contact_id');
		};
    	this.on('afterrender', function() {
	    	//eto.get(0).on('change',changeHourHandler,eto);
	    	//eto.get(2).on('change',changeTaskHandler,eto);
	        var thisElement = this;
			var formPanelDropTargetEl = this.getEl();
			var formPanelDropTarget = new Ext.dd.DropTarget(formPanelDropTargetEl, {
				ddGroup     : 'contactDD',
				notifyEnter : function(ddSource, e, data) {
					thisElement.addClass('dragHighlight');
					//thisElement.removeClass('dragHighlight');
				},
				notifyOut : function(ddSource, e, data) {
					thisElement.removeClass('dragHighlight');
				},
				notifyDrop  : function(ddSource, e, data){
					var selectedRecord = ddSource.dragData.selections[0];
					var foundObjects = thisElement.find('name','nameLabel');
					if(foundObjects.length > 0) {
						foundObjects[0].setValue(selectedRecord.get('contact_name'));
						eto.contactId = selectedRecord.get('contact_id');
					}
					eto.contactSelected = true;
					eto.checkAddButton();
					thisElement.removeClass('dragHighlight');
					
					return(true);
				}
			});
			
			eto.mainGrid.on('rowdblclick', rowClickHandler);
		});
		AssessmentSWDBufferFS.superclass.initComponent.call(this);
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
		    if(this.contactSelected && this.tasktypeChosen && this.hoursEntered) {
			    this.enableAdd(true);
		    } else {
			    this.enableAdd(false);
		    }
	    }
    },
    onAdd1: function() {
	    var store = this.mainGrid.getStore();
	    var newDataRecord = {hour_type: this.taskTypeCombo.getValue(),
			hours: parseFloat(this.hoursTF.getValue()),
			hour_type_string: this.taskTypeCombo.getRawValue(),
			description: this.descriptionTA.getValue(),
			contact_name: this.nameField.getValue(),
			contact_id: this.contactId,
			billed: this.billed
		};
		store.add(new store.reader.recordType(newDataRecord));
		store.groupBy('hour_type_string',true);
		this.resetForm();
	},
	onUpdate: function() {
	    var store = this.mainGrid.getStore();
	    var oldDataRecord = store.getAt(this.openedIndex);
	    oldDataRecord.set('hours',parseFloat(this.hoursTF.getValue()));
	    oldDataRecord.set('description',this.descriptionTA.getValue());
	    oldDataRecord.set('hour_type',this.taskTypeCombo.getValue());
	    oldDataRecord.set('hour_type_string',this.taskTypeCombo.getRawValue());
	    //oldDataRecord.set('hour_type',this.taskTypeCombo.getRawValue());
	    store.groupBy('hour_type_string',true);
	},
	onRemove1: function() {
		//var deleteRow = this.mainGrid.getSelectionModel().getSelected();
		if(typeof(this.openedIndex) != 'undefined') {
			this.mainGrid.getStore().removeAt(this.openedIndex);
			this.resetForm();
		}
		//this.resetForm();
	},
	resetForm: function() {
		this.enableAdd(false);
		this.enableRemove(false);
		this.transformAddToUpdate(false,this);
		this.contactSelected = false;
		this.tasktypeChosen = false;
		this.hoursEntered = false;
		this.taskTypeCombo.setValue("");
		this.hoursTF.setValue("");
		this.descriptionTA.setValue("");
		this.nameField.setValue("");
		this.contactId ="";
	},
    constructor: function(grid) {
		this.mainGrid = grid;
		AssessmentSWDBufferFS.superclass.constructor.call(this);
    }
});

/***** TOTALS PANEL *****/
AssessmentTotalHourPanel = Ext.extend(Ext.Panel, {
	totalField: '',
	totalBilledField: '',
	totalNBilledField: '',
	totalPMField: '',
	mainStore: '',
	
	initComponent:function() {
		this.totalField = new Ext.form.DisplayField({
			fieldLabel: 'Total Hours',
			cls: 'cook-text-right',
            value: ''
    	});
    	this.totalPMField = new Ext.form.DisplayField({
			fieldLabel: 'Total PM Hours',
			cls: 'cook-text-right',
            value: ''
    	});
    	this.totalBilledField = new Ext.form.DisplayField({
			fieldLabel: 'Total Billable Hours',
			cls: 'cook-text-right',
            value: ''
    	});
    	this.totalNBilledField = new Ext.form.DisplayField({
			fieldLabel: 'Total Non-Billable ',
			cls: 'cook-text-right',
            value: ''
    	});
		Ext.apply(this, {
			layout: 'form',
		    bodyStyle: 'padding:10',
		    labelWidth: 150,
		    width: 250,
		    items: [
		    	this.totalPMField,
			    this.totalBilledField,
			    this.totalNBilledField,
			    this.totalField
		    ]
	    });
	    this.mainStore.on('add',this.updateTotals, this);
	    this.mainStore.on('update',this.updateTotals, this);
	    AssessmentTotalHourPanel.superclass.initComponent.call(this);
    },
    updateTotals: function() {
	    var totalValue = 0;
	    var totalBilledValue = 0;
	    var totalNBilledValue = 0;
	    var totalPMValue = 0;
	    var recCount = this.mainStore.getCount();
	    for(var c = 0; c < recCount; c++) {
		    var rec = this.mainStore.getAt(c);
		    var hours = rec.get('hours');
		    totalValue = totalValue + hours;
		    if(rec.get('hour_type_string') == "PM") {
			    totalPMValue = totalPMValue + hours;
		    } else if(rec.get('billed') == "true" || rec.get('billed') == true) {
			    totalBilledValue = totalBilledValue + hours;
		    } else {
			    totalNBilledValue = totalNBilledValue + hours;
		    }
	    }
	    this.totalPMField.setValue(totalPMValue);
	    this.totalField.setValue(totalValue);
	    this.totalBilledField.setValue(totalBilledValue);
	    this.totalNBilledField.setValue(totalNBilledValue);
	    this.doLayout();
    },
    constructor: function(store) {
		this.mainStore = store;
		AssessmentTotalHourPanel.superclass.constructor.call(this);
    }
});
    