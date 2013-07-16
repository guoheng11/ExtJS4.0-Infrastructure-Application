Ext.define('CookBook.view.swd.ViewSWDNonBillableTC', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDNonBillableTC',
    bodyPadding: 5,
    width: 400,
    autoscroll:true,
    height: 400,
    bodyborder: false,
    frame: true,
    items:[],

    buttons:[{
        text:'Add',
        handler: function() {
            var panel = this.up('panel');
            var additionalNonBillableTC = Ext.create('Ext.form.Panel', {
                title: 'Additional Non Billable TC',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'TC Name'
                },{
                    xtype: 'numberfield',
                    minValue: 0,
                    maxValue: 255,
                    name: 'addTCHours',
                    fieldLabel: 'Hours'
                },{
                    xtype: 'button',
                    text: 'Delete',
                    handler: function() {
                        panel.remove(additionalNonBillableTC)
                    }
                }],
            }
            );
            panel.add(additionalNonBillableTC);

        }
    },{
        text: 'Hours',
        handler: function(){
        }
    }]
});