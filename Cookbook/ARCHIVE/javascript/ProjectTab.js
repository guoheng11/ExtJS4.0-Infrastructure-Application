ProjectTab = Ext.extend(Ext.TabPanel, {
	projectName:'',	
	projectId: '',
	
    initComponent:function() {
	    var eto = this;
	    var actionPanel = new ProjectActions(this,this.projectId, this.projectName);
	    
	    Ext.apply(this, {
		    // TAB main
            title: "Project: "+this.projectName,
            minTabWidth: 120,
	        //autoWidth:true,
	        enableTabScroll:true,
	        closable: true,
	        defaults: {autoScroll:true},
	        activeTab:0,
	        listeners: {
	            'tabchange': function(tab, panel) {
		            //panel.fireEvent('activate');
	            }
	        },
	        items: [actionPanel]
		});
	    
    	ProjectTab.superclass.initComponent.call(this);
	    
    	this.on('activate', function() {
	    	this.onActivated();
    	}, this);
    	//this.on('tabchange', this.onActivated, this);
    },
    
    constructor: function(projId,projName) {
        this.projectId = projId;
        this.projectName = projName;
        ProjectTab.superclass.constructor.call(this);
    },

    onActivated: function() {
	    this.getActiveTab().fireEvent('activate');
    },
    
    //tab control
	openNewTab: function(className, projID, projName, param3, param4) {
		var paramString = 'this';
		var exceptionArray = ["CreateAssessmentForm", "AssessmentPanel", "PromptsFrame", "AssumptionMotherPanel"];
		if(projID != null) {
			paramString = paramString+','+projID;
		}
		if(projName != null) {
			paramString = paramString +',projName';
		}
		if(param3 != null) {
			paramString = paramString +',param3';
		}
		if(param4 != null) {
			paramString = paramString +',param4';
		}
		var itemArray = this.findById(className);
		var newNeeded = true;
		
		if(itemArray) {
			var matchFound = false;
			for(var a = 0; a < exceptionArray.length; a++) {
				if(exceptionArray[a] == className) {
					matchFound = true;
				}
			}
			if(matchFound) {
				if(itemArray instanceof Array) {
					for(var a = 0; a < itemArray.length; a++) {
						if(projName == itemArray[a].getAssessmentType()) {
							this.activate(itemArray[a]);
							newNeeded = false;
						}
					}
				} else {
					if(projName == itemArray.getAssessmentType()) {
						this.activate(itemArray);
						newNeeded = false;
					}
				}
			} else {
				this.activate(className);
				newNeeded = false;
			}
		}
			
		if(newNeeded) {
			var evalStr = "new "+className+"("+paramString+")";
			var newTab = eval(evalStr);
			var theID = className;
			
			var matchFound = false;
			for(var a = 0; a < exceptionArray.length; a++) {
				if(exceptionArray[a] == className) {
					matchFound = true;
				}
			}
			if(matchFound) {
				theID = className+projName;
			}
			newTab.id = theID;
			this.add(newTab).show();
		}
	}
});

