PromptsGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	promptsStore: '',
	getLanguagesStore: '',
	optionId: '',
	summaryFrame: '',

	initComponent:function() {
		var eto = this;
		var promptReader = new Ext.data.JsonReader({   
			// we tell the datastore where to get his data from
			root: 'rows',
			totalProperty: 'total',
			id: 'prompt_id',
	        fields: [
	            {name: 'prompt_id', type: 'int'},
	            {name: 'option_id', type: 'int'},
	            {name: 'language', type: 'string'},
	            {name: 'm_number', type: 'string'},
	            {name: 'prompt_text', type: 'string'}
	        ]
	    });
	    var NewPrompt = Ext.data.Record.create([
	    	{name: 'prompt_id', type: 'int'},
            {name: 'option_id', type: 'int'},
            {name: 'language', type: 'string'},
            {name: 'm_number', type: 'string'},
            {name: 'prompt_text', type: 'string'}
      	]);
	    //var summary = new Ext.grid.GroupSummary();
	    this.promptsStore = new Ext.data.GroupingStore({
            reader: promptReader,
            proxy: new Ext.data.HttpProxy({
				url: 'GetPrompts.ashx', // File to connect to
				method: 'GET'
			}),
			baseParams:{"option_id": this.optionId},
            sortInfo:{field: 'm_number', direction: "ASC"},
            groupField:'language'
        });
        this.promptsStore.load();
	    var promptSummary = new Ext.grid.GroupSummary();
		var sm2 = new Ext.grid.RowSelectionModel({singleSelect:true});
		this.removePromptButton = new Ext.Button({
            text: 'Remove',
            iconCls: 'remove',
            disabled: true
        });
        
        var savePromptHandler = function(button, event) {
	    	if(event) {
		        
    		}
		};
		var loadCSVFileHandler = function(button, event) {
	    	if(event) {
		    	var uploadThingy = new Ext.ux.form.FileUploadField({
		            xtype: 'fileuploadfield',
		            emptyText: 'Select a CSV file',
		            fieldLabel: 'CSV File',
		            name: 'csv_file',
		            buttonText: '',
		            buttonCfg: {
		                iconCls: 'add'
		            }
		        });
		    	var fp = new Ext.FormPanel({
			        fileUpload: true,
			        width: 500,
			        //height: 140,
			        //anchor: '100%',
			        frame: true,
			        //title: 'File Upload Form',
			        autoHeight: true,
			        bodyStyle: 'padding: 10px 10px 0 10px;',
			        //bodyCls: 'cookBackground',
			        labelWidth: 50,
			        defaults: {
			            anchor: '95%',
			            allowBlank: false,
			            msgTarget: 'side'
			        },
			        items: [uploadThingy,{
			            xtype: 'hidden',
			            name: 'option_id',
			            value: eto.optionId
		            }],
			        buttons: [{
			            text: 'Upload',
			            handler: function(){
			                if(fp.getForm().isValid()){
				                var thisForm = fp.getForm();
				                thisForm.submit({
				                    url: 'ProcessPromptList.ashx',
				                    waitMsg: 'Uploading CSV file...',
				                    success: function(fpo, o) {
					                    win.hide();
					                    fp.getForm().reset();
					                    eto.getStore().reload();
					                    if(eto.summaryFrame) {
						                    eto.summaryFrame.reloadInfo();
					                    }
				                        Ext.Msg.alert('Success', 'Done');
				                    },
				                    failure: function(fpo, o) {
					                    var errorMessage = "";
					                    if(o.response) {
						                    if(o.response.responseText) {
							                    var jsonResponse = Ext.decode(o.response.responseText);
							                    if(jsonResponse.rows instanceof Array) {
								                    if(jsonResponse.rows.length > 0) {
									                    errorMessage = ": " + jsonResponse.rows[0];
								                    }
							                    }
						                    }
					                    }
					                    Ext.Msg.alert('Failure', 'Upload Failed' + errorMessage);
				                    }
				                });
			                }
			            }
			        },{
			            text: 'Reset',
			            handler: function(){
			                fp.getForm().reset();
			            }
			        }]
			    });
		
		        var win = new Ext.Window({
			        //id: 'promptFileUpload-'+this.optionId,
		            title: 'File Upload Form',
		            closeAction: 'close',
		            width: 500,
		            height: 140,
		            layout: 'form',
		            hidden: true,
		            items: [fp]
		        });
		        win.show();
    		}
		};

	    Ext.apply(this, {
	        store: this.promptsStore,
	        cls: 'padded-grid',
	        border: false,
	        sm: sm2,
	        tbar: [{
	            text: 'Add',
	            iconCls: 'add',
	            handler : function(){
	                var p = new NewPrompt({
	                    language: 'English',
	                    m_number: 'M12345',
	                    prompt_text: '',
	                    prompt_id: '',
	                    option_id: ''
	                });
	                eto.stopEditing();
	                eto.promptsStore.insert(0, p);
	                eto.startEditing(0, 0);
	            }
            },this.removePromptButton,'-',{
	            text: 'Load CSV File',
	            iconCls: 'load',
	            handler: loadCSVFileHandler
            }
            ],
	        columns: [{
	                
	                header: "M-Number",
	                width: 15,
	                sortable: true,
	                dataIndex: 'm_number',
	                hideable: false,
	                summaryType: 'count',
	                summaryRenderer: function(v, params, data){
	                    return ((v === 0 || v > 1) ? '(' + v +' Prompts)' : '(1 Prompt)');
	                },
	                editor: new Ext.form.TextField({
		                regex: /^M\d{1,7}$/
		           	})
	            },{
	                header: "Prompt Text",
	                width: 30,
	                sortable: true,
	                dataIndex: 'prompt_text',
	                editor: new Ext.form.TextField({
		           	})
	            },{
	                header: "Language",
	                width: 15,
	                sortable: true,
	                dataIndex: 'language',
	                editor: new Ext.form.ComboBox({
			            width:200,
			            allowBlank: 'false',
			            store: this.getLanguagesStore,
				        displayField:'language',
				        typeAhead: true,
				        mode: 'local',
				        editable: 'false',
				        forceSelection: true,
				        triggerAction: 'all',
				        emptyText:'choose language...',
				        lazyRender:true,
				        selectOnFocus:true,
				        listeners: {
					        'change': {
						        scope: this,
						        fn: function(field, newVal, oldVal) {
							        //field.setValue(newVal);
							        //eto.promptsStore.groupBy('language',true);
						        }
					        }
				        }
			    	})
	            },{
	                dataIndex: 'prompt_id',
	                hidden: true
	            },{
	                dataIndex: 'option_id',
	                hidden: true
	            }
	        ],

	        view: new Ext.grid.GroupingView({
	            forceFit:true,
	            showGroupName: false,
	            enableNoGroups:false,
	            hideGroupedColumn: false
	        }),

	        plugins: promptSummary,
	        height: 250,
	        width: 700,
	        autoHeight: true,
	        listeners: {
		        resize: {
		            fn: function(el) {
		                if (el.getInnerHeight() < 250) {
		                    el.autoHeight = false;
		                    el.setHeight(250);
		                } else {
			                el.autoHeight = true;
		                }
		            }
		        }
		    },

	        //animCollapse: false,
	        //trackMouseOver: false,
	        //enableColumnMove: false,
	        title: 'Prompts (Saved Automatically)'
	    });
	    PromptsGrid.superclass.initComponent.call(this);
	    
	    sm2.on('rowselect', function() {eto.removePromptButton.enable();});
	    sm2.on('rowdeselect', function() {eto.removePromptButton.disable();});
	    var removePromptHandler = function(button, event) {
	    	if(event) {
		    	var selectedRecord = eto.getSelectionModel().getSelected();
		    	var conn = new Ext.data.Connection();
				conn.request({
				    url: 'DeletePrompt.ashx',
				    method: 'POST',
				    params: {"prompt_id": selectedRecord.get("prompt_id")},
				    failure: function(response, opts) {
				        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
				    },
				    success: function(response, opts) {
					    var jsonResponse = Ext.util.JSON.decode(response.responseText);
					    if(jsonResponse.success != null) {
					    	if(jsonResponse.success) {
						    	eto.promptsStore.remove(selectedRecord);
		    					eto.removePromptButton.disable();
				    		} else if(!jsonResponse.success) {
						    	if(jsonResponse.rows) {
						    		Ext.Msg.alert('Deletion Failed', 'Server read the request but did not delete the prompt.');
					    		}
				    		}
						} else {
				    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
			    		}
				    }
				});
    		}
		};
	    this.removePromptButton.on('click', removePromptHandler);
	    this.promptsStore.on('update', function(store, record, operation) {
		    eto.promptsStore.groupBy('language',true);
		    if(record.skipSubmit) {
			    record.skipSubmit = false;
		    } else {
			    var conn = new Ext.data.Connection();
				conn.request({
				    url: 'UpdatePrompt.ashx',
				    method: 'POST',
				    params: {"option_id": eto.optionId,
				    	"language": record.get("language"),
				    	"m_number": record.get("m_number"), 
				    	"prompt_text": record.get("prompt_text"), 
				    	"prompt_id": record.get("prompt_id")},
				    failure: function(response, opts) {
				        Ext.Msg.alert('Error', 'Server Error: Failed Update. Try again or contact an administrator');
				        record.reject(true);
				    },
				    success: function(response, opts) {
					    var jsonResponse = Ext.util.JSON.decode(response.responseText);
					    if(jsonResponse.success != null) {
					    	if(jsonResponse.success) {
						    	record.commit(true);
						    	if(jsonResponse.rows[0]) {
							    	if(record.get("prompt_id") != jsonResponse.rows[0].prompt_id) {
								    	record.skipSubmit = true;
							    		record.set("prompt_id",jsonResponse.rows[0].prompt_id);
						    		}
						    	}
				    		} else if(!jsonResponse.success) {
						    	if(jsonResponse.rows) {
						    		Ext.Msg.alert('Update Failed', 'Server read the request but did not update the record.');
					    			record.reject(true);
						    	}
				    		}
						} else {
				    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
			    			record.reject(true);
				    	}
				    }
				});
			}
	    });
	    /*this.promptsStore.on('add', function(store,records,ind) {
		    eto.counter++;
		    Ext.Msg.alert('ADD', 'Counter:'+eto.counter);
	    });*/
	    this.on('afterrender', function() {
		    //this.getStore().removeAll();
		    /*var promptStore = new Ext.data.Store({
				id: 'promptStore',
				proxy: new Ext.data.HttpProxy({
					url: 'GetPrompts.ashx', // File to connect to
					method: 'GET'
				}),
				baseParams:{"project_id": eto.projectId}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total',
					id: 'prompt_id'
				}, [
					{name: 'prompt_id', type: "int", mapping: 'prompt_id'},
					{name: 'language', type: "string", mapping: 'language'},
					{name: 'm_number', type: "string", mapping: 'm_number'},
					{name: 'prompt_text', type: "string", mapping: 'prompt_text'}
				])
			});
			
			promptStore.on('load', function() {
				var count = promptStore.getTotalCount();
				if(count > 0) {
					eto.record = promptStore.getAt(0);
					eto.loadProject();
				}
			});
			
			promptStore.load();*/
	    });
	},
    
    constructor: function(optId,langStore) {
		this.optionId = optId;
		this.getLanguagesStore = langStore;
		PromptsGrid.superclass.constructor.call(this);
    },
    submitPrompts: function() {
	    var eto = this;
	    /*var objectToSend = new Object();
	    var promptLists = new Array();
	    var count = this.sumContainer.items.length;
	    for(var c = 0; c < count; c++) {
	    	var sumPanel = this.sumContainer.getComponent(c);
	    	promptLists[c] = sumPanel.getValueObject();
    	}
    	promptLists = Ext.encode(promptLists)
    	objectToSend.prompt_lists = promptLists;
    	objectToSend.project_id = this.projectId;
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
		});*/
	},
	setSummaryGrid: function(frame) {
		this.summaryFrame = frame;
	},
	reloadInfo: function() {
		this.promptsStore.reload();
	},
	loadRecord: function() {
    }
});