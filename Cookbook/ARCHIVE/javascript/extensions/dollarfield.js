Ext.namespace('Ext.ux');

Ext.util.Format.usMoneyNull = function(val) {
    //-- allows clearing of field value (so that $0.00 only shows if you explicitly entered zero for a value).
    if (val == null||val == '') {
        return '';
    } else if (val > 999999999999) {
        return '';
    } else {
        return Ext.util.Format.usMoney(val);
    }
}

Ext.ux.dollarField = function(config) {
    //-- Add any numberfield default settings here:
    var defaultConfig = {
        allowDecimals: true,
        allowNegative: false,
        decimalPrecision: 2,
        maxValue: 1000000000,
        minValue: 0,
        value: 0,
        selectOnFocus: true,
        itemCls: 'rmoney' // to right-align dollar field, define style: .rmoney .x-form-field {text-align:right;}
    };

    Ext.ux.dollarField.superclass.constructor.call(this, Ext.apply(defaultConfig, config));

    this.on('change',this._onChange,this);
    this.on('initself',this._onInitSelf);
    this.on('focus',this._onFocus);
    this.on('blur',this._onBlur);
    this.on('render',this._onRender);
    //this.on('valid',this._onValid);
    this.dollarNumericValue=config.value || null;
    }

    Ext.extend(Ext.ux.dollarField, Ext.form.NumberField, {
    dollarNumericValue: null,

    initSelf: function(){
        // When form loads, bare number is loaded and displayed. Call this (via listener, typically)
        // to format value to dollar.
        if (this.value === null || this.value === '') {
            this.dollarNumericValue = null;
        } else {
            this.dollarNumericValue = this.value;
        }
        this.setRawValue(this.formatter(this.dollarNumericValue));

        // prevent field from reporting itself as "dirty" after form load (isDirty check):
        this.originalValue = this.dollarNumericValue;
    },

    getValue:function(){
        //return this.value+"".replace(/[^0-9.-]/g,"")-0; strip out any formatting characters from string.
        if (this.value === '' || this.value === null) {
            return null;
        } else if (isNaN(this.value)) {
            this.value = 0;
        } else {
            return Number(this.value);
        }
    },
    getErrors: function(value) {
	    var errors = Ext.form.NumberField.superclass.getErrors.apply(this, arguments);
	    return errors;
    },

    _onChange:function(field, newVal, oldVal){
        // n will always be unformatted numeric as STRING! So "-0" to force numeric type:
        if (newVal === '') {
            this.dollarNumericValue = null
        } else {
            this.dollarNumericValue = newVal-0;
        }
    },
    _onRender:function(cmp){
        this.setRawValue(this.formatter(this.dollarNumericValue));
        if (this.isFormField) {    // Is this check necessary?
            var parentForm = this.findParentByType('form');

            /*
                Note: If client-side validation is enabled, unformatted numbers get posted on save. Good!

                (The field's "isValid" method just does this for some reason, which works to our advantage.)

                BUT (there's always a "but"), we then need to apply back the dollar formatting so that the
                numbers aren't left displayed as plain.
            */
			if(parentForm) {
	            // Format dollar after successful form save:
	            parentForm.on('actioncomplete', function(){cmp.initSelf();});
	
	            // Format back to dollar after failed save attempt.
	            parentForm.on('actionfailed', function(){cmp.initSelf();});
	
	            // doLayout is called on initial page load.
	            parentForm.on('afterLayout', function(){cmp.initSelf();});
	        }

            // Formats dollar after client-side validation fails...maybe...still investigating this.
            // parentForm.on('beforeaction', function(){cmp.initSelf();});

            /*
                Depends on order of any success/actioncomplete/actionfailed listeners???
                Or maybe you are checking if the form isValid yourself by listening to the
                form's beforeaction, type action.type=='submit' and then returning false to
                cancel the action.    Still looking into all this.

                More on clientValidation:
                Before the form submits (doAction 'submit' with clientValidation not set to false...
                from docs: "If undefined, pre-submission field validation is performed.") the call
                to form "isValid" will turn the dollarfield back to a plain, unformatted number,
                which will get posted.
            */

        }
    },

    formatter: function(value){
        if (value === 0) {
            return Ext.util.Format.usMoneyNull("0");  // returns '$0.00' instead of ''.
        } else {
            return Ext.util.Format.usMoneyNull(value);
        }
    },
	setThisValue : function(v) {
        v = this.fixPrecision(v);
        v = Ext.isNumber(v) ? v : parseFloat(String(v).replace(this.decimalSeparator, "."));
        v = isNaN(v) ? '' : String(v).replace(".", this.decimalSeparator);
        if (v == '') {
            this.dollarNumericValue=null;
        } else {
            this.dollarNumericValue=v-0;
        }
		var rawVal = this.formatter(this.dollarNumericValue);
        this.setRawValue(rawVal);

        if (this.dollarNumericValue !== this.value)    {
            this.value = this.dollarNumericValue;
        }
        //return Ext.form.NumberField.superclass.setValue.call(this, v);
    },
    _onBlur: function(field){
        /*
            always update dollarNumericValue with the actual RawValue (which right here (onBlur) will
            *always* be numeric    (remember: when focused, it's unformatted numeric entry...just like
            numberfield does. So onBlur, grab that numeric value and save it to this.dollarNumericValue,
            then apply formatting back to RawValue for display.
        */

        if (field.getRawValue() == '') {
            this.dollarNumericValue=null;
        } else {
            this.dollarNumericValue=field.getRawValue()-0;
        }

        field.setRawValue(this.formatter(this.dollarNumericValue));

        if (this.dollarNumericValue !== this.value)    {
            /* for some reason, when zero'ing out a value (or clearing), the onChange event is not firing 
              and this.value is not getting set to the new zero or blank value. This fixes that:
            */
            this.value = this.dollarNumericValue;
        }

    },

    _onFocus: function(field){
        if (this.dollarNumericValue === null||this.dollarNumericValue === '') {
            field.setRawValue('');
        } else {
            // remove formatting by restoring RawValue to dollarNumericValue.
            field.setRawValue((this.dollarNumericValue-0).toFixed(this.decimalPrecision));
        }
    },

    initAllSiblings: function() {
        /*
        Perhaps useful to call this manually when having trouble getting the event listeners straightened
        out as described above
        */
        if (this.isFormField) {    // Is this check necessary?
            var parentForm = this.findParentByType('form');

            var dollarFields = parentForm.findByType('dollarfield');
            Ext.each(dollarFields, function(dollarfield) {dollarfield.initSelf();});
        }
    }

    /*
    _onValid:function(field){
        if (!field.hasFocus) {

            //could do this here instead of onBlur, but form would end up posting the formatted dollar
            //value instead of the numeric value.

            this.setRawValue(this.formatter(this.dollarNumericValue));
        }
    },
    */
});

Ext.ComponentMgr.registerType('dollarfield', Ext.ux.dollarField);