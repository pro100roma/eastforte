$(function() {

	//Keyup validation
	$("input[name='name']").keyup(function() {
		if($(this).val().match(/^[a-zA-Z0-9_ -]{2,30}$/) === null) {
			$(this).addClass("error");
			$(this).siblings(".input-error").show();
		} else {
			$(this).removeClass("error");
			$(this).siblings(".input-error").hide();
		}
	});
	$("input[name='email']").keyup(function() {
		if($(this).val().match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i) === null) {
			$(this).addClass("error");
			$(this).siblings(".input-error").show();
		} else {
			$(this).removeClass("error");
			$(this).siblings(".input-error").hide();
		}
	});
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function(e) {
		let th = $(this),
			nameRegexp = /^[a-zA-Z0-9_ -]{2,30}$/,
			emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
			nameField = th.find("input[name='name']"),
			emailField = th.find("input[name='email']"),
			messField = th.find("input[name='message']");
		
		if(nameField.val().match(nameRegexp) === null || emailField.val().match(emailRegexp) === null) {
			if(nameField.val().match(nameRegexp) === null) {
				nameField.addClass("error");
				nameField.siblings(".input-error").show();
			} else {
				nameField.removeClass("error");
				nameField.siblings(".input-error").hide();
			}
			if(emailField.val().match(emailRegexp) === null) {
				emailField.addClass("error");
				emailField.siblings(".input-error").show();
			} else {
				emailField.removeClass("error");
				emailField.siblings(".input-error").hide();
			}
			return false;
		}
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			th.parents(".contact-form-wrap").hide();
			$(".thank-message").show();
		});
		return false;
	});

	

	//Mobile menu
	$(".toggle_mnu").click(function() {
		$(".sandwich").toggleClass("active");
		if ($(".top-menu").hasClass('active')) {
			$(".top-menu").removeClass('active');
			document.body.style.overflow = 'visible';
		} else {
			$(".top-menu").addClass('active');
			document.body.style.overflow = 'hidden'; 
		}
	});
	
	//Input focus
	$(".input-group input, .input-group textarea").focus(function() {
		$(this).siblings("label").addClass("focused");
	});
	$(".input-group input, .input-group textarea").blur(function() {
		if($(this).val().length < 1) {
			$(this).siblings("label").removeClass("focused");
		}
	});

	//Copy link
	// $('.copy-link').click(function(e) {
	// 	e.preventDefault();
	// 	/* Get the text field */
	// 	let copyText = document.getElementById("copy-input");
	// 	copyText.value = window.location.href;

	// 	/* Select the text field */
	// 	copyText.select();
	
	// 	/* Copy the text inside the text field */
	// 	document.execCommand("copy");
	// });
	

});
