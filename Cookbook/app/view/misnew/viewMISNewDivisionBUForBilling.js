Ext.define('CookBook.view.misnew.ViewMISNewDivisionBUForBilling', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewMISNewDivisionBUForBilling',

    store: {
        fields: ['billing_business_unit'],
        data: [ ]
    },
    //options
    fieldLabel:         '<b>Division / BU for Billing</b>',
    labelAlign:         'left',
    trigerAction:       'all',
    typeAhead:          false,
    displayField:       'name',
    valueField:         'name',
    allowBlank:         false,
    matchFieldWidth:    true,
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
		loadMask:     false
    },
    queryMode:          'local',

    name:               'misNewDivisionBUForBilling',

    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a division/business unit for billling'
            });
        }
    }
});