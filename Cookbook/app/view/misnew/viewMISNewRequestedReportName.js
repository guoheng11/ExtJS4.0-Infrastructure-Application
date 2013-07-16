Ext.define('CookBook.view.misnew.ViewMISNewRequestedReportName', {
    extend: 'Ext.form.field.TextArea',
    alias:  'widget.viewMISNewRequestedReportName',

    //options
    allowBlank: false,
    fieldLabel: '<b>Requested Report Name(s)</b>',
    labelAlign: 'left',
    value: '',

    name: 'misNewRequestedReportName',
    
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'Enter one or more report names, separated by commas'
            });
        }
    }
});