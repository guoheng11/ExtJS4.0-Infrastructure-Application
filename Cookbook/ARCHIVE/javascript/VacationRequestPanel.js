VacationRequestPanel = Ext.extend(Ext.Panel, {
	mainFormPanel: '',
	tabContainer: '',
	startDateField: '',
	endDateField: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
	    this.startDateField = new Ext.form.DateField({
		    fieldLabel: 'First Vacation Day',
            format: 'Y/m/d',
            width: 177,
            vtype: 'daterange',
            id: 'start_date',
            endDateField: 'end_date',
            name: 'start_date'
        });
        
        this.endDateField = new Ext.form.DateField({
		    fieldLabel: 'Last Vacation Day',
            format: 'Y/m/d',
            width: 177,
            vtype: 'daterange',
            id: 'end_date',
            startDateField: 'start_date',
	    	name: 'end_date'
        });
        
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'Request Standard Vacation Form',
	        labelWidth: 200,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        defaults: {allowblank: false},
	        items: [this.startDateField,
	        this.endDateField,
	        {
                xtype: 'textfield',
                fieldLabel: 'Vacation Days Used',
                maskRe: /^\d+$/,
                width: 177,
		    	name: 'days_used'
            },{
                xtype: 'textfield',
                fieldLabel: 'Backups',
                width: 177,
		    	name: 'backups'
            },{
                xtype: 'hidden',
                name: 'type',
                value: 'VACATION'
            }],
	        buttons: [{
	            text: 'Submit'
	        },{
	            text: 'Reset'
            },{
	            text: 'Cancel'
            }]
	    });

	    Ext.apply(this, {
		    // TAB main
            title:'Vacation Request',
            //frame: true,
            anchor:'95%',
            bodyStyle: 'padding:20 20;',
            closable:true,
            items: [this.mainFormPanel]
		});
    	
		VacationRequestPanel.superclass.initComponent.call(this);
		
    	this.mainFormPanel.buttons[0].on('click', this.onFormSubmit, this);
    	this.mainFormPanel.buttons[1].on('click', this.onFormReset, this);
    	this.mainFormPanel.buttons[2].on('click', this.onFormCancel, this);
    },
    
    constructor: function(tabCont) {
	    this.tabContainer = tabCont;
		VacationRequestPanel.superclass.constructor.call(this);
    },
    
    onFormSubmit: function() {
	    if(this.mainFormPanel.getForm().isValid()){
		    if(this.startDateField.getValue().getYear() != this.endDateField.getValue().getYear()) {
			    Ext.MessageBox.alert('Error: Vacation spans over multiple years','Vacation must start and end on the same year. You might want to split yours into multiple vacations. Thanks!');
		    } else {
				var thisForm = this.mainFormPanel;
				this.mainFormPanel.getForm().submit({
	            	waitMsg:'Loading...',
	                url: 'AddVacation.ashx',
	                success: function(form,action){
	    				thisForm.ownerCt.ownerCt.remove(thisForm.ownerCt);
	                },
	                failure: function(form,action){
	                    Ext.MessageBox.alert('Error','Submission Error');
	                }
	            });
            }
		} else {
			Ext.Msg.alert('Not Complete', 'Fill out required fields correctly!');
		}
    },
    onFormReset: function() {
	    this.mainFormPanel.getForm().reset();
	    this.startDateField.setMinValue(null);
	    this.startDateField.setMaxValue(null);
	    this.endDateField.setMinValue(null);
	    this.endDateField.setMaxValue(null);
    },
    onFormCancel: function() {
	    this.ownerCt.remove(this);
    }
});

// Add the additional 'advanced' VTypes
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },

    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText : 'Passwords do not match'
});