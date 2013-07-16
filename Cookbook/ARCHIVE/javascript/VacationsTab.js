VacationsTab = Ext.extend(Ext.TabPanel, {
	
    initComponent:function() {
	    var eto = this;
	    var actionPanel = new VacationsActions(this);
	    
	    Ext.apply(this, {
		    // TAB main
            title: "Vacation Manager",
            minTabWidth: 120,
	        //autoWidth:true,
	        enableTabScroll:true,
	        closable: true,
	        defaults: {autoScroll:true},
	        activeTab:0,
	        listeners: {
	            'tabchange': function(tab, panel) {
		            panel.fireEvent('activate');
	            }
	        },
	        items: [actionPanel]
		});
	    
    	VacationsTab.superclass.initComponent.call(this);
	    
    	this.on('activate', function() {
	    	this.onActivated;
    	}, this);
    	//this.on('tabchange', this.onActivated, this);
    },
    
    constructor: function() {
        VacationsTab.superclass.constructor.call(this);
    },

    onActivated: function() {
	    this.getActiveTab().fireEvent('activate');
    },
    
    //tab control
	openNewTab: function(className, param3) {
		var paramString = 'this';
		if(param3 != null) {
			paramString = paramString +',\"'+param3+'\"';
		}
		var itemArray = this.findById(className);
		if(itemArray) {
			this.activate(className);
		} else {
			var newTab = eval("new "+className+"("+paramString+")");
			newTab.id = className;
			this.add(newTab).show();
		}
	}
});

