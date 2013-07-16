Ext.define('CookBook.model.AccessUSANReq', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'accessusan_req_id',
        type: 'int',
        useNull: true
    }, 'project_id', 'new', 'name', 'email', 'login_id', {
        name: 'table_permission_required',
        type: 'auto'
    }, 'report_access_required', 'read_only_permission']
});