CreateAssessmentForm = Ext.extend(Ext.Panel, {
	projectId: '',
	assessmentType: '',
	mainFormPanel: '',
	contactPanel: '',
	localGrid: '',
	tabContainer: '',
	assessmentId: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
	    if(this.assessmentId) {
		    this.contactPanel = new Ext.Container();
		} else {
			this.contactPanel = new Ext.Panel({
				height: 'auto',
				border: false,
				style: 'padding: 10px',
				bodyBorder: false,
				items: [new ContactGrid(this.tabContainer,{
					frame: true,
				    enableDragDrop: true,
				    height: 'auto',
				    width: 550,
				    ddGroup:'contactDD',
				    listeners: {
					}
				})]
			});
		}
	    
		this.mainFormPanel = new CreateAssessmentPanel(this.projectId, this.assessmentType);
		this.mainFormPanel.addButton({text: 'Request Assessment', iconCls: 'accept', style: 'padding-right: 20'},this.onFormSubmit, this);
		//this.mainFormPanel.addButton({text: 'Copy Assessment Settings', iconCls: 'perform', style: 'padding-right: 20'},this.onCopyAssessment, this);
		this.mainFormPanel.addButton({text: 'Reset'},this.onFormReset, this);
		this.mainFormPanel.addButton({text: 'Cancel'},this.onFormCancel, this.mainFormPanel);
		
	    Ext.apply(this, {
		    // TAB main
            title:'Request '+this.assessmentType+ ' Assessment',
            //width: 'auto',
            layout:'column',
            boxMinWidth: 550+40+40+550+50,
            closable:true,
            //layout:'column',
            items: [this.mainFormPanel,this.contactPanel]
		});
    	
		CreateAssessmentForm.superclass.initComponent.call(this);
		
    	//this.buttons[0].on('click', this.onFormSubmit, this);
    	//this.buttons[1].on('click', this.onFormReset, this);
    	//this.buttons[2].on('click', this.onFormCancel, this.mainFormPanel);
    },
    
    constructor: function(tabCont,projId,assType,assId) {
	    this.tabContainer = tabCont;
	    this.projectId = projId;
		this.assessmentType = assType;
		if(assId) {
			this.assessmentId = assId;
		}
		CreateAssessmentForm.superclass.constructor.call(this);
    },
    getAssessmentType: function() {
	    return this.assessmentType;
    },
    onDeleteContact: function() {
	    var grid1 = this.ownerCt.ownerCt;
	    var selectedRecord = grid1.getSelectionModel().getSelected();
	    grid1.getStore().remove(selectedRecord);
	    grid1.getBottomToolbar().getComponent('0').disable();
    },
    onRowSelect: function(sm, rowIndex, r) {
    	sm.grid.getBottomToolbar().getComponent('0').enable();
    },
    
    onRowDeselect: function(sm, rowIndex, r){        
        sm.grid.getBottomToolbar().getComponent('0').disable();
    },
    onFormSubmit: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    // Description
	    var foundObjects = this.mainFormPanel.find('name','description');
	    if(foundObjects.length > 0) {
	    	objectToSend.description = foundObjects[0].getValue();
    	}
    	
    	// Project ID
    	objectToSend.project_id = this.projectId;
    	
    	// Assessment Type
    	foundObjects = this.mainFormPanel.find('name','assessment_type');
	    if(foundObjects.length > 0) {
	    	objectToSend.assessment_type = foundObjects[0].getValue();
    	}
    	
    	// Project ID
    	var encodedContacts = new Array();
    	var count = this.mainFormPanel.localGrid.getStore().getCount();
    	for(var c = 0; c < count; c++) {
	    	var rec = this.mainFormPanel.localGrid.getStore().getAt(c);
	    	var tempObj = new Object();
	    	tempObj.contact_id = rec.get('contact_id');
	    	encodedContacts[c] =tempObj;
    	}    	
    	objectToSend.contacts = Ext.encode(encodedContacts);
    	
    	var ccString = "";
    	for(var c = 0; c < this.mainFormPanel.ccGrid.getStore().getCount(); c++) {
	    	var rec = this.mainFormPanel.ccGrid.getStore().getAt(c);
	    	if(ccString) {
		    	ccString = ccString + "," + rec.get('contact_id');
	    	} else {
		    	ccString = "" + rec.get('contact_id');
	    	}
    	}    	
    	objectToSend.cclist = ccString;
    	
    	objectToSend.ccops = false;
    	if(this.mainFormPanel.ccOpsCB.isVisible() && this.mainFormPanel.ccOpsCB.getValue()) {
	    	objectToSend.ccops = true;
    	}
    	
    	Ext.Ajax.request({
			url: 'RequestAssessment.ashx',
		    method: 'POST',
		    params: objectToSend,
		    failure: function() {
			    Ext.MessageBox.alert('Error','Submission Error');
		    },
		    success: function(response, opts) {
			    var jsonResponse = Ext.util.JSON.decode(response.responseText);
			    if(jsonResponse.success != null) {
			    	if(jsonResponse.success) {
				    	Ext.MessageBox.alert('Success','Assessment Updated');
				    	eto.ownerCt.remove(eto);
		    		} else if(!jsonResponse.success) {
				    	if(jsonResponse.rows) {
				    		Ext.Msg.alert('Failed', 'Assessment Update Failed...');
			    		}
		    		}
				} else {
		    		Ext.Msg.alert('Failed', 'Assessment Update Failed. No Success Flag.');
	    		}
		    }
		});
    },
    onFormReset: function() {
	    if(this.record) {
		    this.loadProject();
	    } else {
	    	var foundObjects = this.mainFormPanel.find('name', 'description');
	    	if(foundObjects.length > 0) {
		    	foundObjects[0].setValue('');
	    	}
	    	this.localGrid.getStore().removeAll();
    	}
    },
    onFormCancel: function() {
	    this.tabContainer.remove(this);
    }/*,
    onCopyAssessment: function() {
	    var eto = this;
    	var optionsStore = new Ext.data.Store({
			id: 'optionsStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetOptions.ashx', // File to connect to
				method: 'POST'
			}),
			baseParams:{"project_id": eto.projectId}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'option_id'
			}, [
				{name: 'option_id', type: "int", mapping: 'option_id'},
				{name: 'name', type: "string", mapping: 'name'}
			])
		});
		optionsStore.on('load', function(store, records, ops) {
			for(var counter = 0; counter < records.length; counter++) {
				if(records[counter].get('option_id') == eto.optionId) {
					store.remove(records[counter]);
				} else {
					var assessmentsArray = records[counter].json.assessments;
					var foundRightType = false;
					for(var c = 0; c < assessmentsArray.length; c++) {
						var assessment = assessmentsArray[c];
						if(assessment.assessment_type == eto.assessmentType) {
							foundRightType = true;
						}
					}
					if(!foundRightType) {
						store.remove(records[counter]);
					}
				}
			}
		});
		optionsStore.load();
		
		var myCombo = new Ext.form.ComboBox({
            width:200,
            store: optionsStore,
	        displayField:'name',
	        valueField: 'option_id',
	        //hiddenName:'biz_id',
	        fieldLabel: 'Select Option',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'select option',
	        selectOnFocus:true,
	        hiddenName: 'copy_from'
        });
    	var fp = new Ext.FormPanel({
	        width: 500,
	        //height: 140,
	        //anchor: '100%',
	        frame: true,
	        //title: 'File Upload Form',
	        autoHeight: true,
	        bodyStyle: 'padding: 10px 10px 0 10px;',
	        //bodyCls: 'cookBackground',
	        labelWidth: 110,
	        defaults: {
	            anchor: '95%',
	            allowBlank: false,
	            msgTarget: 'side'
	        },
	        items: [myCombo,{
	            xtype: 'hidden',
	            name: 'option_id',
	            value: eto.optionId
            }],
	        buttons: [{
	            text: 'COPY SETTINGS',
	            handler: function(){
	                if(fp.getForm().isValid()){
		                var objectToSend = new Object();
		                objectToSend.option_id = eto.optionId;
		                var copyObject = new Object();
		                copyObject.option_id = myCombo.getValue();
		                copyObject.assessment_type = eto.assessmentType;
		                copyObject = Ext.encode(copyObject)
		                objectToSend.copy_from = copyObject;
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
								    	Ext.MessageBox.alert('Success','Assessment Successfully Copied!');
								    	win.close();
								    	eto.onFormCancel();
						    		} else if(!jsonResponse.success) {
								    	if(jsonResponse.rows) {
								    		Ext.Msg.alert('Failed', 'Assessment Copy Failed...');
							    		}
						    		}
								} else {
						    		Ext.Msg.alert('Failed', 'Assessment Copy Failed. No Success Flag.');
					    		}
						    }
						});
	                }
	            }
	        }]
	    });
        var win = new Ext.Window({
	        //id: 'promptFileUpload-'+this.optionId,
            title: 'Copy Assessment Settings From Another Option',
            closeAction: 'close',
            width: 500,
            height: 140,
            layout: 'form',
            hidden: true,
            modal: true,
            items: [fp]
        });
        win.show();
    }*/
});