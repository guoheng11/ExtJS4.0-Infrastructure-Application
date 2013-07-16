Ext.define('CookBook.store.ProjectHistories', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.ProjectHistory',
    
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        
        actionMethods: {
            update: 'PUT',
            read: 'GET',
            destroy: 'DELETE',
            create: 'POST'
        },
        
        url: 'GetProjectHistory.ashx',
        limitParam: 'undefined',
        
        //noCache: false,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'project_history_id'
        },
        
        writer: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'project_history_id'
        },
        
        afterRequest: function(request, success){
        	if(request.action == 'destroy'){
				setMostRecentProjectStatus();
			}
        }
        
    },
    
    listeners: {
        datachanged: function(store, opts){
            store.sync();
        },
        update: function(store, record, operation, opts){
            store.sync();
        }
    }
});
