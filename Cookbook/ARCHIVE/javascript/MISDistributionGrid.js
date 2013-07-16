MISDistributionGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	initComponent:function() {
		var eto = this;
		
		var distUpdateStore = new Ext.data.ArrayStore({
		    autoDestroy: true,
		    fields: [
		       {name: 'mis_email_update_id', type: 'int'},
		       {name: 'email_changed', type: 'string'},
		       {name: 'type', type: 'string'}
		    ]
		});
		
		function boolRenderer(val){
	        if(val){
	            return '<span style="color:green;">' + "YES" + '</span>';
	        } else {
	            return '<span style="font-weight:bold; color:red;">' + "NO" + '</span>';
	        }
	        return val;
	    }
	    
	    function addDelRenderer(val){
	        if(val == "Add"){
	            return '<span style="color:green;">' + "Add" + '</span>';
	        } else {
	            return '<span style="color:red;">' + "Delete" + '</span>';
	        }
	        return val;
	    }
	    
	    function noteRenderer(val, arg2, arg3, arg4){
	        if(val){
			    var domMarkup = '<div style="font-weight:bold; color:orange;">' + "NOTE" + '</div>';
			    arg2.attr = 'ext:qtip="'+val+'" ext:qtitle="Routing Note"';
	            return domMarkup;
	        }
	        return val;
	    }
	    
	    function dnisRenderer(val){
	        if(val.length >= 3) {
	            val = val.substring(0,3)+ '-' +val.substring(3);
	        }
	        if(val.length >= 7) {
	            val = val.substring(0,7)+ '-' +val.substring(7);
	        }
	        return val;
	    }
	    
		var sm1 = new Ext.grid.CellSelectionModel(/*{singleSelect:true}*/);
		sm1.on('cellselect', function() {
			eto.getTopToolbar().get(0).enable();
		});
		
		var ArrayAddDel = [
		    [0, 'Delete'],
		    [1, 'Add']
		];
		var storeAddDel = new Ext.data.ArrayStore({
	        fields: [
				{name: 'value', type: 'int'},
				{name: 'strVal', type: 'string'}
		    ],
	        data : ArrayAddDel
	    });
    
		var comboAddDel = new Ext.form.ComboBox({
	        store: storeAddDel,
	        displayField:'strVal',
	        valueField: 'strVal',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        forceSelection: false,
	        triggerAction: 'all',
	        selectOnFocus:true
	    });
	    
	    
		Ext.apply(this, {
			store: distUpdateStore,
	        border: true,
	        sm: sm1,
	        style: 'margin-top: 10px',
	        title: "Distribution Updates",
	        tbar: [{
	            text: 'Remove',
	            iconCls: 'remove',
	            disabled: true,
	            handler : function() {
		            var removeButton = this;
		            Ext.MessageBox.confirm('Delete This Row?', 'Are you sure you want to delete this Distribution Update row?', function(btn) {
			        	if(btn == "yes") {
				        	if(sm1.hasSelection()) {
				        		var selectedCell = sm1.getSelectedCell();
				        		if(selectedCell instanceof Array) {
					        		distUpdateStore.removeAt(selectedCell[0]);
					        		removeButton.disable();
				        		}
			        		}
		        		}
	        		});
        		}				        	
            },'-', {
	            text: 'Add New',
	            iconCls: 'add',
	            handler : function() {
			      	var newRec = new distUpdateStore.recordType({
				      	type: "Delete"
		            });
			        eto.stopEditing();
			        distUpdateStore.insert(0, newRec);
			        eto.startEditing(0, 0);
		        }
            }],
	        colModel: new Ext.grid.ColumnModel([{
                header: "Type",
                width: 70,
                sortable: true,
                dataIndex: 'type',
                renderer: addDelRenderer,
                editor: comboAddDel
            }, {
                header: "EMAIL",
                width: 200,
                sortable: true,
                dataIndex: 'email_changed',
                hideable: false,
                editor: new Ext.form.TextField({
	           	})
            }]),
	        height: 200,
		    viewConfig: {
	            //forceFit:true
	        },
	        width: 300,
	        autoScroll: true,
	        stripeRows: true,
	        collapsible: false,
	        animCollapse: false
        });
        this.on('celldblclick', function(grid, rowIndex, columnIndex, e) {
		    var record = grid.getStore().getAt(rowIndex);  // Get the Record
		    var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
			if(fieldName == "notetext") {
		    	Ext.Msg.prompt('Enter Note', 'Note:', function(btn, text){
				    if (btn == 'ok'){
				        record.set("notetext", text);
				    }
				}, this, true, record.get("notetext"));
			}
	    });
	    
	    MISDistributionGrid.superclass.initComponent.call(this);
    },
    constructor: function() {
		MISDistributionGrid.superclass.constructor.call(this);
    },
    getValues: function() {
	    var requiredFieldArray = ["email_changed","type"];
	    
	    var returnArray = new Array();
	    var allRecs = this.getStore().getRange();
	    for(var a = 0; a < allRecs.length; a++) {
		    for(var b = 0; b < requiredFieldArray.length; b++) {
			    var requiredField = requiredFieldArray[b];
			    var thisVal = allRecs[a].data[requiredField];
			    if(thisVal == null || thisVal == undefined) {
				    return "ERROR: At least one row of Distribution Update is missing \"" + requiredField + "\"";
			    }
		    }
		    returnArray.push(allRecs[a].data);
	    }		    
	    return returnArray;
    },
    loadValues: function(values) {
	    if(values instanceof Array) {
		    var thisStore = this.getStore();
		    var arrayOfRecs = new Array();
		    thisStore.removeAll();
		    for(var a = 0; a < values.length; a++) {
			    var thisObject = values[a];
			    arrayOfRecs.push(new thisStore.recordType(thisObject));
	        }
	        thisStore.add(arrayOfRecs);
        }
    }			    
});