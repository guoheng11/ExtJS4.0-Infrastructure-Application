Ext.define('CookBook.view.misnew.ViewMISNewDistributionAddEmail', {
    extend: 'Ext.form.field.TextArea',
    alias:  'widget.viewMISNewDistributionAddEmail',

    //options
    allowBlank: false,
    fieldLabel: 'Emails to Add',
    labelAlign: 'top',
    value: '',

    name: 'misnewDistributionAddEmail'
    
    /*
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Enter email addresses to remove from the distribution, separated by commas'
            });
        }
    }
    */
});