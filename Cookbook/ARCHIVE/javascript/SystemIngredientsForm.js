SystemIngredientsFrame = Ext.extend(Ext.Panel, {
	projectId: '',
	projectAppsGrid:'',
	appsGrid:'',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    this.ingredientForm = new SystemIngredientsForm(this.projectId);
	    
	    Ext.apply(this, {
		    closable:true,
		    bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            title:'System Ingredients',
            layout:'table',
            layoutConfig: {columns:2},
	        items: [this.ingredientForm]
		});
    	
		SystemIngredientsFrame.superclass.initComponent.call(this);
		
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
		SystemIngredientsFrame.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	return objectToSend;
	}
});

SystemIngredientsForm = Ext.extend(Ext.FormPanel, {
	initComponent:function() {
		var eto = this;
		var grammarTypeArray = [
			['Press or Say'],
			['Hotword'],
			['NDM']
		];
		
		var storeGrammarType = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'grammar_name', type: 'string'}
		    ],
	        data : grammarTypeArray
	    });
	    
		var existingGrammarTypesCB = new Ext.ux.form.LovCombo({
			readOnly: this.readOnly,
			fieldLabel: 'Existing Grammar Types',
			valueField: "grammar_name",
			mode: "local",
			triggerAction: "all",
			displayField: "grammar_name",
			emptyText: "select grammar types...",
			name: 'existing_grammar_types',
			store: storeGrammarType
		});
		var newGrammarTypesCB = new Ext.ux.form.LovCombo({
			readOnly: this.readOnly,
			fieldLabel: 'Updated Grammar Types',
			name: 'updated_grammar_types',
			valueField: "grammar_name",
			mode: "local",
			triggerAction: "all",
			displayField: "grammar_name",
			emptyText: "select grammar types...",
			store: storeGrammarType
		});
		
		var saveIngredientHandler = function(button, event) {
	    	if(event) {
		        eto.submitIngredients(false);
    		}
		};
		this.addEvents('contentLoaded');
		
		
		Ext.apply(this, {
		    labelWidth: 180, // label settings here cascade unless overridden
		    frame:true,
		    title: 'System Ingredients',
		    bodyStyle:'padding: 10px; margin-left: 10px;',
		    width: 550,
		    defaults: {width: 300},
		    defaultType: 'checkbox',
		    tbar: (!this.readOnly) ? new Ext.Toolbar({
			    style: 'border: 1px solid; border-color: #99BBE8;',
			    items: [{
		            text: 'Save',
		            iconCls: 'save',
		            handler : saveIngredientHandler
	            }] 
            }) : null,
		    items: [{
			    disabled: this.readOnly,
		        fieldLabel: 'Apps Use Speech Recognition',
		        name: 'apps_use_speech_rec'
	        },{
		        disabled: this.readOnly,
		        fieldLabel: 'New Speech Recognition',
		        name: 'new_speech_rec'
	        },{
		        disabled: this.readOnly,
		        fieldLabel: 'New Host Connectivity',
		        name: 'new_host_connectivity'
	        },{
		        disabled: this.readOnly,
		        fieldLabel: 'Existing Host Connectivity',
		        name: 'existing_host_connectivity'
	        },{
		        disabled: this.readOnly,
		        fieldLabel: 'New Backend Database',
		        name: 'new_backend_db'
	        },{
		        disabled: this.readOnly,
		        fieldLabel: 'Existing Backend Database',
		        name: 'existing_backend_db'
	        },{
		        disabled: this.readOnly,
		        fieldLabel: 'TTS Required',
		        name: 'tts_required'
	        }, existingGrammarTypesCB, newGrammarTypesCB, {
		        xtype: 'hidden',
		        name: 'sys_update_id'
	        }]
	    });
	    this.reloadIngredients();
	    
	    SystemIngredientsForm.superclass.initComponent.call(this);
    },
    constructor: function(projId,readOnly) {
		this.projectId = projId;
		if(readOnly) {
			this.readOnly = true;
		} else {
			this.readOnly = false;
		}
		SystemIngredientsForm.superclass.constructor.call(this);
    },
    reloadIngredients: function() {
	    var eto = this;
	    Ext.Ajax.request({
			url: 'GetSystemsIngredients.ashx',
		    method: 'POST',
		    params: {"project_id": this.projectId},
		    failure: function() {
			    Ext.MessageBox.alert('Error','Error Getting System Ingredients (failure)');
		    },
		    success: function(response, opts) {
			    var jsonResponse = Ext.util.JSON.decode(response.responseText);
			    var responseCorrect = false;
			    if(jsonResponse.rows instanceof Array) {
				    if(jsonResponse.rows.length > 0) {
					    if(jsonResponse.rows[0] instanceof Array) {
						    responseCorrect = true;
							if(jsonResponse.rows[0].length > 0) {
								var formObject = jsonResponse.rows[0][0];
								eto.getForm().setValues(formObject);
							}
						}
					}
				}
				if(!responseCorrect) {
					Ext.MessageBox.alert('Error','Error Getting System Ingredients (response in wrong format)');
				}
			    eto.fireEvent('contentLoaded', this);
		    }
		});
	},
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    objectToSend.project_id = this.projectId;
	    objectToSend.systems_ingredients = new Array();
	    var secondInner = this.getForm().getFieldValues();
	    objectToSend.systems_ingredients.push(secondInner);
	    objectToSend.systems_ingredients = Ext.encode(objectToSend.systems_ingredients);
    	return objectToSend;
	},
    submitIngredients: function(skipReload) {
	    var eto = this;
	    var objectToSend = this.getValueObject();
	    //var gridStore = this.getStore();
    	Ext.Ajax.request({
			url: 'UpdateSystemsIngredients.ashx',
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
				    		eto.reloadIngredients();
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
});