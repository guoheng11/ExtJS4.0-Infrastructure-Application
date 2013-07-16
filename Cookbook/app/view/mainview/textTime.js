Ext.define('CookBook.view.mainview.textTime', {
    extend: 'Ext.form.field.Time',
    alias: 'widget.textTime',
    initValue: function(){
        var me = this, value = me.value;
        
        // If a String value was supplied, do NOT try to convert it to a proper Time
        /*if (Ext.isString(value)) {
         me.value = me.rawToValue(value);
         }*/
        me.callParent();
    },
    validator: function(val){
        if (Ext.isDate(val) || Ext.isString(val)) {
            return true;
        }
        else {
            return "Verify this field is either a time field or any text value";
        }
    },
    getSubmitValue: function(){
        var format = this.submitFormat || this.format, value = this.getValue();
        
        if (!Ext.isDate(value) && value != null) {
            if (value.length > 0) {
                return value;
            }
        }
        
        return value ? Ext.Date.format(value, format) : '';
    },
    isValid: function(){
        //var me = this;
        //return me.disabled || me.validateValue(me.processRawValue(me.getRawValue()));
        
        return true; //since PMs can enter anything they want, we don't give two shits about validation
    },
    reset: function(){
        this.callParent();
        this.applyEmptyText();
        this.getPicker().getSelectionModel().suspendEvents(false);
        this.getPicker().getSelectionModel().deselectAll(true);
        this.getPicker().getSelectionModel().resumeEvents();
    },
	//(smm) Created so we can set lastValue and rawValue in one call
	setFullValue: function(value) {
		var me = this;
		me.setRawValue(value);
		me.lastValue = value;
	}
});
