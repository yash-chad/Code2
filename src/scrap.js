const cheerio = require("cheerio")
const rp = require("request-promise")

// const urlMum = `https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB&sid=5c836ffd842a369e0083f9e0854b91cb&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB%3Bsid%3D5c836ffd842a369e0083f9e0854b91cb%3Bsb_price_type%3Dtotal%26%3B&sr_autoscroll=1&ss=Mumbai&is_ski_area=0&ssne=Mumbai&ssne_untouched=Mumbai&dest_id=-2092174&dest_type=city&checkin_year=2020&checkin_month=1&checkin_monthday=${cin_date}&checkout_year=2020&checkout_month=2&checkout_monthday=${cout_date}&group_adults=3&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1`
// const urlDelhi = `https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB&sid=5c836ffd842a369e0083f9e0854b91cb&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB%3Bsid%3D5c836ffd842a369e0083f9e0854b91cb%3Btmpl%3Dsearchresults%3Bac_click_type%3Db%3Bac_position%3D0%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bcheckin_month%3D1%3Bcheckin_monthday%3D29%3Bcheckin_year%3D2020%3Bcheckout_month%3D2%3Bcheckout_monthday%3D13%3Bcheckout_year%3D2020%3Bcity%3D-2092174%3Bclass_interval%3D1%3Bdest_id%3D4127%3Bdest_type%3Dregion%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D3%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Braw_dest_type%3Dregion%3Broom1%3DA%252CA%252CA%3Bsb_price_type%3Dtotal%3Bsearch_selected%3D1%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dsearchresults%3Bsrc_elem%3Dsb%3Bsrpvid%3D60cb29ed7f810068%3Bss%3DGoa%252C%2520India%3Bss_all%3D0%3Bss_raw%3DGoa%3Bssb%3Dempty%3Bsshis%3D0%3Bssne%3DMumbai%3Bssne_untouched%3DMumbai%3Btop_ufis%3D1%26%3B&sr_autoscroll=1&ss=Delhi&is_ski_area=0&ssne=Goa&ssne_untouched=Goa&checkin_year=2020&checkin_month=1&checkin_monthday=${cin_date}&checkout_year=2020&checkout_month=1&checkout_monthday=${cout_date}&group_adults=3&group_children=0&no_rooms=1&from_sf=1&search_pageview_id=60cb29ed7f810068&ss_raw=Delhi`
// const urlGoa = `https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB&sid=5c836ffd842a369e0083f9e0854b91cb&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB%3Bsid%3D5c836ffd842a369e0083f9e0854b91cb%3Btmpl%3Dsearchresults%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bcheckin_month%3D1%3Bcheckin_monthday%3D29%3Bcheckin_year%3D2020%3Bcheckout_month%3D2%3Bcheckout_monthday%3D13%3Bcheckout_year%3D2020%3Bclass_interval%3D1%3Bdest_id%3D-2092174%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D3%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Braw_dest_type%3Dcity%3Broom1%3DA%252CA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bsrpvid%3Dd34929e5c8e800ba%3Bss%3DMumbai%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%3Bssne%3DMumbai%3Bssne_untouched%3DMumbai%3Btop_ufis%3D1%26%3B&sr_autoscroll=1&ss=Goa%2C+India&is_ski_area=&ssne=Mumbai&ssne_untouched=Mumbai&city=-2092174&checkin_year=2020&checkin_month=1&checkin_monthday=${cin_date}&checkout_year=2020&checkout_month=2&checkout_monthday=${cout_date}&group_adults=3&group_children=0&no_rooms=1&from_sf=1&search_pageview_id=d34929e5c8e800ba&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=4127&dest_type=region&place_id_lat=15.482176&place_id_lon=73.771179&search_pageview_id=d34929e5c8e800ba&search_selected=true&region_type=province&ss_raw=Goa`

