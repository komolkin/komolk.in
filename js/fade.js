var classes = [
    '☻',
    'Hi',
    'I\'m Ilya',
    'Product Designer'
];

(function displayClass(i) {
    $('#tst h3').text(classes[i]).fadeIn(500, function() {
        $(this).delay(6000).fadeOut(500, function() {
            displayClass((i + 1) % classes.length);
        });
    });
})(0);