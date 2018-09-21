<?php
$license = array(
	'url' => $_GET["url"],
	'name' => $_GET["name"],
	'button' => $_GET["button"],
	'deed' => $_GET["deed"]
);
$license = array_map( function( $retval ) {
	return filter_var( $retval, FILTER_SANITIZE_STRING );
}, $license );
?>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  </head>
  <body>
    <script>
      jQuery(function($) {
	    parent.setLicense($.parseJSON('<?php echo json_encode($license); ?>'));
        parent.tb_remove();
      });
    </script>
  </body>
</html>
