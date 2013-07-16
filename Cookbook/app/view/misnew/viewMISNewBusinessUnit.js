Ext.define('CookBook.view.misnew.ViewMISNewBusinessUnit', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewMISNewBusinessUnit',

    store:  'BusinessUnits',

    //options
    fieldLabel:         'Business Unit/Division',
    labelAlign:         'right',
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

    name:               'misNewBusinessUnit',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a business unit'
            });
        }
    }
});