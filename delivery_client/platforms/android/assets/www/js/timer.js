(function(){

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady(){
        setTimeout(function(){
                    var url = 'app.html';
                    $(location).attr('href', url);
                }, 2000)
    }
})();