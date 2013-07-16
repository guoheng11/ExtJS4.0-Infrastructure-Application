Ext.define('CookBook.store.ScraperRequirementsNav', {
    extend: 'Ext.data.Store',
    model: 'CookBook.model.ScraperRequirement',
    
    autoLoad: false,
    
    proxy: {
        type: 'ajax',
        
        actionMethods: {
            update: 'PUT',
            read: 'GET',
            destroy: 'DELETE',
            create: 'POST'
        },
        
        url: 'GetScraperRequirements.ashx',
        limitParam: 'undefined',
        
        //noCache: false,
        reader: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'scraper_req_id'
        },
        
        writer: {
            type: 'json',
            root: 'rows',
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'scraper_req_id'
        },
        
        afterRequest: function(request, success){
            /*
             console.log(request.action);
             console.log(request.method);
             console.log(request.params);
             console.log(request.url);
             console.log('Succeeded? Actually ' + success);*/
        }
    }
});
