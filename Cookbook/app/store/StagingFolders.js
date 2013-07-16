Ext.define('CookBook.store.StagingFolders', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.StagingFolder',

    autoLoad: false,

    proxy: {
        type: 'ajax',

        actionMethods: {
            update: 'PUT',
            read: 'GET',
            destroy: 'DELETE',
            create: 'POST'
        },

        url: 'GetStagingFolders.ashx',
        limitParam: 'undefined',

        //noCache: false,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'staging_folder_id'
        },
        writer: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'staging_folder_id'
        },
        afterRequest: function(request, success) {/*
             console.log(request.action);
             console.log(request.method);
             console.log(request.params);
             console.log(request.url);
             console.log('Succeeded? Actually ' + success);*/
        }
    }
});