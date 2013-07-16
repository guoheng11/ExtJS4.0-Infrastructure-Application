FirstRFQReviewPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	projectName: '',
	record: '',
	mainFormPanel: '',
	tabContainer: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'First RFQ Review Form',
	        labelWidth: 200,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [{
                xtype: 'checkbox',
                fieldLabel: 'Follow up with customer required',
                name: 'follow_up',
                inputValue: 'true'
         	},{
                xtype: 'datefield',
                fieldLabel: 'Requirements Requested Date',
                format: 'Y/m/d',
                width: 127,
		    	name: 'reqs_requested'
            },{
                xtype: 'datefield',
                fieldLabel: 'Requirements Received Date',
                format: 'Y/m/d',
                width: 127,
		    	name: 'reqs_received'
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
            title:this.projectName+' 1st RFQ Review',
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
					url: 'GetFirstReview.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"project_id": this.projectId}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total'
				}, [
					{name: 'reqs_requested', type: "date", mapping: 'reqs_requested'},
					{name: 'reqs_received', type: "date", mapping: 'reqs_received'},
					{name: 'follow_up', type: "boolean", mapping: 'follow_up'},
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
    	
		FirstRFQReviewPanel.superclass.initComponent.call(this);
		
    	this.mainFormPanel.buttons[0].on('click', this.onFormSubmit, this.mainFormPanel);
    	this.mainFormPanel.buttons[1].on('click', this.onFormReset, this);
    	this.mainFormPanel.buttons[2].on('click', this.onFormCancel, this.mainFormPanel);
    },
    
    constructor: function(tabCont,projId,projName) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.projectName = projName;
		FirstRFQReviewPanel.superclass.constructor.call(this);
    },
    
    onFormSubmit: function() {
	    if(this.getForm().isValid()){

	    	//Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+ 
			//this.getForm().getValues(true).replace(/&/g,', '));'
			var thisForm = this;
			this.getForm().submit({
            	waitMsg:'Loading...',
                url: 'UpdateFirstReview.ashx',
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
	    var eto = this;
	    if(this.record) {
		    if(this.mainFormPanel) {
		    	var component = this.mainFormPanel.find('name','follow_up');
		    	if(component[0] != null) {
			    	component[0].setValue(this.record.get("follow_up"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','reqs_requested');
		    	if(component[0] != null) {
			    	var val = this.record.get("reqs_requested");
			    	component[0].setValue(this.record.get("reqs_requested"));
		    	}
		    	
		    	component = this.mainFormPanel.find('name','reqs_received');
		    	if(component[0] != null) {
			    	var val = this.record.get("reqs_received");
			    	component[0].setValue(this.record.get("reqs_received"));
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