var classes = [
    '☻',
    'Hi',
    'Im Ilya, Product Designer',  
    'addicted to simplicity',
    'and aesthetic'
];

(function displayClass(i) {
    $('#tst h3').text(classes[i]).fadeIn(1000, function() {
        $(this).delay(600).fadeOut(1000, function() {
            displayClass((i + 1) % classes.length);
        });
    });
})(0);