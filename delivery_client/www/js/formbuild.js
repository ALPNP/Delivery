(function() {
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    $(document).ajaxStart(function() {
      $('#postButton').prop("disabled", true);
    });

    function FormBuild() {
      this.count = 2;
      // static method
      this.setData = function() {
        $('#photosForm').ajaxForm({
          success: function(data, status, settings) {
            if (!settings.responseText) {
              navigator.notification.alert(
                'Ошибка загрузки фотографий!', // message
                function() {
                  $('#postButton').prop("disabled", false);
                }, // callback
                'Delivery', // title
                'Ок' // buttonName
              );
            } else {
              navigator.notification.alert(
                'Фотографии успешно загружены!', // message
                function() {
                  var url = 'setdata.html';
                  $(location).attr('href', url);
                }, // callback
                'Delivery', // title
                'Ок' // buttonName
              );
            }
          },
          error: function(err) {
            $('#result').html('Ошибка загрузки данных на сервер');

            function alertDismissed() {
              $('#postButton').prop("disabled", false);
            }

            navigator.notification.alert(
              'Ошибка загрузки фотографий!', // message
              alertDismissed, // callback
              'Delivery', // title
              'Ок' // buttonName
            );
          }
        }).submit();
      }
    }

    FormBuild.prototype.validator = function(form) {
      var fieldValid = form.children[3].children[0];
      if (fieldValid.value != "") {
        this.setData();
      }
    }

    FormBuild.prototype.buttonChange = function(button) {
      button.className = "btn btn-info";
    }

    FormBuild.prototype.newInput = function(input) {

      console.log(this.count + "Вход в функцию");

      var newAttrName = "foto" + this.count,
        parentElem = document.getElementById('place'),
        button = document.getElementById('postButton');

      var newInput = document.createElement('input');
      newInput.setAttribute('type', 'file');
      newInput.setAttribute('name', newAttrName);
      newInput.setAttribute('accept', 'image/*');
      newInput.setAttribute('onchange', 'formBuild.newInput(this);');
      newInput.className = "btn btn-default"
      newInput.style.paddingTop = '5px';
      newInput.style.marginTop = '5px';

      if (!input.nextElementSibling) {

        if (this.count < 5 + 1) {

          if (input.value != '') {
            parentElem.appendChild(newInput);
            this.buttonChange(button);
            this.count++;

            console.log(this.count + "Добавили инпут");
          }
        } else if (this.count === 5 + 1) {
          alert("Вы прикрепили максимальное количество фотографий");
        }
      }
    };

    window.formBuild = new FormBuild();
  }
})();
