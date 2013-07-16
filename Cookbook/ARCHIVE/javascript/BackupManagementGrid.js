BackupManagementGrid = Ext.extend(Ext.grid.GridPanel, {
	
    initComponent:function() {
	    var eto = this;
		myBackupHandler  = function(button, event) {
		    if(event) {
			    eto.tabPanel.openNewTab("BackupUpdatePanel", store);
		    }
	    }
	    var store = new Ext.data.GroupingStore({
		    proxy: new Ext.data.HttpProxy({
				url: 'GetBackups.ashx', // File to connect to
				method: 'GET'
			}),
	        reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'username', type: "string", mapping: 'username'},
				{name: 'contact_id', type: "int", mapping: 'contact_id'},
				{name: 'primary_type', type: "string", mapping : 'primary_type'},
				{name: 'contact_email', type: "string", mapping: 'contact_email'},
				{name: 'contact_name', type: "string", mapping: 'contact_name'}
			]),
	        groupField:'username'
	    });
	    //store.load();
	    var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
	    
	    Ext.apply(this, {
		    title: 'Backup Management',
		    store: store,
		    sm: sm1,
	        columns: [
	            {id:'username',header: "User", width: 40, hidden: true, sortable: true, dataIndex: 'username'},
	            {header: "Backup Name", width: 30, sortable: true, dataIndex: 'contact_name'},
	            {header: "Backup Email", width: 30, sortable: true, dataIndex: 'contact_email'}
	        ],
	
	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Backups" : "Backup"]})'
	        }),
	        animCollapse: false,
	        tbar: [{
		        text:'My Backups',
	            tooltip:'Modify My Backups',
	            iconCls:'tools',
	            //ownerCt: this,
	            handler: myBackupHandler
	        },{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}]
		});
		this.on('activate', function() {
			store.reload();
		});
	    
    	BackupManagementGrid.superclass.initComponent.call(this);
    },
    constructor: function(tabPanel) {
	    this.tabPanel = tabPanel;
        BackupManagementGrid.superclass.constructor.call(this);
    }
});

BackupUpdatePanel = Ext.extend(Ext.Panel, {
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
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
        
        submitHandler = function(button, event) {
	    	if(event) {
		    	eto.onPageSubmit(eto);
	    	}
		};
		this.saveButton = new Ext.Button({
            text: 'Save',
            handler: submitHandler,
            iconCls: 'save'
        });
        
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
	        width: 600,
	        //autoHeight       : true,
	        height           : 200,
	        bbar: [this.deleteButton, this.saveButton],
	        //tbar: [],
	        title            : 'Who is backing you up? (Drag and Drop from Contacts Panel)'
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
			
			if(eto.backupStore instanceof Ext.data.Store) {
				var gridStore = eto.localGrid.getStore();
				for(var c = 0; c < eto.backupStore.getCount(); c++) {
			    	var rec = eto.backupStore.getAt(c);
			    	if(rec.get('username') == userObject.login) {
				    	var defaultData = {
		                    contact_name: rec.get('contact_name'),
		                    primary_type: rec.get('primary_type'),
		                    primary_email: rec.get('contact_email'),
		                    contact_id: rec.get('contact_id')
		                };
		                var p = new gridStore.recordType(defaultData); // create new record
		                gridStore.add(p); // insert a new record into the store (also see add)
			    	}
		    	}
			}
		});
		this.contactPanel = new ContactGrid(this.tabContainer,{
		    enableDragDrop: true,
		    rowspan: 2,
		    width: 600,
		    listeners: {
			    'afterrender': function() {
				    this.store.load();
			    }
		    },
		    ddGroup:'contactDD'
		});
        
	    Ext.apply(this, {
		    // TAB main
            title: "My Backups",
            //frame: true,
            anchor:'95%',
            bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            closable:true,
            layout: 'table',
            defaults: {
	            style:'padding:10px'
            },
            layoutConfig: {
			    columns: 1
			},
            items: [
            	this.localGrid,
            	this.contactPanel
	        ]
		});
		this.forceClose = false;
		/*this.mainFormPanel.on('contentLoaded', function() {
			eto.originalValue = eto.mainFormPanel.getValueObject();
		});*/
		
    	this.on('beforeclose', function() {
	    	/*if(!this.forceClose) {
		    	var newValue = eto.mainFormPanel.getValueObject();
		    	var str1 = Ext.encode(eto.originalValue);
		    	var str2 = Ext.encode(newValue);
		    	if(str1 != str2) {
			    	// lol stole it from example
					Ext.Msg.show({
					   title:'Save Changes?',
					   msg: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
					   buttons: Ext.Msg.YESNOCANCEL,
					   fn: function(buttonId) {
						   if(buttonId == "yes") {
							   eto.forceClose = true;
							   eto.onPageSubmit(true);
						   } else if(buttonId == "no") {
							   eto.forceClose = true;
							   eto.tabContainer.remove(eto);
						   }
					   }, 
					   icon: Ext.MessageBox.QUESTION
					});
					return false;
				}
			}
			return true;*/
		});
    	
		BackupUpdatePanel.superclass.initComponent.call(this);

    },
    
    constructor: function(tabCont, backupStore) {
	    this.tabContainer = tabCont;
	    this.backupStore = backupStore;
		BackupUpdatePanel.superclass.constructor.call(this);
    },
    onPageSubmit: function(closeWhenDone) {
	    var eto = this;
	    var listOfBackups = new Array();
	    var gridStore = this.localGrid.getStore();
    	for(var c = 0; c < gridStore.getCount(); c++) {
	    	var rec = gridStore.getAt(c);
	    	listOfBackups.push(rec.get('contact_id'));
    	}
    	var objectToSend = new Object();
    	objectToSend.backups = Ext.util.JSON.encode(listOfBackups);
    	
	    Ext.Ajax.request({
			url: 'UpdateBackups.ashx',
		    method: 'POST',
		    params: objectToSend,
		    failure: function() {
			    Ext.MessageBox.alert('Error','Submission Error');
		    },
		    success: function(response, opts) {
			    var jsonResponse = Ext.util.JSON.decode(response.responseText);
			    if(jsonResponse.success != null) {
			    	if(jsonResponse.success) {
				    	eto.tabContainer.remove(eto);
				    	//eto.ownerCt.remove(eto);
		    		} else if(!jsonResponse.success) {
				    	if(jsonResponse.rows) {
				    		Ext.Msg.alert('Failed', 'Update Failed...');
			    		}
		    		}
				} else {
		    		Ext.Msg.alert('Failed', 'Update Failed. No Success Flag.');
	    		}
		    }
		});
    },
    onFormReset: function() {
    },
    onFormCancel: function() {
	    //this.ownerCt.ownerCt.remove(this.ownerCt);
    }
});