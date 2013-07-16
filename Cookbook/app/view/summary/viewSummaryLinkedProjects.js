Ext.define('CookBook.view.summary.ViewSummaryLinkedProjects', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.viewSummaryLinkedProjects',
    
    //options
    allowBlank: false,
    fieldLabel: 'Linked Projects',
    labelAlign: 'top',
    value: '',
    
    store: 'ProjectInformationLinkedProjects',
    
    typeAhead: false,
    displayField: 'project_number',
    valueField: 'project_number',
    allowBlank: true,
    matchFieldWidth: true,
    multiSelect: true,
    selectOnTab: false,
    listConfig: {
        autoHeight: true,
        loadMask: false
    },
    queryMode: 'local',
    lastQuery: '',
    
    name: 'summaryLinkedProjects',
    
    listeners: {
        render: function(c){
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Enter one or more projects that are linked to this project'
            });
        },
        expand: function(){
			this.store.clearFilter();
            var normalValue = Ext.ComponentQuery.query('viewSummaryBusinessUnit')[0].getValue();
            if (!Ext.isEmpty(normalValue)) {
                this.store.filter(function(r){
                    var secondValue = '';
                    var value = r.get('primary_business_unit');
					var value2 = r.get('additional_business_units');
                    console.log('filter activated');
                    if(!Ext.isEmpty(value2)){
                        return (value == normalValue || value2.indexOf(normalValue) != -1);
                    } else {
                        return (value == normalValue) 
                    }
                });
            }
            else {
                console.log('empty Business UNIT; clearing filter');
            }
        },
        collapse: function(){
            console.log('collapsed; clearing filter');
            this.store.clearFilter();
        }
    }
});
