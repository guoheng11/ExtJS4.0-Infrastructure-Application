/* 
 * This panel can be either an Assessment Panel or Scheduling Panel 
 */
AssessmentPanel = Ext.extend(Ext.Panel, {
	objectId: '',
	mainFormPanel: '',
	contactPanel: '',
	assessmentId: '',
	assessmentType: '',
	tabContainer: '',
	editAssessmentForm: '',
	getAssessmentStore: '',
	completedContainer: '',
	complete: '',
	readOnly: false,
	schedulingPanel: false, //true = schedulingPanel, false = assessmentPanel
	originalValue: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
	    if(this.assessmentType == "SWD") {
			this.mainFormPanel = new SWDAssessmentPanel(this.objectId,this.schedulingPanel, this.readOnly);
		} else if(this.assessmentType == "OPS") {
			this.mainFormPanel = new AssessmentQAPanel(this.objectId,this.schedulingPanel, this.readOnly);
		}
		
		var assessmentWording = "Scheduling";
		// scheduling doesn't need it
		if(!this.schedulingPanel) {
			assessmentWording = "Assessment";
			this.editAssessmentForm = new CreateAssessmentPanel(this.objectId,this.assessmentType);
			this.editAssessmentForm.on("afterrender", function() {
				this.collapse();
			});
			//if(this.assessmentType == "SWD") {
			this.contactPanel = new ContactGrid(this.tabContainer,{
				rowspan: 2,
			    enableDragDrop: true,
			    ddGroup:'contactDD',
			    collapsible: true,
			    collapsed: true,
			    listeners: {
				}
			});
			if(this.assessmentType == "SWD") {
				this.contactPanel.collapsed = false;
			}
		}
		this.getAssessmentStore = new Ext.data.Store({
			id: 'getAssessmentStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetAssessment.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"assessment_id": this.assessmentId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'assessment_id'
			}, [
				{name: 'assessment_id', type: "int", mapping: 'assessment_id'},
				{name: 'assessment_type', type: "string", mapping: 'assessment_type'},
				{name: 'description', type: "string", mapping: 'description'},
				{name: 'request_date', type: "date", mapping: 'request_date'},
				{name: 'complete_date', type: "date", mapping: 'complete_date'},
				{name: 'customer_reqs_review', type: "boolean", mapping: 'customer_reqs_review'},
				{name: 'internal_reqs_review', type: "boolean", mapping: 'internal_reqs_review'},
				{name: 'mis_required', type: "boolean", mapping: 'mis_required'},
				{name: 'vision_required', type: "boolean", mapping: 'vision_required'},
				{name: 'contacts', mapping: 'contacts'},
				{name: 'hours', mapping: 'hours'},
				{name: 'hardware', mapping: 'hardware'},
				{name: 'assumptions', mapping: 'assumptions'},
				{name: 'request_start', type: "date", mapping: 'request_start'},
				{name: 'request_complete', type: "date", mapping: 'request_complete'},
				{name: 'booked_start', type: "date", mapping: 'booked_start'},
				{name: 'booked_complete', type: "date", mapping: 'booked_complete'}
				
			])
		});
		
		this.getAssessmentStore.on('load', function() {
			var count = eto.getAssessmentStore.getTotalCount(); 
			if(count < 1) {
			} else {
				var obj = eto;
				if(!eto.schedulingPanel) {
					eto.editAssessmentForm.setStore(eto.getAssessmentStore,eto.editAssessmentForm);
					var rec = eto.getAssessmentStore.getAt(0);
					if(rec.get('complete_date')) {
						eto.complete = true;
						eto.completedContainer = new Ext.form.DisplayField({
					        xtype: 'displayfield',
					        value: '<b>COMPLETED</b>'
				        });
				        var foundObjects = eto.find('myType','completePanel');
				        if(foundObjects.length > 0) {
					        foundObjects[0].remove(foundObjects[0].get(1),true);
					        foundObjects[0].add(eto.completedContainer);
				        }
					}
				}
				eto.mainFormPanel.setStore(eto.getAssessmentStore,eto.mainFormPanel);
				eto.doLayout();
			}
		});
		
		this.getAssessmentStore.load();
		submitHandler = function(button, event) {
	    	if(event) {
		    	eto.onPageSubmit(eto);
	    	}
		};
		if(!this.schedulingPanel) {
			this.completedContainer = new Ext.form.Checkbox({
	            boxLabel: 'Complete Assessment',
	            checked: false
	        });
        } else {
	        this.completedContainer = new Ext.Container();
        }
        this.emptyContainer = new Ext.Container();
        this.saveButton = new Ext.Button({
            scale: 'medium',
            disabled: this.readOnly,
            text: 'Save '+assessmentWording,
            handler: submitHandler,
            iconCls: 'save'
        });
        this.saveButton2 = new Ext.Button({
            scale: 'medium',
            text: 'Save '+assessmentWording,
            disabled: this.readOnly,
            handler: submitHandler,
            iconCls: 'save'
        });
        
	    Ext.apply(this, {
		    // TAB main
            title:this.assessmentType+' '+assessmentWording,
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
			    columns: 2
			},
            items: [{
	            layout: 'column',
	            myType: 'completePanel',
	            colspan: 2,
	            baseCls: 'cookBackground',
	            //cls: 'center-table-layout',
	            defaults: {
		            style:'padding: 0 10px'
	            },
	            items: [this.saveButton, this.completedContainer]
            },
            this.schedulingPanel ? this.emptyContainer : this.editAssessmentForm,
            this.schedulingPanel ? this.emptyContainer : this.contactPanel ,
            this.mainFormPanel,
            this.schedulingPanel ? this.emptyContainer : this.saveButton2
	        ]
		});
		this.forceClose = false;
		this.mainFormPanel.on('contentLoaded', function() {
			eto.originalValue = eto.mainFormPanel.getValueObject();
		});
		
    	this.on('beforeclose', function() {
	    	if(!this.forceClose) {
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
			return true;
		});
    	
		AssessmentPanel.superclass.initComponent.call(this);

    },
    
    constructor: function(tabCont,projId,assType,assId, schPanel, readOnly) {
	    this.tabContainer = tabCont;
		this.objectId = projId;
		this.assessmentType = assType;
		this.assessmentId = assId;
		if(readOnly) {
			this.readOnly = true;
		}
		// lets use safe programming practice for a change =)
		this.schedulingPane = false;
		if(typeof schPanel == "string") {
			if(schPanel == "true") {
				this.schedulingPanel = true;
			}
		} else if(typeof schPanel == "boolean") {
			if(schPanel) {
				this.schedulingPanel = true;
			}
		}
		AssessmentPanel.superclass.constructor.call(this);
    },
    getAssessmentType: function() {
	    return this.assessmentType;
    },
    onPageSubmit: function(closeWhenDone) {
	    var eto = this;
	    var objectToSend = new Object();
	    objectToSend.assessment_id = this.assessmentId;
	    var valueObject = new Object();
	    if(!this.schedulingPanel) {
	    	valueObject = this.editAssessmentForm.getValueObject();
		    for (var i in valueObject) {
			    eval("objectToSend."+i+" = valueObject[i]");
		    }
		    for (var i in valueObject) {
			    eval("objectToSend."+i+" = valueObject[i]");
		    }
		    if(this.complete) {
		    	objectToSend.complete = true;
	    	} else {
		    	if(this.completedContainer.getValue() == true) {
		    		objectToSend.complete = true;
	    		}
	    	}
		}
	    valueObject = this.mainFormPanel.getValueObject();
	    for (var i in valueObject) {
		    eval("objectToSend."+i+" = valueObject[i]");
	    }
	    if(!this.readOnly) {
		    Ext.Ajax.request({
				url: 'UpdateAssessment.ashx',
			    method: 'POST',
			    params: objectToSend,
			    failure: function() {
				    Ext.MessageBox.alert('Error','Submission Error');
			    },
			    success: function(response, opts) {
				    var jsonResponse = Ext.util.JSON.decode(response.responseText);
				    if(jsonResponse.success != null) {
				    	if(jsonResponse.success) {
					    	if(closeWhenDone) {
						    	eto.tabContainer.remove(eto);
					    	} else {
						    	if(!eto.schedulingPanel) {
						    		Ext.MessageBox.alert('Success','Assessment Updated');
						    		eto.getAssessmentStore.reload();
					    		} else {
						    		Ext.MessageBox.alert('Success','Scheduling Updated');
					    		}
				    		}
					    	//eto.ownerCt.remove(eto);
			    		} else if(!jsonResponse.success) {
					    	if(jsonResponse.rows) {
						    	if(!eto.schedulingPanel) {
					    			Ext.Msg.alert('Failed', 'Assessment Update Failed...');
					    		} else {
					    			Ext.Msg.alert('Failed', 'Scheduling Update Failed...');
				    			}
				    		}
			    		}
					} else {
						if(!eto.schedulingPanel) {
			    			Ext.Msg.alert('Failed', 'Assessment Update Failed. No Success Flag.');
		    			} else {
			    			Ext.Msg.alert('Failed', 'Scheduling Update Failed. No Success Flag.');
		    			}
		    		}
			    }
			});
		}
    },
    onFormReset: function() {
    },
    onFormCancel: function() {
	    //this.ownerCt.ownerCt.remove(this.ownerCt);
    }
});