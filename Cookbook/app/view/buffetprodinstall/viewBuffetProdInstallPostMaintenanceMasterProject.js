Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallPostMaintenanceMasterProject', {
    extend: 'Ext.form.field.ComboBox',
    alias:  'widget.viewBuffetProdInstallPostMaintenanceMasterProject',
    fieldLabel: 'Post-Maintenance Notification',
    name: 'viewBuffetProdInstallPostMaintenanceMasterProject',
    store:  'Contacts',
    //options
    triggerAction:      'all',
    typeAhead:          false,
    displayField:       'email1',
    valueField:         'email1',
    matchFieldWidth:    true,
    multiSelect:        true,
	selectOnTab:		false,
    delimiter:          '; ',
    listConfig: {
        //minHeight: 128,
        //maxHeight: 512,
        autoHeight: true,
		loadMask:     false
    },
    queryMode:          'local',

    //allowBlank: false,
    labelAlign: 'left',
    value: '',
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Select one or more email addresses'
            });
        }
    }
});