Ext.define('CookBook.view.misnew.ViewMISNewFrequency', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewMISNewFrequency',

    store: {
        fields: ['type'],
        data: [
            {'type':'Daily'},
            {'type':'Weekly'},
            {'type':'MTD'},
            {'type':'Other'}
        ]
    },

    //options
    fieldLabel:         'Frequency',
    labelAlign:         'right',
    trigerAction:       'all',
    typeAhead:          false,
    displayField:       'type',
    multiSelect:        true,
	selectOnTab:		false,
    valueField:         'type',
    allowBlank:         true,
    matchFieldWidth:    true,
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
		loadMask:     false
    },
    queryMode:          'local',

    name:               'misNewFrequency',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a frequency'
            });
        }
    }
});