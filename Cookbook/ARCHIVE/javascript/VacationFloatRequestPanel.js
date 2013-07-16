VacationFloatRequestPanel = Ext.extend(Ext.Panel, {
	mainFormPanel: '',
	tabContainer: '',
	endDateField: '',
	radioGroup: '',
	fp: '',
	mainStore: '',
	
    initComponent:function() {
	    // turn on validation errors beside the field globally
	    Ext.form.Field.prototype.msgTarget = 'side';
	    
	    var eto = this;
	    
	    var todayDate = new Date();
	    var year = todayDate.getYear() + 1900;
	    var yomKippurDate = this.calculateYomKippur(year);
	    var martinDate = this.calculateMartinLutherDay(year);
	    var presidentDate = this.calculatePresidentsDay(year);
	    var goodFridayDate = this.calculateGoodFriday(year);
	    var columbusDate = this.calculateColumbusDay(year);
	    var veteransDate = this.calculateVeteransDay(year);
	    var funct = function(year) {
		    return eto.calculateVeteransDay(year);
	    };
	    
	    var reader = new Ext.data.JsonReader({
	        fields: [
	            {name: 'vacation_id', type: 'int'},
	            {name: 'name', type: 'string'},
	            {name: 'type', type: 'string'},
	            {name: 'start_date', type: 'date'},
	            {name: 'end_date', type: 'date'},
	            {name: 'approved', type: 'string'},
	            {name: 'request_date', type: 'date'},
	            {name: 'days_used', type: 'int'},
	            {name: 'backups', type: 'string'},
	            {name: 'approve_date', type: 'date'},
	            {name: 'approved_by', type: 'string'}
	        ]
	    });
	    var todaysDate = new Date();
	    var yearStartDate = new Date();
	    yearStartDate.setFullYear(todaysDate.getYear()+1900,0,1);
	    var yearEndDate = new Date();
	    yearEndDate.setFullYear(todaysDate.getYear()+1900,11,31);
	    
	    this.mainStore = new Ext.data.JsonStore({
            reader: reader,
            proxy: new Ext.data.HttpProxy({
				url: 'GetVacations.ashx', // File to connect to
				method: 'GET'
			}),
			baseParams:{"start_date": yearStartDate.format('Y/m/d'), "end_date": yearEndDate.format('Y/m/d'), "type": "FLOATER"},
            sortInfo:{field: 'start_date', direction: "ASC"}
        });
        
	    this.fp = new Ext.FormPanel({
	        width: 600,
	        frame: true,
	        bodyBorder: false,
	        autoHeight: true,
	        bodyStyle: 'padding: 10px 10px 0 10px;',
	        labelWidth: 100,
	        defaults: {
	            anchor: '95%',
	            allowBlank: false,
	            msgTarget: 'side'
	        },
	        items: [{
	            xtype: 'datefield',
	            fieldLabel: 'Your Birthday',
	            name: 'birthday',
	            format: 'Y/m/d'
	        }],
	        buttons: [{
	            text: 'Submit',
	            handler: function(){
	                if(eto.fp.getForm().isValid()){
		                var thisForm = eto.fp.getForm();
		                thisForm.submit({
		                    url: 'UpdateUser.ashx',
		                    success: function(fp, o) {
			                    eto.win.hide();
			                    eto.fp.getForm().reset();
			                    eto.mainStore.reload();
		                        //Ext.Msg.alert('Success', 'Done');
		                    },
		                    failure: function(fp, o) {
			                    Ext.Msg.alert('Failure', 'Update Failed');
			                    eto.mainStore.reload();
			                    eto.win.hide();
		                    }
		                });
	                }
	            }
	        },{
	            text: 'Cancel',
	            handler: function(){
	                eto.win.hide();
	                eto.fp.getForm().reset();
	            }
	        }]
	    });

        this.win = new Ext.Window({
	        id: 'selectMyBirthday',
            title: 'Specify Your Birthday',
            closeAction: 'hide',
            width: 600,
            height: 140,
            layout: 'form',
            hidden: true,
            items: [eto.fp]
        });
        
        this.endDateField = new Ext.form.Hidden({
            name: 'end_date',
            value: ''
        });
        
        this.radioGroup = new Ext.form.RadioGroup({
	        fieldLabel: 'Choose Floating Holiday',
            columns: 1,
            defaults: {
	            labelStyle: 'width: 250;',
	            listeners: {
			        'check': {
				        scope: this,
				        fn: function(field, checkedBool) {
					        if(checkedBool) {
						        this.mainFormPanel.buttons[0].enable();
						        if(field.inputValue == 'bday') {
							        eto.win.show();
						        } else {
							        eto.endDateField.setValue(field.inputValue);
						        }
				        	}
				        }
			        }
	        	}
	        },
            items: [
                {fieldLabel: 'Martin Luther King ('+martinDate.format('M d,Y')+')', name: 'start_date', inputValue: martinDate},
                {fieldLabel: 'Presidents Day ('+presidentDate.format('M d,Y')+')', name: 'start_date', inputValue: presidentDate},
                {fieldLabel: 'Good Friday ('+goodFridayDate.format('M d,Y')+')', name: 'start_date', inputValue: goodFridayDate},
                {fieldLabel: 'Yom Kippur ('+yomKippurDate.format('M d,Y')+')', name: 'start_date', inputValue: yomKippurDate},
                {fieldLabel: 'Columbus Day ('+columbusDate.format('M d,Y')+')', name: 'start_date', inputValue: columbusDate},
                {fieldLabel: 'Veterans Day ('+veteransDate.format('M d,Y')+')', name: 'start_date', inputValue: veteransDate},
                {fieldLabel: 'Personal Birthday', name: 'start_date', inputValue: 'bday'}
            ]
        });
		this.mainFormPanel = new Ext.FormPanel({
	        frame: true,
	        title:'Request a Floating Holiday',
	        labelWidth: 180,
	        width: 600,
	        bodyStyle: 'padding:0 10px 0;',
	        defaults: {allowblank: false},
	        items: [
	        this.radioGroup,{
                xtype: 'textfield',
                fieldLabel: 'Backups',
                width: 177,
		    	name: 'backups'
            },{
                xtype: 'hidden',
                name: 'type',
                value: 'FLOATING'
            },this.endDateField],
	        buttons: [{
	            text: 'Submit',
	            disabled: true
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
    	
		VacationFloatRequestPanel.superclass.initComponent.call(this);
		
		this.mainFormPanel.on('afterrender', function() {
			this.mainStore.load();
		});
		
    	this.mainFormPanel.buttons[0].on('click', this.onFormSubmit, this);
    	this.mainFormPanel.buttons[1].on('click', this.onFormReset, this);
    	this.mainFormPanel.buttons[2].on('click', this.onFormCancel, this);
    },
    
    constructor: function(tabCont) {
	    this.tabContainer = tabCont;
		VacationFloatRequestPanel.superclass.constructor.call(this);
    },
    
    onFormSubmit: function() {
	    if(this.mainFormPanel.getForm().isValid()){
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
    },
    disableExpired: function() {
	    todaysDate
    },
    calculateYomKippur: function(year) {
      	var digitRegExp = new RegExp("/^\d+$/");
      	if(typeof year == 'number') {
	      	if(year > 1000 && year < 9999) {
	      		var goldenNumber = year % 19 + 1;
	      		var nPlusFraction = 6.057778996 + 1.554241797*((12*goldenNumber)%19) + 0.25*((year-1900)%4) - 0.003177794*(year-1900);
	      		var nFloor = Math.floor(nPlusFraction);
	        	var proposedRoshHashanah = new Date();
	        	proposedRoshHashanah.setYear(year);
	        	var realRoshHashanah = proposedRoshHashanah;
	        	if(nFloor > 30) {
		            proposedRoshHashanah.setMonth(9);
		            proposedRoshHashanah.setDate(nFloor-30);
		        } else {
		            proposedRoshHashanah.setMonth(8);
		            proposedRoshHashanah.setDate(nFloor);
		        }
		        var rule = 0;
		        if(proposedRoshHashanah.getDay() == 0 || proposedRoshHashanah.getDay() == 3 || proposedRoshHashanah.getDay() == 5) {
		            realRoshHashanah = new Date(proposedRoshHashanah.getTime() + 86400000);
		            rule = 1;
		        } else if(proposedRoshHashanah.getDay() == 1 && ((nPlusFraction - nFloor) >= (23269/25920)) && (12*goldenNumber % 19) > 11) {
		            realRoshHashanah = new Date(proposedRoshHashanah.getTime() + 86400000);
		            rule = 2;
		        } else if(proposedRoshHashanah.getDay() == 2 && ((nPlusFraction - nFloor) >= (1367/2160)) && (12*goldenNumber % 19) > 6)  {
		            realRoshHashanah = new Date(proposedRoshHashanah.getTime() + 2*86400000);
		            rule = 3;
		        }
	        	var yomKippurDate = new Date(realRoshHashanah.getTime() + 9*86400000);
	      		return yomKippurDate;
      		}
      	}
      	return new Date('January 01, 1999');
    }, // end of calculateYomKippur()
    calculateMartinLutherDay: function(year) {
	    if(typeof year == 'number') {
	      	if(year > 1000 && year < 9999) {
		      	var startYear = new Date("January 1, " + year);
		      	var daysTillMonday = 1-startYear.getDay();
		      	if(daysTillMonday < 0) {
			      	daysTillMonday = 7 + daysTillMonday;
		      	}
		      	var martinDay = startYear;
		      	martinDay.setDate(startYear.getDate()+daysTillMonday+14);
		      	return martinDay;
      		}
      	}
      	return new Date('January 01, 1999');
    },
    calculatePresidentsDay: function(year) {
	    if(typeof year == 'number') {
	      	if(year > 1000 && year < 9999) {
		      	var startYear = new Date("February 1, " + year);
		      	var daysTillMonday = 1-startYear.getDay();
		      	if(daysTillMonday < 0) {
			      	daysTillMonday = 7 + daysTillMonday;
		      	}
		      	var presidentDay = startYear;
		      	presidentDay.setDate(startYear.getDate()+daysTillMonday+14);
		      	return presidentDay;
      		}
      	}
      	return new Date('January 01, 1999');
    },
    /*
     * Taken from http://home.att.net/~srschmitt/script_easter_date.html
     */
    calculateGoodFriday: function(year) {
	    if( year < 1583 ) {
	        return new Date('January 01, 1999');
	    }
	    
	    var a, b, c, d, e, f, g, h, i, j, k, m, n, p;
	    var temp;
	    var mon;
	    temp = year / 19;
	    a = Math.floor( ( temp - Math.floor( temp ) ) * 19 + 0.001 );
	    
	    temp = year / 100;
	    b = Math.floor( temp );
	    c = Math.floor( ( temp - Math.floor( temp ) ) * 100 + 0.001 );
	    
	    temp = b / 4;
	    d = Math.floor( temp );
	    e = Math.floor( ( temp - Math.floor( temp ) ) *4 + 0.001 );
	    f = Math.floor( ( ( b + 8 ) / 25 ) + 0.001 );
	    g = Math.floor( ( b - f + 1 ) / 3 )
	    
	    temp = ( 19 * a + b - d - g + 15 ) / 30;
	    h = Math.floor( ( temp - Math.floor( temp ) ) * 30 + 0.001 );
	    
	    temp = c / 4;
	    i = Math.floor( temp );
	    j = Math.floor( ( temp - i ) * 4 + 0.001 );
	    
	    temp = ( 32 + 2 * e + 2 * i - h - j ) / 7;
	    k = Math.floor( ( temp - Math.floor( temp ) ) * 7 + 0.001 );
	    m = Math.floor( ( a + 11 * h + 22 * k ) / 451 );
	    
	    temp = ( h + k - 7 * m + 114 ) / 31;
	    n = Math.floor( temp );
	    p = Math.floor( ( temp - n ) * 31 + 0.001 );
	    p++;
	    
	    mon = "April ";
	    if( n == 3 ) {
	        mon = "March ";
        }
        var westernEasterDate = new Date(""+mon+p+", "+year);
        var daysAfterFriday = 2+westernEasterDate.getDay();
      	if(daysAfterFriday > 7) {
	      	daysAfterFriday = daysAfterFriday - 7;
      	}
      	var goodFridayDate = westernEasterDate;
		goodFridayDate.setDate(westernEasterDate.getDate()-daysAfterFriday);
		return goodFridayDate;
    },
    calculateColumbusDay: function(year) {
	    if(typeof year == 'number') {
	      	if(year > 1000 && year < 9999) {
		      	var startMonth = new Date("October 1, " + year);
		      	var daysTillMonday = 1-startMonth.getDay();
		      	if(daysTillMonday < 0) {
			      	daysTillMonday = 7 + daysTillMonday;
		      	}
		      	var columbusDay = startMonth;
		      	columbusDay.setDate(startMonth.getDate()+daysTillMonday+7);
		      	return columbusDay;
      		}
      	}
      	return new Date('January 01, 1999');
    },
    calculateVeteransDay: function(year) {
	    if(typeof year == 'number') {
	      	if(year > 1000 && year < 9999) {
		      	var realVeteransDay = new Date("November 11, " + year);
		      	var fakeVeteransDay = realVeteransDay;
		      	if(realVeteransDay.getDay() == 6) {
			      	fakeVeteransDay.setDate(realVeteransDay.getDate()-1);
		      	} else if(realVeteransDay.getDay() == 0) {
		      		fakeVeteransDay.setDate(realVeteransDay.getDate()+1);
	      		}
		      	return fakeVeteransDay;
      		}
      	}
      	return new Date('January 01, 1999');
    }
});