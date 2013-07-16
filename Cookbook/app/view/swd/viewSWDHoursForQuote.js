Ext.define('CookBook.view.swd.ViewSWDHoursForQuote', {
    //This panel is updated by the function 'updateTotalSWDHours()' in viewSWDTotalSWDHours.js
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSWDHoursForQuote',
    title: 'SWD Hours for Quote',
    border: false,
    height: 175,
    bodyborder: false,
    collapsible:true,
    frame: true,
    layout: 'vbox',
    items:[{
        layout:'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        //height:30,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total Billable BA / TC Hours:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'billableBATCHours',
            text: '0',
            width: 110
        }
        ]
    },{
        layout:'hbox',
        width: 1200,
        height:30,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total Non-Billable BA / TC Hours:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'nonBillableBATCHours',
            text: '0',
            width: 110
        }
        ]
    },{
        layout:'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total Billable Dev Hours:</b>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'totalBillableDevHours',
            text: '0',
            width: 110
        }
        ]
    },{
        layout:'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '&nbsp&nbsp&nbsp&nbsp<i>Billable Coding Hours:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'billableCodingHours',
            text: '0',
            width: 110
        }
        ]
    },{
        layout:'hbox',
        width: 1200,
        border: false,
        height:30,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '&nbsp&nbsp&nbsp&nbsp<i>Billable Other Hours:</i>',
            width: 225
        },{
            xtype: 'label',
            itemId: 'billableOtherHours',
            text: '0',
            width: 110
        }
        ]
    },{
        layout:'hbox',
        width: 1200,
        border: false,
        bodyborder: false,
        frame: false,
        bodyStyle: 'background-color:#dfe8f5;',
        items:[{
            xtype: 'label',
            html: '<b>Total Billable PM Hours:</b>',
            width: 225
        },{
            xtype: 'textfield',
            itemId: 'billablePMHours',
            name: 'billablePMHours',
            value: '0',
            width: 50
        }
        ]
    }]
});