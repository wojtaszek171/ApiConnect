import $ from "jquery";
import axios from "axios";

export default async (lang,searchFor) =>{
    var response = $.ajax({
        url: "https://"+lang+".wikipedia.org/w/api.php?action=opensearch&prop=revisions&search="+searchFor+"&limit=5",
        dataType: 'jsonp',
        // success: function(data){
        //     //console.log(data);
        // }
    });
    //console.log(response);
    return response;
}
