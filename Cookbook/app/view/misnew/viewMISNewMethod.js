Ext.define('CookBook.view.misnew.ViewMISNewMethod', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewMISNewMethod',

    store: {
        fields: ['type'],
        data: [{
            'type':'E-Mail'
        },{
            'type':'AccessUSAN'
        },{
            'type':'Vision'
        }
        ]
    },

    //options
    fieldLabel:         'Method',
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

    name:               'misNewMethod',

    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select a method'
            });
        }
    }
});