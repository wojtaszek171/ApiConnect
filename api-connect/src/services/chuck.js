import $ from "jquery";

export default async searchFor =>{
    var response = $.ajax({
        url: "https://api.chucknorris.io/jokes/search?query="+searchFor,
        dataType: 'json',
        complete: function () {
            $('#loading-image').hide();
        }
    });
    return response;

}
