Ext.define('CookBook.view.summary.ViewSummaryUsanSystemsEngineer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryUsanSystemsEngineer',
    
    store: 'Contacts',
    
    //options
    fieldLabel: 'USAN Systems Engineer',
    labelAlign: 'top',
    trigerAction: 'all',
    typeAhead: false,
    displayField: 'name',
    valueField: 'name',
    allowBlank: true,
    matchFieldWidth: true,
    multiSelect: true,
	forceSelection: true,  //smm
	editable: false,       //smm
    selectOnTab: false,
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
        loadMask: false
    },
    queryMode: 'local',
    
    lastQuery: '',
    name: 'summaryUsanSystemsEngineer',
    
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a Systems Engineer'
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
         store.proxy.extraParams.primary_type = 3;
         store.load();
         }*/
    }
});
