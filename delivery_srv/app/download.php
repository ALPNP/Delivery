<?php
// Если в POST запросе от мобильного приложения в передаваемых данных есть свойство KEY
// Производим выполнение кода ниже
if (isset($_POST['KEY'])) {
  // Инициализация подключения базе данных
  $db = mysqli_connect ('mysql.hostinger.ru', 'u673981634_del', 'SS3qwe9iopSS');
  // Выбор базы данных
  mysqli_select_db ($db, 'u673981634_del');
  // Установка кодировки для работы с базой данных
  $db->set_charset('utf8');

  // Получаем имя передаваемого файла и дополняем его папкой расположения filestore
  $foto1 = "filestore/".$_FILES['foto1']["name"];

  // Если файл загрузился, перемещаем его в папку filestore на сервере
  if(is_uploaded_file($_FILES["foto1"]["tmp_name"]))
  {
      move_uploaded_file($_FILES["foto1"]["tmp_name"],
      "filestore/".$_FILES["foto1"]["name"]);
      // SQL запрос на добавление имений файла в таблицу filestore
      $insert1 = "INSERT INTO `filestore` (`filename`) VALUES ('".$foto1."')";
      // Выполнение запроса
      $query1 = mysqli_query($db, $insert1);
  }

  // Жестокий shitcode
  if (isset($_FILES["foto2"]["name"]))
  {
      if ($_FILES["foto2"]["name"] != "")
      {
          $foto2 = "filestore/".$_FILES["foto2"]["name"];
          $insert2 = "INSERT INTO `filestore` (`filename`) VALUES ('".$foto2."')";
          $query2 = mysqli_query($db, $insert2);

              if(is_uploaded_file($_FILES["foto2"]["tmp_name"]))
              {
                  move_uploaded_file($_FILES["foto2"]["tmp_name"],
                  "filestore/".$_FILES["foto2"]["name"]);
              }
      }
  }

  if (isset($_FILES["foto3"]["name"]))
  {
      if ($_FILES["foto3"]["name"] != "")
      {
          $foto3 = "filestore/".$_FILES["foto3"]["name"];
          $insert3 = "INSERT INTO `filestore` (`filename`) VALUES ('".$foto3."')";
          $query3 = mysqli_query($db, $insert3);

              if(is_uploaded_file($_FILES["foto3"]["tmp_name"]))
              {
                  move_uploaded_file($_FILES["foto3"]["tmp_name"],
                  "filestore/".$_FILES["foto3"]["name"]);
              }
      }
  }

  if (isset($_FILES["foto4"]["name"]))
  {
      if ($_FILES["foto4"]["name"] != "")
      {
          $foto4 = "filestore/".$_FILES["foto4"]["name"];
          $insert4 = "INSERT INTO `filestore` (`filename`) VALUES ('".$foto4."')";
          $query4 = mysqli_query($db, $insert4);

              if(is_uploaded_file($_FILES["foto4"]["tmp_name"]))
              {
                  move_uploaded_file($_FILES["foto4"]["tmp_name"],
                  "filestore/".$_FILES["foto4"]["name"]);
              }
      }
  }

  if (isset($_FILES["foto5"]["name"]))
  {
      if ($_FILES["foto5"]["name"] != "")
      {
          $foto5 = "filestore/".$_FILES["foto5"]["name"];
          $insert5 = "INSERT INTO `filestore` (`filename`) VALUES ('".$foto5."')";
          $query5 = mysqli_query($db, $insert5);

              if(is_uploaded_file($_FILES["foto5"]["tmp_name"]))
              {
                  move_uploaded_file($_FILES["foto5"]["tmp_name"],
                  "filestore/".$_FILES["foto5"]["name"]);
              }
      }
  }

  echo 1;
} else {
  exit;
}
?>
