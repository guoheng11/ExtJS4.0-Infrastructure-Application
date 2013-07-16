MISTab = Ext.extend(Ext.Panel, {
	projectId: '',
	projectAppsGrid:'',
	appsGrid:'',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    this.ingredientForm = new MISPanel(this.projectId);
	    
	    Ext.apply(this, {
		    closable:true,
		    bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            title:'MIS',
            layout:'table',
            layoutConfig: {columns:2},
	        items: [this.ingredientForm]
		});
    	
		MISTab.superclass.initComponent.call(this);
		
		this.forceClose = false;
		this.originalValue = "";
		this.ingredientForm.on('contentLoaded', function() {
			eto.originalValue = eto.ingredientForm.getValueObject();
		});
		this.on('beforeclose', function() {
	    	if(!this.forceClose) {
		    	var newValue = eto.ingredientForm.getValueObject();
		    	var str1 = Ext.encode(eto.originalValue);
		    	var str2 = Ext.encode(newValue);
		    	if(str1 != str2) {
					Ext.Msg.show({
					   title:'Save Changes?',
					   msg: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
					   buttons: Ext.Msg.YESNOCANCEL,
					   fn: function(buttonId) {
						   if(buttonId == "yes") {
							   eto.forceClose = true;
							   eto.ingredientForm.submitIngredients(true);
							   eto.tabContainer.remove(eto);
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
    },
    
    constructor: function(tabCont,projId) {
		this.projectId = projId;
		this.tabContainer = tabCont;
		MISTab.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	return objectToSend;
	}
});

MISPanel = Ext.extend(Ext.Panel, {
	mis_update_id: null,
	initComponent:function() {
		var eto = this;
		
		var saveIngredientHandler = function(button, event) {
	    	if(event) {
		        eto.submitIngredients(false);
    		}
		};
		this.addEvents('contentLoaded');
		
		this.misStore = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url: 'GetProjectMIS.ashx', // File to connect to
				method: 'GET'
			}),
			baseParams: {"project_id": this.projectId},
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'dates', mapping: 'dates'},
				{name: 'MIS', mapping: 'MIS'}
			])
		});
		
		this.misStore.on('load', function(store, recs) {
			if(recs.length > 0) {
				// dates
				var dates = recs[0].data.dates;
				for(var a in dates) {
					var foundEl = eto.find('name', a);
					if(foundEl instanceof Array) {
						if(foundEl.length > 0) {
							if(foundEl[0] instanceof Ext.form.DisplayField) {
								foundEl[0].setValue(dates[a]);
							}
						}
					}
				}
				// MIS
				var misStuff = recs[0].data.MIS;
				if(misStuff instanceof Array) {
					if(misStuff.length > 0) {
						var mainMis = misStuff[0];
						eto.mis_update_id = mainMis.mis_update_id;
						eto.descTextArea.setValue(mainMis.description);
						eto.dnisUpdateGrid.loadValues(mainMis.dnis_updates);
						eto.distUpdateGrid.loadValues(mainMis.distibution_updates);
					}
				}
			}
			eto.fireEvent('contentLoaded', this);
		});
		
		this.dnisUpdateGrid = new MISDnisUpdateGrid();
		this.distUpdateGrid = new MISDistributionGrid();
		this.descTextArea = new Ext.form.TextArea({
            width: 300,
            height: 40,
		    fieldLabel: 'Description',
		    name: 'description'
        });
		Ext.apply(this, {
		    labelWidth: 120,
		    bodyStyle:'padding:5px 5px 0; background-color: #D3E1F1;',
		    border: false,
		    bodyBorder: false,
		    width: 1015,
		    frame: false,
		    defaultType: '',
		    layout: 'form',
		    items: [{
			    xtype: 'button',
	            text: 'Save',
	            style: 'margin-bottom: 5px;',
	            width: 70,
	            iconCls: 'save',
	            handler : saveIngredientHandler
            },{
                xtype: 'displayfield',
                width: 300,
  		    	fieldLabel: 'Quoted UAT Date',
  		    	name: 'quoted_uat'
            },{
                xtype: 'displayfield',
                width: 300,
  		    	fieldLabel: 'Target UAT Date',
  		    	name: 'target_uat'
            },{
                xtype: 'displayfield',
                width: 300,
                format: 'Y/m/d',
  		    	fieldLabel: 'Production Date',
  		    	name: 'production_date'
            }, this.descTextArea, this.dnisUpdateGrid, this.distUpdateGrid, {
		        xtype: 'hidden',
		        name: 'mis_update_id'
	        }]
	    });
	    
	    this.misStore.load();
	    
	    MISPanel.superclass.initComponent.call(this);
    },
    constructor: function(projId,readOnly) {
		this.projectId = projId;
		if(readOnly) {
			this.readOnly = true;
		} else {
			this.readOnly = false;
		}
		MISPanel.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    var errorHappened = true;
	    objectToSend.project_id = this.projectId;
	    objectToSend.mis_update_id = this.mis_update_id;
	    objectToSend.description = this.descTextArea.getValue();
	    var updateGridValues = this.dnisUpdateGrid.getValues();
	    if(!(updateGridValues instanceof Array)) {
		    Ext.MessageBox.alert('Error',updateGridValues);
		    return "error";
	    }
	    objectToSend.dnis_updates = Ext.encode(updateGridValues);
	    
	    var distUpdateValues = this.distUpdateGrid.getValues();
	    if(!(distUpdateValues instanceof Array)) {
		    Ext.MessageBox.alert('Error',distUpdateValues);
		    return "error";
	    }
	    objectToSend.distibution_updates = Ext.encode(distUpdateValues);
	    
	    //var secondInner = this.getForm().getFieldValues();
	    //objectToSend.systems_ingredients.push(secondInner);
	    //objectToSend.systems_ingredients = Ext.encode(objectToSend.systems_ingredients);
    	return objectToSend;
	},
    submitIngredients: function(skipReload) {
	    var eto = this;
	    var objectToSend = this.getValueObject();
	    if(objectToSend != "error") {
	    	Ext.Ajax.request({
				url: 'UpdateProjectMIS.ashx',
			    method: 'POST',
			    params: objectToSend,
			    failure: function() {
				    Ext.MessageBox.alert('Error','Submission Error');
			    },
			    success: function(response, opts) {
				    var jsonResponse = Ext.util.JSON.decode(response.responseText);
				    if(jsonResponse.success != null) {
				    	if(jsonResponse.success) {
					    	Ext.MessageBox.alert('Success','Submission Successfull');
					    	if(skipReload == false) {
					    		eto.misStore.reload();
				    		}
			    		} else if(!jsonResponse.success) {
					    	if(jsonResponse.rows) {
					    		Ext.Msg.alert('Failed', 'Submission Failed');
				    		}
			    		}
					} else {
			    		Ext.Msg.alert('Failed', 'Submission Failed. No Success Flag.');
		    		}
			    }
			});
		}
	}
});