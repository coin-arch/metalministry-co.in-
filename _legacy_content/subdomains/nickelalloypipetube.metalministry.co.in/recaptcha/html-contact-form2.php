<?php 
$your_email ='enquiry@metalministry.in';// <<=== update to your email address

session_start();
$errors = '';
$name = '';
$visitor_email = '';
$visitor_mobile = '';
$user_message = '';
$ipaddress = $_SERVER['REMOTE_ADDR'];
if(isset($_POST['submit']))
{
	
	$name = $_POST['name'];
	$visitor_email = $_POST['email'];
	$visitor_mobile = $_POST['mobile'];
	$user_message = $_POST['message'];
	///------------Do Validations-------------
	if(empty($name)||empty($visitor_email)||empty($visitor_mobile))
	{
		$errors .= "\n Name,Email And Mobile are required fields. ";	
	}
	if(IsInjected($visitor_email))
	{
		$errors .= "\n Bad email value!";
	}
	if(empty($_SESSION['6_letters_code2'] ) ||
	  strcasecmp($_SESSION['6_letters_code2'], $_POST['6_letters_code2']) != 0)
	{
	//Note: the captcha code is compared case insensitively.
	//if you want case sensitive match, update the check above to
	// strcmp()
		$errors .= "\n The captcha code does not match!";
	}
	
	if(empty($errors))
	{
		
		///My Code
		    $to = 'enquiry@metalministry.in';
		 
			$subject = 'Enquiry Form Details of Website - www.nickelalloypipetube.metalministry.co.in';
			$headers = "From: " . strip_tags($_POST['email']) . "\r\n";
			$headers .= "Reply-To: ". strip_tags($_POST['email']) . "\r\n";
			$headers .= "Bcc: Metalministryenq@gmail.com\r\n";
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
			
			$message = '<html><body>';
			$message .= '<h1>Contact Form Details of Website </h1>';
			$message .= '</body></html>';
		
		$message = '<html><body>';
$message .= '<center><table rules="all" style="border:0px solid #666;" border="0" cellpadding="3" cellspacing="3" width="600px" class="new_test">';
$message .= "<tr style='background: #fff;'><td colspan='2' align='center'><a href='http://www.nickelalloypipetube.metalministry.co.in/' target='_blank'>
<img src='http://www.nickelalloypipetube.metalministry.co.in/img/logo.png' width='200px'></a>
<a href='http://www.nickelalloypipetube.metalministry.co.in/' target='_blank' style='text-decoration:none;'><strong><center>www.nickelalloypipetube.metalministry.co.in</center></strong> </a></td></tr>";
$message .= "<tr><td colspan='2' align='center'>&nbsp;</td></tr>";	
$message .= "<tr><td colspan='2' style='text-decoration:none;'>Product Enquiry Details - www.nickelalloypipetube.metalministry.co.in</td></tr>";	
$message .= "<tr><td colspan='2'>&nbsp;</td></tr>";			
$message .= "<tr><td width='20%'><strong>Name</strong> </td><td width='80%'>".strip_tags($_POST['name'])."</td></tr>";
$message .= "<tr><td  width='20%'><strong>Email ID </strong> </td><td width='80%'>".strip_tags($_POST['email'])."</td></tr>";
$message .= "<tr><td  width='20%'><strong>Mobile No</strong> </td><td width='80%'>".strip_tags($_POST['mobile'])."</td></tr>";
$message .= "<tr><td  width='20%'><strong>Message</strong> </td><td width='80%'>".strip_tags($_POST['message'])."</td></tr>";
$message .= "<tr><td  width='20%'><strong>IP Address</strong> </td><td width='80%'>".$ipaddress."</td></tr>";
$message .= "</table></center>";
$message .= "</body></html>";


		mail($to, $subject, $message, $headers);


		//My Code
		
		//mail($to, $subject, $body,$headers);
		
		header('Location: thank-you2.html');
	}
}

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Contact Us</title>
<!-- define some style elements-->
<style>
label, a, body {
	font-family : Arial, Helvetica, sans-serif;
	font-size : 12px;
	color:white;
}
.err {
	font-family : Verdana, Helvetica, sans-serif;
	font-size : 12px;
	color: red;
}
.boxshadow {
	/*box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15);*/
	width:150px;
}
.setmng{ 
    /*background: none repeat scroll 0 0 #E31E24 !important;*/
    border-radius: 21px;
    color: #000;
    font-size: 12px;
    height: 32px;
    padding: 0 20px;
    transition: background-color 0.4s ease 0s;}
	 table {
  /*  -webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
    -moz-box-shadow:    7px 7px 5px 0px rgba(50, 50, 50, 0.75);
    box-shadow:         7px 7px 5px 0px rgba(50, 50, 50, 0.75);
	 border-radius: 25px;*/
    /*border: 2px solid #8AC007;*/}
