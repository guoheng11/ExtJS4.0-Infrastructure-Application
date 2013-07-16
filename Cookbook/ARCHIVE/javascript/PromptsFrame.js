PromptsFrame = Ext.extend(Ext.Panel, {
	optionId: '',
	projectId: '',
	getLanguagesStore: '',
	summaryRendered: false,
	promptsRendered: false,
	optionName: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    this.getLanguagesStore = new Ext.data.Store({
			id: 'getLanguagesStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetLanguages.ashx', // File to connect to
				method: 'GET'
			}),
			//baseParams:{"hour_type": 'SYS'}, // this parameter asks for listing
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				idProperty: "language"
			}, [
				{name: 'language', type: "string", mapping: 'language'}
			])
		});
		this.getLanguagesStore.on('load', function(thisStore, recs, ops) {
			var defaultData = {
                language: "Other"
            };
            var p = new thisStore.recordType(defaultData); // create new record
            thisStore.add(p); // insert a new record into the store
        });
			
		this.getLanguagesStore.load();
		
		this.summaryGrid = new PromptSummaryFrame(this.projectId, this.optionId, this.getLanguagesStore);
	    this.promptsGrid = new PromptsGrid(this.optionId, this.getLanguagesStore);
	    this.summaryGrid.on('afterrender', function() {
		    eto.summaryRendered = true;
		    if(eto.promptsRendered) {
			    eto.connectGrids(eto);
		    }
	    });
	    this.promptsGrid.on('afterrender', function() {
		    eto.promptsRendered = true;
		    if(eto.summaryRendered) {
			    eto.connectGrids(eto);
		    }
	    });
	    
	    Ext.apply(this, {
		    closable:true,
		    bodyStyle: 'padding:10 10;',
            baseCls: 'cookBackground',
            title:'Prompts - Option: ' + this.optionName,
	        items: [this.summaryGrid, this.promptsGrid]
		});
    	
		PromptsFrame.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId,optId,optName) {
		this.optionId = parseInt(optId);
		this.projectId = parseInt(projId);
		this.optionName = optName;
		PromptsFrame.superclass.constructor.call(this);
    },
    
    connectGrids: function() {
	    this.summaryGrid.setPromptsGrid(this.promptsGrid);
	    this.promptsGrid.setSummaryGrid(this.summaryGrid);
    },
    
    getValueObject: function() {
	    var eto = this;
	    var objectToSend = new Object();
    	return objectToSend;
	},
	// returns optionID
	getAssessmentType: function() {
		return this.optionId;
	},
	loadRecord: function() {
    }
});