Ext.override(Ext.form.DisplayField, {
	formatValue : function(v){
		var renderer = this.renderer, scope = this.rendererScope || this;
		if(!renderer){
			return v;
		}
		if(typeof renderer == 'string'){
			renderer = Ext.util.Format[renderer];
		} else if(typeof renderer == 'object'){
			renderer = renderer.fn;
			scope = renderer.scope;
		}
		var args = [v];
		if(this.format){
			args.push(this.format);
		}else if(this.formatArgs){
			args = args.concat(this.formatArgs);
		}
		return renderer.apply(scope, args);
	}
});
