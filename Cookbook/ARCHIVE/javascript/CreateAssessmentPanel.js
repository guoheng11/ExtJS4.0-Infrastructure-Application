CreateAssessmentPanel = Ext.extend(Ext.Panel, {
	optionId: '',
	assessmentType: '',
	localGrid: '',
	assessmentStore: '',
	
    initComponent:function() {
	    
	    var eto = this;
	    
		function extractPrimary(emailObject) {
			var returnString = '';
			if(emailObject) {
				if(emailObject.email) {
					returnString = emailObject.email;
	    		} else {
		    		returnString = emailObject;
	    		}
    		}
    		return returnString;
		}
		
		var fields = [
		   {name: 'contact_name', mapping : 'contact_name'},
		   {name: 'primary_type', mapping : 'primary_type'},
		   {name: 'primary_email', mapping : 'primary_email'},
		   {name: 'contact_id', mapping : 'contact_id'}
		];
		
		var localGridStore = new Ext.data.JsonStore({
	        fields : fields,
			root   : 'records'
	    });
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    sm1.on('rowselect', function() {
		    eto.deleteButton.enable();
	    });
	    sm1.on('rowdeselect', function() {
		    eto.deleteButton.disable();
	    });
	    this.deleteButton = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected Contact From the List',
            iconCls:'remove',
            handler: function() {
	            var selectedRecord = eto.localGrid.getSelectionModel().getSelected();
	    		eto.localGrid.getStore().remove(selectedRecord);
	    		eto.deleteButton.disable();
    		},
            disabled:true
        });
		this.localGrid = new Ext.grid.GridPanel({
			ddGroup          : 'contactDD',
	        store            : localGridStore,
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					sortable: true
				},
				columns: [
		            { id : 'contact_name', header: "Contact Name", width: 190, dataIndex: 'contact_name'},
					{header: "Type", width: 100, dataIndex: 'primary_type'},
					{header: "Primary Email", renderer: extractPrimary, width: 130,dataIndex: 'primary_email'}
	        	]
			}),
			sm: sm1,
			enableDragDrop   : true,
	        stripeRows       : true,
	        width            : 550,
	        //autoHeight       : true,
	        height           : 150,
	        border           : false,
	        bbar: [this.deleteButton],
	        cls            : 'padded-grid',
	        title            : 'Who is doing the assessment? (Drag and Drop from Contacts Panel)'
	    });
	    
	    var ccGridStore = new Ext.data.JsonStore({
	        fields : fields,
			root   : 'records'
	    });
	    var sm2 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    sm2.on('rowselect', function() {
		    eto.deleteButtonCC.enable();
	    });
	    sm2.on('rowdeselect', function() {
		    eto.deleteButtonCC.disable();
	    });
	    this.deleteButtonCC = new Ext.Button({
	        text:'Delete',
            tooltip:'Delete Selected Contact From the List',
            iconCls:'remove',
            handler: function() {
	            var selectedRecord = eto.ccGrid.getSelectionModel().getSelected();
	    		eto.ccGrid.getStore().remove(selectedRecord);
	    		eto.deleteButtonCC.disable();
    		},
            disabled:true
        });
        
    
	    this.ccGrid = new Ext.grid.GridPanel({
			ddGroup          : 'contactDD',
	        store            : ccGridStore,
	        cm: new Ext.grid.ColumnModel({
				defaults: {
					sortable: true
				},
				columns: [
		            { id : 'contact_name', header: "Contact Name", width: 190, dataIndex: 'contact_name'},
					{header: "Type", width: 100, dataIndex: 'primary_type'},
					{header: "Primary Email", renderer: extractPrimary, width: 130,dataIndex: 'primary_email'}
	        	]
			}),
			sm: sm2,
			enableDragDrop   : true,
	        stripeRows       : true,
	        width            : 550,
	        //autoHeight       : true,
	        height           : 150,
	        border           : false,
	        bbar: [this.deleteButtonCC],
	        cls            : 'padded-grid',
	        title            : 'People to copy on the request email (Drag and Drop from Contacts Panel)'
	    });
	    
	    var hideCCOPS = true;
	    if(this.assessmentType == 'SWD') {
		    hideCCOPS = false;
	    }
	    this.ccOpsCB = new Ext.form.Checkbox({
		    checked: true,
		    hidden: hideCCOPS,
            boxLabel: 'Copy OPS'
        });		    
	    
		Ext.apply(this, {
	        frame: true,
	        collapsible: true,
	        title:'Request Assessment Form',
	        labelWidth: 70,
	        width: 600,
	        style: 'padding: 10px',
	        items: [this.localGrid,this.ccGrid,{
		        xtype: 'displayfield',
		        value: 'Assessment Description:',
		        style: 'padding: 10 0 5 0'
	        },{
                xtype: 'textarea',
                width: 550,
                allowBlank: false,
                name: 'description',
                inputValue: 'true'
         	},{
                xtype: 'hidden',
                name: 'option_id',
                value: this.optionId
            },{
                xtype: 'hidden',
                name: 'assessment_type',
                value: this.assessmentType
            },this.ccOpsCB]
	    });
	    
    	this.localGrid.on('afterrender', function() {
	    	eto.gridLoaded = true;
	    	//DND STUFF 
			// used to add records to the destination stores
			var blankRecord =  Ext.data.Record.create(fields);
			var thisElement = this;
			var formPanelDropTargetEl = this.getEl();
			
			// This will make sure we only drop to the view container
			var secondGridDropTargetEl = this.getView().el.dom.childNodes[0].childNodes[1];
			
			var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
				ddGroup    : 'contactDD',
				copy       : true,
				/*notifyEnter : function(ddSource, e, data) {
					thisElement.addClass('dragHighlight');
					//thisElement.removeClass('dragHighlight');
				},
				notifyOut : function(ddSource, e, data) {
					thisElement.removeClass('dragHighlight');
				},*/
				notifyDrop : function(ddSource, e, data){
					
					// Generic function to add records.
					function addRow(record, index, allItems) {
						
						// Search for duplicates
						var foundItem = localGridStore.find('contact_name', record.data.contact_name);
						// if not found
						if (foundItem  == -1) {
							localGridStore.add(record);
							// Call a sort dynamically
							localGridStore.sort('name', 'ASC');
						}
					}
					// Loop through the selections
					Ext.each(ddSource.dragData.selections ,addRow);
					return(true);
				}
			});
			if(eto.assessmentStore) {
				eto.loadRecord(eto);
			}
		});
		
		this.ccGrid.on('afterrender', function() {
			var blankRecord =  Ext.data.Record.create(fields);
			var thisElement = this;
			var formPanelDropTargetEl = this.getEl();
			
			// This will make sure we only drop to the view container
			var secondGridDropTargetEl = this.getView().el.dom.childNodes[0].childNodes[1];
			
			var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
				ddGroup    : 'contactDD',
				copy       : true,
				notifyDrop : function(ddSource, e, data){
					function addRow(record, index, allItems) {
						// Search for duplicates
						var foundItem = ccGridStore.find('contact_name', record.data.contact_name);
						// if not found
						if (foundItem  == -1) {
							ccGridStore.add(record);
							// Call a sort dynamically
							ccGridStore.sort('name', 'ASC');
						}
					}
					// Loop through the selections
					Ext.each(ddSource.dragData.selections ,addRow);
					return(true);
				}
			});
		});
    	
		CreateAssessmentPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(projId,assType) {
		this.optionId = projId;
		this.assessmentType = assType;
		CreateAssessmentPanel.superclass.constructor.call(this);
    },
    loadRecord: function() {
	    var count = this.assessmentStore.getCount();
	    if(count > 0) {
		    this.ccOpsCB.hide();
		    var rec = this.assessmentStore.getAt(0);
		    // description
		    var foundObjects = this.find('name','description');
		    if(foundObjects.length > 0) {
			    foundObjects[0].setValue(rec.get('description'));
		    }
		    
		    // contacts
		    if(this.localGrid.getStore()) {
		    	this.localGrid.getStore().removeAll();
	    	}
		    var recordArray = new Array();
		    var contactArray = rec.get('contacts');
		    var ContactRecord = Ext.data.Record.create([
		    	{name: 'contact_name', mapping : 'contact_name'},
				{name: 'primary_type', mapping : 'primary_type'},
				{name: 'primary_email', mapping : 'primary_email'},
				{name: 'contact_id', mapping : 'contact_id'}
			]);
			
		    if(contactArray instanceof Array) {
			    for(var c = 0; c < contactArray.length; c++) {
				    var objToPass = contactArray[c];
				    var obb = contactArray[c];
				    recordArray[c] = new Ext.data.Record(contactArray[c]);
			    }
		    }
		    this.localGrid.getStore().add(recordArray);
		    
		    // cc contacts
		    /*
		    if(this.ccGrid.getStore()) {
		    	this.ccGrid.getStore().removeAll();
	    	}
		    var recordArrayCC = new Array();
		    var contactArrayCC = rec.get('contacts');
		    var ContactRecord = Ext.data.Record.create([
		    	{name: 'contact_name', mapping : 'contact_name'},
				{name: 'primary_type', mapping : 'primary_type'},
				{name: 'primary_email', mapping : 'primary_email'},
				{name: 'contact_id', mapping : 'contact_id'}
			]);
			
		    if(contactArray instanceof Array) {
			    for(var c = 0; c < contactArray.length; c++) {
				    var objToPass = contactArray[c];
				    var obb = contactArray[c];
				    recordArray[c] = new Ext.data.Record(contactArray[c]);
			    }
		    }
		    this.localGrid.getStore().add(recordArray);*/
	    }
    },
    setStore: function(store) {
	    this.assessmentStore = store;
	    if(this.gridLoaded) {
	    	this.loadRecord(this);
    	}
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    // Description
	    var foundObjects = this.find('name','description');
	    if(foundObjects.length > 0) {
	    	objectToSend.description = foundObjects[0].getValue();
    	}
    	
    	// Project ID
    	foundObjects = this.find('name','option_id');
	    if(foundObjects.length > 0) {
	    	objectToSend.option_id = foundObjects[0].getValue();
    	}
    	
    	// Assessment Type
    	foundObjects = this.find('name','assessment_type');
	    if(foundObjects.length > 0) {
	    	objectToSend.assessment_type = foundObjects[0].getValue();
    	}
    	
    	// Project ID
    	var encodedContacts = new Array();
    	var count = this.localGrid.getStore().getCount();
    	for(var c = 0; c < count; c++) {
	    	var rec = this.localGrid.getStore().getAt(c);
	    	var tempObj = new Object();
	    	tempObj.contact_id = rec.get('contact_id');
	    	encodedContacts[c] =tempObj;
    	}
    	objectToSend.contacts = Ext.encode(encodedContacts);
    	
    	var ccString = "";
    	for(var c = 0; c < this.ccGrid.getStore().getCount(); c++) {
	    	var rec = this.ccGrid.getStore().getAt(c);
	    	if(ccString) {
		    	ccString = ccString + "," + rec.get('contact_id');
	    	} else {
		    	ccString = "" + rec.get('contact_id');
	    	}
    	}    	
    	objectToSend.cclist = ccString;
    	objectToSend.ccops = false;
    	if(this.ccOpsCB.isVisible() && this.ccOpsCB.getValue()) {
	    	objectToSend.ccops = true;
    	}
    	
    	return objectToSend;
	}
});