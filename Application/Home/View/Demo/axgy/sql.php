<meta charset="utf-8">

<?php
$dbhost = '';
$dbuser = '';
$dbpass = '';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(!$conn)
{
	die('Could not connect: ' . mysqli_error());
}
mysqli_close($conn);
?>
