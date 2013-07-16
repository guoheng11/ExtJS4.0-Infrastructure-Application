Ext.define('CookBook.view.summary.ViewSummaryUsanTLSSaaS', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryUsanTLSSaaS',
    
    store: 'Contacts',
    
    //options
    fieldLabel: 'USAN TLS-SaaS',
    labelAlign: 'top',
    trigerAction: 'all',
    typeAhead: false,
    displayField: 'name',
    valueField: 'name',
    allowBlank: true,
    matchFieldWidth: true,
    multiSelect: true,
    selectOnTab: false,
	forceSelection: true,  //smm
	editable: false,       //smm
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
        loadMask: false
    },
    queryMode: 'local',
    
    name: 'summaryUsanTLSSaaS',
    lastQuery: '',
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a TLS-SaaS contact'
            });
        },
        expand: function(){
            this.store.filter([{
                property: 'company_name',
                value: 'USAN'
            }]);
        },
        collapse: function(){
            this.store.clearFilter();
        }
        /*,
         expand: function(c, options) {
         var store = c.getStore();
         store.proxy.extraParams.primary_type = 5;  //TODO:  Need a new primary_type for this
         store.load();
         }*/
    }
});
