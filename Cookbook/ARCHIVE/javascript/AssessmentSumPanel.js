AssessmentSumPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	projectName: '',
	getAssessmentStore: '',
	mainFormPanel: '',
	swdSummaryPanel: '',
	qaSummaryPanel: '',
	sysSummaryPanel: '',
	//opsSummaryPanel: '',
	tabContainer: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
		this.swdSummaryPanel = new AssessmentSumTypePanel(this.tabContainer,this.projectId,"SWD");
		this.qaSummaryPanel = new AssessmentSumTypePanel(this.tabContainer,this.projectId,"QA");
		this.sysSummaryPanel = new AssessmentSumTypePanel(this.tabContainer,this.projectId,"SYS");
		//this.opsSummaryPanel = new AssessmentSumTypePanel(this.tabContainer,this.projectId,"OPS");
		
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'Assessments Review',
	        labelWidth: 350,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [
	        this.swdSummaryPanel,
	        this.qaSummaryPanel,
	        this.sysSummaryPanel,
	        //this.opsSummaryPanel,
	        {
                xtype: 'hidden',
                name: 'project_id',
                value: this.projectId
            }]
	    });

	    Ext.apply(this, {
		    // TAB main
            title:'Assessments',
            //frame: true,
            anchor:'95%',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [this.mainFormPanel]
		});
	    	
    	this.on('afterrender', function() {
	        eto.getAssessmentStore = new Ext.data.Store({
				id: 'getAssessmentStore',
				proxy: new Ext.data.HttpProxy({
					url: 'GetAssessments.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"project_id": this.projectId}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total'
				}, [
					{name: 'assessment_id', type: "int", mapping: 'assessment_id'},
					{name: 'description', type: "string", mapping: 'description'},
					{name: 'request_date', type: "date", mapping: 'request_date'},
					{name: 'complete_date', type: "date", mapping: 'complete_date'},
					{name: 'assessment_type', type: "string", mapping: 'assessment_type'}
				])
			});
			
			eto.getAssessmentStore.on('load', function() {
				eto.loadProject(eto);
			});
			
			eto.getAssessmentStore.load();
		});
		
    	activateHandler = function(panel) {
	    	if(panel) {
		    	eto.onActivated(eto);
	    	}
		};
		this.on('activate', activateHandler, this);
		AssessmentSumPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId,projName) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.projectName = projName;
		AssessmentSumPanel.superclass.constructor.call(this);
    },
    
    onActivated: function() {
        this.getAssessmentStore.reload();
    },
    
    onFormSubmit: function() {
	    if(this.getForm().isValid()) {
			
		} else {
			Ext.Msg.alert('Not Complete', 'Fill out all required fields!');
		}
    },
    onFormReset: function() {
	    if(this.record) {
		    this.loadProject();
	    } else {
	    	this.mainFormPanel.getForm().reset();
    	}
    },
    onFormCancel: function() {
	    this.ownerCt.ownerCt.remove(this.ownerCt);
    },
    
    loadProject: function() {
	    this.swdSummaryPanel.resetForm(this.swdSummaryPanel);
		this.qaSummaryPanel.resetForm(this.qaSummaryPanel);
		this.sysSummaryPanel.resetForm(this.sysSummaryPanel);
		//this.opsSummaryPanel.resetForm(this.opsSummaryPanel);
	    for(var c = 0; c < this.getAssessmentStore.getCount(); c++) {
		    var record = this.getAssessmentStore.getAt(c);
		    var recType = record.get('assessment_type');
		    if(recType == 'SWD') {
			    this.swdSummaryPanel.addNew(record.get('assessment_id'),record.get('description'),record.get('request_date'),record.get('complete_date'), true);
		    } else if(recType == 'QA') {
			    this.qaSummaryPanel.addNew(record.get('assessment_id'),record.get('description'),record.get('request_date'),record.get('complete_date'), true);
		    } else if(recType == 'SYS') {
			    this.sysSummaryPanel.addNew(record.get('assessment_id'),record.get('description'),record.get('request_date'),record.get('complete_date'), false);
		    } /*else if(recType == 'OPS') {
			    this.opsSummaryPanel.addNew(record.get('assessment_id'),record.get('description'),record.get('request_date'),record.get('complete_date'));
		    }*/
	    }
	    this.doLayout();
    }
});
////////////******************************
////////////******************************

