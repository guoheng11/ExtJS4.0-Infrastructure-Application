Ext.define('CookBook.model.SystemsAssessment', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'systems_req_id',
        type: 'int',
        useNull: true
    }, 'description', 'name', {
        name: 'billed_hours',
        type: 'string'
    }, {
        name: 'booked_hours',
        type: 'string'
    }, 'target_start', 'target_complete', 'scheduled_start', 'scheduled_complete', 'actual_complete', {
        name: 'project_id',
        type: 'int'
    }]
});