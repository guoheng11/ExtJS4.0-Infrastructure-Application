Ext.define('CookBook.view.summary.ViewSummaryScheduledProdDate', {
    extend: 'CookBook.view.mainview.textDate',
    alias: 'widget.viewSummaryScheduledProdDate',
    
    /*initValue: function() {
     var me = this,
     value = me.value;
     */
    // If a String value was supplied, do NOT try to convert it to a proper Date
    /*if (Ext.isString(value)) {
     me.value = me.rawToValue(value);
     }*/
    /*
     me.callParent();
     },
     getSubmitValue: function() {
     var format = this.submitFormat || this.format,
     value = this.getValue();
     if (!Ext.isDate(value)) {
     return value;
     }
     return value ? Ext.Date.format(value, format) : '';
     },*/
    //options
    allowBlank: false,
    fieldLabel: 'Scheduled Prod Date',
    labelAlign: 'left',
    //minValue: new Date(),
    
    name: 'summaryScheduledProdDate',
    itemId: 'summaryScheduledProdDate',
    listeners: {
        change: function(){
            var swdActualDate = Ext.ComponentQuery.query('#SWDSummaryActualProdDate')[0];
            var uatInstallDate = Ext.ComponentQuery.query('#uatprodinstallUatDate')[0];
			
            swdActualDate.setFullValue(Ext.ComponentQuery.query('viewSummaryScheduledProdDate')[0].getRawValue());
			uatInstallDate.setFullValue(Ext.ComponentQuery.query('viewSummaryScheduledProdDate')[0].getRawValue());
        },
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'This date is tied to SWD tab\'s Scheduled Production Date field AND UAT & Prod Install\'s Production Date field'
            });
        }
    }
});
