// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var perfEntries = performance.getEntriesByType("navigation");  

(function(){
    if (perfEntries[0].type === "back_forward") {
        location.reload(true);
    }
}());