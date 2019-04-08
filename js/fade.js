var classes = [
    '☻',
    'Hi'
];

(function displayClass(i) {
    $('#tst h3').text(classes[i]).fadeIn(500, function() {
        $(this).delay(10000).fadeOut(500, function() {
            displayClass((i + 1) % classes.length);
        });
    });
})(0);