AssessmentSumTypePanel = Ext.extend(Ext.Panel, {
	projectId: '',
	assessmentType: '',
	mainFormPanel: '',
	tabContainer: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
		
		newAssessmentHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.ownerCt.ownerCt.openNewTab("CreateAssessmentForm",eto.projectId,eto.assessmentType);
	    	}
		};
		this.mainFormPanel = new Ext.form.FieldSet({
	        title: this.assessmentType+' Assessments',
	        labelWidth: 130,
	        autoWidth: true,
	        //bodyStyle: 'padding:0 10px 0;',
	        items: [{
		    	xtype: 'button',
                text: 'Request New '+this.assessmentType+' Assessment',
                scale: 'medium',
                iconCls: 'add',
                style: 'padding: 0 0 50 50',
		    	handler: newAssessmentHandler
	    	}]
    	});

	    Ext.apply(this, {
            anchor:'95%',
            //bodyStyle: 'padding:20 20;',
            autoWidth: true,
            items: [this.mainFormPanel]
		});
	    	
    	this.on('afterrender', function() {
	        
		});
    	
		AssessmentSumTypePanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId,assType) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.assessmentType = assType;
		AssessmentSumTypePanel.superclass.constructor.call(this);
    },
    
    resetForm: function() {
	    var eto = this;
	    newAssessmentHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.ownerCt.ownerCt.openNewTab("CreateAssessmentForm",eto.projectId,eto.assessmentType);
	    	}
		};
	    this.mainFormPanel.removeAll();
	    this.mainFormPanel.add({
	    	xtype: 'button',
            text: 'Request New '+this.assessmentType+' Assessment',
            scale: 'medium',
            iconCls: 'add',
            style: 'padding-down: 10',
	    	handler: newAssessmentHandler
    	});
	    
    },
    addNew: function(assId, desc, reqDate, compDate, enableScheduling) {
	    var eto = this;
	    var schedulingDisabled = true;
	    var assessmetButtonText = "Perform Assessment";
	    if(compDate instanceof Date) {
		    schedulingDisabled = false;
		    assessmetButtonText = "Update Assessment";
	    }
	    
	    openAssessmentHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.ownerCt.ownerCt.openNewTab("AssessmentPanel",eto.projectId,eto.assessmentType,button.assessmentId, false);
	    	}
		};
		
		schedulingHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.ownerCt.ownerCt.openNewTab("AssessmentPanel",eto.projectId,eto.assessmentType,button.assessmentId, true);
	    	}
		};
		
		removeAssessmentHandler = function(button, event) {
	    	if(event) {
		    	Ext.Ajax.request({
					url: 'DeleteAssessment.ashx',
				    method: 'POST',
				    params: {'assessment_id': button.assessmentId},
				    failure: function() {
					    Ext.MessageBox.alert('Error','Removal Failure (Network/Server Failure?)');
				    },
				    success: function(response, opts) {
					    var jsonResponse = Ext.util.JSON.decode(response.responseText);
					    if(jsonResponse.success != null) {
					    	if(jsonResponse.success) {
						    	eto.ownerCt.ownerCt.onActivated(eto.ownerCt.ownerCt);
				    		} else if(!jsonResponse.success) {
						    	if(jsonResponse.rows) {
						    		Ext.Msg.alert('Failed', 'Removal Failure (Not Successful)');
					    		}
				    		}
						} else {
				    		Ext.Msg.alert('Failed', 'Removal Failure (No Success Flag)');
			    		}
				    }
				});
	    	}
		};
		
	    var newSet = new Ext.form.FieldSet({
		    autoWidth: true,
		    style: 'padding-top: 10',
		    items: [{
	        	xtype: 'displayfield',
	            style: 'padding-top: 3',
	            fieldLabel: 'Description',
	            autoWidth: true,
	            autoHeight: true,
	            value: desc
	    	},{
		    	layout: 'column',
		    	style: 'padding: 5 0',
		    	items: [{
			    	xtype: 'displayfield',
			    	value: 'Requested Date:',
			    	cls: 'cook-normal-text'
		    	},{
		            xtype: 'datefield',
		            //fieldLabel: 'Requested Date',
		            format: 'Y/m/d',
		            width: 127,
		            disabled: true,
			    	name: 'requestDate',
			    	value: reqDate
		        },{
			    	xtype: 'displayfield',
			    	style: 'padding-left: 20',
			    	cls: 'cook-normal-text',
			    	value: 'Completed Date:'
		    	},{
		            xtype: 'datefield',
		            
		            fieldLabel: 'Completed Date',
		            format: 'Y/m/d',
		            width: 127,
		            disabled: true,
			    	name: 'completeDate',
			    	value: compDate
		    	}]
	    	},{
		    	layout: 'column',
		    	style: 'padding: 10 0 0 0',
		    	items: [{
			    	xtype: 'button',
		            text: assessmetButtonText,
		            scale: 'medium',
		            iconCls: 'perform',
		            assessmentId: assId,
			    	handler: openAssessmentHandler
		    	},{
			    	xtype: 'button',
		            text: 'Remove Assessment',
		            style: 'padding-left: 40',
		            scale: 'medium',
		            iconCls: 'remove',
		            assessmentId: assId,
			    	handler: removeAssessmentHandler
		    	},{
			    	xtype: 'button',
		            text: 'Perform Scheduling',
		            style: 'padding-left: 40',
		            scale: 'medium',
		            iconCls: 'perform',
		            assessmentId: assId,
		            hidden: !enableScheduling,
		            disabled: schedulingDisabled,
			    	handler: schedulingHandler
		    	}]
	    	}]
		});
    	this.mainFormPanel.add(newSet);
    	this.doLayout();
	}
});