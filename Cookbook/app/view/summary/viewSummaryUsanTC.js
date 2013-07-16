Ext.define('CookBook.view.summary.ViewSummaryUsanTC', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryUsanTC',
    
    store: 'Contacts',
    
    //options
    fieldLabel: 'USAN TC',
    labelAlign: 'top',
    typeAhead: false,
    displayField: 'name',
    valueField: 'name',
    allowBlank: true,
    multiSelect: true,
    matchFieldWidth: true,
	forceSelection: true,  //smm
	editable: false,       //smm
    selectOnTab: false, /* test */
    listConfig: {
        autoHeight: true,
        loadMask: false
    },
    queryMode: 'local',
    
    name: 'summaryUsanTC',
    lastQuery: '',
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a contact'
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
    }
});
