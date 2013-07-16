MISDnisUpdateGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	initComponent:function() {
		var eto = this;
		
		var dnisUpdateStore = new Ext.data.ArrayStore({
		    autoDestroy: true,
		    fields: [
		       {name: 'mis_dnis_update_id', type: 'int'},
		       {name: 'dnis', type: 'string'},
		       {name: 'type', type: 'string'},
		       {name: 'routed_to', type: 'string'},
		       {name: 'routed_from', type: 'string'},
		       {name: 'description', type: 'string'},
		       {name: 'exit_point', type: 'string'},
		       {name: 'app_or_mis', type: 'string'},
		       {name: 'notetext', type: 'string'}
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
		
		var ArrayAPPorMIS = [
		    ['APP'],
		    ['MIS']
		];
		var storeAppMis = new Ext.data.ArrayStore({
	        fields: [
		       {name: 'value', type: 'string'}
		    ],
	        data : ArrayAPPorMIS
	    });
    
		var comboAppMis = new Ext.form.ComboBox({
	        store: storeAppMis,
	        displayField:'value',
	        typeAhead: true,
	        mode: 'local',
	        editable: true,
	        forceSelection: false,
	        triggerAction: 'all',
	        selectOnFocus:true
	    });
	    
	    
		Ext.apply(this, {
			store: dnisUpdateStore,
	        border: true,
	        sm: sm1,
	        style: 'margin-top: 10px',
	        title: "DNIS Updates",
	        tbar: [{
	            text: 'Remove',
	            iconCls: 'remove',
	            disabled: true,
	            handler : function() {
		            var removeButton = this;
		            Ext.MessageBox.confirm('Delete This Row?', 'Are you sure you want to delete this DNIS update row?', function(btn) {
			        	if(btn == "yes") {
				        	if(sm1.hasSelection()) {
				        		var selectedCell = sm1.getSelectedCell();
				        		if(selectedCell instanceof Array) {
					        		dnisUpdateStore.removeAt(selectedCell[0]);
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
			      	var newRec = new dnisUpdateStore.recordType({
				      	dnis: ''
		            });
			        eto.stopEditing();
			        dnisUpdateStore.insert(0, newRec);
			        eto.startEditing(0, 0);
		        }
            }],
	        colModel: new Ext.grid.ColumnModel([{
                header: "DNIS",
                width: 100,
                sortable: true,
                dataIndex: 'dnis',
                hideable: false,
                renderer: dnisRenderer,
                editor: new Ext.form.TextField({
	                regex: /^\d{10}$/
	           	})
            },{
                header: "Type",
                width: 100,
                sortable: true,
                dataIndex: 'type',
                editor: new Ext.form.TextField({
	           	})
            },{
                header: "Routed To",
                width: 100,
                sortable: true,
                dataIndex: 'routed_to',
                editor: new Ext.form.TextField({
	           	})
            },{
                header: "Routed From",
                width: 100,
                sortable: true,
                dataIndex: 'routed_from',
                editor: new Ext.form.TextField({
	           	})
            },{
                header: "Exit Point",
                width: 100,
                sortable: true,
                dataIndex: 'exit_point',
                editor: new Ext.form.TextField({
	           	})
            },{
                header: "APP or MIS",
                width: 100,
                sortable: true,
                dataIndex: 'app_or_mis',
                editor: comboAppMis
            },{
                header: "Description",
                width: 100,
                sortable: true,
                dataIndex: 'description',
                editor:  new Ext.form.TextField({
	           	})
            },{
	            header: "Note",
	            width: 40,
	            dataIndex: 'notetext',
	            renderer: noteRenderer
            }]),
	        height: 200,
		    viewConfig: {
	            //forceFit:true
	        },
	        width: 770,
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
	    
	    MISDnisUpdateGrid.superclass.initComponent.call(this);
    },
    constructor: function() {
		MISDnisUpdateGrid.superclass.constructor.call(this);
    },
    getValues: function() {
	    var requiredFieldArray = ["dnis","type","description"];
	    
	    var returnArray = new Array();
	    var allRecs = this.getStore().getRange();
	    for(var a = 0; a < allRecs.length; a++) {
		    for(var b = 0; b < requiredFieldArray.length; b++) {
			    var requiredField = requiredFieldArray[b];
			    if(!allRecs[a].data[requiredField]) {
				    return "ERROR: At least one row of DNIS Update is missing \"" + requiredField + "\"";
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