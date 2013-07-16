Ext.define('CookBook.view.summary.ViewSummaryScheduledUatDate', {
    extend: 'CookBook.view.mainview.textDate',
    alias: 'widget.viewSummaryScheduledUatDate',
    
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
    fieldLabel: 'Quoted UAT Delivery Date',
    labelAlign: 'left',
    //minValue: new Date(),
    
    name: 'summaryScheduledUatDate',
    itemId: 'summaryScheduledUatDate',
    listeners: {
        change: function(){
            var swdActualDate = Ext.ComponentQuery.query('#scheduledUATDelivery')[0];
            
            swdActualDate.setFullValue(Ext.ComponentQuery.query('viewSummaryScheduledUatDate')[0].getRawValue());
        },
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'This date is tied to SWD tab\'s Scheduled UAT Delivery field'
            });
        }
    }
});
