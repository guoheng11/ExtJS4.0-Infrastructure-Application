Ext.define('CookBook.model.HardwareRequirement', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'hardware_req_id',
        type: 'int',
        useNull: true
    }, 'description', {
        name: 'cost_per_item',
        type: 'string'
    }, {
        name: 'quantity',
        type: 'int'
    }, {
        name: 'total_item_cost',
        type: 'string'
    }, {
        name: 'number_of_sites',
        type: 'int'
    },
    'target_delivery', 'target_order_date', 'actual_delivery_date', 'actual_order_date', 'requirement_type', 'project_id']
});