NoteSetPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	notesType: '', // 1D array used for most purposes
	notesType2D: '', // 2D array used in combobox's store
	getNotesStore: '',
	notesTypeString: '',

    initComponent:function() {
	    var eto = this;
	    var encodedType = '';
	    if(this.notesType instanceof Array) {
		    encodedType = Ext.encode(this.notesType);
	    }
	    this.getNotesStore = new Ext.data.Store({
			id: 'getNotesStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetNotes.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId, "ifq_notes": true, 'type': encodedType}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'note_id'
			}, [
				{name: 'note_id', type: "int", mapping: 'note_id'},
				{name: 'made', mapping: 'made'},
				{name: 'made_by', type: "string", mapping: 'made_by'},
				{name: 'text', type: "string", mapping: 'text'},
				{name: 'read_only', type: "boolean", mapping: 'read_only'},
				{name: 'type', type: "string", mapping: 'type'},
				{name: 'changed', mapping: 'changed'},
				{name: 'project_id', type: "int", mapping: 'project_id'}
			])
		});
		
		this.getNotesStore.on('load', function() {
			eto.removeAllNotes();
			var count = eto.getNotesStore.getTotalCount(); 
			if(count < 1) {
			} else {
				for(var c = 0; c < count; c++) {
					var rec = eto.getNotesStore.getAt(c);
					if(rec instanceof Ext.data.Record) {
						var newNote = new NoteContainer(eto.projectId, rec.get('note_id'), eto.notesType2D, rec.get('type'), rec.get('made'), rec.get('changed'), rec.get('made_by'), rec.get('text'), rec.get('read_only'));
						//newNote.on('changed',eto.onReload(eto));
						eto.add(newNote);
					}
				}
				eto.doLayout();
			}
		});
		
	    addHandler = function(button, event) {
	    	if(event) {
		    	
		    	var newNote = new NoteContainer(eto.projectId,'', eto.notesType2D);
		    	//newNote.on('changed',eto.onReload(eto));
				eto.insert(1,newNote);
				eto.doLayout();
	    	}
		};
		
	    Ext.apply(this, {
		    // TAB main
            title: this.notesTypeString+' Notes',
			frame: true,
			width: 600,
			style: 'padding-top: 20',
			autoHeight: true,
			collapsible: true,
	        items: [{
		        xtype: 'button',
		        iconCls:'add',
	            handler: addHandler,
	            style: 'padding-bottom: 10',
	            disabled: false,
	            text: 'Add a New Note'
            }]
		});

		if(this.notesType == "") {
			collapseHandler = function(panel, animate) {
				eto.getNotesStore.load();				
			}
			expandHandler = function(panel, animate) {
				panel.doLayout();
			}
			this.collapsed = true;
			this.on('expand', collapseHandler);
			//this.on('expand', expandHandler);
		} else {
			this.getNotesStore.load();
		}
		
    	NoteSetPanel.superclass.initComponent.call(this);
    },
    constructor: function(projId, type1, config) {
	    Ext.apply(this, config);
	    this.notesType2D = new Array();
	    if(type1 instanceof Array) {
		    for(var c = 0; c < type1.length; c++) {
			    this.notesTypeString = this.notesTypeString + type1[c] + ' ';
			    this.notesType2D[c] = new Array();
			    this.notesType2D[c].push(type1[c]);
		    }
	    } else {
		    this.notesTypeString = 'RFQ Project';
	    }
	    this.projectId = projId;
	    this.notesType = type1;
		NoteSetPanel.superclass.constructor.call(this);
    },
    onReload1: function() {
	    if(this.items.length > 0) {
	    	this.removeAll(true);
    	}
	    var eto = this;
	    addHandler = function(button, event) {
	    	if(event) {
		    	var newNote = new NoteContainer(eto.projectId,'',eto.notesType2D);
		    	//newNote.on('changed',eto.onReload(eto));
				eto.insert(1,newNote);
				eto.doLayout();
	    	}
		};
	    this.add(new Ext.Button({
            iconCls:'add',
            handler: addHandler,
            style: 'padding-bottom: 10',
            disabled: false,
            text: 'Add a New Note'
        }));
        this.contactNoteStore.reload();
        this.doLayout();
    },
    removeAllNotes: function() {
	    var noteArray = this.findBy(function(obj) {
		    if(obj.noteField) {
			    return true;
		    } else {
			    return false;
		    }
	    });
	    for(var a = 0; a < noteArray.length; a++) {
		    this.remove(noteArray[a]);
	    }
    }
});

