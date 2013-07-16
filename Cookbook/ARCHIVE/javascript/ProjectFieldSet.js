ProjectFieldSet = Ext.extend(Ext.form.FieldSet, {
	blank: true,
    tabProjectId: '',
    tabProjectName: '',
    myProjectId: '',
    myProjectName: '',
    tabIsMaster: true,
	record: new Ext.data.Record({}),
	
	initComponent:function() {
		var eto = this;
		removeHandler = function(button, event) {
	    	if(event) {
		    	eto.removeEntry(eto);
		    	//eto.ownerCt.remove(eto, true); // auto destroy
	    	}
		};
		
		infoHandler = function(button, event) {
	    	if(event) {
		    	
	    	}
		};
		
		Ext.apply(this, {
			frame: false,
	        width: 250,
            title: '',
            defaultType:'displayfield',
            height: 45,
            style: {'margin-bottom': "3px",padding: "1px"},
            layout: 'table',
            items: [{
	            itemId:'nameField',
	            name: 'project_name',
	            disabled: false,
	            fieldClass: 'cook_contact_text',
	            style: {padding: "1px"},
	            //hideLabel: true,
	            //style: 'h1',
	            width: 200,
	            height: 15,
	            xtype: 'displayfield',
	            value: this.myProjectName
            },{
	            layout:'table',
	            xtype: 'panel',
	            bodyStyle: 'padding:1px 0px;',
	            items: [{
			    	xtype: 'button',
		            iconCls: 'info',
		            handler: infoHandler
			    },{
		            xtype: 'button',
		            iconCls: 'remove',
		            itemId: 'removeButton',
		            disabled: this.blank,
		            //scope: eto,
		            handler: removeHandler
            	}]
            }]
        });
        
        ProjectFieldSet.superclass.initComponent.call(this);
        
        this.on('afterrender', function() {
	        var thisElement = this;
			var formPanelDropTargetEl = this.getEl();
			if(this.blank) {
				var formPanelDropTarget = new Ext.dd.DropTarget(formPanelDropTargetEl, {
					ddGroup     : 'projectDD',
					notifyEnter : function(ddSource, e, data) {
						thisElement.addClass('dragHighlight');
						//thisElement.removeClass('dragHighlight');
					},
					notifyOut : function(ddSource, e, data) {
						thisElement.removeClass('dragHighlight');
					},
					notifyDrop  : function(ddSource, e, data){
						var selectedRecord = ddSource.dragData.selections[0];
						thisElement.loadNewRecord(selectedRecord, thisElement);
						thisElement.removeClass('dragHighlight');
						
						return(true);
					}
				});
			}
		});
		
		this.addEvents('blankFilled', 'removedEntry');

    },
    constructor: function(blankus, tabMaster1, tabProjectId1, tabProjectName1, myProjectId1, myProjectName1) {
        this.blank = blankus;
        this.tabIsMaster = tabMaster1;
        this.myProjectId= myProjectId1;
        this.myProjectName= myProjectName1;
        this.tabProjectId= tabProjectId1;
        this.tabProjectName= tabProjectName1;
        ProjectFieldSet.superclass.constructor.apply(this);
    },
    
    loadNewRecord: function(newRecord) {
	    if(newRecord) {
		    this.record = newRecord;
	    }
	    this.blank = false;
		this.enableRemove(true, this);
	    this.loadRecord();
	},
	resetBlank: function() {
		this.blank = true;
		this.myProjectId = '';
		this.myProjectName = '';
		this.record = new Ext.data.Record({});
		this.getComponent('nameField').setValue('');
		this.enableRemove(false, this);
	},
		
	loadRecord: function() {
		// name
	    var recordValue = this.record.get("project_name");
		this.getComponent('nameField').setValue(recordValue);
		
		var projId = this.record.get("project_id");
		
		var eto = this;
		var master = '';
		var puppet = '';
		if(this.tabIsMaster) {
			master = this.tabProjectId;
			puppet = projId;
		} else {
			master = projId;
			puppet = this.tabProjectId;
		}
		if(master != puppet) {
			var conn = new Ext.data.Connection();
			conn.request({
			    url: 'AddLinkedProject.ashx',
			    method: 'POST',
			    params: {"master_project_id": master,
			    		"sub_project_id": puppet},
			    failure: function(response, opts) {
				    eto.fireEvent('blankFilled', eto);
			    },
			    success: function(response, opts) {
				    eto.fireEvent('blankFilled', eto);
			    }
			});
		} else {
			this.resetBlank();
		}
	},
	
	removeEntry: function() {
		var eto = this;
		var master = '';
		var puppet = '';
		if(this.tabIsMaster) {
			master = this.tabProjectId;
			puppet = this.myProjectId;
		} else {
			master = this.myProjectId;
			puppet = this.tabProjectId;
		}
		var conn = new Ext.data.Connection();
		conn.request({
		    url: 'RemoveLinkedProject.ashx',
		    method: 'POST',
		    params: {"master_project_id": master,
		    		"sub_project_id": puppet},
		    failure: function(response, opts) {
			    eto.fireEvent('removedEntry', eto);
		    },
		    success: function(response, opts) {
			    eto.fireEvent('removedEntry', eto);
		    }
		});
	},
	
	enableRemove: function(enable) {
		var buttons = this.find('itemId','removeButton');
		if(buttons.length > 0) {
			if(enable) {
				buttons[0].enable();
			} else {
				buttons[0].disable();
			}
		}
	}
});