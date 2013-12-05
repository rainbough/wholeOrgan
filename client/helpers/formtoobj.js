$.fn.serializeFormToObj = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
	xt = {};
	$('input[type=checkbox]:not(:checked)').map(
	    function() {
	    	n = this.name;
	    	if (typeof(o[n]) == "undefined") xt[n] = "";
    }).get();
   _.extend(o, xt);
   return o;
};
