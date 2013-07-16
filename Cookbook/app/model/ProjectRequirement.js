Ext.define('CookBook.model.ProjectRequirement', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'project_requirements_id',
        type: 'int',
        useNull:true
    }, 'project_id', 'type', 'name', 'notes', 'filename', 'additional_notes']
});

