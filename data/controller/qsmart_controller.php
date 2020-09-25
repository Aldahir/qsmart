<!doctype html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../q_smart_app_style.css">
		<title>Q-smart</title>
		<meta name="robots" content="noindex">
		<link rel="manifest" href="../../manifest.webmanifest">
        <link rel="icon" href="../../assets/images/ic.png" type="image/png">
        <link rel="apple-touch-icon" href="../../assets/images/ic_192.png">
    </head>
<body>
<?php
switch ($_REQUEST['role']) {
    case 'qslogin':
        $username = trim(filter_input(INPUT_POST, 'username'));
        $password = base64_encode(trim(filter_input(INPUT_POST, 'username')));
    
        echo json_encode($username ." ". $password);
        break;
    
    case 'getInqueritos':
        $file = file_get_contents('http://127.0.0.1/qsmart/calendar/database.json');

        print(json_decode($file));

        break;
    
    case 'getInqueritoById':
        $id = $_REQUEST['id'];

        $result = $id;

        echo json_encode($result);
        break;
    
    case 'search':
        $term = $_REQUEST['q'];

        $result = $term;

        echo json_encode($result);
        break;
    default:
        echo "<h1>Nothing to show yet!</h1>";
        break;
}


?>
    <script src="../../q_smart_script.js"></script>
</body>
</html>