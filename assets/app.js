const button = document.querySelector('button');
button.addEventListener('click', () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerHTML="Your browser does not support geolocation"
    }
})

function onSuccess(position){
    let {latitude, longitude} = position.coords;
    apiKey = 'b99366a7fda44c989d02f4a93a3d71c9';

   fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
   .then(response =>response.json())
   .then(result => {
       let allDetails = result.results[0].components;
       let {country,region, road,suburb} = allDetails;
       console.log(country,region);
       swal({
        title: "Your current location is: ",
        text: `${country}, ${region}`,
      });
   });
   
}

function onError(error){
    if(error.code == 1){
        swal({
            title: "Ooops!",
            text: "You denied request to access your location",
            icon: "warning",
          });
          button.setAttribute("disabled", "true");
    }else if(error.code == 2){
        swal({
            title: "Ooops!",
            text: "Location is not available",
            icon: "warning",
          });
     }else{
        swal({
            title: "Ooops!",
            text: "Something went wrong",
            icon: "warning",
          });
    }

    
};