PromptSummaryFrame = Ext.extend(Ext.Panel, {
	optionId: '',
	sumContainer: '',
	labelPanel: '',
	addLanguageButton: '',
	getLanguagesStore: '',
	languageCB: '',
	promptsGrid: '',
	promptInfoStore: '',
	saveButton: '',
	copyButton: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    //Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    
		this.languageCB = new Ext.form.ComboBox({
            width:200,
            cls: 'padding: 20',
            allowBlank: 'false',
            store: this.getLanguagesStore,
	        displayField:'language',
	        typeAhead: true,
	        mode: 'local',
	        editable: 'false',
	        //forceSelection: true,
	        triggerAction: 'all',
	        emptyText:'select language',
	        //lazyRender:true,
	        selectOnFocus:true,
	        hideLabel: true
    	});
		this.labelPanel = new PromptSummaryPanel(this.optionId);
		//this.labelPanel.disable();
		this.sumContainer = new Ext.Container({
			layout: 'table',
			colspan: 2,
			layoutConfig: {
			    columns: 99
			},
			items: [this.labelPanel]
		});
		
		var PromptSummary = Ext.data.Record.create([
	    	{name: 'wav_format', type: 'boolean'},
            {name: 'alt_format', type: 'boolean'},
            {name: 'cd_required', type: 'boolean'},
            {name: 'translation_needs_approval', type: 'boolean'},
            {name: 'translation_required', type: 'boolean'},
            {name: 'cd_mailing_address', type: 'string'},
            {name: 'recording_studio', type: 'string'},
            {name: 'order_type', type: 'string'},
            {name: 'converted_format', type: 'string'},
            {name: 'conv_delivery_method', type: 'string'},
            {name: 'rec_sessions', type: 'int'},
            {name: 'conv_sessions', type: 'int'},
            {name: 'rec_prompt_count', type: 'int'},
            {name: 'prompts_billed', type: 'int'},
            {name: 'prompts_provided', type: 'int'},
            {name: 'prompts_converted', type: 'int'},
            {name: 'prompts_translated', type: 'int'},
            {name: 'words_translated', type: 'int'},
            {name: 'setup_fee', type: 'float'},
            {name: 'prompt_fee', type: 'float'},
            {name: 'conversion_setup_fee', type: 'float'},
            {name: 'conversion_prompt_fee', type: 'float'},
            {name: 'translation_fee_minimum', type: 'float'},
            {name: 'translation_fee_word', type: 'float'},
            {name: 'transfer_fee', type: 'float'},
            {name: 'cd_fee', type: 'float'},
            {name: 'fee_formula', type: 'string'},
            {name: 'language', type: 'string'}
      	]);
      	var addLanguageHandler = function(button, event) {
	    	if(event) {
		    	var selectedValue = eto.languageCB.getValue();
		    	if(selectedValue == "Other") {
			    	Ext.MessageBox.prompt('New Language', 'Language Name:', function(btn, text) {
				    	if(btn == 'ok') {
					    	Ext.MessageBox.confirm('Confirm', 'Are you sure you want to add a new language called <b>' + text + '</b>?', function(btn2) {
						    	if(btn2 == 'yes') {
							    	Ext.Ajax.request({
										url: 'AddPromptLanguage.ashx',
									    method: 'POST',
									    params: {language: text},
									    failure: function() {
										    Ext.MessageBox.alert('Error','Submission Error');
									    },
									    success: function(response, opts) {
										    var jsonResponse = Ext.util.JSON.decode(response.responseText);
										    if(jsonResponse.success != null) {
										    	if(jsonResponse.success) {
											    	eto.getLanguagesStore.reload();
											    	var count = eto.sumContainer.items.length;
											    	var languageExists = false;
											    	for(var c = 0; c < count; c++) {
												    	var sumPanel = eto.sumContainer.getComponent(c);
												    	if(sumPanel.language == text) {
													    	languageExists = true;
												    	}
											    	}
											    	if(!languageExists) {
												    	var newRec = new PromptSummary({
										                    wav_format: false,
										                    alt_format: false,
										                    cd_required: false,
										                    cd_mailing_address: '',
										                    recording_studio: '',
										                    order_type: '',
										                    converted_format: '',
										                    conv_delivery_method: '',
										                    rec_sessions: 0,
										                    conv_sessions: 0,
										                    rec_prompt_count: 0,
										                    prompts_billed: 0,
										                    prompts_provided: 0,
										                    prompts_converted: 0,
										                    setup_fee: 0,
										                    prompt_fee: 0,
										                    conversion_setup_fee: 0,
										                    conversion_prompt_fee: 0,
										                    translation_fee_minimum: 0,
										                    translation_fee_word: 0,
										                    transfer_fee: 0,
										                    cd_fee: 0,
										                    fee_formula: '',
										                    language: text
										                });
										                if(eto.labelPanel.language == '') {
											                eto.labelPanel.enable();
											                eto.labelPanel.setLanguage(text);
										                } else {
										                	var newPanel = new PromptSummaryPanel(eto.optionId,newRec);
										                	newPanel.language = text;
										                	eto.sumContainer.add(newPanel);
									                	}
										                eto.doLayout();
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
				    	}
			    	});
		    	}
		    	else if(selectedValue != '') {
			    	//Ext.Msg.alert('Value', 'Val:'+selectedValue);
			    	var count = eto.sumContainer.items.length;
			    	var languageExists = false;
			    	for(var c = 0; c < count; c++) {
				    	var sumPanel = eto.sumContainer.getComponent(c);
				    	if(sumPanel.language == selectedValue) {
					    	languageExists = true;
				    	}
			    	}
			    	if(!languageExists) {
				    	var newRec = new PromptSummary({
		                    wav_format: false,
		                    alt_format: false,
		                    cd_required: false,
		                    cd_mailing_address: '',
		                    recording_studio: '',
		                    order_type: '',
		                    converted_format: '',
		                    conv_delivery_method: '',
		                    rec_sessions: 0,
		                    conv_sessions: 0,
		                    rec_prompt_count: 0,
		                    prompts_billed: 0,
		                    prompts_provided: 0,
		                    prompts_converted: 0,
		                    setup_fee: 0,
		                    prompt_fee: 0,
		                    conversion_setup_fee: 0,
		                    conversion_prompt_fee: 0,
		                    translation_fee_minimum: 0,
		                    translation_fee_word: 0,
		                    transfer_fee: 0,
		                    cd_fee: 0,
		                    fee_formula: '',
		                    language: selectedValue
		                });
		                if(eto.labelPanel.language == '') {
			                eto.labelPanel.enable();
			                eto.labelPanel.setLanguage(selectedValue);
		                } else {
		                	var newPanel = new PromptSummaryPanel(eto.optionId,newRec);
		                	newPanel.language = selectedValue;
		                	eto.sumContainer.add(newPanel);
	                	}
		                eto.doLayout();
	                }
                }
    		}
		};
	    this.addLanguageButton = new Ext.Button({
		    text: "Add New Language Column",
		    iconCls: "add",
		    handler: addLanguageHandler,
		    style: 'padding-bottom: 10'
	    });
	    var saveHandler = function(button, event) {
	    	if(event) {
		    	eto.submitThis(eto);
    		}
		};
	    this.saveButton = new Ext.Button({
		    text: "Save Changes",
		    iconCls: "save",
		    scale: 'medium',
		    handler: saveHandler,
		    style: 'padding-top: 10'
	    });
	    
	    var copyHandler = function(button, event) {
	    	if(event) {
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
				optionsStore.load();
				optionsStore.on('load', function(store, records, ops) {
					for(var counter = 0; counter < records.length; counter++) {
						if(records[counter].get('option_id') == eto.optionId) {
							store.remove(records[counter]);
						}
					}
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
			        items: [{
				        xtype: 'combo',
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
			        },{
			            xtype: 'hidden',
			            name: 'option_id',
			            value: eto.optionId
		            }],
			        buttons: [{
			            text: 'COPY SETTINGS',
			            handler: function(){
			                if(fp.getForm().isValid()){
				                var thisForm = fp.getForm();
				                thisForm.submit({
				                    url: 'UpdatePromptLists.ashx',
				                    waitMsg: 'Copying Settings...',
				                    success: function(fpo, o) {
					                    win.hide();
					                    fp.getForm().reset();
						                eto.reloadInfo();
						                if(eto.promptsGrid) {
									    	eto.promptsGrid.reloadInfo();
								    	}
				                        Ext.Msg.alert('Success', 'Done');
				                    },
				                    failure: function(fpo, o) {
					                    var serverMessage = "";
					                    if(o.result.rows instanceof Array) {
						                    serverMessage = "<br>Server\'s error message:";
						                    var arrlen = o.result.rows.length;
						                    for(var cnt = 0; cnt < arrlen; cnt++) {
												serverMessage = serverMessage + "<br>>" + o.result.rows[cnt];
											}
							    		}
					                    Ext.Msg.alert('Failed To Copy', 'Copying prompt settings from another option will erase your current prompt settings for the language columns that exist in both options. Please <b>delete those prompt language columns</b> and <b>Save Changes</b> if you really need to copy settings from another option.'+serverMessage);
				                    }
				                });
			                }
			            }
			        }]
			    });
		        var win = new Ext.Window({
			        //id: 'promptFileUpload-'+this.optionId,
		            title: 'Copy Prompt Settings From Another Option',
		            closeAction: 'close',
		            width: 500,
		            height: 140,
		            layout: 'form',
		            hidden: true,
		            modal: true,
		            items: [fp]
		        });
		        win.show();
    		}
		};
	    this.copyButton = new Ext.Button({
		    text: "Copy Prompt Settings",
		    iconCls: "perform",
		    scale: 'medium',
		    handler: copyHandler,
		    style: 'padding-top: 10'
	    });
	    
	    Ext.apply(this, {
		    frame:true,
		    bodyStyle: 'padding:10 10;',
            collapsible: true,
            layout: 'table',
            layoutConfig: {
			    columns: 2
			},
            title:'Prompt Summary',
	        items: [this.addLanguageButton,this.languageCB,this.sumContainer,this.saveButton,this.copyButton]
		});
    	this.on('afterrender', function() {
	    	var myMask = new Ext.LoadMask(this.ownerCt.el, {msg:"Loading Prompt Information..."});
			myMask.show();
	    	this.promptInfoStore = new Ext.data.Store({
				id: 'promptInfoStore',
				proxy: new Ext.data.HttpProxy({
					url: 'GetPromptLists.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"option_id": eto.optionId}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total'
				}, [
					{name: 'wav_format', type: 'boolean'},
		            {name: 'alt_format', type: 'boolean'},
		            {name: 'cd_required', type: 'boolean'},
		            {name: 'translation_needs_approval', type: 'boolean'},
		            {name: 'translation_required', type: 'boolean'},
		            {name: 'cd_mailing_address', type: 'string'},
		            {name: 'recording_studio', type: 'string'},
		            {name: 'order_type', type: 'string'},
		            {name: 'converted_format', type: 'string'},
		            {name: 'conv_delivery_method', type: 'string'},
		            {name: 'rec_sessions', type: 'int'},
		            {name: 'conv_sessions', type: 'int'},
		            {name: 'rec_prompt_count', type: 'int'},
		            {name: 'prompts_billed', type: 'int'},
		            {name: 'prompts_provided', type: 'int'},
		            {name: 'prompts_converted', type: 'int'},
		            {name: 'prompts_translated', type: 'int'},
		            {name: 'words_translated', type: 'int'},
		            {name: 'setup_fee', type: 'float'},
		            {name: 'prompt_fee', type: 'float'},
		            {name: 'conversion_setup_fee', type: 'float'},
		            {name: 'conversion_prompt_fee', type: 'float'},
		            {name: 'translation_fee_minimum', type: 'float'},
		            {name: 'translation_fee_word', type: 'float'},
		            {name: 'transfer_fee', type: 'float'},
		            {name: 'cd_fee', type: 'float'},
		            {name: 'fee_formula', type: 'string'},
		            {name: 'language', type: 'string'},
		            {name: 'option_id', type: 'int'}
				])
			});
			
			this.promptInfoStore.on('load', function() {
				eto.resetSummary(eto);
				var count = eto.promptInfoStore.getTotalCount();
				for(var c = 0; c < count; c++) {
					var newRec = eto.promptInfoStore.getAt(c);
					if(eto.labelPanel.language == '') {
		                eto.labelPanel.loadRecord(newRec);
	                } else {
	                	var newPanel = new PromptSummaryPanel(eto.optionId,newRec);
	                	//newPanel.language = selectedValue;
	                	eto.sumContainer.add(newPanel);
	                	eto.doLayout();
                	}
            	}
            	myMask.hide();
				/*if(count > 0) {
					var record = promptInfoStore.getAt(0);
					var countReal = record.json.length;
					for(var c = 0; c < countReal; c++) {
						var newRec = new PromptSummary(record.json[c]);
						if(eto.labelPanel.language == '') {
			                eto.labelPanel.loadRecord(newRec);
		                } else {
		                	var newPanel = new PromptSummaryPanel(eto.optionId,newRec);
		                	//newPanel.language = selectedValue;
		                	eto.sumContainer.add(newPanel);
		                	eto.doLayout();
	                	}
					}
					//eto.loadProject();
				}*/
			});
			
			this.promptInfoStore.load();
		});
		PromptSummaryFrame.superclass.initComponent.call(this);
    },
    
    constructor: function(projId,optId, langStore) {
	    this.projectId = projId;
		this.optionId = optId;
		this.getLanguagesStore = langStore;
		PromptSummaryFrame.superclass.constructor.call(this);
    },
    resetSummary: function() {
	    this.labelPanel = new PromptSummaryPanel(this.optionId);
	    //this.labelPanel.disable();
		this.sumContainer.removeAll();
		this.sumContainer.add(this.labelPanel);
		this.doLayout();
	},
    setPromptsGrid: function(grid) {
		this.promptsGrid = grid;
	},
	reloadInfo: function() {
		this.promptInfoStore.reload();
	},
    submitThis: function() {
	    var eto = this;
	    var objectToSend = new Object();
	    var promptLists = new Array();
	    var count = this.sumContainer.items.length;
	    for(var c = 0; c < count; c++) {
	    	var sumPanel = this.sumContainer.getComponent(c);
	    	var valObj = sumPanel.getValueObject();
	    	if(valObj != '') {
	    		promptLists[c] = valObj;
    		}
    	}
    	promptLists = Ext.encode(promptLists)
    	objectToSend.prompt_lists = promptLists;
    	objectToSend.option_id = this.optionId;
    	Ext.Ajax.request({
			url: 'UpdatePromptLists.ashx',
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
				    	if(eto.promptsGrid) {
					    	eto.promptsGrid.reloadInfo();
				    	}
				    	//eto.ownerCt.remove(eto);
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
	},
	loadRecord: function() {
    }
});

PromptSummaryPanel = Ext.extend(Ext.form.FormPanel, {
	hideLabels: false,
	record: '',
	language: '',
	optionId: '',
	recordingSessionsTF: '',
    conversionSessionsTF: '',
    promptsToRecordTF: '',
    promptsBilledTF: '',
    promptsProvidedInWAVTF: '',
    promptsToConvertTF: '',
    digitizedDF: '',
    setupFeeDF: '',
    promptFeeDF: '',
    conversionSetupFeeDF: '',
    conversionPromptFeeDF: '',
    transferFeeDF: '',
    translationFeeMinDF: '',
    translationFeeWordDF: '',
    cdFeeDF: '',
    totalRecordingFeeDF: '',
    translationCB: '',
    translationApprovalCB: '',
    translationPanel: '',
    
    initComponent:function() {
	    var eto = this;
	    var shippingData = [
	    	['Standard'],
	    	['Next Business Day'],
	    	['Same Day']
	    ];
	    var shippingStore = new Ext.data.SimpleStore({
		    fields: ['type'],
		    data : shippingData
		});
		var feeFormulaData = [
	    	['English'],
	    	['European'],
	    	['Middle Eastern/Asian'],
	    	['Custom']
	    ];
	    var feeFormulaStore = new Ext.data.SimpleStore({
		    fields: ['type'],
		    data : feeFormulaData
		});
	    var removeHandler = function(button, event) {
	    	if(event) {
		    	if(eto.hideLabels) {
			    	eto.ownerCt.remove(eto);
		    	} else {
			    	eto.removeValues();
		    	}
    		}
		};
		
		var resetHandler = function(button, event) {
	    	if(event) {
		    	if(eto.hideLabels) {
			    	eto.resetValues();
		    	} else {
			    	eto.resetValues();
			    	eto.language = '';
		    	}
		    	eto.calculateROValues(eto);
    		}
		};
		var cbheight = 25;
		this.cdCB = new Ext.form.Checkbox({
			inputValue: 'true',
			height: cbheight,
			fieldLabel: 'CD Required',
            name: 'cd_required'
        });
        this.translationCB = new Ext.form.Checkbox({
			inputValue: 'true',
			height: cbheight,
			fieldLabel: 'Translation Required',
            name: 'translation_required'
        });
        this.translationApprovalCB = new Ext.form.Checkbox({
			inputValue: 'true',
			disabled: true,
			height: cbheight,
			fieldLabel: 'Translation Needs Approval',
            name: 'translation_needs_approval'
        });
		this.digitizedDF = new Ext.form.DisplayField({
	        fieldLabel: 'Prompts To Be Digitized',
            style: 'padding:3px 3px 3px 0;',
            value: 0
		});
		this.setupFeeDF = new Ext.ux.dollarField({
	        fieldLabel: 'Setup Fee',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
	        listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            style: 'padding:3px 3px 3px 0;',
            name: 'setup_fee',
            value: 0
		});
		this.promptFeeDF = new Ext.ux.dollarField({
	        fieldLabel: 'Prompt Fee',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
	        listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            style: 'padding:3px 3px 3px 0;',
            name: 'prompt_fee',
            value: 0
		});
		this.conversionSetupFeeDF = new Ext.ux.dollarField({
	        fieldLabel: 'Conversion Setup Fee',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
            style: 'padding:3px 3px 3px 0;',
            listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            name: 'conversion_setup_fee',
            value: 0
		});
		this.conversionPromptFeeDF = new Ext.ux.dollarField({
	        fieldLabel: 'Conversion Prompt Fee',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
            style: 'padding:3px 3px 3px 0;',
            listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            name: 'conversion_prompt_fee',
            value: 0
		});
		this.translationFeeMinDF = new Ext.ux.dollarField({
	        fieldLabel: 'Translation Fee - Minimum',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
            style: 'padding:3px 3px 3px 0;',
            listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            name: 'translation_fee_minimum',
            value: 0
		});
		this.translationFeeWordDF = new Ext.ux.dollarField({
	        fieldLabel: 'Translation Fee - Per Word',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
            style: 'padding:3px 3px 3px 0;',
            listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            name: 'translation_fee_word',
            value: 0
		});
		this.transferFeeDF = new Ext.ux.dollarField({
	        fieldLabel: 'Transfer Fee',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
            style: 'padding:3px 3px 3px 0;',
            listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            name: 'transfer_fee',
            value: 0
		});
		this.cdFeeDF = new Ext.ux.dollarField({
	        fieldLabel: 'CD Fee',
	        disabled: true,
	        allowNegative: false,
	        allowDecimals: true,
	        autoStripChars: true,
	        decimalPrecision: 2,
            style: 'padding:3px 3px 3px 0;',
            listeners: {
	            "blur": function(field) {
		            eto.calculateROValues(eto);
	            }
            },
            name: 'cd_fee',
            value: 0
		});
		this.totalRecordingFeeDF = new Ext.form.DisplayField({
	        fieldLabel: 'Total Recording Fee',
            style: 'padding:3px 3px 3px 0;',
            value: 0
		});
		this.promptsToTranslateTF = new Ext.form.TextField({
	        fieldLabel: 'Prompts to Translate',
	        maskRe: /[0-9]/,
	        disabled: true,
            name: 'prompts_translated',
            enableKeyEvents: true,
            value: 0
        });
        this.wordsToTranslateTF = new Ext.form.TextField({
	        fieldLabel: 'Words to Translate',
	        maskRe: /[0-9]/,
	        disabled: true,
            name: 'words_translated',
            enableKeyEvents: true,
            value: 0
        });
		this.promptsToRecordTF = new Ext.form.TextField({
	        fieldLabel: 'Prompts to Record',
	        maskRe: /[0-9]/,
            name: 'rec_prompt_count',
            enableKeyEvents: true,
            value: 0
        });
        this.promptsProvidedInWAVTF = new Ext.form.TextField({
            fieldLabel: 'Prompts Provided by Customer',
	        maskRe: /[0-9]/,
            name: 'prompts_provided',
            enableKeyEvents: true,
            value: 0
        });
        this.recordingSessionsTF = new Ext.form.TextField({
            fieldLabel: 'Recording Sessions',
	        maskRe: /[0-9]/,
            name: 'rec_sessions',
            value: 0,
            enableKeyEvents: true
        });
        this.conversionSessionsTF = new Ext.form.TextField({
            fieldLabel: 'Conversion Sessions',
	        maskRe: /[0-9]/,
            name: 'conv_sessions',
            value: 0,
            enableKeyEvents: true
        });
        this.promptsBilledTF = new Ext.form.TextField({
            fieldLabel: 'Prompts Billed',
	        maskRe: /[0-9]/,
            name: 'prompts_billed',
            value: 0,
            enableKeyEvents: true
        });
        this.promptsToConvertTF = new Ext.form.TextField({
            maskRe: /[0-9]/,
	        fieldLabel: 'Prompts to Convert',
            name: 'prompts_converted',
            value: 0,
            enableKeyEvents: true
        });

        this.orderTypeCB = new Ext.form.ComboBox({
            store: shippingStore,
	        displayField:'type',
	        typeAhead: true,
	        mode: 'local',
	        //editable: 'false',
	        triggerAction: 'all',
	        emptyText:'select Order...',
	        selectOnFocus:true,
	        fieldLabel: 'Order Type',
            name: 'order_type'
        });
        this.feeFormulaCB = new Ext.form.ComboBox({
            store: feeFormulaStore,
	        displayField:'type',
	        typeAhead: true,
	        mode: 'local',
	        //editable: 'false',
	        triggerAction: 'all',
	        emptyText:'select formula...',
	        selectOnFocus:true,
	        fieldLabel: 'Fee Formula',
            name: 'fee_formula'
        });
        
        this.promptsToTranslateTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.wordsToTranslateTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsToRecordTF.on('change', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsProvidedInWAVTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsProvidedInWAVTF.on('change', function() {
	        eto.calculateROValues(eto);
        });
        this.recordingSessionsTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.recordingSessionsTF.on('change', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsBilledTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsBilledTF.on('change', function() {
	        eto.calculateROValues(eto);
        });
        this.conversionSessionsTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.conversionSessionsTF.on('change', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsToConvertTF.on('keyup', function() {
	        eto.calculateROValues(eto);
        });
        this.promptsToConvertTF.on('change', function() {
	        eto.calculateROValues(eto);
        });
        this.cdCB.on('check', function() {
	        eto.calculateROValues(eto);
        });
        this.translationCB.on('check', function(checkbox, checked) {
	        if(checked) {
		        eto.showTranslationStuff(true,eto);
	        } else {
		        eto.showTranslationStuff(false,eto);
	        }
	        eto.calculateROValues(eto);
        });
        this.translationApprovalCB.on('check', function() {
        });
        this.orderTypeCB.on('select', function() {
	        eto.calculateROValues(eto);
        });
        this.feeFormulaCB.on('select', function() {
	        eto.calculateROValues(eto);
        });
	    Ext.apply(this, {
		    frame:true,
		    disabled: true,
		    bodyStyle: 'padding:10 10;',
		    layout: 'form',
		    labelWidth: 250,
		    defaults: {
			    hideLabel: this.hideLabels,
			    width: 150
		    },
            collapsible: true,
	        items: [{
		        xtype: 'displayfield',
		        fieldLabel: 'Language',
                name: 'language',
                style: 'padding:3px 3px 3px 0;'
            },{
	            xtype: 'checkbox',
		        fieldLabel: 'Wave Format',
		        height: cbheight,
                name: 'wav_format',
                inputValue: 'true'
            },{
	            xtype: 'checkbox',
		        fieldLabel: 'Alternative Format',
		        height: cbheight,
                name: 'alt_format',
                inputValue: 'true'
	        },
	        this.translationCB,
	        this.translationApprovalCB,
	        this.promptsToTranslateTF,
	        this.wordsToTranslateTF,
	        this.cdCB,{
	            xtype: 'textarea',
	            height: 60,
	            preventScrollbars: true,
		        fieldLabel: 'CD Mailing Address',
                name: 'cd_mailing_address'
	        },{
	            xtype: 'textfield',
		        fieldLabel: 'Recording Studio',
                name: 'recording_studio'
	        },this.orderTypeCB,{
	            xtype: 'textfield',
		        fieldLabel: 'Converted Format',
                name: 'converted_format'
	        },{
	            xtype: 'textfield',
		        fieldLabel: 'Delivery Method of Converted Prompts',
                name: 'conv_delivery_method'
	        },
	        this.recordingSessionsTF,
	        this.conversionSessionsTF,
	        this.promptsToRecordTF,
	        this.promptsBilledTF,
	        this.promptsProvidedInWAVTF,
	        this.promptsToConvertTF,
	        this.digitizedDF,
	        this.feeFormulaCB,
	        this.setupFeeDF,
	        this.promptFeeDF,
	        this.conversionSetupFeeDF,
	        this.conversionPromptFeeDF,
	        this.translationFeeMinDF,
	        this.translationFeeWordDF,
	        this.transferFeeDF,
	        this.cdFeeDF,
	        this.totalRecordingFeeDF,
	        {
		        layout: 'column',
		        style: 'padding: 2',
		        items: [{
		            xtype: 'button',
		            iconCls: 'remove',
			        text: 'Remove',
	                name: 'removeButton',
	                handler: removeHandler,
	                //disabled: !this.hideLabels,
	                style: 'padding-right: 5'
		        },{
		            xtype: 'button',
		            iconCls: 'reset',
			        text: 'Reset',
	                name: 'resetButton',
	                handler: resetHandler,
	                style: 'padding-left: 5'
		        }]
	        }]
		});
		PromptSummaryPanel.superclass.initComponent.call(this);
		this.on('afterrender', function() {
			if(eto.record instanceof Ext.data.Record) {
				eto.loadRecord(eto.record);
			}
		});
    },
    
    constructor: function(optionId,record) {
	    this.optionId = optionId;
		if(record instanceof Ext.data.Record) {
			this.hideLabels = true;
			this.record = record;
		}
		PromptSummaryPanel.superclass.constructor.call(this);
    },
    getValueObject: function() {
	    var objectToSend = new Object();
	    for(var a = 0; a < this.items.length; a++) {
		    var component = this.getComponent(a);
		    if(typeof(component.getValue) == "function" && component.name != undefined) {
		    	objectToSend[component.name] = component.getValue();
	    	}
	    }
	    //var form1 = this.getForm();
	    //objectToSend = form1.getValues();
	    var feevar = this.setupFeeDF;
	    var foundObjects = this.find('name','language');
		if(foundObjects.length > 0) {
			objectToSend.language = foundObjects[0].getValue();
			if(foundObjects[0].getValue() == '') {
				return '';
			}
		}
	    //objectToSend = Ext.encode(objectToSend);
    	return objectToSend;
	},
	calculateROValues: function() {
        this.digitizedDF.setValue(Number(this.promptsToRecordTF.getValue()) + Number(this.promptsProvidedInWAVTF.getValue()));
        // CALCULATING
        var setupFee = 0;
        var promptFee = 0;
        var translationFeeMin = 0;
        var translationFeeWord = 0;
        var languageFormula = this.feeFormulaCB.getValue();
        if(languageFormula == "Custom") {
	        this.setupFeeDF.enable();
	        this.promptFeeDF.enable();
	        this.conversionSetupFeeDF.enable();
	        this.conversionPromptFeeDF.enable();
	        this.translationFeeMinDF.enable();
	        this.translationFeeWordDF.enable();
	        this.transferFeeDF.enable();
	        this.cdFeeDF.enable();
        } else if(languageFormula == null || languageFormula == undefined) {
	        alert("Please choose a fee formula");
        } else {
	        this.setupFeeDF.disable();
	        this.promptFeeDF.disable();
	        this.conversionSetupFeeDF.disable();
	        this.conversionPromptFeeDF.disable();
	        this.translationFeeMinDF.disable();
	        this.translationFeeWordDF.disable();
	        this.transferFeeDF.disable();
	        this.cdFeeDF.disable();
	        if(this.orderTypeCB.getValue() == 'Standard') {
		        if(languageFormula == "English") {
			        setupFee = 325 * Number(this.recordingSessionsTF.getValue());
			        promptFee = 6 * Number(this.promptsBilledTF.getValue());
		        } else {
			        setupFee = 425 * Number(this.recordingSessionsTF.getValue());
			        promptFee = 10.5 * Number(this.promptsBilledTF.getValue());
		        }
		        
		        if(this.translationCB.getValue()) {
			        translationFeeMin = 150;
			        if(languageFormula == "European") {
			        	translationFeeWord = 0.38 * Number(this.wordsToTranslateTF.getValue());
		        	} else if(languageFormula == "Middle Eastern/Asian") {
			        	translationFeeWord = 0.48 * Number(this.wordsToTranslateTF.getValue());
		        	}
		        }
	        } else if(this.orderTypeCB.getValue() == 'Next Business Day') {
		        if(languageFormula == "English") {
			        setupFee = 410 * Number(this.recordingSessionsTF.getValue());
			        promptFee = 7.5 * Number(this.promptsBilledTF.getValue());
		        } else {
			        setupFee = 531.26 * Number(this.recordingSessionsTF.getValue());
			        promptFee = 13.25 * Number(this.promptsBilledTF.getValue());
		        }
		        if(this.translationCB.getValue()) {
			        translationFeeWord = 0.4 * Number(this.wordsToTranslateTF.getValue());
		        }
	        } else if(this.orderTypeCB.getValue() == 'Same Day') {
		        if(languageFormula == "English") {
			        setupFee = 490 * Number(this.recordingSessionsTF.getValue());
			        promptFee = 9 * Number(this.promptsBilledTF.getValue());
		        } else {
			        setupFee = 637 * Number(this.recordingSessionsTF.getValue());
			        promptFee = 15.75 * Number(this.promptsBilledTF.getValue());
		        }
		        if(this.translationCB.getValue()) {
			        translationFeeMin = 225;
			        translationFeeWord = 0.57 * Number(this.wordsToTranslateTF.getValue());
		        }
	        }
	        var conversionSetupFee = 50 * Number(this.conversionSessionsTF.getValue());
	        var conversionPromptFee = 1 * Number(this.promptsToConvertTF.getValue());
	        
	        var transferFee = 20 * (Number(this.recordingSessionsTF.getValue()) + Number(this.conversionSessionsTF.getValue()));
	        var cdFee = 0;
	        if(this.cdCB.getValue()) {
		        cdFee = 30.5 * Number(this.recordingSessionsTF.getValue());
	        }
	        // SETTING UP
	        this.setupFeeDF.setThisValue(setupFee);
	        this.promptFeeDF.setThisValue(promptFee);
	        this.conversionSetupFeeDF.setThisValue(conversionSetupFee);
			this.conversionPromptFeeDF.setThisValue(conversionPromptFee);
			
			this.translationFeeMinDF.setThisValue(translationFeeMin);
			this.translationFeeWordDF.setThisValue(translationFeeWord);
			
			this.conversionPromptFeeDF.setThisValue(conversionPromptFee);
			this.transferFeeDF.setThisValue(transferFee);
			this.cdFeeDF.setThisValue(cdFee);
        }
		var totalFee = this.setupFeeDF.getValue() + this.promptFeeDF.getValue() + this.conversionSetupFeeDF.getValue() + this.conversionPromptFeeDF.getValue() + 
			this.cdFeeDF.getValue() + this.transferFeeDF.getValue() + Math.max(this.translationFeeMinDF.getValue(),this.translationFeeWordDF.getValue());
        //var totalFee = setupFee+promptFee+conversionSetupFee+conversionPromptFee+transferFee+cdFee+Math.max(translationFeeMin,translationFeeWord);
        
		this.totalRecordingFeeDF.setValue(Ext.util.Format.usMoney(totalFee));
    },
	loadRecord: function(record) {
		if(record) {
			this.record = record;
		}
		var foundObjects = this.find('name','language');
		this.language = this.record.get('language');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('language'));
		}
		var feeFormula = this.record.get('fee_formula');
		if(feeFormula) {
			this.feeFormulaCB.setValue(feeFormula);
		} else {
			if(this.language == "English") {
				this.feeFormulaCB.setValue("English");
			} else if(this.language == "Spanish") {
				this.feeFormulaCB.setValue("European");
			} else if(this.language == "French") {
				this.feeFormulaCB.setValue("European");
			} else {
				this.feeFormulaCB.setValue("Custom");
			}
		}
		foundObjects = this.find('name','wav_format');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('wav_format'));
		}
		foundObjects = this.find('name','alt_format');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('alt_format'));
		}
		foundObjects = this.find('name','cd_required');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('cd_required'));
		}
		foundObjects = this.find('name','cd_mailing_address');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('cd_mailing_address'));
		}
		foundObjects = this.find('name','recording_studio');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('recording_studio'));
		}
		foundObjects = this.find('name','order_type');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('order_type'));
		}
		foundObjects = this.find('name','converted_format');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('converted_format'));
		}
		foundObjects = this.find('name','conv_delivery_method');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('conv_delivery_method'));
		}
		foundObjects = this.find('name','rec_sessions');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('rec_sessions'));
		}
		foundObjects = this.find('name','conv_sessions');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('conv_sessions'));
		}
		foundObjects = this.find('name','rec_prompt_count');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('rec_prompt_count'));
		}
		foundObjects = this.find('name','prompts_billed');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('prompts_billed'));
		}
		foundObjects = this.find('name','prompts_provided');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('prompts_provided'));
		}
		foundObjects = this.find('name','prompts_converted');
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(this.record.get('prompts_converted'));
		}
		foundObjects = this.find('name','translation_required');
		if(foundObjects.length > 0) {
			if(this.language == "English") {
				foundObjects[0].disable();
			} else {
				foundObjects[0].setValue(this.record.get('translation_required'));
			}
		}
		foundObjects = this.find('name','translation_needs_approval');
		if(foundObjects.length > 0) {
			if(this.language == "English") {
				foundObjects[0].disable();
			} else {
				foundObjects[0].setValue(this.record.get('translation_needs_approval'));
			}
		}
		foundObjects = this.find('name','prompts_translated');
		if(foundObjects.length > 0) {
			if(this.language == "English") {
				foundObjects[0].disable();
			} else {
				foundObjects[0].setValue(this.record.get('prompts_translated'));
			}
		}
		foundObjects = this.find('name','words_translated');
		if(foundObjects.length > 0) {
			if(this.language == "English") {
				foundObjects[0].disable();
			} else {
				foundObjects[0].setValue(this.record.get('words_translated'));
			}
		}
		
		this.setupFeeDF.setThisValue(this.record.get('setup_fee'));
		this.promptFeeDF.setThisValue(this.record.get('prompt_fee'));
		this.conversionSetupFeeDF.setThisValue(this.record.get('conversion_setup_fee'));
		this.conversionPromptFeeDF.setThisValue(this.record.get('conversion_prompt_fee'));
		this.transferFeeDF.setThisValue(this.record.get('transfer_fee'));
		this.translationFeeMinDF.setThisValue(this.record.get('translation_fee_minimum'));
		this.translationFeeWordDF.setThisValue(this.record.get('translation_fee_word'));
		this.cdFeeDF.setThisValue(this.record.get('cd_fee'));
		this.calculateROValues();
		if(this.language == "") {
			this.disable();
		} else {
			this.enable();
		}
    },
    setLanguage: function(lang) {
	    this.language = lang;
	    var foundObjects = this.find('name','language');
		var feeFormula = this.feeFormulaCB.getValue();
		if(!feeFormula) {
			if(this.language == "English") {
				this.feeFormulaCB.setValue("English");
			} else if(this.language == "Spanish") {
				this.feeFormulaCB.setValue("European");
			} else if(this.language == "French") {
				this.feeFormulaCB.setValue("European");
			} else {
				this.feeFormulaCB.setValue("Custom");
			}
		}
	    if(lang == "English") {
		    this.translationCB.disable();
		    this.translationCB.setValue(false);
		    this.showTranslationStuff(false);
	    }
		if(foundObjects.length > 0) {
			foundObjects[0].setValue(lang);
		}
	},
	resetValues: function() {
		if(this.record) {
			this.loadRecord();
		} else {
			this.getForm().reset();
		}
	},
	removeValues: function() {
		this.getForm().reset();
		this.language = '';
		this.disable();
	},
	showTranslationStuff: function(show) {
		if(show) {
			this.promptsToTranslateTF.enable();
			this.wordsToTranslateTF.enable();
			this.translationApprovalCB.enable();
		} else {
			this.promptsToTranslateTF.setValue(0);
			this.wordsToTranslateTF.setValue(0);
			this.translationApprovalCB.setValue(false);
			this.promptsToTranslateTF.disable();
			this.wordsToTranslateTF.disable();
			this.translationApprovalCB.disable();
		}
	}
});