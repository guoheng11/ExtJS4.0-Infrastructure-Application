Ext.define('CookBook.view.buffetprodinstall.ViewBuffetProdInstallDate', {
    extend: 'CookBook.view.mainview.textDate',
    alias:  'widget.viewBuffetProdInstallDate',
    fieldLabel: 'Date',
    name: 'viewBuffetProdInstallDate'/*,

	initValue: function() {
        var me = this,
            value = me.value;
*/
        // If a String value was supplied, do NOT try to convert it to a proper Date
        /*if (Ext.isString(value)) {
            me.value = me.rawToValue(value);
        }*/
/*
        me.callParent();
    },

	getSubmitValue: function() {
        var format = this.submitFormat || this.format,
            value = this.getValue();

		if (!Ext.isDate(value)) {
			return value;
		}

        return value ? Ext.Date.format(value, format) : '';
    }*/
});
