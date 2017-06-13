<?php

$db = mysqli_connect ('mysql.hostinger.ru', 'u673981634_del', 'SS3qwe9iopSS');

mysqli_select_db ($db, 'u673981634_del');
$db->set_charset('utf8');

$select = "SELECT * FROM `filestore`";

// $count = 0;

if ($result = $db->query($select))
{
    while ($row = $result->fetch_row())
    {

        // echo $row[0];

        $src = "http://delivery.pe.hu/app/".$row[0].'';

        // echo ;


        // Текст для HTML версии;
        //<p class='text text-danger'><strong>Для автоматического определения местоположения на Вашем устройстве, включите GPS модуль.</strong></p>

        $spinner = "<center class='coordsSpinners'>
                        <p>Определяю координаты GPS...</p>
                        <img width='10%' height='10%' src='img/loading.gif' alt=''Загрузка'' class='img img-responsive'>
                    </center>";

        $form = "<form class='postForms' name='form' role='form' method='POST' action='http://delivery.pe.hu/app/send.php'>
        <label for='foto'>Фото:</label>
        <p class='foto'><img name='foto' class='img img-responsive' src=".$src." alt=''></p>
        <label for='fio'>ФИО клиента:</label>
        <br>
        <input rows=1 class='form-control' type='text' name='fio'></input>

        <label for='adr'>Адрес клиента:</label>
        <input rows=1 class='form-control geo' type='text' name='adr'></input>
        ".$spinner."
        <label for='ord'>Номер заказа:</label>
        <br>
        <input type='number' rows=1 class='form-control' name='ord'></input>

        <label for='rew'>Отзыв:</label>
        <br>
        <textarea rows=3 class='form-control' type='text' name='rew'></textarea>

        <input type='text' name='fotoAdr' hidden value=".$row[0]."/>

        <div class='ratind-area'>
        <h4>Оценка:</h4>
          <select name='rating'>
            <option value='1' selected>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>

    		<div class='checkbox'>
        <h4>Вид дефекта:</h4>

    			<label class='checkbox-area'>
    				<input class='checkbox-input' name='cleavage' value='cleavage' type='checkbox'> Скол
    			</label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='dent' value='dent' type='checkbox'> Вмятина
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='bubbles' value='bubbles' type='checkbox'> Пузыри на ЛКП
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='crack' value='crack' type='checkbox'> Трещина
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='attrition' value='attrition' type='checkbox'> Потертость
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='loopholes' value='loopholes' type='checkbox'> Люфты сверх нормы
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='clearances' value='clearances' type='checkbox'> Зазоры сверх нормы
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='absenceParts' value='absenceParts' type='checkbox'> Отсутствие частей
        </label>



        <label class='checkbox-area'>
          <input class='checkbox-input' name='deployFail' value='deployFail' type='checkbox'> Производственный брак
        </label>
        </div>


        <input style='margin-top:15px;' class='photoSubmits btn btn-info' type='submit' onclick='setFormData(this.form);return false;' value='Отправить' disabled>

        <hr>
        </form>";
        $div = "<div>".$form."</div>";

        echo $div;
    }
};
?>
