StandardAssumptionPanel = Ext.extend(Ext.Panel, {
	assessmentType: '',
	getAssessmentsStore: '',
	parentObject: '',
	textArray: '',
	containerArray: '',

    initComponent:function() {
	    var eto = this;
	    
		this.getAssessmentsStore = new Ext.data.Store({
			id: 'getAssessmentsStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetStdAssumptions.ashx', // File to connect to
				method: 'POST'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'assumption_id'
			}, [
				{name: 'std_assumption_id', type: "int", mapping: 'std_assumption_id'},
				{name: 'automatic', type: "boolean", mapping: 'automatic'},
				{name: 'text', type: "string", mapping: 'text'}
			])
		});
		
		this.getAssessmentsStore.on('load', function() {
			var count = eto.getAssessmentsStore.getTotalCount(); 
			if(count < 1) {
			} else {
				eto.textArray = new Array();
	    		eto.containerArray = new Array();
				for(var c = 0; c < count; c++) {
					var rec = eto.getAssessmentsStore.getAt(c);
					if(rec instanceof Ext.data.Record) {
						addHandler = function(button, event) {
					    	if(event) {
						    	eto.parentObject.addPreset(button.textToSend);
					    	}
						};
						if(!rec.get('automatic')) {
							var container = new Ext.Container({
								layout: 'column',
								style: 'padding: 3 0;',
					        	//autoHeight: true,
					        	items: [{
						        	width: 35,
						        	//autoHeight: true,
						        	items: [{
						                xtype: 'button',
						                textToSend: rec.get('text'),
						                //itemId:'addButton',
							            iconCls:'add',
							            tooltip: 'Add This Assumption',
							            style: 'padding-left: 5',
							            handler: addHandler
							        }]
						        },{
						        	width: 530,
						        	//autoHeight: true,
						        	items: [{
							        	xtype: 'textarea',
							            style: 'padding-top: 3',
							            //autoWidth: true,
							            width: 530,
							            grow: true,
	            						growMin: 30,
							            //autoHeight: true,
							            disabled: true,
							            value: rec.get('text')
							    	}]
					        	}]
				        	});
							eto.add(container);
							eto.textArray[c] = rec.get('text');
							eto.containerArray[c] = container;
						}
		        	} // if record
	        	} // for each record
				eto.doLayout();
			}
			eto.parentObject.loadAssumptions();
		});
		
	    Ext.apply(this, {
		    // TAB main
            title:'Common Project Specific Assumptions',
			frame: true,
			width: 600,
			style: 'padding: 2 0',
			autoHeight: true,
			collapsible: true,
			//collapsed: true,
			items: [{}]
		});
		this.on('afterrender', function() {
	        eto.getAssessmentsStore.load();
        });
        
    	StandardAssumptionPanel.superclass.initComponent.call(this);
    },
    constructor: function(thisParentObject) {
	    if(thisParentObject) {
		    this.parentObject = thisParentObject;
	    } else {
		    this.parentObject = this;
	    }
		StandardAssumptionPanel.superclass.constructor.call(this);
    },
    hideYoKids: function(text) {
	    for(var c = 0; c < this.textArray.length; c++) {
		    if(this.textArray[c] == text) {
			    this.containerArray[c].hide();
			    return;
		    }
	    }
    },
    unhideYoKids: function(text) {
	    for(var c = 0; c < this.textArray.length; c++) {
		    if(this.textArray[c] == text) {
			    this.containerArray[c].show();
			    return;
		    }
	    }
    },
    addPreset: function() {
    }
});