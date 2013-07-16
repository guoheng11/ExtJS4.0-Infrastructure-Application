Ext.define('CookBook.view.mainview.splash', {
    extend: 'Ext.container.Container',
    alias:  'widget.splash',
    frame: false,
    autoScroll: true,
    bodyCls: 'usan_logo',
    //height: '100%',
    //width: 'auto',
    layout: 'fit',
    bodyStyle: 'background-color:#dfe8f5;',
    items:[{
        frame: false,
        //bodyCls: 'usan_logo',
        //cls: 'usan_logo',
        //bodyStyle: 'background-color:#dfe8f5;',
        bodyCls: 'usan_logo',
        //html: '<font size=5><b> Welcome </font></b>'
        //bodyCssClass: "usan_logo"
        //text: 'USAN Project Management',
        html: 'USAN Project Management',
        //layout: 'fit',
        //html: '<font size=5><b>USAN Project Management</b></font>',
        //height: '100%',
        //width: '100%',
        bodyStyle: {
            "background-color":"#d0e0f4",
            padding: '10px'
        }
    }]

});