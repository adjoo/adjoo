<?php 
if (isset($_POST))
	{
		header('Content-Type: text/html; charset=utf-8');
		$recepient = "adjo@ro.ru";
		$sitename = "Splav";

	 	if ($_POST["name"]!='') $name = '<p>Имя: '.htmlspecialchars(trim($_POST["name"])).'</p>';
		if ($_POST["email"]!='') $email = '<p>Почта: '.htmlspecialchars($_POST['email']).'</p>';
		if ($_POST["phone"]!='') $phone = '<p>Телефон: '.htmlspecialchars(trim($_POST["phone"])).'</p>';
		if ($_POST["where"]!='') $where = '<p>Откуда: '.htmlspecialchars(trim($_POST["where"])).'</p>';
		if ($_POST["where"]='') $where = '<p>Откуда: Кнопка заказать звонок</p>';

		$pagetitle = "Заявка с сайта \"$sitename\"";

		$message = "<html>Заявка с сайта \"$sitename\" $where $name $email $phone </html>";
		mail($recepient, $pagetitle, $message, "Content-type: text/html; charset=\"utf-8\"\n From: $recepient");
		//exit('<meta http-equiv="refresh" content="0">');
	}
?>