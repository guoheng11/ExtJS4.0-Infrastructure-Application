Ext.data.DynamicJsonReader = function(config){
    Ext.data.DynamicJsonReader.superclass.constructor.call(this, config, []);
};
Ext.extend(Ext.data.DynamicJsonReader, Ext.data.JsonReader, {
    getRecordType : function(data) {
        var i = 0, arr = [];
        for (var name in data[0]) { arr[i++] = name; } // is there a built-in to do this?
        
        this.recordType = Ext.data.Record.create(arr);
        return this.recordType;
        },
        
    readRecords : function(o){ // this is just the same as base class, with call to getRecordType injected
        this.jsonData = o;
        var s = this.meta;
    	var sid = s.id;
    	
    	var totalRecords = 0;
    	if(s.totalProperty){
            var v = parseInt(eval("o." + s.totalProperty), 10);
            if(!isNaN(v)){
                totalRecords = v;
            }
        }
    	var root = s.root ? eval("o." + s.root) : o;
    	
    	var recordType = this.getRecordType(root);
    	var fields = recordType.prototype.fields;
    	
        var records = [];
	    for(var i = 0; i < root.length; i++){
		    var n = root[i];
	        var values = {};
	        var id = (n[sid] !== undefined && n[sid] !== "" ? n[sid] : null);
	        for(var j = 0, jlen = fields.length; j < jlen; j++){
	            var f = fields.items[j];
	            var map = f.mapping || f.name;
	            var v = n[map] !== undefined ? n[map] : f.defaultValue;
	            v = f.convert(v);
	            values[f.name] = v;
	        }
	        var record = new recordType(values, id);
	        record.json = n;
	        records[records.length] = record;
	    }
	    return {
	        records : records,
	        totalRecords : totalRecords || records.length
	    };
    }
});

Ext.grid.DynamicColumnModel = function(store){
    var cols = [];
    var recordType = store.recordType;
    var fields = recordType.prototype.fields;
    
    
    for (var i = 0; i < fields.keys.length; i++)
    {
        var fieldName = fields.keys[i];        
        var field = recordType.getField(fieldName);
        cols[i] = {header: field.name, dataIndex: field.name, autoWidth:true};
    }
    Ext.grid.DynamicColumnModel.superclass.constructor.call(this, cols);
};

Ext.extend(Ext.grid.DynamicColumnModel, Ext.grid.ColumnModel, {});


Ext.grid.GroupManagementCM = function(store){
	function colorBooleans(val){
        if(val){
            return '<span style="color:green;"><center>' + "YES" + '</center></span>';
        } else {
            return '<span style="font-weight:bold; color:red;"><center>' + "NO" + '</center></span>';
        }
        return val;
    }
    
    function bolderer(val){
    	return '<span style="text-align:center;font-weight:bold;">' + val + '</span>';
    }
    
	var cols = [];    
    var recordType = store.recordType;
    var fields = recordType.prototype.fields;    
    for (var i = 0; i < fields.keys.length; i++)
    {
        var fieldName = fields.keys[i];
        var field = recordType.getField(fieldName);
        
        if(fieldName != "group_id") {
	        if(fieldName == "group_name") {
		        cols[i] = {header: "Group Name", dataIndex: field.name, width:100};
	        } else {
		        var stringObj = new String(fieldName);
		        
		        var textLength = stringObj.length*7;
	        	cols[i] = {header: ""+field.name+"", renderer: colorBooleans, dataIndex: field.name, width:textLength};
        	}
    	} else {
	    	cols[i] = {header: field.name, hidden:true , dataIndex: field.name};
    	}
    }
    Ext.grid.GroupManagementCM.superclass.constructor.call(this, cols);
};

Ext.extend(Ext.grid.GroupManagementCM, Ext.grid.ColumnModel, {});

Ext.grid.ProjectViewCM = function(store){    
	var cols = [];    
    var recordType = store.recordType;
    var fields = recordType.prototype.fields;
    
    function smartRenderer(val){
        if(val instanceof Date){
            return val.format('Y/m/d');
        } else if(val instanceof Array) {
	        var returnString = "";
	        for(var a = 0; a < val.length; a++) {
		        if(a>0) {
			        returnString = returnString + ",";
		        }
		        if(val.length > 1) {
			        if(val[a].name) {
				        returnString = returnString+ val[a].name + ":";
			        } else if(val[a].option_id) {
				        returnString = returnString+ "Unnamed (" + val[a].option_id + "):";
			        }
		        }
			        
		        for(var prop in val[a]) {
			        var alreadyAdded = false;
			        if(prop != "name" && prop != "option_id" && !alreadyAdded) {
				        var tempVal = val[a][prop];
				        alreadyAdded = true;
				        if(tempVal) {
					        if(tempVal instanceof Date) {
						        tempVal = tempVal.format('Y/m/d');
					        }
			        		returnString =returnString+ tempVal;
		        		} else {
			        		returnString =returnString+ "N/A";
		        		}
		        	}
	        	}
        	}
        	return returnString;
    	} else if(!val) {
	    	// check if boolean
	    	var objecto = Cookbook.projectLabelTranslationArray[this.dataIndex];
	    	if(objecto) {
		    	if(objecto.column_type == "Boolean") {
			    	return "false";
		    	}
	    	}
    	}
        return val;
    }
    
    for (var i = 0; i < fields.keys.length; i++)
    {
        var fieldName = fields.keys[i];
        var field = recordType.getField(fieldName);
        
        if(fieldName == "project_id") {
			cols[i] = {header: field.name, hidden:true , dataIndex: field.name};
    	} else {
	    	var stringObj = new String(fieldName);
			var textLength = stringObj.length*5+20;
			var label = Cookbook.projectLabelTranslationArray[field.name];
			if(!label) {
				label = field.name;
			} else {
				label = label.column_name;
			}
			cols[i] = {header: label, renderer: smartRenderer, dataIndex: field.name, width:textLength};
    	}
    }
    Ext.grid.ProjectViewCM.superclass.constructor.call(this, cols);
};

Ext.extend(Ext.grid.ProjectViewCM, Ext.grid.ColumnModel, {});