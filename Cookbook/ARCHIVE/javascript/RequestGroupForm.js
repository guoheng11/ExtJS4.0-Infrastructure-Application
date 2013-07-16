RequestGroupForm = Ext.extend(Ext.Panel, {
	fp: '',
	record: '',
	groupStore: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';

	    Ext.apply(this, {
		    // TAB main
            title:'Join Group',
            //frame: true,
            anchor:'95%',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [fp]
		});
	    
    	RequestGroupForm.superclass.initComponent.call(this);
    	
    	fp.buttons[0].on('click', this.onFormSubmit, fp);
    	fp.buttons[1].on('click', this.onFormCancel, this);
    },
    constructor: function(personID) {
	    var eto = this;
		
		this.groupStore = new Ext.data.Store({
			id: 'groupStore',
			proxy: new Ext.data.HttpProxy({
				url: 'GetGroups.ashx', // File to connect to
				method: 'GET'
			}),
			reader: new Ext.data.JsonReader({   
				// we tell the datastore where to get his data from
				root: 'rows',
				totalProperty: 'total',
				id: 'group_id'
			}, [
				{name: 'store_group_id', type: "int", mapping: 'group_id'},
				{name: 'group_name', type: "string", mapping: 'group_name'}
			])
		});

		this.groupStore.load();
		
		fp = new Ext.FormPanel({
	        frame: true,
	        title:'Join a New Group',
	        labelWidth: 150,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        items: [{
                xtype: 'combo',
                itemId:'groupCombo',
                width:150,
	            name: 'group_id',
	            fieldLabel: 'Group Name',
	            store: this.groupStore,
		        displayField:'group_name',
		        valueField: 'store_group_id',
		        hiddenName:'group_id',
		        allowBlank: false,
		        typeAhead: true,
		        mode: 'remote',
		        editable: 'false',
		        forceSelection: true,
		        triggerAction: 'all',
		        emptyText:'select group...',
		        selectOnFocus:true
            }],
	        
	        buttons: [{
	            text: 'Join Selected Group'
	        },{
	            text: 'Cancel'
            }]
	    });
		
		RequestGroupForm.superclass.constructor.call(this);
		
		
    },
    onFormSubmit: function() {
	    if(this.getForm().isValid()){
			var thisForm = this;
			var groupRequest = new Ext.data.Store({
				id: 'groupRequest',
				proxy: new Ext.data.HttpProxy({
					url: 'UpdateUserGroup.ashx', // File to connect to
					method: 'POST'
				}),
				baseParams:{"group_id": fp.getComponent('groupCombo').getValue()}, // this parameter asks for listing
				reader: new Ext.data.JsonReader({   
					// we tell the datastore where to get his data from
					root: 'rows',
					totalProperty: 'total',
					id: 'group_id'
				}, [
					{name: 'validated', type: "boolean", mapping: 'validated'},
					{name: 'group_id', type: "int", mapping: 'group_id'}
				])
			});
			
			groupRequest.on('load', function() {
				var count = groupRequest.getTotalCount(); 
				if(count == 1) {
					if(groupRequest.getAt(0).get("validated")) {
						Ext.MessageBox.alert('Success','You joined the group successfully!');
					} else {
						Ext.MessageBox.alert('Success','You successfully requested to join a group! Administrator was contacted to add you to this group.');
					}
					thisForm.ownerCt.ownerCt.remove(thisForm.ownerCt);
					//thisForm.ownerCt.close();
				} else {
					Ext.MessageBox.alert('Submission Error','Bad server response. Try again or contact and administrator.');
				}
			});
			groupRequest.load();
		} else {
			Ext.Msg.alert('Not Complete', 'Fill out all required fields!');
		}
    },
    onFormCancel: function() {
	    this.ownerCt.remove(this);
    }
});


