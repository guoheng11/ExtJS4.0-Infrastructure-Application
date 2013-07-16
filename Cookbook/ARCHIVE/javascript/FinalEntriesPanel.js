FinalEntriesPanel = Ext.extend(Ext.Panel, {
	projectId: '',
	record: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    var eto = this;
	    var uatAcceptDueVal = "";
	    var uatAcceptVal = "";
	    var ccrReceivedVal = "";
	    var ccrNumber = "";
	    if(this.record instanceof Ext.data.Record) {
		    uatAcceptDueVal = this.record.get('uat_acceptance_due_date');
		    uatAcceptVal = this.record.get('uat_accepted_date');
		    ccrReceivedVal = this.record.get('ccr_received_date');
		    ccrNumber = this.record.get('ccr_number');
	    }
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'Final Project Entries',
	        labelWidth: 150,
	        width: 400,
	        //bodyStyle: 'padding: 10px;',
	        style: 'padding: 0 10px 0 0;',
	        defaults: {
		        width: 200
	        },
	        items: [{
		        xtype: 'datefield',
                format: 'Y/m/d',
                // mad override
                validateValue : function(value){
			        return true;
			    },
			    setValue : function(date){
			        return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(date));
			    },
                name: 'uat_acceptance_due_date',
                value: uatAcceptDueVal,
                fieldLabel: 'UAT Acceptance Due'
            },{
                xtype: 'datefield',
                format: 'Y/m/d',
                name: 'uat_accepted_date',
                value: uatAcceptVal,
                fieldLabel: 'UAT Accepted Date'
            },{
                xtype: 'datefield',
                format: 'Y/m/d',
                name: 'ccr_received_date',
                value: ccrReceivedVal,
                fieldLabel: 'CCR Received Date'
            },{
                xtype: 'numberfield',
                name: 'ccr_number',
                value: ccrNumber,
                fieldLabel: 'CCR Number'
            },{
                xtype: 'hidden',
                name: 'project_id',
                value: this.projectId
            }],
	        buttons: [{
	            text: 'Save',
	            iconCls: 'save',
	            handler: function() {
		            eto.submitThisPlz();
	            }
	        }]
	    });
	    
	    Ext.apply(this, {
		    // TAB main
            title:'Final Entries',
            //frame: true,
            anchor:'95%',
            layout: 'table',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [this.mainFormPanel]
		});
    	
		FinalEntriesPanel.superclass.initComponent.call(this);
    },
    
    constructor: function(tabCont,projId,record) {
	    this.tabContainer = tabCont;
		this.projectId = projId;
		this.record = record;
		FinalEntriesPanel.superclass.constructor.call(this);
    },
    submitThisPlz: function() {
	    var thisForm = this.mainFormPanel;
		var eto = this;		
	    thisForm.getForm().submit({
		    url: 'UpdateProject.ashx',
		    success: function(form, action) {
		       Ext.MessageBox.alert('Success','Project Updated Successfully');
		    },
		    failure: function(form, action) {
		        Ext.Msg.alert('Failed', 'Submission Failed...' + action.result.msg);
		    }
		});
    }
});