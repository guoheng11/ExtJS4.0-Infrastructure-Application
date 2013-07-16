VacationsActions = Ext.extend(Ext.Panel, {
	tabContainer: '',
	
    initComponent:function() {
	    var eto = this;
	    personalVacationHandler = function(button, event) {
	    	if(event) {
		    	eto.ownerCt.openNewTab("UserVacationPanel");
	    	}
		};
		
		viewVacationHandler = function(button, event) {
	    	if(event) {
		    	//eto.ownerCt.openNewTab("ProjectContactsPanel",eto.projectId,eto.projectName);
	    	}
		};
		
	    manageVacationHandler = function(button, event) {
	    	if(event) {
		    	//eto.ownerCt.openNewTab("ProjectContactsPanel",eto.projectId,eto.projectName);
	    	}
		};
		
	    Ext.apply(this, {
		    // TAB main
            title: 'Actions',
            frame: true,
            width: 600,
            closable:false,
            //autoWidth: true,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0; width: 600',
            layout:'form',
            items: [{
                xtype:'fieldset',
                layout:'table',
                style:'margin-top:15px;',
                //title: 'General Project Options',
                //collapsed: true,
                //collapsible: true,
                //width: 800,
                //autoWidth: true,
                hideBorders: true,
                border: false,
                autoHeight: true,
                defaultType:'button',
                items: [{
	                text: 'My Vacation Manager',
	                scale: 'medium',
	                style:'padding-right:25px;',
	                handler: personalVacationHandler
	            },{
	                text: 'View User\'s Vacations',
	                scale: 'medium',
	                style:'padding-right:25px;',
	                handler: viewVacationHandler
	            },{
	                text: 'Manage User\'s Vacations',
	                scale: 'medium',
	                style:'padding-right:25px;',
	                handler: manageVacationHandler
	            }]
            }]
		});
	    
    	VacationsActions.superclass.initComponent.call(this);
	    
    	//this.on('activate', this.onActivated, this);
    },
    
    constructor: function(tabCont) {
	    this.tabContainer = tabCont;
        VacationsActions.superclass.constructor.call(this);
    }

});

