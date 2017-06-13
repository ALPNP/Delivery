<?php
if ($_GET['key'] == 2344961) {
  $db = mysqli_connect ('mysql.hostinger.ru', 'u673981634_del', 'SS3qwe9iopSS');
  mysqli_select_db ($db, 'u673981634_del');
  $db->set_charset('utf8');

  $select = "SELECT * FROM `ftp`";
  $data = array();

  if($result = $db->query($select)){
    while ($row = $result->fetch_assoc()) {
      $row["types"] = unserialize($row["types"]);
      $data[] = $row;
    }
    echo json_encode($data);
  } else {
    $data = (object) array( status => 0, 1 => "Заявки отсутствуют..." );
    echo json_encode($data);
  }
} else {
  echo "401";
}
?>
