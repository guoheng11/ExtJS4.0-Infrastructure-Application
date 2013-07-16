Ext.define('CookBook.model.BuffetProdInstallRequirement', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'buffet_project_req_id',
        type: 'int',
        useNull:true
    }, 'project_number', 'associated_projects', 'type', 'notes', 'filename', 'notes']
});

