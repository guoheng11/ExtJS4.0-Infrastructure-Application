Ext.define('CookBook.view.misnew.ViewMISNewFormat', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewMISNewFormat',

    store: {
        fields: ['type'],
        data: [
            {'type':'.csv'},
            {'type':'.txt'},
            {'type':'.csv & .txt'}
        ]
    },

    //options
    fieldLabel:         'Format',
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

    name:               'misNewFormat',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a format'
            });
        }
    }
});