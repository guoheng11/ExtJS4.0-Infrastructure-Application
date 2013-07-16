Ext.define('CookBook.view.summary.ViewSummaryUsanDevPM', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryUsanDevPM',
    
    store: 'Contacts',
    
    //options
    fieldLabel: 'USAN Dev PM',
    labelAlign: 'top',
    trigerAction: 'all',
    typeAhead: false,
    displayField: 'name',
    valueField: 'name',
    allowBlank: true,
    multiSelect: true,
	forceSelection: true,  //smm
	editable: false,       //smm
    matchFieldWidth: true,
    selectOnTab: false,
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
        loadMask: false
    },
    queryMode: 'local',
    
    lastQuery: '',
    name: 'summaryUsanDevPM',
    
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a Dev PM'
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
         store.proxy.extraParams.primary_type = 2;
         store.load();
         }*/
    }
});
