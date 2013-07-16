Ext.define('CookBook.view.summary.ViewSummaryUsanQA', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryUsanQA',
    
    store: 'Contacts',
    
    //options
    fieldLabel: 'USAN QA',
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
    name: 'summaryUsanQA',
    
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a Quality Analyst'
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
         store.proxy.extraParams.primary_type = 2; //TODO:  Need a QA type
         store.load();
         }*/
    }
});
