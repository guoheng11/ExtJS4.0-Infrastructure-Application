AssumptionPanel = Ext.extend(Ext.Panel, {
	assessmentType: '',
	optionId: '',
	assessmentStore: '',
	summary: true,
	getAssumptionsStore: '',
	standardPanel: '',
	loadAllowed: false,

    initComponent:function() {
	    var eto = this;
	    
	    addHandler = function(button, event) {
	    	if(event) {
		    	var newNote = eto.createNote('',false,-1,1);
		    	//newNote.on('changed',eto.onReload(eto));
				eto.insert(1,newNote);
				eto.doLayout();
				newNote.submitInfo(newNote);
	    	}
		};
		this.getAssumptionsStore = new Ext.data.Store({
			id: 'getAssumptionsStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetAssumptions.ashx', // File to connect to
				method: 'GET'
			}),
			baseParams:{"option_id": eto.optionId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'assumption_id', type: "int", mapping: 'assumption_id'},
				{name: 'standard', type: "boolean", mapping: 'standard'},
				{name: 'order', type: "int", mapping: 'order'},
				{name: 'created_by', type: "string", mapping: 'created_by'},
				{name: 'text', type: "string", mapping: 'text'}
			]),
			sortInfo: {
				field: 'order',
				direction: "ASC"
			}
		});
		this.getAssumptionsStore.on('load', function(store,records,ops) {
			for(var count = 0; count < records.length; count++) {
				var note = eto.createNote(records[count].get('text'), records[count].get('standard'), records[count].get('assumption_id'), records[count].get('order'), records[count].get('created_by'));
				eto.add(note);
				if(eto.standardPanel instanceof Ext.Panel) {
					eto.standardPanel.hideYoKids(records[count].get('text'));
				}
			}
			eto.doLayout();
		});
			
	    Ext.apply(this, {
		    // TAB main
            title:'Assumptions (Saved Automatically)',
			frame: true,
			width: 600,
			//style: 'padding: 20 0',
			autoHeight: true,
			collapsible: true,
			layout: 'form',
	        items: [{
		        xtype: 'button',
		        iconCls:'add',
	            handler: addHandler,
	            style: 'padding-bottom: 10',
	            disabled: false,
	            text: 'Add a New Assumption'
            }]
		});
		this.on('afterrender', function() {
			eto.panelIsRendered = true;
			if(eto.loadAllowed) {
				eto.getAssumptionsStore.load();
			}
		});
    	AssumptionPanel.superclass.initComponent.call(this);
    },
    constructor: function(thisSpecialType, thisSpecialId) {
	    this.assessmentType = thisSpecialType;
	    this.optionId = thisSpecialId;
		AssumptionPanel.superclass.constructor.call(this);
    },
    loadAssumptions: function() {
	    this.loadAllowed = true;
	    if(this.panelIsRendered) {
		    this.getAssumptionsStore.load();
	    }
    },
    onReload: function() {
	    if(this.items.length > 0) {
	    	this.removeAll(true);
    	}
	    var eto = this;
	    addHandler = function(button, event) {
	    	if(event) {
		    	var newNote = eto.createNote('',false,-1,1);
		    	//newNote.on('changed',eto.onReload(eto));
				eto.insert(1,newNote);
				eto.doLayout();
				newNote.submitInfo(newNote);
	    	}
		};
	    this.add(new Ext.Button({
            iconCls:'add',
            handler: addHandler,
            style: 'padding-bottom: 10',
            disabled: false,
            text: 'Add a New Assumption'
        }));
        this.getAssumptionsStore.reload();
        this.doLayout();
    },
	createNote: function(text,standard,myid, order, createdBy) {
		var eto = this;
		var newNote = new AssumptionContainer(this.optionId,text,standard,myid,order,createdBy);
		newNote.on('up', function() {
		    eto.moveUp(newNote, eto);
	    });
	    newNote.on('down', function() {
		    eto.moveDown(newNote, eto);
	    });
	    newNote.on('top', function() {
		    eto.moveTop(newNote, eto);
	    });
	    newNote.on('bottom', function() {
		    eto.moveBottom(newNote, eto);
	    });
		return newNote;
	},
	setStandardPanel: function(standardPanel) {
		this.standardPanel = standardPanel;
	},
	setStore: function(store) {
	    this.assessmentStore = store;
	    this.loadRecord();
    },
    addPreset: function(text) {
	    var createdBy = "Unknown";
	    if(userObject) {
		    if(userObject.name) {
			    createdBy = userObject.name;
		    }
	    }
	    var note = this.createNote(text,false,-1,1,createdBy);
	    this.insert(1, note);
		this.doLayout();
		note.submitInfo(note);
		if(this.standardPanel instanceof Ext.Panel) {
			this.standardPanel.hideYoKids(text);
		}
	},
	    
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	
    	// Assumptions
    	var encodedAssumptions = new Array();
    	var assumptionContainers = this.find('myType','AssumptionContainer');
    	for(var c = 0; c < assumptionContainers.length; c++) {
	    	encodedAssumptions[c] = assumptionContainers[c].getValueObject();
		}
    	objectToSend.assumptions = Ext.encode(encodedAssumptions);
    	return objectToSend;
	},
	moveUp: function(newNote) {
		var currentPosition = -1;
		for(var c = 0; c < this.items.length; c++) {
			if(this.get(c) == newNote) {
				currentPosition = c;
			}
		}
		if(currentPosition > 1) {
			var noteAffected = this.get(currentPosition-1);
			var oldOrder = newNote.order;
			var deepCopyNote = this.createNote(newNote.getText(newNote), newNote.getStandard(newNote), newNote.getMyId(newNote), noteAffected.order, newNote.getCreatedBy(newNote));
			this.remove(newNote,true);
			this.insert(currentPosition-1, deepCopyNote);
			noteAffected.order = oldOrder;
			this.doLayout();
			deepCopyNote.submitInfo(deepCopyNote);
		}
	},
	moveDown: function(newNote) {
		var currentPosition = -1;
		for(var c = 0; c < this.items.length; c++) {
			if(this.get(c) == newNote) {
				currentPosition = c;
			}
		}
		if(currentPosition < this.items.length-1) {
			var noteAffected = this.get(currentPosition+1);
			var oldOrder = newNote.order;
			var deepCopyNote = this.createNote(newNote.getText(newNote), newNote.getStandard(newNote), newNote.getMyId(newNote), noteAffected.order, newNote.getCreatedBy(newNote));
			this.remove(newNote,true);
			this.insert(currentPosition+1, deepCopyNote);
			this.doLayout();
			deepCopyNote.submitInfo(deepCopyNote);
		}
	},
	moveTop: function(newNote) {
		var currentPosition = -1;
		for(var c = 0; c < this.items.length; c++) {
			if(this.get(c) == newNote) {
				currentPosition = c;
			}
		}
		if(currentPosition > 1) {
			var deepCopyNote = this.createNote(newNote.getText(newNote), newNote.getStandard(newNote), newNote.getMyId(newNote), 1, newNote.getCreatedBy(newNote));
			this.remove(newNote,true);
			this.insert(1, deepCopyNote);
			this.doLayout();
			deepCopyNote.submitInfo(deepCopyNote);
		}
	},
	moveBottom: function(newNote) {
		var currentPosition = -1;
		for(var c = 0; c < this.items.length; c++) {
			if(this.get(c) == newNote) {
				currentPosition = c;
			}
		}
		if(currentPosition < this.items.length) {
			var noteAffected = this.get(this.items.length-1);
			var deepCopyNote = this.createNote(newNote.getText(newNote), newNote.getStandard(newNote), newNote.getMyId(newNote), noteAffected.order+1,newNote.getCreatedBy(newNote));
			this.remove(newNote,true);
			this.add(deepCopyNote);
			this.doLayout();
			deepCopyNote.submitInfo(deepCopyNote);
		}
	},
	getNoteOrder: function(note) {
		for(var c = 0; c < this.items.length; c++) {
			if(this.get(c) == note) {
				return c;
			}
		}
		return -1;
	},
	updateOrders: function(orderArray) {
		orderSorter = function(obj1, obj2) {
			return obj1.order - obj2.order;
		};
		orderArray.sort(orderSorter); 
		var reloadThis = false;
		for(var count = 0; count < orderArray.length; count++) {
			var assumption = this.get(count+1);
			if(assumption.getMyId(assumption) != orderArray[count].assumption_id) {
				reloadThis = true;
			}
			assumption.order = orderArray[count].order;
			//debug assumption.updateOrderLabel(assumption);
		}
		if(reloadThis) {
			Ext.Msg.alert('Warning', 'Detected an error with assumption orders. Reloading all assumptions from the database.');
			this.onReload();
		}
	},
	removedThisOne: function(text) {
		if(this.standardPanel instanceof Ext.Panel) {
			this.standardPanel.unhideYoKids(text);
		}
	}
});