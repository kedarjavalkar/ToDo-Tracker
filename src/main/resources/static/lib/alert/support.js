var btn = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
var jAlert = {'btn':btn};
jAlert.success = function(msg) {
	$('body').append('<div role="alert" id="divAlert" class="alert alert-success" style="top:'+getTop()+'px;">'+jAlert.btn+'<strong>Success! </strong>'+ msg +'</div>');
	var ele = $('body .alert-success').last();
	setTimeout(function(){
		$(ele).remove();
	},5000);
}
jAlert.error = function(msg) {
	$('body').append('<div role="alert" id="divAlert" class="alert alert-danger" style="top:'+getTop()+'px;">'+jAlert.btn+'<strong>Error! </strong>'+ msg +'</div>');
	var ele = $('body .alert-danger').last();
	setTimeout(function(){
		$(ele).remove();
	},5000);
}
jAlert.info = function(msg) {
	$('body').append('<div role="alert" id="divAlert" class="alert alert-info" style="top:'+getTop()+'px;">'+jAlert.btn+'<strong>Info! </strong>'+ msg +'</div>');
	var ele = $('body .alert-info').last();
	setTimeout(function(){
		$(ele).remove();
	},5000);
}
jAlert.warn = function(msg) {
	$('body').append('<div role="alert" id="divAlert" class="alert alert-warning" style="top:'+getTop()+'px;">'+jAlert.btn+'<strong>Warning! </strong>'+ msg +'</div>');
	var ele = $('body .alert-warning').last();
	setTimeout(function(){
		$(ele).remove();
	},5000);
}
function getTop() {
	return 25 + ($('.alert').length * 10);
}