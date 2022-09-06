$(function () {
   //this block of code gets the user's input on click

   let map
   const firstLoad = () => {
        initialMap = L.map('map').setView([43.161030, -77.610924], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '© OpenStreetMap'
      }).addTo(initialMap);

      
   };

   firstLoad();
  
   const geoLocation = async () => {
      var theData, response;

      response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_6v40Dbqsdrncaw3Hab0Fqoh1HPmLK&ipAddress=${yourIp}`);

      // this block of code test if the we can connect to the server and alert an error message if we can't
      if (!response.ok) {
         swal(
            {
               title: "Error",
               text: "Check your internet connection",
               icon: 'error',
               button: 'Retry'
            }
         );
      } else {
         theData = await response.json();

      }
      console.log(theData);
      return theData;
   };



   $('.button').on('click', function () {
      yourIp = $('.yourIp').val();


         geoLocation().then(data => {
         $(".address").text(data.ip);
         $(".location").text(data.location.region);
         $(".timezone").text(`UTC ${data.location.timezone}`);
         $(".isp").text(data.isp);

         initialMap.off()
         var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }

         let map = L.map('map').setView([data.location.lat, data.location.lng], 13);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
         }).addTo(map);

         var greenIcon = L.icon({
            iconUrl: './images/icon-location.svg',
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location

         });
         L.marker([data.location.lat, data.location.lng], {icon: greenIcon}).addTo(map); //this add a marker to your exact location

         


      }).catch((err) => {
         swal(
            {
               title: "Error",
               text: "Kindly input a correct domain or ip address",
               icon: 'error',
               button: 'Retry'
            }
         );
            

      });




   });




});
