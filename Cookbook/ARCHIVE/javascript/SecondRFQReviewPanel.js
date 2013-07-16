SecondRFQReviewPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	projectName: '',
	record: '',
	mainFormPanel: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
	    
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'Second RFQ Review Form',
	        labelWidth: 350,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [{
	            xtype:'fieldset',
	            title: 'SWD Assessment',
	            autoHeight: true,
	            layout: 'form',
	            items: [{
	                xtype: 'checkbox',
	                fieldLabel: 'Requirement Review Call with Customer Required',
	                name: 'swd_assessment_customer_reqs_review',
	                inputValue: 'true'
	         	},{
	                xtype: 'checkbox',
	                fieldLabel: 'Requirement Review Internal Meeting Required',
	                name: 'swd_assessment_internal_reqs_review',
	                inputValue: 'true'
	         	},{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Assessment Requested Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_assessment_request_date'
	            },{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Assessment Completed Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_assessment_complete_date'
		    	}]
	    	},{
	            xtype:'fieldset',
	            title: 'OPS Assessment',
	            autoHeight: true,
	            layout: 'form',
	            items: [{
	                xtype: 'datefield',
	                fieldLabel: 'OPS Assessment Requested Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'ops_assessment_request_date'
	            },{
	                xtype: 'datefield',
	                fieldLabel: 'OPS Assessment Completed Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'ops_assessment_complete_date'
		    	}]
	    	},{
	            xtype:'fieldset',
	            title: 'QA Assessment',
	            autoHeight: true,
	            layout: 'form',
	            items: [{
	                xtype: 'datefield',
	                fieldLabel: 'QA Assessment Requested Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_assessment_request_date'
	            },{
	                xtype: 'datefield',
	                fieldLabel: 'QA Assessment Completed Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_assessment_complete_date'
		    	}]
	    	},{
	            xtype:'fieldset',
	            title: 'SWD Schedule',
	            autoHeight: true,
	            layout: 'form',
	            items: [{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Schedule Requested Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_schedule_request_date'
	            },{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Schedule Completed Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_schedule_complete_date'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Schedule Requested Start Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_schedule_request_start'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Schedule Requested Complete Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_schedule_request_complete'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Schedule Booked Start Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_schedule_booked_start'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'SWD Schedule Booked Complete Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'swd_schedule_booked_complete'
		    	}]
	    	},{
	            xtype:'fieldset',
	            title: 'QA Schedule',
	            autoHeight: true,
	            layout: 'form',
	            items: [{
	                xtype: 'datefield',
	                fieldLabel: 'QA Schedule Requested Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_schedule_request_date'
	            },{
	                xtype: 'datefield',
	                fieldLabel: 'QA Schedule Completed Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_schedule_complete_date'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'QA Schedule Requested Start Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_schedule_request_start'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'QA Schedule Requested Complete Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_schedule_request_complete'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'QA Schedule Booked Start Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_schedule_booked_start'
		    	},{
	                xtype: 'datefield',
	                fieldLabel: 'QA Schedule Booked Complete Date',
	                format: 'Y/m/d',
	                width: 127,
			    	name: 'qa_schedule_booked_complete'
		    	}]
	    	},{
                xtype: 'hidden',
                name: 'project_id',
                value: this.projectId
            }],
	        buttons: [{
	            text: 'Update'
	        },{
	            text: 'Reset'
            },{
	            text: 'Cancel'
            }]
	    });

	    Ext.apply(this, {
		    // TAB main
            title:this.projectName+' 2nd RFQ Review',
            //frame: true,
            anchor:'95%',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [this.mainFormPanel]
		});
	    	
    	this.on('afterrender', function() {
	        var projectInfoStore = new Ext.data.Store({
				id: 'firstReviewStore',
				proxy: new Ext.data.HttpProxy({
					url: 'GetSecondReview.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"project_id": this.projectId}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total'
				}, [
					{name: 'swd_assessment_customer_reqs_review', type: "boolean", mapping: 'swd_assessment_customer_reqs_review'},
					{name: 'swd_assessment_internal_reqs_review', type: "boolean", mapping: 'swd_assessment_internal_reqs_review'},
					{name: 'swd_assessment_request_date', type: "date", mapping: 'swd_assessment_request_date'},
					{name: 'swd_assessment_complete_date', type: "date", mapping: 'swd_assessment_complete_date'},
					{name: 'ops_assessment_complete_date', type: "date", mapping: 'ops_assessment_complete_date'},
					{name: 'ops_assessment_request_date', type: "date", mapping: 'ops_assessment_request_date'},
					{name: 'qa_assessment_complete_date', type: "date", mapping: 'qa_assessment_complete_date'},
					{name: 'qa_assessment_request_date', type: "date", mapping: 'qa_assessment_request_date'},
					{name: 'swd_schedule_request_date', type: "date", mapping: 'swd_schedule_request_date'},
					{name: 'swd_schedule_complete_date', type: "date", mapping: 'swd_schedule_complete_date'},
					{name: 'swd_schedule_request_start', type: "date", mapping: 'swd_schedule_request_start'},
					{name: 'swd_schedule_request_complete', type: "date", mapping: 'swd_schedule_request_complete'},
					{name: 'swd_schedule_booked_start', type: "date", mapping: 'swd_schedule_booked_start'},
					{name: 'swd_schedule_booked_complete', type: "date", mapping: 'swd_schedule_booked_complete'},
					{name: 'qa_schedule_request_date', type: "date", mapping: 'qa_schedule_request_date'},
					{name: 'qa_schedule_complete_date', type: "date", mapping: 'qa_schedule_complete_date'},
					{name: 'qa_schedule_request_start', type: "date", mapping: 'qa_schedule_request_start'},
					{name: 'qa_schedule_request_complete', type: "date", mapping: 'qa_schedule_request_complete'},
					{name: 'qa_schedule_booked_start', type: "date", mapping: 'qa_schedule_booked_start'},
					{name: 'qa_schedule_booked_complete', type: "date", mapping: 'qa_schedule_booked_complete'},
					{name: 'status_info', mapping: 'status_info'}
				])
			});
			
			projectInfoStore.on('load', function() {
				var count = projectInfoStore.getTotalCount(); 
				if(count > 0) {
					eto.record = projectInfoStore.getAt(0);
					eto.loadProject();
				}
			});
			
			projectInfoStore.load();
		});
    	
		SecondRFQReviewPanel.superclass.initComponent.call(this);
		
    	this.mainFormPanel.buttons[0].on('click', this.onFormSubmit, this.mainFormPanel);
    	this.mainFormPanel.buttons[1].on('click', this.onFormReset, this);
    	this.mainFormPanel.buttons[2].on('click', this.onFormCancel, this.mainFormPanel);
    },
    
    constructor: function(projId,projName) {
		this.projectId = projId;
		this.projectName = projName;
		SecondRFQReviewPanel.superclass.constructor.call(this);
    },
    
    onFormSubmit: function() {
	    if(this.getForm().isValid()) {
			var thisForm = this;
			this.getForm().submit({
            	waitMsg:'Loading...',
                url: 'UpdateSecondReview.ashx',
                success: function(form,action){
    				thisForm.ownerCt.ownerCt.remove(thisForm.ownerCt);
                },
                failure: function(form,action){
                    Ext.MessageBox.alert('Error','Submission Error');
                }
            });
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
	    if(this.record) {
		    if(this.mainFormPanel) {
		    	var component = this.mainFormPanel.find('name','swd_assessment_request_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_assessment_request_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_assessment_complete_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_assessment_complete_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_assessment_customer_reqs_review');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_assessment_customer_reqs_review"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','ops_assessment_request_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("ops_assessment_request_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','ops_assessment_complete_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("ops_assessment_complete_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_assessment_request_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_assessment_request_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_assessment_complete_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_assessment_complete_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_schedule_request_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_schedule_request_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_schedule_complete_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_schedule_complete_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_schedule_request_start');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_schedule_request_start"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_schedule_request_complete');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_schedule_request_complete"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_schedule_booked_start');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_schedule_booked_start"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','swd_schedule_booked_complete');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("swd_schedule_booked_complete"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_schedule_request_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_schedule_request_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_schedule_complete_date');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_schedule_complete_date"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_schedule_request_start');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_schedule_request_start"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_schedule_request_complete');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_schedule_request_complete"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_schedule_booked_start');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_schedule_booked_start"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','qa_schedule_booked_complete');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("qa_schedule_booked_complete"));
		    	}
		    	
		    	var statusInfo = this.record.get("status_info");
			    if(statusInfo.project_status_id) {
				    this.add(new NoteSetPanel(eto.projectId, ""));
				    this.doLayout();
	    		}
	    	}
    	}
    }
});