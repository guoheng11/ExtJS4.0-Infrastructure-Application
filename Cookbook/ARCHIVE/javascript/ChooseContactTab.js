/*ChooseContactPanel = Ext.extend(Ext.Panel, {
	expander: '',
	grid: '',
	//counter: 0,
	tabContainer: '',
	
    initComponent:function() {
	    this.grid = new ContactGrid(this.tabContainer);
	    Ext.apply(this, {
		    // TAB main
            title:'Choose a Contact',
            frame: true,
            anchor:'95%',
            closable:false,
            //border:true,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0',
            layout:'form',
            items: [this.grid]
		});
	    this.on('activate', function() {
	    	this.onActivated();
    	}, this);
    	ChooseContactPanel.superclass.initComponent.call(this);
    },
    onActivated: function() {
	    //this.counter++;
        //Ext.Msg.alert('Activation','Activated ' + this.counter);
        this.grid.getStore().reload();
    },
    constructor: function(thisTabContainer) {
		this.tabContainer = thisTabContainer;
        ChooseContactPanel.superclass.constructor.apply(this);
    }
});*/

ChooseContactTab = Ext.extend(Ext.TabPanel, {
	//localCount: 0,
    initComponent:function() {
	    var eto = this;
	    var actionPanel = new ContactGrid(this);
	    
	    Ext.apply(this, {
		    // TAB main
            title: "Contacts",
            minTabWidth: 120,
	        //autoWidth:true,
	        enableTabScroll:true,
	        closable: true,
	        defaults: {autoScroll:true},
	        activeTab:0,
	        listeners: {
	            'tabchange': function(tab, panel) {
		            panel.fireEvent('activate');
	            },
	            'beforeremove': function(tab, panel) {
		    		panel.fireEvent('close');
	    		}
	        },
	        items: [actionPanel]
		});
	    this.on('activate', function() {
	    	this.onActivated();
    	}, this);
    	ChooseContactTab.superclass.initComponent.call(this);
    },

    onActivated: function() {
	    //this.localCount++;
	    //Ext.Msg.alert('Activation','Activated ' + this.localCount);
	    this.getActiveTab().fireEvent('activate');
    },
    
	openCreateContactForm: function() {
		this.add(new EditContactForm(this)).show();
	},

	openEditContactForm: function(contactID) {
		var itemArray = this.findById("ContactNumber"+contactID);
		if(itemArray) {
			this.activate("ContactNumber"+contactID);
		} else {
			var newTab = new EditContactForm(this,contactID);
			newTab.id = "ContactNumber"+contactID;
			this.add(newTab).show();
		}
		//this.add(new EditContactForm(contactID)).show();
	},
	
	//tab control
	openNewTab: function(className, contactID) {
		var paramString = 'this';
		if(contactID != null) {
			paramString = paramString + ','+contactID;
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