AssumptionMotherPanel = Ext.extend(Ext.Panel, {
	optionId: '',
	assumptionPanel: '',
	standardAssumptionPanel: '',
	notesPanel: '',
	
    initComponent:function() {
	    var eto = this;
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
		this.assumptionPanel = new AssumptionPanel(1, this.optionId);
		this.standardAssumptionPanel = new StandardAssumptionPanel(this.assumptionPanel);
		this.assumptionPanel.setStandardPanel(this.standardAssumptionPanel);
        this.emptyContainer = new Ext.Container();
        var validNoteType = new Array();
        validNoteType[0] = 'Assumptions (Project Specific)';
        validNoteType[1] = 'Assumptions (Standard)';
        this.notesPanel = new NoteSetPanel(eto.optionId, validNoteType[0]);
        
	    Ext.apply(this, {
		    // TAB main
            title: 'Assumptions ['+this.optionName+']',
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
            items: [this.assumptionPanel, this.standardAssumptionPanel,{
	            colspan: 2,
	            baseCls: 'cookBackground',
	            items:[this.notesPanel]
            }
	        ]
		});
	    	
    	this.on('afterrender', function() {
		});
    	
		AssumptionMotherPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,optionId, optionName) {
	    this.tabContainer = tabCont;
		this.optionId = optionId;
		this.optionName = optionName;
		AssumptionMotherPanel.superclass.constructor.call(this);
    },
    // returns optionID
	getAssessmentType: function() {
		return this.optionId;
	}
});