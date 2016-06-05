$(document).ready(function() {

  $(".store-area").on('click', '.button', function() {

    // Since this is the button, we want to work with the item as a whole when
    // appending.
    var item = $(this).parent('li');

    // assign the category to a variable by traversing the DOM up to the nearest
    // .store-area and getting the data-category attribute
    var parentCategory = $(this).parents('.store-area').attr('data-category');

    // assign the list number to a variable. This list number should correspond
    // to the index of the lists array defined above.
    var parentListIndex = parseInt( $(this).parents('.list').attr('data-list-number') );

    var newIndex = parentListIndex;
    if ( $(this).hasClass('move-left') && parentListIndex > 0) {
      newIndex--;
    } else if ( $(this).hasClass('move-right') && parentListIndex < 2) {
      newIndex++;
    }
    item.appendTo('.list[data-list-number="' + newIndex + '"] .store-area[data-category="' + parentCategory + '"] ul');


  });

  $('input[type="submit"]').click(function() {
    // Assign the text input to a variable. We have to do this since this event
    // handler is bound to the submit button.
    var textInput = $('input[name="new-area-item"]', $(this).parent('form') );

    // The name of the new item to be added is the value of the text input
    var newItemName = textInput.val();

    // assign the category to a variable by traversing the DOM up to the nearest
    // .store-area and getting the data-category attribute
    var parentCategory = $(this).parents('.store-area').attr('data-category');

    // do nothing if the new item name is empty
    if (newItemName.length === 0) { return false; }

    // Iterate through the list of existing items and check for ones that have
    // the same name. If a match is found, do nothing.
    var itemAlreadyExists = false;
    $('.store-area li').each(function() {
      // Note that $(this) now refers to the li that's currently being
      // iterated through, which is why this console log will list all items
      // within the same .store-area container.
      console.log ( $(this).text() );
      if ( $(this).text() === newItemName) {
        itemAlreadyExists = true;
      }
    });
    if (itemAlreadyExists) {
      return false;
    }

    // Dynamically create the new item element and populate it with the .text method
    var newItem = $('<li />').text(newItemName);
    // Create the left and right arrows, using fontawesome - http://fontawesome.io/
    var newItemRightArrow = $('<i />').addClass('move-right button fa fa-arrow-right').appendTo(newItem);
    var newItemLeftArrow = $('<i />').addClass('move-left button fa fa-arrow-left').prependTo(newItem);

    newItem.appendTo('#inventory-list .store-area[data-category="' + parentCategory + '"] ul');

    // clear the input
    textInput.val('');

    return false;
  });

});
