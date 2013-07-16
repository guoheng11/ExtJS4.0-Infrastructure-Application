MainToolbar = Ext.extend(Ext.Toolbar, {
	realName: new Ext.Toolbar.TextItem({
		text: 'Unknown User'
	}),
	groups: new Ext.Toolbar.TextItem({
		text: 'Guest'
	}),
	loginStatus: new Ext.Toolbar.TextItem({
		text: 'Logging In'
	}),
	
    initComponent:function() {
	    var eto = this;
	    this.buttonLinkHandler = function(button, event) {
		    if(event) {
			    eto.openButton();
		    }
	    }
	    var toolbarMenu = new Ext.menu.Menu({
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
                text: 'Button 2.0',
                iconCls: 'buttonIcon',
                handler: this.buttonLinkHandler
            }]
	    });
	    Ext.apply(this, {
        	items: [{
		    	xtype: 'tbspacer',
		    	width: '20'
	    	},{
	            text:'TOOLS',
	            iconCls: 'tools',
	            menu: toolbarMenu  // assign menu by instance
	        }, {
		    	xtype: 'tbspacer',
		    	width: '50'
	    	},this.realName,{
		    	xtype: 'tbspacer',
		    	width: '50'
	    	},this.groups,
	    	'->',
	    	this.loginStatus]
		});
	    
    	MainToolbar.superclass.initComponent.call(this);
    	
    	// manually setting event handlers
    	
    	// add custom events
        this.addEvents('loginEvent', 'logoutEvent');
    },
    setName: function(name,login) {
	    this.realName.setText(name);
	    if(login) {
		    this.login = login;
	    }
    },
    setGroups: function(groupsString) {
	    this.groups.setText(groupsString);
    },

    setLoginStatus: function(loginStat) {
	    this.loginStatus.setText(loginStat);
    },
    openButton: function() {
	    if(this.login) {
		    window.open('http://nor2k3rep4:8080/Button2/Login.jsp?login='+this.login,'Button');
	    } else {
		    window.open('http://nor2k3rep4:8080/Button2/Login.jsp','Button');
	    }
    }    
});
