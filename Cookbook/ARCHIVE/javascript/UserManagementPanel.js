UserManagementPanel = Ext.extend(Ext.Panel, {
	userOverviewStore: '',
	userDetailStore: '',
	cmUserOverview: '',
	cmUserDetail: '',
	userGrid: '',
	detailView: true,
	
    initComponent:function() {
	    var eto = this;
	    var xg = Ext.grid;
	    
	    this.userOverviewStore = new Ext.data.Store({
	    	id: 'userOverviewStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetUsers.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'username', type: "string", mapping: 'username'},
				{name: 'realname', type: "string", mapping: 'name'},
				{name: 'groups', type: "string", mapping: 'groups'}
			])
		});
		
	    this.userDetailStore = new Ext.data.Store({
			id: 'userDetailStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetUserGroups.ashx', // File to connect to
				method: 'GET'
			}),
			baseParams:  {'validated':"false"},
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total'
			}, [
				{name: 'group_id', type: "int", mapping: 'group_id'},
				{name: 'username', type: "string", mapping: 'username'},
				{name: 'group_name', type: "string", mapping: 'group_name'},
				{name: 'validated', type: "boolean", mapping: 'validated'}
			])
		});
		this.userDetailStore.load();
		// example of custom renderer function
	    function validated(val){
	        if(val){
	            return '<span style="color:green;">' + "YES" + '</span>';
	        } else {
	            return '<span style="font-weight:bold; color:red;">' + "NO" + '</span>';
	        }
	        return val;
	    }
		this.showDetailButton = new Ext.Button({
	        text:'Show Detail',
            tooltip:'Show Detail Of This User',
            iconCls:'open',
            handler: this.onShowDetail,
            disabled:true,
            scope: eto
        });
        
        this.validateButton = new Ext.Button({
	        text:'Validate',
            tooltip:'Validate This User',
            iconCls:'add',
            disabled:true,
            handler: this.onValidateToGroup,
            scope: eto
        });
        
        this.removeButton = new Ext.Button({
	        text:'Remove From Group',
            tooltip:'Remove User From This Group',
            iconCls:'remove',
            disabled:true,
            handler: this.onRemoveFromGroup,
            scope: eto
        });
        
	    var gridTopToolbar = new Ext.Toolbar({
	    	items: [{
		        text:'Show All',
	            tooltip:'Show All Users',
	            iconCls:'open',
	            handler: this.onShowAll,
	            scope: eto
	        }, '-',{
		        text:'Show Not Validated',
	            tooltip:'Show Users Who Need To Be Validated',
	            iconCls:'open',
	            handler: this.onShowNotValidated,
	            scope: eto
	        } ,'-', this.showDetailButton]
    	});
    	
    	var gridBottomToolbar = new Ext.Toolbar({
	    	items: [this.validateButton, '-', this.removeButton ,{
		    	xtype: 'tbspacer',
		    	width: '40'
	    	}]
    	});
    	
    	this.cmUserOverview = new xg.ColumnModel({
			defaults: {
				width: 20,
				sortable: true
			},
			columns: [
	            {id:'username',header: "Name", dataIndex: 'realname'},
	            {header: "Groups", dataIndex: 'groups'}
        	]
		});
		
		this.cmUserDetail = new xg.ColumnModel({
			defaults: {
				width: 20,
				sortable: true
			},
			columns: [
	            {header: "Username", dataIndex: 'username'},
	            {header: "Group Name", dataIndex: 'group_name'},
	            {header: "Validated Status", width: 10, renderer: validated, dataIndex: 'validated'}
        	]
		});
		var sm1 = new Ext.grid.RowSelectionModel({singleSelect:true});
		
	    this.userGrid = new xg.GridPanel({
		    store: this.userDetailStore,
		    cm: this.cmUserDetail,
			
			sm: sm1,

	        tbar: gridTopToolbar,
       		bbar: gridBottomToolbar,
	        viewConfig: {
	            forceFit:true
	        },
	        autoWidth: true,
	        width: 600,
	        maxHeight:600,
	        autoHeight: true,
	        stripeRows: true,
	        collapsible: false,
	        animCollapse: false,
	        frame:true,
	        title: 'USAN Users',
	        iconCls: 'icon-grid'
	    });
	    
	    this.userGrid.on('rowdblclick', this.onRowDblClick, this);
	    this.on('activate', this.onActivated, this);

	    sm1.on('rowselect', this.onRowSelect, this);
	    sm1.on('rowdeselect', this.onRowDeselect, this);
	    
	    
	    Ext.apply(this, {
		    // TAB main
            title:'User Management',
            frame: true,
            anchor:'95%',
            closable:true,
            autoScroll: true,
            bodyStyle:'padding:5px 5px 0',
            layout:'form',
            items: [this.userGrid]
		});
	    
    	UserManagementPanel.superclass.initComponent.call(this);
    },

    onRowDblClick: function(g, rowIndex, e) {
	    if(!this.detailView) {
		    this.onShowDetail();
	    }
    },
    
    onShowAll: function() {
	    //var grid1 = this.ownerCt.ownerCt;
	    this.userGrid.reconfigure(this.userOverviewStore,this.cmUserOverview);
	    this.userGrid.getStore().load();
	    this.activateValidate(false);
	    this.onSwitchToOverview();
    },
	onShowNotValidated: function() {
		this.userGrid.reconfigure(this.userDetailStore,this.cmUserDetail);
		this.userGrid.getStore().baseParams = {'validated':"false"};
	    this.userGrid.getStore().load();
	    this.onSwitchToDetail();
    },
    
    onShowDetail: function() {
	    var record = this.userGrid.getSelectionModel().getSelected();
	    var username = '';
	    if(record) {
		    username = record.get("username");
	    }
		this.userGrid.reconfigure(this.userDetailStore,this.cmUserDetail);
		//Ext.Msg.alert('info', 'username:' + username);
		this.userGrid.getStore().baseParams = {'username':username};
	    this.userGrid.getStore().load();
	    this.onSwitchToDetail();
    },
    
    onRowSelect: function(sm, rowIndex, r) {
	    // if detail - look into validated status value and enable validate if it is NO
        if(this.detailView) {
	        this.activateRemoveFromGroup(true);
	        var record = sm.getSelected();
	        if(record) {
		        if(!record.get("validated")) {
		    		this.activateValidate(true);
	        		
		    		//Ext.MessageBox.alert('Error','Submission Error');
	    		}
    		}
    		// if overview - enable show detail
	    } else {
			this.showDetailButton.enable();
		}
    },
    
    onRowDeselect: function(sm, rowIndex, r){
        if(this.detailView) {
	        this.activateValidate(false);
	        this.activateRemoveFromGroup(false);
	        //Ext.MessageBox.alert('Error','Submission Error');
        } else {		    
			this.showDetailButton.disable();
		}
    },
    onActivated: function(){        
        //Ext.Msg.alert('Activation','Activated!!!');
        this.userGrid.getStore().reload();
    },
    
    activateRemoveFromGroup: function(activate) {
	    if(activate) {
		    if(permissions.revokeUsers) {
			    this.removeButton.enable();
		    }
	    } else {
		    this.removeButton.disable();
	    }
    },
    
    activateValidate: function(activate) {
	    if(activate) {
		    if(permissions.validateUsers) {
			    this.validateButton.enable();
		    }
	    } else {
		    this.validateButton.disable();
	    }
    },
			    
    onSwitchToDetail: function() {
	    this.showDetailButton.disable();
	    this.detailView = true;
    },
    
    onSwitchToOverview: function() {
	    this.activateValidate(false);
	    this.activateRemoveFromGroup(false);
	    this.detailView = false;
    },
	
    onValidateToGroup: function() {
	    var eto = this;
	    if(this.detailView) {
		    var record = this.userGrid.getSelectionModel().getSelected();
	        if(record) {
		        if(!record.get("validated")) {
			        var validateStore = new Ext.data.Store({
				    	id: 'validateStore',
						proxy: new Ext.data.HttpProxy({
							url: 'UpdateUserGroup.ashx', // File to connect to
							method: 'POST'
						}),
						baseParams:{"group_id": record.get("group_id"), "username": record.get("username")},
						reader: new Ext.data.JsonReader({   
							// we tell the datastore where to get his data from
							root: 'rows',
							totalProperty: 'total',
							id: 'username'
						}, [
							{name: 'username', type: "string", mapping: 'username'},
							{name: 'group_id', type: "int", mapping: 'group_id'},
							{name: 'validated', type: "boolean", mapping: 'validated'}
						])
					});
					
					validateStore.on('load', function() {
						eto.userDetailStore.reload();
						var count = validateStore.getTotalCount(); 
						if(count == 1) {
							var record2 = validateStore.getAt(0);
							if(record2) {
								if(record2.get("validated")) {
									Ext.MessageBox.alert('Success', record2.get("username") + " was added to " + record.get("group_name"));
								} else {
									Ext.MessageBox.alert('Failure', "You do not have enough permissions to validate users!");
								}
							} else {
								Ext.MessageBox.alert('Error', "Server Submission Error");
							}
						} else {
							Ext.MessageBox.alert('Error', "Server Submission Error");
						}
					});
					
					validateStore.load();
				} // if(!record.get("validated"))
			} // if (record)
		} //if(this.detailView) 
    },
    
    onRemoveFromGroup: function() {
	    var eto = this;
	    if(this.detailView) {
		    var record = this.userGrid.getSelectionModel().getSelected();
	        if(record) {
		        var userName = record.get("username");
		        var groupName = record.get("group_name");
		        Ext.MessageBox.confirm('Removal Confirmation',' Are you sure you want to remove <b>' + userName +
		        	'</b> from group <b>' + groupName + '</b>?', function(btn) {
		        	if(btn == "yes") {
			        	var userRemoveGroupRequest = new Ext.data.Connection();
					    userRemoveGroupRequest.request({
						    url: 'DeleteUserFromGroup.ashx',
						    method: 'POST',
						    params: {"username": userName, "group_id": record.get("group_id")},
						    failure: function(response, opts) {
						        Ext.Msg.alert('Error', 'Server Error: Failed Request. Try again or contact an administrator');
						    },
						    success: function(response, opts) {
							    var jsonResponse = Ext.util.JSON.decode(response.responseText);
							    if(jsonResponse.success != null) {
							    	if(jsonResponse.success) {
								    	Ext.Msg.alert('Success', userName+' was removed from the '+groupName);
								    	eto.onActivated();
						    		} else if(!jsonResponse.success) {
								    	if(jsonResponse.rows) {
								    		Ext.Msg.alert('Removal Failed', 'You probably do not have enough permissions to remove users from groups.');
							    		}
						    		}
								} else {
						    		Ext.Msg.alert('Error', 'Removal Error: Server Response in Wrong Format (missing success flag). Try again or contact an administrator');
					    		}
						    }
						});
		        	} //if(btn == "yes") {
        		});
    		}
		}
	}
});