</style>
<!-- a helper script for vaidating the form-->
<script language="JavaScript" src="scripts/gen_validatorv31.js" type="text/javascript"></script>
</head>

<body>
<?php
if(!empty($errors)){
echo "<p class='err'>".nl2br($errors)."</p>";
}
?>
<div id='contact_form_errorloc' class='err'></div>
<form method="POST" name="contact_form" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>">
  <table width="100%" style="border:0px solid #ccc;padding:5%;padding-left:2%;">
    <tr>
      <td ><label for='name'>Name: </label></td>
      <td><input type="text" name="name"  class="boxshadow" value='<?php echo htmlentities($name) ?>'></td>
    </tr>
    <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td><label for='email'>Email: </label></td>
      <td><input type="text" name="email" class="boxshadow" value='<?php echo htmlentities($visitor_email) ?>'></td>
    </tr>
    <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td><label for='email'>Mobile: </label></td>
      <td><input type="text" name="mobile" class="boxshadow" value='<?php echo htmlentities($visitor_mobile) ?>'></td>
    </tr>
    <!--<tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td valign="top"><label for='message'>Message:</label></td>
      <td><textarea name="message" class="boxshadow" rows=4 cols=23><?php echo htmlentities($user_message) ?></textarea></td>
    </tr>-->
    <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td>Captcha: </td>
      <td ><img src="captcha_code_file2.php?rand=<?php echo rand(); ?>" id='captchaimg2' ></td>
    </tr>
   <!-- <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td>&nbsp;</td>
      <td ><label for='message'>Enter the code above here :</label></td>
    </tr>-->
    <tr>
      <td>&nbsp;</td>
      <td><input id="6_letters_code2" name="6_letters_code2" class="boxshadow"  type="text"></td>
    </tr>
    <tr>
      <td colspan="2" align="center"><small>Can't read the image? click <a href='javascript: refreshCaptcha2();'>here</a> to refresh</small></td>
    </tr>
    <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td colspan="2" align="center"><input type="submit" value="Submit" name='submit' class="setmng"></td>
    </tr>
  </table>
</form>
<script language="JavaScript">
// Code for validating the form
// Visit http://www.javascript-coder.com/html-form/javascript-form-validation.phtml
// for details
var frmvalidator  = new Validator("contact_form");
//remove the following two lines if you like error message box popups
frmvalidator.EnableOnPageErrorDisplaySingleBox();
frmvalidator.EnableMsgsTogether();

frmvalidator.addValidation("name","req","Please provide your name"); 
frmvalidator.addValidation("email","req","Please provide your email"); 
frmvalidator.addValidation("mobile","req","Please provide your mobile");
frmvalidator.addValidation("email","email","Please enter a valid email address"); 
</script> 
<script language='JavaScript' type='text/javascript'>
function refreshCaptcha2()
{
	var img = document.images['captchaimg2'];
	img.src = img.src.substring(0,img.src.lastIndexOf("?"))+"?rand="+Math.random()*1000;
}
</script>
</body>
</html>