const searchHotels = (cin_date,cout_date,name)=>{
    const urlMum = `https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB&sid=5c836ffd842a369e0083f9e0854b91cb&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB%3Bsid%3D5c836ffd842a369e0083f9e0854b91cb%3Bsb_price_type%3Dtotal%26%3B&sr_autoscroll=1&ss=Mumbai&is_ski_area=0&ssne=Mumbai&ssne_untouched=Mumbai&dest_id=-2092174&dest_type=city&checkin_year=2020&checkin_month=1&checkin_monthday=${cin_date}&checkout_year=2020&checkout_month=2&checkout_monthday=${cout_date}&group_adults=3&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1`
    const urlDelhi = `https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB&sid=5c836ffd842a369e0083f9e0854b91cb&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB%3Bsid%3D5c836ffd842a369e0083f9e0854b91cb%3Btmpl%3Dsearchresults%3Bac_click_type%3Db%3Bac_position%3D0%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bcheckin_month%3D1%3Bcheckin_monthday%3D29%3Bcheckin_year%3D2020%3Bcheckout_month%3D2%3Bcheckout_monthday%3D13%3Bcheckout_year%3D2020%3Bcity%3D-2092174%3Bclass_interval%3D1%3Bdest_id%3D4127%3Bdest_type%3Dregion%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D3%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Braw_dest_type%3Dregion%3Broom1%3DA%252CA%252CA%3Bsb_price_type%3Dtotal%3Bsearch_selected%3D1%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dsearchresults%3Bsrc_elem%3Dsb%3Bsrpvid%3D60cb29ed7f810068%3Bss%3DGoa%252C%2520India%3Bss_all%3D0%3Bss_raw%3DGoa%3Bssb%3Dempty%3Bsshis%3D0%3Bssne%3DMumbai%3Bssne_untouched%3DMumbai%3Btop_ufis%3D1%26%3B&sr_autoscroll=1&ss=Delhi&is_ski_area=0&ssne=Goa&ssne_untouched=Goa&checkin_year=2020&checkin_month=1&checkin_monthday=${cin_date}&checkout_year=2020&checkout_month=1&checkout_monthday=${cout_date}&group_adults=3&group_children=0&no_rooms=1&from_sf=1&search_pageview_id=60cb29ed7f810068&ss_raw=Delhi`
    const urlGoa = `https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB&sid=5c836ffd842a369e0083f9e0854b91cb&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgO4AouAsvEFwAIB%3Bsid%3D5c836ffd842a369e0083f9e0854b91cb%3Btmpl%3Dsearchresults%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bage%3D12%3Bcheckin_month%3D1%3Bcheckin_monthday%3D29%3Bcheckin_year%3D2020%3Bcheckout_month%3D2%3Bcheckout_monthday%3D13%3Bcheckout_year%3D2020%3Bclass_interval%3D1%3Bdest_id%3D-2092174%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D3%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Braw_dest_type%3Dcity%3Broom1%3DA%252CA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bsrpvid%3Dd34929e5c8e800ba%3Bss%3DMumbai%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%3Bssne%3DMumbai%3Bssne_untouched%3DMumbai%3Btop_ufis%3D1%26%3B&sr_autoscroll=1&ss=Goa%2C+India&is_ski_area=&ssne=Mumbai&ssne_untouched=Mumbai&city=-2092174&checkin_year=2020&checkin_month=1&checkin_monthday=${cin_date}&checkout_year=2020&checkout_month=2&checkout_monthday=${cout_date}&group_adults=3&group_children=0&no_rooms=1&from_sf=1&search_pageview_id=d34929e5c8e800ba&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=4127&dest_type=region&place_id_lat=15.482176&place_id_lon=73.771179&search_pageview_id=d34929e5c8e800ba&search_selected=true&region_type=province&ss_raw=Goa`

    var url=""
    //console.log(name)
    if(name=="Mumbai" || name=="mumbai")url=urlMum
    else if(name=="Delhi" || name=="delhi")url=urlDelhi
    else url=urlGoa
    
    return rp(url)
    .then(response=>{ return response})
    .then(body=>{
        const $ = cheerio.load(body)
        //console.log($(".sr-hotel__name").text())

        const hotels = []
        const hotelNames =[]
        const hotelImages = []
        const hotelLinks = []
        //const prices = []
        //Working
        $(".sr-hotel__name ").each(function(i,element){
            var $element = $(element).text()
            $element = $element.replace("\n", "");
            $element = $element.replace("\n", "");
            hotelNames.push($element)
            //console.log($element.text())
        })

        //Working
        $(".hotel_image").each(function(i,element){
                const $element = $(element).attr('src')
                hotelImages.push($element)
                //console.log($element.attr('src'))
            })

        
        //Hotel specific link working
        $('.hotel_name_link ') 
            .each(function(i,element){
                var $element = "https://booking.com"+$(element).attr("href")
                $element = $element.replace("\n", "");
                $element = $element.replace("\n", "");
                hotelLinks.push($element)
               // console.log($element)
            })


        for(var i=0;i<hotelImages.length && i<hotelNames.length && i<hotelLinks.length ;i++)
        {
            const hotel = {
                name : hotelNames[i],
                image : hotelImages[i],
                link : hotelLinks[i],
                price :  parseInt( Math.random()*100000)

            }
            hotels.push(hotel)
        }

        //console.log(hotels)
        return hotels
 
        
})
    .catch(e=>{console.log(e)})
}


//searchHotels()
  


module.exports = {searchHotels} 