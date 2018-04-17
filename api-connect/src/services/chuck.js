import $ from "jquery";

export default async searchFor =>{
    var response = $.ajax({
        url: "https://api.chucknorris.io/jokes/search?query="+searchFor,
        dataType: 'json',
        success: function(data){

        },
        complete: function () {
            $('#loading-image').hide();
        }
    }).done(function(response) {
        //console.log(filtered);
        //console.log(response.result);
        console.log('done');
    });
    //console.log(response);
    return response;

}
