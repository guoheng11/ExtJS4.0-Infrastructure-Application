ProjectSMPanel = Ext.extend(Ext.Panel, {
	projectPanel: '',
	projectSMForm: '',
    projectId: '',
    projectName: '',
    tabContainer: '',
    
    initComponent:function() {
	    var eto = this;
	    this.projectPanel = new ProjectGrid({
		    enableDragDrop: true,
		    ddGroup:'projectDD',
		    listeners: {
			}
		});
		
		/*var selectViewHandler = function(viewId) {
	    	if(viewId >= 0) {
		    	eto.projectPanel.findGroup(viewId);
	    	} else {
		    	eto.projectPanel.findAll();
	    	}
		};*/
		
	    this.projectSMForm = new ProjectSMMainPanel(this.projectId,this.projectName);
		//this.projectSMForm.on('groupSelected', selectViewHandler, this);
		
	    Ext.apply(this, {
		    // TAB main
            title: this.projectName + ' Subproject Management',
            //frame: true,
            anchor:'95%',
            closable:true,
            //border:true,
            autoScroll: true,
            layout:'column',
            items: [{
	            width: 280,
	            border:false,
	            bodyStyle:'padding:5px 5px 0;',
	            items:[this.projectSMForm]
            },{
	            columnWidth: 0.99,
	            border:false,
	            bodyStyle:'padding:5px 5px 0;',
	            items:[this.projectPanel]
            }]
		});
	    
    	ProjectSMPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projID, projectNAME) {
	    this.tabContainer = tabCont;
        this.projectId = projID;
        this.projectName = projectNAME;
        ProjectSMPanel.superclass.constructor.call(this);
    }
});

ProjectSMMainPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	projectName: '',
    activePanel: '',
    summaryPanel: '',
    projectListPanel: '',
    projectArray: '',
    getProjectStore: '',
    lastGroupId: '-1',
    lastGroupName: 'Summary',
    
    initComponent:function() {
	    var eto = this;
	    
	    var summaryPanelHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('groupSelected', -1);
		    	eto.showSummaryPanel(eto);
	    	}
		};
		
		var slavePanelHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('groupSelected', button.menuId);
		    	eto.showTypePanel(button.menuId, button.text, eto);
	    	}
		};
		
		var masterPanelHandler = function(button, event) {
	    	if(event) {
		    	eto.fireEvent('groupSelected', button.menuId);
		    	eto.showTypePanel(button.menuId, button.text, eto);
	    	}
		};
		
	    var dynamicMenu = new Ext.menu.Menu({
		    items: [
		    	{text: "Summary", menuId: -1, handler: summaryPanelHandler},
			    {text: "Slave Projects", menuId: 1, handler: slavePanelHandler},
			    {text: "Master Project", menuId: 0, handler: masterPanelHandler}
			]
	    });
		
		// PROJECT CONTACT STORE
		this.getProjectStore = new Ext.data.Store({
			id: 'getProjectStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetProject.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": this.projectId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				root: 'rows',
				totalProperty: 'total',
				id: 'project_id'
			}, [
				{name: 'master_project', mapping: 'master_project'},
				{name: 'sub_projects', mapping: 'sub_projects'}
			])
		});
		
		this.getProjectStore.on('load', function(el, rec, op) {
			eto.projectArray = new Array();
			var masterProj = rec[0].get('master_project');
			if(masterProj != null) {
				eto.projectArray[0] = new Array();
				eto.projectArray[0].groupName = "Master Project";
				var objecto = new Object();
				var namen = masterProj.number;
				if(namen == null) {
					namen = masterProj.name;
				}
				if(namen == null) {
					namen = "Unnamed Project with ID " + masterProj.id;
				}
				objecto.projectName = namen;
				objecto.projectId = masterProj.id;
				eto.projectArray[0][0] = objecto;
				eto.projectArray[0].length = 1;
			}
			
			var subProj = rec[0].get('sub_projects');
			if(subProj != null) {
				if(subProj.length > 0) {
					eto.projectArray[1] = new Array();
					eto.projectArray[1].groupName = "Slave Projects";
					for(var c = 0; c < subProj.length; c++) {
						var objecto = new Object();
						var namen = subProj[c].number;
						if(namen == null) {
							namen = subProj[c].name;
						}
						if(namen == null) {
							namen = "Unnamed Project with ID " + subProj[c].id;
						}
						objecto.projectName = namen;
						objecto.projectId = subProj[c].id;
						eto.projectArray[1][c] = objecto;
						eto.projectArray[1].length++;
					}
				}
			}
			eto.redrawProjectListPanel(-1,eto);
			eto.redrawSummaryPanel();
			
			if(eto.lastGroupId >= 0) {
		    	eto.showTypePanel(eto.lastGroupId,eto.lastGroupName);
	    	} else {
		    	eto.showSummaryPanel();
	    	}
		});
		
		this.getProjectStore.load();
		
		var myMask = new Ext.LoadMask(Ext.getBody(), {store: this.getProjectStore, msg:"Loading Project..."});
		myMask.show();
		
		this.summaryPanel = new Ext.FormPanel({layout:'form',autoHeight:true});
		
		this.projectListPanel = new Ext.FormPanel({layout:'form',autoHeight:true});
		
		this.activePanel = new Ext.Panel({
	        layout: 'card',
	        activeItem: 0,
	        autoHeight:true,
	        layoutConfig: {deferredRender: true},
	        items: [this.summaryPanel, this.projectListPanel]
	    });
		var topToolbar = new Ext.Toolbar({
			style: {'border-bottom':'1px solid', 'border-bottom-color':'#99BBE8'},
			items: [{  
		        text:'View',
	            tooltip:'Select View',
	            iconCls:'open',
	            xtype: 'button',
	            menu: dynamicMenu
	        }, '->', {
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}]
    	});
	    Ext.apply(this, {
		    title:'Contacts: Summary',
            frame: true,
            //width: 300,
            //autoWidth: true,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:3px 3px;',
            //layout:'column',
            //columns: 2,
            vertical: true,
            items: [this.activePanel
            ],
            
            tbar: topToolbar
		});
	    
    	ProjectSMMainPanel.superclass.initComponent.call(this);
    	
    	this.addEvents('groupSelected');
    },
    
    constructor: function(projID,projNAME) {
        this.projectId = projID;
        this.projectName = projNAME;
        ProjectSMMainPanel.superclass.constructor.call(this);
    },

    showSummaryPanel: function() {
	    this.activePanel.getLayout().setActiveItem(0);
		this.setTitle("Projects: Summary");
		this.lastGroupId = -1;
		this.lastGroupName = "Summary";
    },
    
    showTypePanel: function(projectType, projectTypeName) {
	    //Ext.Msg.alert("Show", "Show TYPE:" + contactType);
	    this.activePanel.getLayout().setActiveItem(1);
	    this.redrawProjectListPanel(projectType);
	    this.setTitle("Projects: " + projectTypeName);
	    this.lastGroupId = projectType;
		this.lastGroupName = projectTypeName;
	    //this.doLayout();
    },
    reloadThis: function() {
	    this.getProjectStore.reload();
    },
    
    redrawSummaryPanel: function() {
	    /*var buttonHandler = function(button, event) {
	    	if(event) {
		    	var getProjectStore = new Ext.data.Store({
					id: 'getProjectStore',
					proxy: new Ext.data.HttpProxy({
						url: 'GetContacts.ashx', // File to connect to
						method: 'POST'
					}),
					baseParams: {'contact_id':button.contactId},
					reader: new Ext.data.JsonReader({   
						// we tell the datastore where to get his data from
						root: 'rows',
						totalProperty: 'total',
						id: 'contact_id'
					}, [
						{name: 'contact_id', type: "int", mapping: 'contact_id'},
						{name: 'contact_name', type: "string", mapping: 'contact_name'},
						{name: 'email', type: "string", mapping: 'email'},
						{name: 'phone', type: "string", mapping: 'phone'},
						{name: 'primary_type', type: "string", mapping: 'primary_type'}
					])
				});
				
				getProjectStore.on('load', function(el, rec, op) {
					if(rec.length > 0) {
				    	Ext.MessageBox.alert('Contact Information','<b>Name:</b> \"' + rec[0].get("contact_name") + 
							'\"<br><b>Email:</b> \"' + rec[0].get("email") +
							'\"<br><b>Phone:</b> \"' + rec[0].get("phone") +
							'\"<br><b>Type:</b> \"' + rec[0].get("primary_type") + '\"');
					}
				});
				
				getProjectStore.load();
	    	}
		};*/
		
	    this.summaryPanel.removeAll();
	    var count = 0;
	    for (var i in this.projectArray) {
		    if(i >= 0) {
			    count++;
			    var groupName = this.projectArray[i].groupName;
			    var fieldSet = new Ext.form.FieldSet({
				    title: ''+groupName,
	            	defaultType:'displayfield'
	        	});
	        	
			    for (var ii in this.projectArray[i]) {
				    if(ii >= 0) {
					    var objecto = this.projectArray[i][ii];
					    /*var dispField = new Ext.form.DisplayField({
						    value: objecto.contactName,
						    hideLabel: true
					    });*/
					    var dispButton = new Ext.Button({
						    projectId: objecto.projectId,
						    text: objecto.projectName,
						    hideLabel: true,
						    width: 230,
						    ctCls: 'cook_contactButton'
					    });
					    fieldSet.add(dispButton);
				    }
			    }
			    this.summaryPanel.add(fieldSet);
		    }
	    }
	    
	    if(count == 0) {
		    var dispField = new Ext.form.DisplayField({
				value: "<br>This project does not have master or subprojects. You can add them by changing your View and dragging projects to blank fields."
			});
			this.summaryPanel.add(dispField);
		}
		
		this.summaryPanel.doLayout();
		//this.activePanel.doLayout();
    },
    addBlankToProjectListPanel: function(groupId, groupName) {
	    var eto = this;
	    var tabMaster = true;
	    if(groupId == 0) {
		    tabMaster = false;
	    }
	    var blankCTF = new ProjectFieldSet(true,tabMaster,eto.projectId,eto.projectName);
		blankCTF.groupName = groupName;
		blankCTF.groupId = groupId;
		blankCTF.hide();
		blankCTF.on('blankFilled', function() {
			eto.reloadThis();
		});
		this.projectListPanel.add(blankCTF);
	},
	//groupID: 0 - master, 1 - slave
    redrawProjectListPanel: function(groupID) {
	    if(groupID >= 0) {
		    var count = this.projectListPanel.items.getCount();
		    for(var i = 0; i < count; i++) {
			    var elemento = this.projectListPanel.get(i);
			    if(elemento.groupId == groupID) {
				    elemento.show();
			    } else {
				    elemento.hide();
			    }
		    }
    	} else {
	    	var eto = this;
	    	this.projectListPanel.removeAll();
	    	for (var i in this.projectArray) {
			    if(i >= 0) {
				    count++;
				    var groupName = this.projectArray[i].groupName;
				    for (var ii in this.projectArray[i]) {
					    if(ii >= 0) {
						    var objecto = eto.projectArray[i][ii];
						    var tabMastard = true;
						    if(i == 0) {
							    tabMastard = false;
						    }
						    var filledCTF = new ProjectFieldSet(false, tabMastard, eto.projectId, eto.projectName,objecto.projectId,objecto.projectName);
							filledCTF.groupName = groupName;
							filledCTF.groupId = i;
							filledCTF.on('removedEntry', function() {
								eto.reloadThis();
							});
							this.projectListPanel.add(filledCTF);
					    }
				    }
			    }
		    }
		    // create blanks
		    if(!this.projectArray[0]) {
		    	this.addBlankToProjectListPanel(0,"Master Project");
	    	}
		    this.addBlankToProjectListPanel(1,"Slave Projects");
    	}
		
		this.projectListPanel.doLayout();
		//this.contactTypePanel.syncSize();
		//this.activePanel.doLayout();
    }
});