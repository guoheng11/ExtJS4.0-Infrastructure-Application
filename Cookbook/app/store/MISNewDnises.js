Ext.define('CookBook.store.MISNewDnises', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.MISNewDnis',

    autoLoad: false,
    
    proxy: {
        type: 'ajax',

        actionMethods: {
            update: 'PUT',
            read: 'GET',
            destroy: 'DELETE',
            create: 'POST'
        },
        
        url: 'GetMISNewDnis.ashx',
        limitParam: 'undefined',
        
        //noCache: false,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'mis_new_dnis_id'
        },
        writer: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'mis_new_dnis_id'
        },

        afterRequest: function(request, success) {/*
            console.log(request.action);
            console.log(request.method);
            console.log(request.params);
            console.log(request.url);
            console.log('Succeeded? Actually ' + success);*/
        }
    },
    listeners: {
        datachanged: function (store, opts) {
            store.sync();
        },
        update: function (store, record, operation, opts) {
            store.sync();
        }
    }
});