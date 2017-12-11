// Check off specific Todos by clicking
$('ul').on('click', 'li', function() {
    $(this).toggleClass('completed');
});

// Click on a BIN to delete a Todo
$('ul').on('click', 'span', function(event) {
    $(this).parent().fadeOut(300, function() {
        $(this).remove();
    });
    event.stopPropagation();
})

// Click enter to add a Todo to a List (first check if not empty)
$('input[type="text"]').keypress(function(event) {
    if (event.which === 13 && $(this).val()) {
        //create new li and add to ul
        $('div ul').append('<li><span><i class="fa fa-trash" aria-hidden="true"></i></span> ' + $(this).val() + '</li>');
        $(this).val('');
    }
});

// Toggling input
$('.fa-plus').click(function() {
    $('input[type="text"]').fadeToggle(500);
});