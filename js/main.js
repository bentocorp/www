$(document).ready(function() {

	$('#mc-embedded-subscribe-form').validate({
	  	errorPlacement: function(error, element) {
	     	error.appendTo('#mce-email-error');
	   	},
	   	submitHandler : function(form) {
		    form.submit();
		}
	});

});