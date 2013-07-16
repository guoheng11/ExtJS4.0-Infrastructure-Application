Ext.define('CookBook.view.mainview.triggerDate', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.triggerDate',
    initValue: function(){
        //console.log('init value: ' + this.value)
        var me = this, value = me.value;
        
        // If a String value was supplied, do NOT try to convert it to a proper Time
        /*if (Ext.isString(value)) {
         me.value = me.rawToValue(value);
         }*/
        me.callParent();
    },
    /*onTriggerClick: function(){
     var eto = this;
     var xpos = eto.getPosition()[0];
     var ypos = eto.getPosition()[1];
     //console.log('on trigger click|' + xpos + "|" + ypos);
     var win = Ext.create('widget.window', {
     width: 170,
     height: 210,
     preventHeader: true,
     draggable: false,
     resizable: false,
     floatable: false,
     items: [{
     xtype: 'datepicker',
     width: '100%',
     height: '100%',
     listeners: {
     select: function(){
     var val = this.getValue();
     //console.log('selected|'+this.getValue());
     win.hide();
     win.destroy();
     eto.callbackFunction(val, eto);
     },
     deactivate: function(){
     win.hide();
     win.destroy();
     }
     }
     }]
     });
     win.showAt(xpos, ypos);
     },*/
    callbackFunction: function(val, eto){
        var formattedDate = Ext.util.Format.date(val);
        console.log('callback|' + formattedDate);
        eto.setRawValue(formattedDate);
        var grid = Ext.ComponentQuery.query('viewTrafficRoutingAddDnis')[0];
        var selModel = grid.getSelectionModel();
        console.log(selModel.getSelection() + "|" + selModel.getCount() + "|" + selModel.getLastSelected());
        Ext.Function.defer(function(){
            console.log('val after assignment: ' + eto.getRawValue());
        }, 2000);
        
    },
    getSubmitValue: function(){
        var format = this.submitFormat || this.format, value = this.getValue();
        
        if (!Ext.isDate(value) && value != null) {
            if (value.length > 0) {
                return value;
            }
        }
        
        return value ? Ext.Date.format(value, format) : '';
    }
});
