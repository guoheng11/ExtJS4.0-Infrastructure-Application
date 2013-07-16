DeliverableFrame = Ext.extend(Ext.Panel, {
	tabContainer: '',
	projectId: '',
	optionId: '',
	optionName: '',
	getDeliverableStore: '',
	topPanel: '',
	deliverableHolderPanel: '',

    initComponent:function() {
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    
		addDeliverableHandler = function(button, event) {
	    	if(event) {
		    	eto.addNewDeliverable();
	    	}
		};
		
		saveDeliverablesHandler = function(button, event) {
	    	if(event) {
		    	var deliverableObjectArray = new Array();
		    	var realCount = 0;
		    	var mypane = eto.deliverableHolderPanel;
		    	for(var i = 0; i < eto.deliverableHolderPanel.items.length; i++) {
			    	if(typeof eto.deliverableHolderPanel.get(i).getValueObject == 'function') {
				    	var deliverableObject = eto.deliverableHolderPanel.get(i).getValueObject();
				    	deliverableObjectArray[realCount] = deliverableObject;
				    	realCount++;
			    	}
		    	}
		    	var objToSend = new Object();
		    	objToSend.project_id = eto.projectId;
		    	objToSend.option_id = eto.optionId;
		    	objToSend.deliverables = Ext.encode(deliverableObjectArray);
		    	Ext.Ajax.request({
					url: 'UpdateDeliverables.ashx',
				    method: 'POST',
				    params: objToSend,
				    failure: function() {
					    Ext.MessageBox.alert('Error','Submission Error');
				    },
				    success: function(response, opts) {
					    var jsonResponse = Ext.util.JSON.decode(response.responseText);
					    if(jsonResponse.success != null) {
					    	if(jsonResponse.success) {
						    	Ext.MessageBox.alert('Success','Deliverables Updated');
						    	eto.getDeliverableStore.reload();
						    	//eto.ownerCt.remove(eto);
				    		} else if(!jsonResponse.success) {
						    	if(jsonResponse.rows) {
						    		Ext.Msg.alert('Failed', 'Deliverables Update Failed...');
					    		}
				    		}
						} else {
				    		Ext.Msg.alert('Failed', 'Deliverables Update Failed. No Success Flag.');
			    		}
				    }
				});
	    	}
		};

	    this.topPanel = new Ext.Panel({
	        layout: 'table',
	        hideBorders: true,
            bodyBorder: false,
            border: false,
            layoutConfig: {
			    columns: 9
			},
	        items: [{
		        xtype: 'button',
		        text: 'Save Changes',
		        iconCls: 'save',
		        scale: 'medium',
		        style: 'padding: 5',
		        width: 120,
		        handler: saveDeliverablesHandler
	        },{
		        xtype: 'button',
		        text: 'Add New Deliverable',
		        iconCls: 'add',
		        scale: 'medium',
		        style: 'padding: 5',
		        width: 120,
		        handler: addDeliverableHandler
	        }]
	    });
	    
		this.deliverableHolderPanel = new Ext.Panel({
			optionCount: 0,
	        layout: 'form',
	        hideBorders: true,
            bodyBorder: false,
            border: false,
	        bodyStyle: 'padding:0 10px 0;',
	        items: []
	    });

	    Ext.apply(this, {
            title: this.optionName ? "Option Deliverables: " + this.optionName : "Option Deliverables",
            anchor:'95%',
            closable:true,
            hideBorders: true,
            bodyBorder: false,
            border: false,
            //frame: true,
            bodyStyle: 'background:#D3E1F1;',
            defaults: {
	            bodyStyle: 'background:#D3E1F1;'
            },
            layout: 'form',
            items: [this.topPanel,this.deliverableHolderPanel]
		});
	    	
    	this.on('afterrender', function() {
	        eto.getDeliverableStore = new Ext.data.Store({
				id: 'getDeliverableStore',
				proxy: new Ext.data.HttpProxy({
					url: 'GetDeliverables.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"project_id": this.projectId, 'option_id': this.optionId}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total',
					id: 'deliverable_id'
				}, [
					{name: 'deliverable_id', type: "int", mapping: 'deliverable_id'},
					{name: 'ingredient_id', type: "int", mapping: 'ingredient_id'},
					{name: 'type', type: "string", mapping: 'type'},
					{name: 'comment', type: "string", mapping: 'comment'},
					{name: 'due', type: "string", mapping: 'due'},
					{name: 'requested', type: "date", mapping: 'requested'},
					{name: 'completed', type: "date", mapping: 'completed'}
				])
			});
			
			eto.getDeliverableStore.on('load', function() {
				eto.loadProject(eto);
			});
			
			//eto.getDeliverableStore.load();
		});
		
    	activateHandler = function(panel) {
	    	if(panel) {
		    	eto.onActivated(eto);
	    	}
		};
		this.on('activate', activateHandler, this);
		DeliverableFrame.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId,optId,optName) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.optionId = optId;
		this.projectId = optName;
		DeliverableFrame.superclass.constructor.call(this);
    },
    
    addNewDeliverable: function(record) {
		var eto = this;
		var newOption;
		if(record)
			newOption = new DeliverablePanel(this.tabContainer, this.projectId, record);
		else
			newOption = new DeliverablePanel(this.tabContainer, this.projectId);
    	newOption.on('deleteMe', function() {
	    	eto.deliverableHolderPanel.optionCount--;
	    	eto.deliverableHolderPanel.remove(newOption, true);
	    	if(eto.deliverableHolderPanel.optionCount == 1) {
		    	var DeliverablePanels = eto.deliverableHolderPanel.find('specialType','DeliverablePanel');
		    	/*for(var c = 0; c < DeliverablePanels.length; c++) {
			    	DeliverablePanels[c].nameField.hide();
		    	}*/
	    	}
	    	
		});
    	this.deliverableHolderPanel.add(newOption);
    	this.deliverableHolderPanel.optionCount++;
    	this.deliverableHolderPanel.doLayout();
	},
	
    onActivated: function() {
        this.getDeliverableStore.reload();
    },
    
    loadProject: function() {
		this.deliverableHolderPanel.removeAll(true);
	    for(var c = 0; c < this.getDeliverableStore.getCount(); c++) {
		    var record = this.getDeliverableStore.getAt(c);
		    this.addNewDeliverable(record);
	    }
	    this.doLayout();
    }
});

