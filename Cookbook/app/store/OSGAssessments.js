Ext.define('CookBook.store.OSGAssessments', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.OSGAssessment',
    autoLoad: false,

    //groupField: 'type',
    groupers: [{
        property: 'type',
        sorterFn: function(o1, o2) {
            var swdTypeSortOrder = ["OSG Scripts", "Non-SWD QA"];
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

        url: 'GetOSGAssessment.ashx',
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