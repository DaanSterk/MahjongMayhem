$(document).ready(function () {
    var theme = localStorage.getItem('theme');
    if(theme){
        var themeElement = $("." + theme);
        if(themeElement){
            $('body').removeClass().addClass(theme);
        }
    }
});