Ext.define('CookBook.view.misnew.ViewMISNewEmailAddress', {
    extend: 'Ext.form.field.TextArea',
    alias:  'widget.viewMISNewEmailAddress',

    //options
    allowBlank: false,
    fieldLabel: 'E-Mail Address',
    labelAlign: 'right',
    value: '',

    name: 'misnewEmailAddress',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Enter one or more E-Mail addresses, separated by commas'
            });
        }
    }
});