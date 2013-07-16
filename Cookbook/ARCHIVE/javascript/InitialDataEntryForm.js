InitialDataEntryForm = Ext.extend(Ext.Panel, {
	projectName: 'CTG-XXXX',
    initComponent:function() {
	    
	    
	    var businessUnitStore = new Ext.data.Store({
			id: 'businessUnitStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetBusinessUnits.ashx', // File to connect to
				method: 'POST'
			}),
			//url: 'GetBusinessUnits.ashx',

			//baseParams:{task: "LISTING"}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'biz_id'
			}, [
				{name: 'biz_id', type: "int", mapping: 'biz_id'},
				{name: 'biz_name', type: "string", mapping: 'biz_name'}
			]),
					//sortInfo:{field: 'biz_id', direction: "ASC"}
			remoteSort: true
		});
    	
	    Ext.apply(this, {
		    // TAB main
            title:projectName+' Initial Data Entry',
            frame: true,
            anchor:'95%',
            closable:true,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0',
            layout:'form',
            //defaults: {width: 300},
            //defaultType: 'textfield',
            
            items: [{
                layout:'column',
                items: [{
                    columnWidth:0.30,
                    layout: 'form',
		    		items: [{
                        // FIELDSET project
                        xtype:'fieldset',
                        title: 'Project', 
                        autoHeight: true,
                        items: [{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'Project Name'
                        },{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'USAN CTG#'
                        },{
	                        xtype: 'combo',
	                        width:127,
				            name: 'bizCombo',
				            fieldLabel: 'Citi Business Unit',
				            store: businessUnitStore,
					        displayField:'biz_name',
					        valueField: 'biz_id',
					        typeAhead: true,
					        mode: 'remote',
					        forceSelection: true,
					        triggerAction: 'all',
					        emptyText:'business unit...',
					        selectOnFocus:true
        				}]
                    },{
                        // FIELDSET project contacts
                        xtype:'fieldset',
                        title: 'Project Contacts',
                        autoHeight: true,                   
                        items: [{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'USAN TC'
                        },{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'USAN PM'
                        },{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'MCI TC'
                        },{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'CUST ORIGINATOR'
                        }]
                    },{
                        // FIELDSET delivery requirements
                        xtype:'fieldset',
                        title: 'Delivery Requerements',
                        autoHeight: true,                    
                        items: [{
                            xtype: 'datefield',
                            width: 127,
              		    	fieldLabel: 'RFQ/LOE Recieved',
              		    	name: 'rfqLoeRecieved',
              		    	id: 'rfqLoeRecieved',
              		    	endDateField: 'quoteLoeDue' // id of the end date field
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Quote/LOE Due',
                            width: 127,
            		    	name: 'quoteLoeDue',
            		    	id: 'quoteLoeDue'
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Requested UAT',
                            width: 127,
            		    	name: 'requestedUAT',
            		    	id: 'requestedUAT'
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Requested Prod',
                            width: 127,
            		    	name: 'requestedProd',
            		    	id: 'requestedProd'
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Quoted UAT',
                            width: 127,
            		    	name: 'quotedUAT',
            		    	id: 'quotedUAT'
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Production Date',
                            width: 127,
            		    	name: 'productionDate',
            		    	id: 'productionDate'
                        },{
                            xtype: 'checkbox',
                            fieldLabel: 'Expedite',
                            boxLabel: '',
                            name: 'expedite'
                        }]
                    },{
                        // FIELDSET linked project requirements
                        xtype:'fieldset',
                        title: 'Linked Project Requirements',
                        autoHeight: true,                   
                        items: [{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'Linked'
                        },{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'Link Type'
                        },{
                            xtype: 'textfield',
                            name: 'txt-test1',
                            fieldLabel: 'Linked Projects'
                        }]
                    }]
                },{
                    columnWidth:0.25,
                    layout: 'form',
                    bodyStyle: 'padding-left:10px;',
                    labelWidth: 150,
		    		items: [{
                        // FIELDSET project checklist
                        xtype:'fieldset',
                        title: 'Project Checklist',
                        defaultType: 'checkbox',
                        //autoHeight: true,
                        items: [
                        {
	                        xtype: 'label',
	                        itemCls:'cook_info_label',
	                        labelSeparator: '',
                            text: '(Denotes area of change)',
                            name: 'projCheckLabel1'
                        },{
                            fieldLabel: 'App(s)',
                            boxLabel: '',
                            name: 'apps'
                        },{
                            fieldLabel: 'Parameter File(s)',
                            boxLabel: '',
                            name: 'parameterFiles'
                        },{
	                        xtype:'fieldset',
                        	title: 'Table(s)',
                        	defaultType: 'checkbox',
                        	//autoHeight: true,
                        	items: [
                        	{
                            	fieldLabel: 'USAN Maintained',
                            	boxLabel: '',
                            	name: 'usanMaintained'
                        	},{
                            	fieldLabel: 'Customer Maintained',
                            	boxLabel: '',
                            	name: 'customerMaintained'
                        	},{
                            	fieldLabel: 'Bypass file loads',
                            	boxLabel: '',
                            	name: 'bypassFileLoads'
                        	},{
                            	fieldLabel: 'New USAN Access?',
                            	boxLabel: '',
                            	name: 'newUsanAccess'
                        	},{
                            	fieldLabel: 'Bypass Backoffice Process',
                            	boxLabel: '',
                            	name: 'bypassBackofficeProcess'
                        	}]
                    	},{
                        	fieldLabel: 'Prompt(s)',
                        	boxLabel: '',
                        	name: 'prompts'
                    	},{
                        	fieldLabel: 'Routing',
                        	boxLabel: '',
                        	name: 'routing'
                    	},{
                        	fieldLabel: 'New 800#(s)',
                        	boxLabel: '',
                        	name: 'new800'
                    	},{
                        	fieldLabel: 'MIS (existing)',
                        	boxLabel: '',
                        	name: 'misExisting'
                    	},{
                        	fieldLabel: 'MIS (new)',
                        	boxLabel: '',
                        	name: 'misNew'
                    	},{
                        	fieldLabel: 'Engine(s)',
                        	boxLabel: '',
                        	name: 'engines'
                    	},{
                        	fieldLabel: 'Scraper(s)',
                        	boxLabel: '',
                        	name: 'scrapers'
                    	},{
                        	fieldLabel: 'Grammar(s)',
                        	boxLabel: '',
                        	name: 'grammars'
                    	},{
                        	fieldLabel: 'Host (existing)',
                        	boxLabel: '',
                        	name: 'hostExisting'
                    	},{
                        	fieldLabel: 'Host (new)',
                        	boxLabel: '',
                        	name: 'hostNew'
                    	},{
                        	fieldLabel: 'Network (existing)',
                        	boxLabel: '',
                        	name: 'networkExisting'
                    	},{
                        	fieldLabel: 'Network (new)',
                        	boxLabel: '',
                        	name: 'networkNew'
                    	},{
	                    	itemCls:'cook_checkbox_special',
                        	fieldLabel: 'Network Traffic?',
                        	boxLabel: '',
                        	name: 'networkTraffic'
                    	},{
	                    	itemCls:'cook_checkbox_special',
                        	fieldLabel: 'Conference Call Required?',
                        	boxLabel: '',
                        	name: 'confCallRequired'
                    	}]
                    }] // end of second column items
                },{
	                // Column 3
                    columnWidth:0.45,
                    layout: 'form',
                    bodyStyle: 'padding-left:10px;',
                    labelWidth: 150,
                    height: 500,
		    		items: []
                }] //end of column layout items
           },{
                // FIELDSET Project Description
                xtype:'fieldset',
                title: 'Project Description',
                layout: 'form',
            	border:true,
                //bodyStyle:'padding:5px 5px 0',
    			width: 600,
    			height:200,
                items: [{
    				xtype:'htmleditor',
    				id:'projDescription',
    				hideLabel: true,
    				anchor:'99%'
                }]
			}]
		});
	    
    	InitialDataEntryForm.superclass.initComponent.call(this);

    },
    
    constructor: function(projName) {
        projectName = projName;
        InitialDataEntryForm.superclass.constructor.call(this);
    }
});


