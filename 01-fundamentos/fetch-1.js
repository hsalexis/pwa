var request = new XMLHttpRequest();
request.open('GET','https://reqres.in/api/users', true);
request.onreadystatechange = function(state){
    if(request.readyState === 4){
        var respuesta = request.response;
        var objResp = JSON.parse(respuesta);
        console.log(objResp);
    }
}
request.send(null);