'use strict';

$(function() {

  // Ajax запрос на получение заявок
  $.get('http://delivery.pe.hu/app/toftp.php', function(data) {
    // Вставка заявок в DOM дерево и рендеринг его на мобильном приложении
    $('#ordersZone').html(data);
  }).done(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    // Когда устройство готово
    function onDeviceReady() {
      // Добавляем на устройстве в каждую заявку ключ
      $('.postForms').append('<input type="hidden" name="KEY" value="1"/>');
      // Получаем текущее положение с помощью GPS модуля
      navigator.geolocation.getCurrentPosition(geolocationSuccess, onError);

      // Коллбэк в случае если это получилось
      function geolocationSuccess(position) {
        // Запуск функциии и передача ей широты и долготы
        geocode(position.coords.latitude, position.coords.longitude);
      };
      // Коллбэк в случае если это неполучилось
      function onError(error) {
        navigator.notification.alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');

        navigator.notification.alert(
          'Ошибка определения местоположения', // message
          reload, // callback
          'Ошибка GPS', // title
          'Ok' // buttonName
        );

        function reload() {
          // empty function
        }
      };

      // Статическая функция получает широту и долготу
      function geocode(lat, lon) {

        var XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        // Отрпавляем широту и долготу на сервис GoogleMaps, в ответ сервис вернет нам адрес
        xhr.open('GET', 'https://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=false', true);
        xhr.onload = function() {
          var jsonRes = JSON.parse(this.responseText);
          jsonParser(jsonRes);
        }

        xhr.onerror = function() {
          console.log("Ошибка" + this.status);
        }
        // Отправляем запрос
        xhr.send();
      };

      function jsonParser(json) {

        var adress = json.results[0].formatted_address;

        window.cityAdress = adress;

        renderAdress(adress);
      };

      function renderAdress(adr) {
        // Рендеринг адреса
        $('.geo').val(adr);
        $('.coordsSpinners').remove();
        $('.photoSubmits').prop("disabled", false);
      };

      var timer = setTimeout(function() {
          $('.photoSubmits').prop("disabled", false);
      }, 30000);
      var timer2 = setTimeout(function () {
        if ($('center').is('.coordsSpinners')) {
          $('.coordsSpinners').append("<p class='text app-text'>Возникли сложности при определении местоположения...</p>");
        };
      }, 60000)
    }
  });
});
