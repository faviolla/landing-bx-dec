//= vendor/jquery-1.12.0.min.js

$(document).on('click', 'a.link', function (e) {
    e.preventDefault();

    $('html, body').stop().animate({
        scrollTop: $('.share-details-section').offset().top
    }, 1000);
});