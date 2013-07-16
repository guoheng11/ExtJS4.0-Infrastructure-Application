Ext.define('CookBook.view.summary.ViewSummaryRequestedProdDate', {
    extend: 'CookBook.view.mainview.textDate',
    alias: 'widget.viewSummaryRequestedProdDate',
    
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
    fieldLabel: 'Requested Prod Date',
    labelAlign: 'left',
    //minValue: new Date(),
    
    name: 'summaryRequestedProdDate',
    listeners: {
        change: function(){
            var swdTargetDate = Ext.ComponentQuery.query('#SWDSummaryTargetProdDate')[0];
            swdTargetDate.setFullValue(Ext.ComponentQuery.query('viewSummaryRequestedProdDate')[0].getRawValue());
        },
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'This date is tied to SWD tab\'s Requested Production Date field'
            });
        }
    }
});
