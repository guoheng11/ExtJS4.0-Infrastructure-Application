var NonBillableTC = Ext.create('Ext.form.Panel', {
    title: 'Non Billable TC',
    items: [{
        xtype: 'textfield',
        fieldLabel: 'TC Name'
    },{
        xtype: 'numberfield',
        minValue: 0,
        maxValue: 255,
        name: 'Hours',
        fieldLabel: 'Hours'
    },{
        xtype: 'button',
        text: 'Delete',
        handler: function() {

        }
    }],
});

Ext.define('CookBook.view.swd.ViewSWDNonBillableTC', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDNonBillableTC',
    bodyPadding: 5,
    width: 400,
    autoscroll:true,
    bodyborder: false,
    frame: true,
    items:[NonBillableTC],
    buttons:[{
        text:'Add',
        handler: function() {
            var additionalNonBillableTC = Ext.create('Ext.form.Panel', {
                title: 'Additional Non Billable TC',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'TC Name'
                },{
                    xtype: 'numberfield',
                    minValue: 0,
                    maxValue: 255,
                    name: 'Hours',
                    fieldLabel: 'Hours'
                },{
                    xtype: 'button',
                    text: 'Delete',
                    handler: function() {
                        this.up('panel'.remove(additionalNonBillableTC))
                        
                    }
                }],
            })
            
            this.up('panel').add(additionalNonBillableTC)
        }
    }]
});