////////////******************************
////////////******************************

DeliverablePanel = Ext.extend(Ext.Panel, {
	tabContainer: '',
	projectId: '',
	ingredientId: '',
	deliverableId: '',
	typeValue: '',
	dueValue: '',
	requestedValue: '',
	completedValue: '',
	nameValue: '',
	commentValue: '',
	deliverableTypesStore: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
		
		deleteHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('deleteMe', eto);
	    	}
		};
    	this.deliverableTypesStore = new Ext.data.Store({
			id: 'deliverableTypesStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetDeliverableTypes.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'type', type: "string", mapping: 'type'},
				{name: 'description', type: "string", mapping: 'description'},
				{name: 'standard', type: "boolean", mapping: 'standard'}
			])
		});
		this.deliverableTypesStore.on('load', function(store) {
			store.sort("description", "ASC");
		});
		this.deliverableTypesStore.load();
		
    	this.typeCB = new Ext.form.ComboBox({
            width:210,
            fieldLabel: 'Type',
            store: this.deliverableTypesStore,
	        displayField:'description',
	        valueField: 'description',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        triggerAction: 'all',
	        emptyText:'deliverable type...',
	        selectOnFocus: true,
	        value: this.typeValue
		});
		
    	this.dueDF = new Ext.form.DateField({
    	    width: 210,
            format: 'Y/m/d',
	    	fieldLabel: 'Due',
	    	enableKeyEvents: true,
	    	validator: function(val) {
                return true;
            },
            // mad override
            validateValue : function(value){
		        return true;
		    },
		    setValue : function(date){
		        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(date));
		    },
	    	value: this.dueValue
    	});
    	
    	// no longer used
    	this.requestedDF = new Ext.form.DateField({
	        width: 210,
            format: 'Y/m/d',
	    	fieldLabel: 'Requested',
	    	value: this.requestedValue
    	});
    	
    	this.completedDF = new Ext.form.DateField({
	        width: 210,
            format: 'Y/m/d',
	    	fieldLabel: 'Completed',
	    	value: this.completedValue
    	});
	    
	    this.commentHE = new Ext.form.TextArea({
    		hideLabel: true,
    		//boxMaxHeight: 70,
    		//boxMinHeight: 200,
    		grow: true,
			growMin: 50,
			growMax: 150,
			growAppend: '',
			width: 500,
    		value: this.commentValue,
    		hideLabel: true
	    });
    	
		this.fieldContainer = new Ext.Container({
			layout: 'form',
			labelWidth: 70,
			style: 'padding: 5 25 5 5',
	        defaults: {
				xtype: 'button'
				
			},
	        items: [this.typeCB,this.dueDF,this.completedDF,{
		    	xtype: 'button',
                text: 'Delete',
                iconCls: 'remove',
                style: 'padding: 5; padding-left: 20;',
		    	handler: deleteHandler
	    	}]
    	});
    	
	    Ext.apply(this, {
		    bodyStyle: 'background:#D3E1F1;',
            labelWidth: 70,
            autoWidth: true,
            layout: 'column',
            hideBorders: false,
            bodyBorder: true,
            border: true,
            style: 'padding: 20;',
            items: [this.fieldContainer,{
                xtype:'fieldset',
                title: 'Comments / Description',
                layout: 'form',
            	border:true,
            	style: 'padding: 5',
                //bodyStyle:'padding:5px 5px 0',
    			width: 550,
    			height:'auto',
    			autoHeight: true,
    			boxMaxHeight: 100,
    			boxMinHeight: 230,
                items: [this.commentHE]
            }]
		});
	    	
    	this.on('afterrender', function() {
		});
		
    	this.addEvents('deleteMe');
    	
		DeliverablePanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId, record) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		if(record) {
			this.ingredientId = record.get('ingredient_id');
			this.deliverableId = record.get('deliverable_id');
			this.typeValue = record.get('type');
			this.dueValue = record.get('due');
			//this.requestedValue = record.get('requested');
			this.completedValue = record.get('completed');
			this.commentValue = record.get('comment');
		}
		DeliverablePanel.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var valueObject = new Object();
	    valueObject.deliverable_id = this.deliverableId;
	    valueObject.type = this.typeCB.getValue();
	    valueObject.comment = this.commentHE.getValue();
	    valueObject.due = this.dueDF.getRawValue();
	    //valueObject.requested = this.requestedDF.getValue();
	    valueObject.completed = this.completedDF.getValue();
	    return valueObject;
    },
    resetForm: function() {
	    //this.nameField.setValue('');
    }
    
});