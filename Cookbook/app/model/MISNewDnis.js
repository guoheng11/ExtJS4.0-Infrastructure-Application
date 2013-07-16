Ext.define('CookBook.model.MISNewDnis', {
    extend: 'Ext.data.Model',
    fields: [{name: 'mis_new_dnis_id', type: 'int', useNull:true}, 'mis_new_id', 'dnis', 'route_to', 'remove_from', 'platform', 'description', {name:'effective_date'/*, type:'date', dateFormat:'c'*/}, 'reroute_to']
});