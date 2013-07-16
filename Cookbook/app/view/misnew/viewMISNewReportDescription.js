Ext.define('CookBook.view.misnew.ViewMISNewReportDescription', {
    extend: 'Ext.form.field.TextArea',
    alias:  'widget.viewMISNewReportDescription',

    //options
    store: {
        fields: ['description'],
        data: [ ]
    },
    allowBlank: true,
    fieldLabel: '',
    dataIndex: 'description',
    displayField: 'description',
    valueField: 'description',
    
    name: 'newReportDescription',

    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl(),
                text: 'New Report Description'
            });
        }
    }
});