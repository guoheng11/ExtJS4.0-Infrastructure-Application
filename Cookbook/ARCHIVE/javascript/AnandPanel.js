// application main entry point
Ext.onReady(function () {

    Ext.QuickTips.init();

    var panel = new Ext.Panel({
        title: 'Prompt Query'
        , anchor: '100% 100%'
        , layout: 'border'
        , width: '100%'
        , height: '100%'
       // , height: 400
        , renderTo: 'anand'
        , items: [{
            region: 'center'
            , layout: 'fit'
            , frame: true
            , border: false
        }, {
            region: 'north'
            , layout: 'fit'
            , frame: true
            , border: false
            , height: 150
            , split: true
            , collapsible: false
        }]
    });

}); // eo function onReady

// eof
