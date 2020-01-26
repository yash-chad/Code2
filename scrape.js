const cheerio = require("cheerio")
const rp = require("request-promise")
//const url = "https://hotel.yatra.com/hotel-search/dom/search?checkInTime=00:00:00&checkOutTime=18:00:00&checkoutDate=29/01/2020&checkinDate=26/01/2020&roomRequests[0].id=1&roomRequests[0].noOfAdults=2&roomRequests[0].noOfChildren=0&source=BOOKING_ENGINE&pg=1&tenant=B2C&isPersnldSrp=1&city.name=Goa&city.code=Goa&state.name=MHR&state.code=MHR&country.name=India&country.code=IND"

const searchHotels = (place)=>{
    const url = `https://hotel.yatra.com/hotel-search/dom/search?checkInTime=00:00:00&checkOutTime=18:00:00&checkoutDate=29/01/2020&checkinDate=26/01/2020&roomRequests[0].id=1&roomRequests[0].noOfAdults=2&roomRequests[0].noOfChildren=0&source=BOOKING_ENGINE&pg=1&tenant=B2C&isPersnldSrp=1&city.name=${place}&city.code=${place}&state.name=MHR&state.code=MHR&country.name=India&country.code=IND`
    return rp(url)
        .then(response=>{ return response})
        .catch(e=>{console.log(e)})
}

searchHotels("Pune")
    .then(body=>{
        const $ = cheerio.load(body)
        //console.log($(".under-link ng-binding").html())
        console.log($(".hotel-name full fs-18 three-dot"))
        .each(function(i,element){
            const $element = $(element)
            const title = $element.find("a").attr("title")
            console.log(title)
        })

    })