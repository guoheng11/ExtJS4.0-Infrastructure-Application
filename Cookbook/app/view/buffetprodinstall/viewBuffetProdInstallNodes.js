Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallNodes', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewBuffetProdInstallNodes',

    //store:  'Companies',  TODO:  Add nodes store
    //options
    store: 'Nodes',
    fieldLabel:         'Nodes',
    labelAlign:         'left',
    typeAhead:          false,
    displayField:       'node1',
    valueField:         'node1',
    multiSelect:        true,
    delimiter:          ', ',
    matchFieldWidth:    true,
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
		loadMask:     false
    },
    queryMode:          'local',

    name:               'buffetprodinstallNodes'
});