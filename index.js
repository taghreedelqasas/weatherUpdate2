const inputElement = document.querySelector("input");
 const formElement = document.querySelector("form");
 formElement.addEventListener("submit",function(e){
    e.preventDefault();
    console.log(inputElement.value)
    
 
 })
  let cityName="";
 
//   let currenticon ="";
//   let currenttext ="";
//   let currenttemp = "";
//   let localtime = "";
//   let nameofday  ;
 

   
 
 inputElement.addEventListener("input",function(){
     console.log(inputElement.value);
      cityName = inputElement.value;
     currentweather(cityName );

 }) 
  
 
 displaycurrent();
 displayforeast();
 displaythird();

//  thirdDayweather(apikey,locationName)
//  thirdDayweather(apikey,locationName)

 const apikey ='69815ab2ccbd46c69ef213218241612'

 async function currentweather(locationName){
        
      const response = await   fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey }&q=${locationName}`);
          
       const data = await response.json()
        if(response.ok){
            console.log(data)
            // console.log(data.current.condition.icon)
          let  currenticon = `https:${ data.current.condition.icon}`
         localtime = data.location.localtime
         let   currenttext = data.current.condition.text
        let   zipcode= data.current.condition.code
         let   currenttemp  = data.current.temp_c
        let   nameofday  =  getDayName(localtime ); 
        let datestring = getFormattedDate(localtime ); 
            console.log(nameofday )
             console.log(currenttemp)
            console.log(currenticon)
            console.log(currenttext)
            console.log(zipcode)
            // console.log(localtime )
            // console.log(data.location.name)
            displaycurrent(cityName,currenticon,currenttext,currenttemp,nameofday,datestring )
            foreastweather(apikey,locationName);
            thirdDayweather(apikey,locationName);
            
            
            
        }

      
         
         
 }
  function displaycurrent(nameOfCity="cairo",currentimg="113.png",textcurrent="clear",currenttemp="20",nameofday="monday",datestring="5 December" ){
       let cartona = "";
       cartona = `
        <div class="inner flex-grow-1 ">
                     <div class="titleofday  d-flex justify-content-between  py-2 px-2">
                        <span>${nameofday}</span>
                        <span>${datestring }</span>
                     </div>
                     <div class="temp  px-3 py-4">
                        <h3 class="city">${nameOfCity}</h3>
                        <h2 class="text-white  temparture">${currenttemp}oC</h2>
                        <img  src="${currentimg}" width="90px"/>
                        <h5 class="clear" >${textcurrent}</h5>
                         <div class="details d-flex  ">
                            <div class="percentage  me-4">
                                <img src="icon-umberella.png"/><span class="ms-2">20%</span>
                             </div>
                             <div class="percentage me-4">
                                <img src="icon-wind.png"/><span class="ms-2">18km/h</span>
                             </div>
                             <div class="percentage me-4">
                                <img src="icon-compass.png"/><span class="ms-2">East</span>
                             </div>
                         </div>
                     </div>
                </div>
               
                `
    
        document.querySelector('.current').innerHTML = cartona ;
  }
  function getDayName(dateString) {
   let date = new Date(dateString);
   let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
   console.log(dayName);
   return dayName;
}


function getFormattedDate(dateString) {
   let date = new Date(dateString);
    day = date.getDate();
    let month = date.toLocaleDateString('en-US', { month: 'long' });
    let formattedDate = `${day} ${month}`;
   return formattedDate;
}

// weather for 2 days 
   
  async function foreastweather(apikey,locationName){
     const response = await fetch( ` https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${locationName}&days=3`)
     const data =await response.json()
     
     if(response.ok){
       console.log('sucess')
      console.log(data)
      console.log(data.location.name)
      console.log(data.forecast.forecastday[1]);
      let tomorrowDay = data.forecast.forecastday[1].date;
      console.log( tomorrowDay)
      let nameoftomorrow = getDayName(tomorrowDay);     
     console.log(nameoftomorrow) 
      console.log(data.forecast.forecastday[1].day.maxtemp_c)
      console.log(data.forecast.forecastday[1].day.mintemp_c)
      let maxtemp = data.forecast.forecastday[1].day.maxtemp_c;
      let mintemp = data.forecast.forecastday[1].day.mintemp_c;
      console.log(maxtemp)
      let tomorrowicon =    `https:${data.forecast.forecastday[1].day.condition.icon}`;
      console.log(tomorrowicon)
      let  tomorrowtext =  data.forecast.forecastday[1].day.condition.text;
      console.log(tomorrowtext)
      displayforeast(nameoftomorrow,tomorrowicon,maxtemp,mintemp, tomorrowtext)

     }
 }
   
 function displayforeast(nameoftomorrow="monday",tomorrowicon = "113 (1).png",maxtemp="20",mintemp="10", tomorrowtext="cloudy"){
     let cartona = '';
     cartona = `
       <div class="inner  tomorrow   flex-grow-1  text-center">
                     <div class="titleofday  tomorrowday  text-center py-2 px-2">
                        <span>${nameoftomorrow}</span>
                        
                     </div>
                     <div class="  px-3 py-5   degree">
                            <img  src="${tomorrowicon}" width="50px" class="m-auto"/>
                            <h3 class="text-white">${maxtemp}</h3>
                            <h6>${mintemp}</h6>
                            <h5 class="clear" >${tomorrowtext}</h5>
                            
 
                         </div>
                     </div>
     
     
     `
   
       document.querySelector('.tomorrowcontain').innerHTML = cartona;

   console.log('hi')
 }


 async function thirdDayweather(apikey,locationName){
   const response = await fetch( ` https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${locationName}&days=3`)
   const data =await response.json()
   
   if(response.ok){
     console.log('sucess')
    console.log(data)
    console.log(data.location.name)
    console.log(data.forecast.forecastday[2]);
    let thirdday = data.forecast.forecastday[2].date;
    console.log( thirdday)
    let nameofthird = getDayName(thirdday);     
   console.log(nameofthird) 
    console.log(data.forecast.forecastday[2].day.maxtemp_c)
    console.log(data.forecast.forecastday[2].day.mintemp_c)
    let maxtemp = data.forecast.forecastday[2].day.maxtemp_c;
    let mintemp = data.forecast.forecastday[2].day.mintemp_c;
    console.log(maxtemp)
    let thirdicon =    `https:${data.forecast.forecastday[2].day.condition.icon}`;
    console.log(thirdicon)
    let  thirdtext =  data.forecast.forecastday[1].day.condition.text;
    console.log(thirdtext)
    displaythird(nameofthird,thirdicon,maxtemp,mintemp, thirdtext)

   }
}
 
function displaythird(nameofthird="monday",thirdicon= "113 (1).png",maxtemp="20",mintemp="10", thirdtext="cloudy"){
   let cartona = '';
   cartona = `
     <div class="inner  tomorrow   flex-grow-1  text-center">
                   <div class="titleofday  tomorrowday  text-center py-2 px-2">
                      <span>${nameofthird}</span>
                      
                   </div>
                   <div class="  px-3 py-5   degree">
                          <img  src="${thirdicon}" width="50px" class="m-auto"/>
                          <h3 class="text-white">${maxtemp}</h3>
                          <h6>${mintemp}</h6>
                          <h5 class="clear" >${thirdtext}</h5>
                          

                       </div>
                   </div>
   
   
   `
 
     document.querySelector('.thirdDay').innerHTML = cartona;


}
     
 
   // }
   async function defaultinfo( apikey,locationName) {
      const response = await   fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey }&q=${locationName}`);
      const data = await response.json();
      if(response.ok){
         console.log(data)
         console.log(data.location.localtime  )
         let localtime = data.location.localtime ;
     let  todayname = getDayName(localtime  )
        console.log(todayname)
         return todayname ; 
        }
   
      }