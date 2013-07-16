Ext.define('CookBook.view.misnew.ViewMISNewApplicationGroup', {
    extend: 'Ext.form.field.Text',
    alias:  'widget.viewMISNewApplicationGroup',

    
    
    //options
    fieldLabel:         'Product/Application',
    labelAlign:         'right',
    matchFieldWidth:    true,
    readOnly: true,
    name:               'misNewApplicationGroup',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'This field is automatically populated from the requirements tab'
            });
        }
    }
});