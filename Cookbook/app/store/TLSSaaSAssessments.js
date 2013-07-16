Ext.define('CookBook.store.TLSSaaSAssessments', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.TLSAssessment',
    autoLoad: false,

    //groupField: 'type',
    groupers: [{
        property: 'type',
        sorterFn: function(o1, o2) {
            var swdTypeSortOrder = ["Coding TLS_SaaS", "Testing TLS_SaaS", "UAT Implementation TLS_SaaS", "UAT Support TLS_SaaS", "Production Implementation TLS_SaaS", "Other TLS_SaaS"];
            o1_order = swdTypeSortOrder.indexOf(o1.get('type'));
            o2_order = swdTypeSortOrder.indexOf(o2.get('type'));

            return o1_order < o2_order ? -1 : 1;
        }
    }],
    proxy: {
        type: 'ajax',

        actionMethods: {
            update: 'PUT',
            read: 'GET',
            destroy: 'DELETE',
            create: 'POST'
        },

        url: 'GetTLSSaaSAssessment.ashx',
        limitParam: 'undefined',

        //noCache: false,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'swd_assessment_id'
        },

        writer: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'swd_assessment_id'
        },

        afterRequest: function(request, success) {
            /*
            console.log(request.action);
            console.log(request.method);
            console.log(request.params);
            console.log(request.url);
            console.log('Succeeded? Actually ' + success);*/
        }
    },
    listeners: {
        datachanged: function(store, opts) {
            store.sync();
        },
        update: function(store, record, operation, opts) {
            store.sync();
        }
    }
});