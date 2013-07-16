MainNavigationTree = Ext.extend(Ext.tree.TreePanel, {
    initComponent:function() {	    
	    Ext.apply(this, {
	        collapsible: true,
	        title: 'Navigation',
	        width: 200,
	        autoScroll: true,
	        region: 'west',
	    	title: 'Navigation',
	        //split: true,
	        loader: new Ext.tree.TreeLoader(),
	        root: new Ext.tree.AsyncTreeNode({
	            expanded: true,
	            children: [{
	                text: 'Find Project',
	                id: '1',
	                leaf: true
	            },{
	                text: 'Contacts',
	                id: '2',
	                leaf: true
	            },{
	                text: 'Join Group',
	                id: '3',
	                leaf: true
	            },{
	                text: 'User Management',
	                id: '4',
	                leaf: true
	            },{
	                text: 'Group Management',
	                id: '5',
	                leaf: true
	            }]
	        }),
	        rootVisible: false,
	        listeners: {
	            click: function(n) {
		            if(n.attributes.id == 1) {
			            Cookbook.openProjectChooser();
            		} else if(n.attributes.id == 2) {
			            Cookbook.openContactChooser();
            		} else if(n.attributes.id == 3) {
			            Cookbook.openRequestGroupForm();
            		} else if(n.attributes.id == 4) {
			            Cookbook.openUserManagementPanel();
            		} else if(n.attributes.id == 5) {
			            Cookbook.openGroupManagementPanel();
            		}else {
	                	Ext.Msg.alert('Navigation Tree Click', 'Sorry, but "' + n.attributes.text + '" is under development.');
            		}
	            }
	        }
		});
	    
    	MainNavigationTree.superclass.initComponent.call(this);
    }
});