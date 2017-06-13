'use strict';

(function(){
  // Dictionaries
  var types = {
    cleavage: 'Скол',
    dent: 'Вмятина',
    bubbles: 'Пузыри на ЛКП',
    crack: 'Трещина',
    attrition: 'Потертость',
    loopholes: 'Люфты сверх нормы',
    clearances: 'Зазоры сверх нормы',
    absenceParts: 'Отсутствие частей',
    deployFail: 'Производственный брак'
  };
  // Хранилище заявок
  var ordersData = [];

  $('#reset').click(function(){
    location.reload();
  });

  var orderTypeFilter,
      orderRating;

  $(document).ready(function(){

    $.get('/app/getFtpData.php?key=2344961').done(function(data){
      renderData(JSON.parse(data));
      $('.filterButtons').click(function(e){
        $('#searchInput').val('');
        $('.orderItem').show();
        if (orderRating) {
          ratingFilter(orderRating);
        }
        $('.filterButtons').removeClass('btn-danger');
        $('.filterButtons').addClass('btn-success');
        $(e.currentTarget).removeClass('btn-success');
        $(e.currentTarget).addClass('btn-danger');

        orderTypeFilter = e.currentTarget.id
        typeFilter(orderTypeFilter);
      });

      $('.ratingButtons').click(function(e){
        $('#searchInput').val('');
        $('.orderItem').show();
        if (orderTypeFilter) {
          typeFilter(orderTypeFilter);
        }
        $('.ratingButtons').removeClass('btn-danger');
        $('.ratingButtons').addClass('btn-success');
        $(e.currentTarget).removeClass('btn-success');
        $(e.currentTarget).addClass('btn-danger');
        orderRating = e.currentTarget.id
        ratingFilter(orderRating);
      });

      function dosearch(doSearchValue) {
        // ##########################
        // Поиск
        // ##########################
        var searchValueLowerCase = doSearchValue.toLowerCase();
        $('.ratingButtons').removeClass('btn-danger');
        $('.ratingButtons').addClass('btn-success');
        $('.filterButtons').removeClass('btn-danger');
        $('.filterButtons').addClass('btn-success');
        $('.orderItem').show();
        $.each($('.orderItem'), function(i, item){
          var searchItems = $(item).children('.searchItem'),
          currentItem = item,
          previousResult;
          $.each(searchItems, function(i, item){
            var itemValue = $(item).attr('data-id');
            var lowerCaseValue = itemValue.toLowerCase();
            var find = lowerCaseValue.indexOf(searchValueLowerCase);
            if (previousResult === undefined) {
              previousResult = find;
              find = null;
            }

            if ((find == -1) && (previousResult == -1)) {
              $(currentItem).hide();
            }
          });
        });
      }

      $('#doSearch').click(function(){
        var doSearchValue = $('#searchInput').val();
        console.log(doSearchValue);
        if (doSearchValue.length >= 1) { // проверяем длину строки
            dosearch(doSearchValue); // если все в порядке, приступаем к поиску
        } else {
          $('#searchModal').modal('show');
        }
    });
  });
})

  // static
  function renderData(dataForRender){
    dataForRender.forEach(function(item, i, arr){
      $('#ordersDeployZone').append('<tr class="orderItem" data-id="'+ item.ord +'"><td class="searchItem" data-id="'+ item.fio +'">'+ item.fio +'</td>' + '<td class="searchItem" data-id="'+ item.ord +'">'+ item.ord +'</td>' + '<td data-id="'+ item.rating +'">'+ item.rating + '</td><td style="display:none;">'+ fromArrayOfButtons(item.types) +'</td></tr>');
      ordersData.push(item);
    });
    $('.orderItem').click(function(e){
      // alert(e.currentTarget);
      var ord = $(e.currentTarget).attr('data-id');

      var dataForModal = ordersData.find(function(item){
        if (item.ord == ord) {
          console.log(item);
          return item;
        }
        return false;
      });
      console.log(dataForModal);
      $('#orderNumber').html(dataForModal.ord + " Оценка: " + dataForModal.rating);
      $('#orderInfo').html('<img class="img img-responsive img-thumbnail" src="'+ dataForModal.foto +'"><p class="text">ФИО: '+ dataForModal.fio +'</p><p class="text">Адрес: '+dataForModal.adr+'</p><p class="text">Отзыв: '+ dataForModal.rew +'</p><p>'+fromArrayOfButtons(dataForModal.types)+'</p>');
      $("#myModalBox").modal('show');
    });
  };
  //utils
  function ratingFilter(rating) {
    console.log(rating);
    var orders = $('.orderItem');
    $.each(orders, function(index, value) {
      var findedElems = $(value).find('[data-id="' + rating + '"]');
      console.log(findedElems);
      if (findedElems.length === 0) {
        var elemForHide = $(value).parent();
        $(elemForHide.context).hide();
      }
    });
  };

  function typeFilter(orderTypeFilter) {
    var orders = $('.orderItem');
    $.each(orders, function (index, value) {
      var findedElems = $(value).find('[data-id="'+ orderTypeFilter +'"]');
      if (findedElems.length === 0) {
        var elemForHide = $(value).parent();
        $(elemForHide.context).hide();
      }
    });
  };

  function fromArrayOfButtons(arr) {
    var resultArray = [];
    for (var i = 0; i < arr.length; i++) {
      resultArray.push('<button data-id="'+ arr[i] +'" style="margin-left: 5px; margin-top: 5px;" class="btn btn-success">'+ types[arr[i]] +'</button>');
    }
    return resultArray.join('');
  };
})();