NoteContainer = Ext.extend(Ext.form.FieldSet, {
	allowedNoteType: '',
	projectId: '',
	noteId: '',
	noteType: '',
	madeDate: '',
	changedDate: '',
	madeBy: '',
	text: '',
	textArea: '',
	submitButton: '',
	readOnly: true,
	noteTypeCombo: '',
	
	initComponent:function() {
		var eto = this;
		removeHandler = function(button, event) {
	    	if(event) {
		    	eto.onRemoval(eto);
	    	}
		};
		submitHandler = function(button, event) {
	    	if(event) {
		    	//eto.onSubmission(eto);
	    	}
		};
		
		this.textArea = new Ext.form.TextArea({
            style: 'padding-top: 5',
            grow: true,
            growMin: 30,
            width: 500,
            //autoHeight: true,
            disabled: this.readOnly,
            enableKeyEvents: true,
            value: this.text
    	});
    	
    	obamaHandler = function(field, newVal, oldVal) {
		   	eto.onSubmission(eto);
		};
		
		slightChangeHandler = function(field, event) {
			if(event) {
		   		eto.submitButton.enable();
	   		}
		};
		
		noChangeHandler = function(field) {
		   	eto.submitButton.disable();
		};
		
    	this.textArea.on('change', obamaHandler);
    	this.textArea.on('keyup', slightChangeHandler);
    	
    	this.submitButton = new Ext.Button({
            itemId:'submitButton',
            iconCls:'submit',
            tooltip: 'Save Note',
            style: 'padding-left: 5',
            handler: submitHandler,
            
            disabled: true
    	});
    	var noteTypeStore = new Ext.data.SimpleStore({
		    fields: ['type'],
		    data : this.allowedNoteType
		});
		this.noteTypeCombo = new Ext.form.ComboBox({
            width:200,
            fieldLabel: '<b>Type</b>',
            itemId: 'noteTypeField',
            store: noteTypeStore,
	        displayField:'type',
	        valueField: 'type',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'choose type...',
	        selectOnFocus:true,
	        value: this.noteType
        });
        
        this.noteTypeCombo.on('change', obamaHandler);
        this.noteTypeCombo.on('select', slightChangeHandler);
        this.noteTypeCombo.on('blur', noChangeHandler);
        
	    Ext.apply(this, {
            //bodyStyle: 'padding:5 5;',
            layout: 'form',
            noteField: true,
            defaults: {
	            //style: 'padding: 10;'
            },
        	items: [{
	        	layout: 'table',
	        	layoutConfig: {
			        columns: 2
			    },
	        	width: 550,
	        	
	        	style: 'padding-bottom: 5;',
	        	items: [{
		        	items: [{
		                xtype: 'displayfield',
		                itemId: 'madeByField',
		                fieldClass: 'x-form-item',
		                value: '<b>Created By:</b> '+this.madeBy
		            }]
	            },{
		            style: 'padding-left: 25',
		        	items: [{
		                xtype: 'displayfield',
		                itemId: 'madeDateField',
		                fieldClass: 'x-form-item',
		                value: '<b>Created On:</b> '+this.madeDate
		            }]
	            },{
		            layout: 'form',
		            labelWidth: 30,
		        	items: [this.noteTypeCombo]
	            },{
		            style: 'padding-left: 25',
		        	items: [{
		                xtype: 'displayfield',
		                itemId: 'changedDateField',
		                fieldClass: 'x-form-item',
		                value: '<b>Changed On:</b> '+this.changedDate
		            }]
	            }]
            },{
	        	layout: 'column',
	        	autoHeight: true,
	        	items: [{
		        	column: 0.99,
		        	items: [this.textArea]
	            },{
		        	column: 21,
		        	items: [{
		                layout: 'form',
		                items: [this.submitButton,{
			                xtype: 'button',
			                itemId:'removeButton',
				            iconCls:'remove',
				            tooltip: 'Delete Note',
				            style: 'padding-left: 5',
				            handler: removeHandler,
				            disabled: this.readOnly
			        	}]
		        	}]
	        	}]
        	}]
		});
	    this.addEvents('changed');

    	NoteContainer.superclass.initComponent.call(this);
    },
    constructor: function(projId, thisNoteId, allowedTypes, thisNoteType, thisMadeDate, thisChangedDate, thisMadeBy, thisText, thisReadOnly) {
	    var eto = this;
	    if(allowedTypes instanceof Array) {
		    if(allowedTypes.length == 0) {
			    this.allowedNoteType = Cookbook.noteTypeArray;
		    } else {
		    	this.allowedNoteType = allowedTypes;
	    	}
    	} else {
	    	if(allowedTypes == '') {
		    	this.allowedNoteType = Cookbook.noteTypeArray;
		    } else {
		    	this.allowedNoteType = allowedTypes;
	    	}
    	}
	    this.projectId = projId;
	    if(thisNoteId) {
	    	this.noteId = thisNoteId;
	    	this.readOnly = thisReadOnly;
    	} else {
	    	this.readOnly = false;
    	}
    	if(thisMadeDate instanceof Date) {
	    	this.madeDate = thisMadeDate.format('m/j/Y H:i:s');
    	}
    	if(thisChangedDate instanceof Date) {
	    	this.changedDate = thisChangedDate.format('m/j/Y H:i:s');
    	}
    	if(thisNoteType) {
    		this.noteType = thisNoteType;
		} else {
			this.noteType = this.allowedNoteType[0][0];
		}
    	if(thisMadeBy) 
    		this.madeBy = thisMadeBy;
    	if(thisText)
    		this.text = thisText;
		NoteContainer.superclass.constructor.call(this);
    },
    onSubmission: function() {
	    var eto = this;
	    if(this.noteId) {
		    var conn = new Ext.data.Connection();
			conn.request({
			    url: 'UpdateNote.ashx',
			    method: 'POST',
			    params: {"note_id": eto.noteId,"text": eto.textArea.getValue(), "type": eto.noteTypeCombo.getValue()},
			    failure: function() {
			        Ext.Msg.alert('Note was not saved', 'Server Error: Failed Submission Request.');
			    },
			    success: function(response, opts) {
				    var jsonResponse = Ext.util.JSON.decode(response.responseText);
				    if(jsonResponse.success != null) {
				    	if(jsonResponse.success) {
					    	eto.submitButton.disable();
			    		} else if(!jsonResponse.success) {
					    	Ext.Msg.alert('Edit Failed', 'Note was not saved. May be you do not have permissions to do it?');
			    		}
					} else {
			    		Ext.Msg.alert('Error', 'Edit Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
		    		}
			    }
			});
	    } else {
		    var conn = new Ext.data.Connection();
		    var scriptName = '';
		    var parameterObject = new Object();
		    parameterObject.text = eto.textArea.getValue();
		    parameterObject.project_id = eto.projectId;
		    parameterObject.type = eto.noteTypeCombo.getValue();
			conn.request({
			    url: 'UpdateNote.ashx',
			    method: 'POST',
			    params: parameterObject,
			    failure: function() {
			        Ext.Msg.alert('Note was not added', 'Server Error: Failed Submission Request.');
			    },
			    success: function(response, opts) {
				    var jsonResponse = Ext.util.JSON.decode(response.responseText);
				    if(jsonResponse.success != null) {
				    	if(jsonResponse.success) {
							if(jsonResponse.rows[0].note_id) {
								eto.noteId = jsonResponse.rows[0].note_id;
								eto.reloadMe();
								eto.submitButton.disable();
							}
			    		} else if(!jsonResponse.success) {
					    	Ext.Msg.alert('Adding Failed', 'Note was not added. May be you do not have permissions to do it?');
			    		}
					} else {
			    		Ext.Msg.alert('Error', 'Adding Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
		    		}
			    }
			});
		}
		//this.fireEvent('changed', this);
		//this.ownerCt.onReload(this.ownerCt);
    },
    onRemoval: function() {
	    var eto = this;
	    if(this.noteId) {
		    Ext.MessageBox.confirm('Delete Note?', 'Are you sure you want to delete this note?', function(btn) {
	        	if(btn == "yes") {
					var conn = new Ext.data.Connection();
					conn.request({
					    url: 'DeleteNote.ashx',
					    method: 'POST',
					    params: {"note_id": eto.noteId},
					    failure: function() {
					        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
					    },
					    success: function(response, opts) {
						    var jsonResponse = Ext.util.JSON.decode(response.responseText);
						    if(jsonResponse.success != null) {
						    	if(jsonResponse.success) {
							    	eto.ownerCt.remove(eto);
					    		} else if(!jsonResponse.success) {
							    	if(jsonResponse.rows) {
							    		Ext.Msg.alert('Removal Failed', 'Note was not removed. May be you do not have permissions to do it.');
						    		}
					    		}
							} else {
					    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
				    		}
					    }
					});
					//eto.fireEvent('changed', eto);
					//eto.ownerCt.onReload(eto.ownerCt);
					
	        	}
	    	});
    	} else {
	    	eto.ownerCt.remove(eto);
    	}
    },
    
    reloadMe: function() {
	    var eto = this;
	    var contactNoteStore = new Ext.data.Store({
			id: 'contactNoteStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetNotes.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"note_id": this.noteId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'note_id'
			}, [
				{name: 'note_id', type: "int", mapping: 'note_id'},
				{name: 'made', mapping: 'made'},
				{name: 'made_by', type: "string", mapping: 'made_by'},
				{name: 'text', type: "string", mapping: 'text'},
				{name: 'read_only', type: "boolean", mapping: 'read_only'},
				{name: 'type', type: "string", mapping: 'type'},
				{name: 'changed', mapping: 'changed'},
				{name: 'project_id', type: "int", mapping: 'project_id'}
			])
		});
		
		contactNoteStore.on('load', function() {
			var count = contactNoteStore.getTotalCount(); 
			if(count < 1) {
			} else {
				var rec = contactNoteStore.getAt(0);
				if(rec instanceof Ext.data.Record) {
					// made by
					eto.madeBy = rec.get('made_by');
					var findArr = eto.find('itemId', 'madeByField');
					if(findArr.length > 0) {
						findArr[0].setValue('<b>Created By:</b> '+eto.madeBy);
					}
					// made
					var date = rec.get('made');
					if(date instanceof Date) {
				    	eto.madeDate = date.format('m/j/Y H:i:s');
			    	}
					findArr = eto.find('itemId', 'madeDateField');
					if(findArr.length > 0) {
						findArr[0].setValue('<b>Created On:</b> '+eto.madeDate);
					}
					// changed
					date = rec.get('changed');
					if(date instanceof Date) {
				    	eto.changedDate = date.format('m/j/Y H:i:s');
			    	}
					findArr = eto.find('itemId', 'changedDateField');
					if(findArr.length > 0) {
						findArr[0].setValue('<b>Changed On:</b> '+eto.changedDate);
					}
					
					// type
					eto.noteType = rec.get('type');
					eto.noteTypeCombo.setValue(eto.noteType);
				}
				eto.doLayout();
			}
		});
		
		contactNoteStore.load();
	}
});