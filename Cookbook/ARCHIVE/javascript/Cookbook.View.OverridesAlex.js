Ext.override(Ext.grid.GridPanel, {
    trackMouseOver: false,
    columnLines: true,
    stripeRows: true,
    resizeStore: function(storeToUse){
        var gr = this;
        if (gr.rendered === true) {
            var grHeight = gr.getInnerHeight();
            grHeight -= 25; //col headers
            grHeight -= 16; //horizontal scroll
            
            //var rowHeight = 18;
            var rowHeight = 20;
            if(gr.getSelectionModel() instanceof Ext.grid.CheckboxSelectionModel) {
	            rowHeight = 20;
            }
            var recCnt = Math.floor(grHeight/rowHeight);
            
            //if (inHeight < (20 * recCnt)) {
            //    recCnt--;
            //}
            var inWidth = gr.getInnerWidth();
            var grWidth = gr.getWidth();
            var frWidth = gr.getFrameWidth();
            
            
            if (recCnt > 0) {
	            var grStore = null;
	            if(storeToUse) {
		            grStore = storeToUse;
	            } else {
		            grStore = gr.getStore();
	            }
	            var prms = grStore.baseParams;
                prms.limit = recCnt;
	            if(typeof prms.start === 'undefined') {
	                prms.start = 0;
                }
                if(grStore.lastOptions && grStore.lastOptions.params) {
		  			grStore.lastOptions.params.limit = recCnt;
	  			}
                
                var bt = gr.getBottomToolbar();
                if (bt) {
                    bt.pageSize = recCnt;
                }
            }
            return recCnt;
        }
        return 0;
    }
    
});

/*
 * Ext.grid.GridView
 *
 * Added min/max resize
 */
 
Ext.override(Ext.grid.GridView, {
    onColumnSplitterMoved: function(i, w){
        this.userResized = true;
        var cm = this.grid.colModel;
        
        //min-max override
        var min = cm.config[i].minWidth, max = cm.config[i].maxWidth;
        if (min) {
            w = Math.max(w, min);
        }
        if (max) {
            w = Math.min(w, max);
        }
        
        cm.setColumnWidth(i, w, true);
        
        if (this.forceFit) {
            this.fitColumns(true, false, i);
            this.updateAllColumnWidths();
        }
        else if (this.customFit) {
            this.customFitColumns(true, false, i);
            this.updateAllColumnWidths();
        }
        else {
            this.updateColumnWidth(i, w);
        }
        this.grid.fireEvent("columnresize", i, w);
    },
    customFitColumns: function(preventRefresh, onlyExpand, omitColumn, shrink){
        var cm = this.cm, leftOver, dist, i;
        var tw = cm.getTotalWidth(false); //visibleOnly
        var aw = this.grid.getGridEl().getWidth(true)
        if (Ext.isNumber(this.scrollOffset)) {
            aw -= this.scrollOffset
        }
        var needShrink = false;
        
        if (shrink && tw > aw) {
            needShrink = true;
        }
        
        if (aw < 20) {
            return;
        }
        var extra = aw - tw;
        
        if (extra === 0) {
            return false;
        }
        
        var vc = cm.getColumnCount(true); //visibleOnly
        var ac = vc - (typeof omitColumn == 'number' ? 1 : 0);
        if (ac === 0) {
            ac = 1;
            omitColumn = undefined;
        }
        var colCount = cm.getColumnCount();
        var cols = [], cols2 = [];
        var extraCol = 0;
        var width = 0;
        var w;
        var split = Math.round(extra / vc);
        
        for (i = 0; i < colCount; i++) {
            if (!cm.isHidden(i) && !cm.isFixed(i) && i !== omitColumn) {
                w = cm.getColumnWidth(i);
                cols.push(i);
                cols2.push(i);
                extraCol = i;
                cols.push(w);
                cols2.push(w);
                width += cm.config[i].initialWidth;
            }
        }
        
        //don't expand if it will cause scrollbars
        if (width > aw) {
            if (preventRefresh !== true) {
                this.updateAllColumnWidths();
            }
            cm.resumeEvents();
            return true;
        }
        
        
        if (shrink) {
            while (cols.length) {
                w = cols.pop();
                i = cols.pop();
                var cl = cm.config[i];
                if (w > cl.initialWidth && needShrink) {
                    if (cm.getTotalWidth(false) < aw) {
                        break;
                    }
                    
                    var gap = w - cl.initialWidth;
                    var neededShrink = cm.getTotalWidth(false) - aw;
                    if (neededShrink < gap) {
                        cm.setColumnWidth(i, cl.width - neededShrink, true);
                        break;
                    }
                    else {
                        cm.setColumnWidth(i, cl.width - gap, true);
                    }
                }
            }
        }
        else {
            //phase1 : get everyone back to initialWidth
            while (cols.length) {
                w = cols.pop();
                i = cols.pop();
                var cl = cm.config[i];
                if (w < cl.initialWidth && !shrink) {
                    var gap = cl.initialWidth - w;
                    if (gap < split) {
                        cm.setColumnWidth(i, cl.initialWidth);
                        aw -= gap;
                    }
                    else {
                        cm.setColumnWidth(i, w + split, true);
                        aw -= split;
                    }
                }
                else {
                    aw -= w;
                }
            }
            
            //phase2 : if leftovers, try to max out each (evenly spread)
            if (aw > 0) {
                split = Math.round(aw / vc);
                while (cols2.length) {
                    w = cols2.pop();
                    i = cols2.pop();
                    var cl = cm.config[i];
                    if (cl.width < cl.maxWidth) {
                        var gap = cl.maxWidth - cl.width;
                        if (gap < split) {
                            cm.setColumnWidth(i, cl.maxWidth, true);
                            aw -= gap;
                        }
                        else {
                            cm.setColumnWidth(i, cl.width + split, true);
                            aw -= split;
                        }
                    }
                }
            }
            
            if ((tw = cm.getTotalWidth(false)) > (this.grid.getGridEl().getWidth(true) - this.scrollOffset)) {
                var adjustCol = ac != vc ? omitColumn : extraCol;
                //cm.setColumnWidth(adjustCol, Math.max(1, cm.getColumnWidth(adjustCol) - (tw - aw)), true);
            }
        }
        
        if (preventRefresh !== true) {
            this.updateAllColumnWidths();
        }
        
        return true;
    }
});

