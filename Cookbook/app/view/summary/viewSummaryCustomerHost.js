Ext.define('CookBook.view.summary.ViewSummaryCustomerHost', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryCustomerHost',
    
    store: 'Contacts',
    
    //options
    fieldLabel: 'Customer Host',
    labelAlign: 'top',
    trigerAction: 'all',
    typeAhead: false,
    displayField: 'name',
    valueField: 'name',
    allowBlank: true,
    matchFieldWidth: true,
    multiSelect: true,
    forceSelection: true, //smm
    editable: false, //smm
    selectOnTab: false,
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
        loadMask: false
    },
    queryMode: 'local',
    lastQuery: '',
    
    name: 'summaryCustomerHost',
    
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a Customer Host contact'
            });
        },
        expand: function(){
            var normalValue = Ext.ComponentQuery.query('viewSummaryCompany')[0].getValue();
            if (!Ext.isEmpty(normalValue)) {
                this.store.filter(function(r){
                    var secondValue = '';
                    if (normalValue == 'Citi Group') {
                        //console.log('Company Citi Group; adding Verizon to filter');
                        secondValue = 'Verizon';
                    }
                    else 
                        if (normalValue == 'Verizon') {
                            //console.log('Company Verizon; adding Citi Group to filter');
                            secondValue = 'Citi Group';
                        }
                    var value = r.get('company_name');
                    if (secondValue == '') {
                        return (value == normalValue);
                    }
                    else {
                        return (value == normalValue || value == secondValue);
                    }
                });
            }
            else {
                //console.log('empty company; clearing filter');
            }
        },
        collapse: function(){
            this.store.clearFilter();
        }
        /*,
         expand: function(c, options) {
         var store = c.getStore();
         store.proxy.extraParams.primary_type = 9;
         store.load();
         }*/
    }
});