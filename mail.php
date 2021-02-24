<?php

	$name = trim($_POST["name"]);
	$email  = trim($_POST["email"]);
	$mess  = trim($_POST["message"]);
	$from  = "Easforte";
	$admin_email  = "partner@eastforte.net";
	// $admin_email  = "chronos945@gmail.com";
	$form_subject = "Easforte Email";

	//GEO data
	$browser_info = $_SERVER['HTTP_USER_AGENT'];
	$user_ip = $_SERVER['REMOTE_ADDR'];
	$date = new DateTime();
	$uk_datetime = $date->format('Y-m-d H:i:s');
	
	$geo = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$_SERVER['REMOTE_ADDR']));
	$geo_country = $geo['geoplugin_countryName'];
	$geo_region = $geo['geoplugin_region'];
	$geo_city = $geo['geoplugin_city'];
	$geo_currency = $geo['geoplugin_currencyCode'];
	$geo_rate = $geo['geoplugin_currencyConverter'] . ' to 1 USD';

	$message = "
		Name: $name <br/>
		Email: $email <br/>
		Message: $mess <br/>
		<hr>
		<br/>
		We have captured the following geolocation data:
		<br/>
		- Date and Time (UK): $uk_datetime <br/>
		- Location IP Address: $user_ip <br/>
		- Country: $geo_country <br/>
		- Region: $geo_region <br/>
		- City: $geo_city <br/>
		- Currency: $geo_currency <br/>
		- Exchange rate: $geo_rate <br/>
		- Browser/Device/OS: $browser_info <br/>
	";

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($from).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
