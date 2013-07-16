Ext.namespace('Cookbook');

WelcomeForm = Ext.extend(Ext.Panel, {
	win: '',
	fp: '',
	
    initComponent:function() {
	    var eto = this;
	    /*
        this.fp = new Ext.FormPanel({
	        fileUpload: true,
	        width: 500,
	        //height: 140,
	        //anchor: '100%',
	        frame: true,
	        //title: 'File Upload Form',
	        autoHeight: true,
	        bodyStyle: 'padding: 10px 10px 0 10px;',
	        //bodyCls: 'cookBackground',
	        labelWidth: 50,
	        defaults: {
	            anchor: '95%',
	            allowBlank: false,
	            msgTarget: 'side'
	        },
	        items: [],
	        buttons: [{
	            text: 'Upload',
	            handler: function(){
	                if(eto.fp.getForm().isValid()){
		                var thisForm = eto.fp.getForm();
		                thisForm.submit({
		                    url: 'ProcessPromptList.ashx',
		                    waitMsg: 'Uploading CSV file...',
		                    success: function(fp, o) {
			                    eto.win.hide();
			                    eto.fp.getForm().reset();
		                        Ext.Msg.alert('Success', 'Done');
		                        
		                    },
		                    failure: function(fp, o) {
			                    Ext.Msg.alert('Failure', 'Upload Failed');
		                    }
		                });
	                }
	            }
	        },{
	            text: 'Reset',
	            handler: function(){
	                eto.fp.getForm().reset();
	            }
	        }]
	    });
	    this.win = new Ext.Window({
            title: 'File Upload Form',
            closeAction: 'hide',
            width: 500,
            height: 140,
            layout: 'form',
            hidden: true,
            items: [{
	            xtype: 'fileuploadfield',
	            id: 'form-file',
	            emptyText: 'Select a CSV file',
	            fieldLabel: 'CSV File',
	            name: 'csv_file',
	            buttonText: '',
	            buttonCfg: {
	                iconCls: 'add'
	            }
	        },{
	            xtype: 'hidden',
	            name: 'project_id',
	            value: eto.projectId
            }]
        });
	    buttonHandler = function(button, event) {
	    	if(event) {
				//window.open('file://///NORW7SHENASSAF/Download',"mywindow1","status=1,width=350,height=150");
				location.href = "file://C:\Windows\Notepad.exe";
	    	}
		};*/
		
		//textDF.setValue(Ext.util.Format.usMoney(textDF.getValue()));
	    Ext.apply(this, {
		    // TAB main
            title:'Welcome',
            //cls : 'cook_info_label',
			html: '<h1>USAN Project Management</h1>',
            height: 1000,
	    	width: 2000,
	    	bodyStyle:{"background-color":"#d0e0f4"},
			bodyCssClass: "usan_logo"
		});
	    
    	WelcomeForm.superclass.initComponent.call(this);
    }
});


