intervalValue1 = setInterval(returnUserData, 1000);
/*setTimeout(function(){
    intervalValue2 = setInterval(renderUsers, 100);
}, 1500);*/
renderBackground();
setInterval(renderBackground, 1000);
setInterval(responseData, 1000);
getId();

document.body.onkeypress = function(){movePlayer()};
