Ext.define('CookBook.store.GrammarRequirements', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.GrammarRequirement',

    autoLoad: false,

    proxy: {
        type: 'ajax',

        actionMethods: {
            update: 'PUT',
            read: 'GET',
            destroy: 'DELETE',
            create: 'POST'
        },

        url: 'GetGrammarRequirements.ashx',
        limitParam: 'undefined',

        //noCache: false,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'grammar_req_id'
        },
        writer: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'grammar_req_id'
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