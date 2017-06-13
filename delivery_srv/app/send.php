<?php
// Если в POST запросе от мобильного приложения в передаваемых данных есть свойство KEY
// Производим выполнение кода ниже
if ($_POST['KEY']){
  // Инициализация подключения базе данных
  $db = mysqli_connect ('mysql.hostinger.ru', 'u673981634_del', 'SS3qwe9iopSS');
  // Выбор базы данных
  mysqli_select_db ($db, 'u673981634_del');
  // Установка кодировки для работы с базой данных
  $db->set_charset('utf8');

  // Чекбоксы получаемые от мобильного приложения, простая серверная валидация.
  $failTypes = [
    0 => "cleavage",
    1 => "dent",
    2 => "bubbles",
    3 => "crack",
    4 => "attrition",
    5 => "loopholes",
    6 => "clearances",
    7 => "absenceParts",
    8 => "deployFail",
  ];

  $types = array();

  foreach ($failTypes as $key => $value) {
    if(isset($_POST[$value])) {
        array_push($types, $value);
    }
  }

  $string = serialize($types);

  // Получение данных заявки с запросом от мобильного приложения
  $fio = htmlspecialchars($_POST['fio']);
  $adr = htmlspecialchars($_POST['adr']);
  $ord = htmlspecialchars($_POST['ord']);
  $rew = htmlspecialchars($_POST['rew']);
  $rating = $_POST['rating'];
  echo $rating;
  $src = ($_POST['fotoAdr']);
  // получаем валидное имя файла
  $foto = substr($src, 0, -1);
  $filename = explode("/", $src);
  // Копирование фотографии в папку отдела контроля качества на сервере
  $dest = "ftp/".$filename[1];
  rename("".$foto."", "".$dest."");
  // Очистка таблицы filestore
  $delete = "DELETE FROM `filestore` WHERE `filename` = '".$foto."'";
  $queryDel = mysqli_query($db, $delete);
  // Запись в таблицу отдела контроля качества на сервере
  $insert = "INSERT INTO `ftp` (`fio`, `adr`, `ord`, `rew`, `foto`, `types`, `rating`)
              VALUES
              ('".$fio."', '".$adr."', '".$ord."', '".$rew."', '".$dest."', '".$string."', '".$rating."')";
  $queryIns = mysqli_query($db, $insert);
  // В случае успеха отвечаем клиенту строкой
  echo 'Good';
} else {
  // если нет ключа KEY ничего не делаем
  exit;
}
?>