Ext.ns("Cookbook.View");

Cookbook.View.uGridPanel = Ext.extend(Ext.grid.GridPanel, {
    lastWidth: 0,
    loadAfterRender: false,
    rowNumberer: function(value, p, record){
        var ds = record.store
        var i = Ext.isEmpty(ds.lastOptions.params) ? 0 : ds.lastOptions.params.start;
        if (isNaN(i)) {
            i = 0;
        }
        return ds.indexOf(record) + i + 1
    },
    afterRender: function(){
        Cookbook.View.uGridPanel.superclass.afterRender.call(this);
        if (this.loadAfterRender) 
            (function(){
                this.store.load()
            }).defer(Ext.isNumber(this.loadAfterRender) ? this.loadAfterRender : 500, this)
    },
    onResize: function(){
        Cookbook.View.uGridPanel.superclass.onResize.apply(this, arguments);
        var adjW = arguments[0], adjH = arguments[1], rawW = arguments[2], rawH = arguments[3];
        var c = this.resizeStore();
        if (this.rendered) //make sure override is there
        {
            if (adjW > this.lastWidth) {
                this.view.customFitColumns(false, false);
            }
            else {
                this.view.customFitColumns(false, false, null, true /*shrink*/);
            }
        }
        this.lastWidth = adjW;
    }
});

// [OPEN-640]DisplayField to be able to format data.

Ext.override(Ext.form.DisplayField, {
	getValue : function(){
		return this.value;
	},
	setValue : function(v){
		this.value = v;
		this.setRawValue(this.formatValue(v));
		return this;
	},
	formatValue : function(v){
		var renderer = this.renderer;
		if(!renderer){
			return v;
		}
		if(typeof renderer == 'string'){
			renderer = Ext.util.Format[renderer];
		}
		return renderer(v, this.format);
	}
});


Ext.ux.Report = Ext.extend(Ext.Component, {
    autoEl: {tag: 'iframe', cls: 'x-hidden', src: Ext.SSL_SECURE_URL},
    load: function(config){
        this.getEl().dom.src = config.url + (config.params ? '?' + Ext.urlEncode(config.params) : '');
    }
});
Ext.reg('ux.report', Ext.ux.Report);