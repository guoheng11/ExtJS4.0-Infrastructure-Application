Ext.define('CookBook.model.NetworkOpsAssessment', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'swd_assessment_id',
        type: 'int',
        useNull: true
    }, {
        name: 'hours',
        type: 'string'
    }, {
        name: 'booked_hours',
        type: 'string'
    }, 'name', 'type', 'action', 'requested_start_date', 'requested_complete', 'scheduled_start_date', 'scheduled_complete', 'actual_complete', 'project_id']
});