/*This is just the class definition of the form that is dynamically added*/

Ext.define('additionalPanel', {
    bodyPadding: 5,
    extend: 'Ext.form.Panel',
    items: [{
        xtype: 'combobox',
        fieldLabel: 'Name'
    },{
        xtype: 'numberfield',
        minValue: 0,
        maxValue: 255,
        itemId: 'Hours',
        fieldLabel: 'Hours',
        listeners: {
            'change': function() {
                alert('tiddlywinks');
                hours = 0;
                allchildren = getAllChildren(this.ownerCt.up('panel'));
                this.ownerCt.up('panel').down('label').setText('Sum of Hours: ' + allchildren);
                
                
                alert('this shit works, too');
                
                //this.ownerCt.up('panel').up('panel').getComponent('TotalNonBillableDevHours').fireEvent('updateHours');
                
            },
            afterrender: function(){
                alert('afterrender');
            }
        }
    },{
        xtype: 'button',
        text: 'Delete',
        handler: function() {
            this.ownerCt.destroy();
        }
    }],
    listeners: {
        beforedestroy: function() {
            this.getComponent('Hours').setValue(0);
        }
    }
});



/*Main view “class”*/

Ext.define('CookBook.view.summary.ViewSummaryTest', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.viewSummaryTest',
    bodyPadding: 5,
    width: 400,
    minWidth: 400,
    height: 200,
    minHeight: 150,
    bodyborder: false,
    autoScroll:true,
    resizable: true,
    collapsible:true,
    frame: true,
    title: 'Non Billable TC Design',
    items:[],
    dockedItems:[{
        xtype: 'label',
        forId: 'hoursFieldId',
        dock: 'top',
        text: 'Sum of Hours: 0'
    },{
        xtype: 'button',
        dock: 'bottom',
        text:'Add Another',
        handler: function() {
            var additionalNonBillableTC = Ext.create('additionalPanel');
            additionalNonBillableTC.setTitle("Additional Non Billable TC");
            this.up('panel').add(additionalNonBillableTC);
        }
    }],
    buttons:[],
    listeners: {
        afterrender: function() {
            var NonBillableTC = Ext.create('additionalPanel');
            NonBillableTC.down('button').destroy();
            this.add(NonBillableTC);
        }
    }
});



function getAllChildren (panel) {

    /*Get children of passed panel or an empty array if it doesn't have thems.*/
    var children = panel.items ? panel.items.items : [];
    /*For each child get their children and concatenate to result.*/
    Ext.each(children, function (child) {
        if (child.getXType() == 'numberfield') {
            hours+=child.getValue();
        }
        getAllChildren(child);
    })
    return hours;
}









/*
Ext.define('CookBook.view.summary.ViewSummaryVisioDrop', {
	extend: 'Ext.form.field.Text',
	alias:  'widget.viewSummaryVisioDrop',

	//options
	allowBlank: false,
	fieldLabel: 'Visio Drop',
	labelAlign: 'left',
	value: '',
	//html:  '<a href=file://///ops1/e_drive target=_blank> Click me! </a>',

	name: 'summaryVisioDrop',
	
	listeners: {
		render: function(c) {
			Ext.QuickTips.register({
				target: c.getEl(),
				text: 'Enter a link to the visios, or double-click to follow the existing link'
			});
		}
	}
});
*/