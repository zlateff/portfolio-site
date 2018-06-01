var largest = 0; //start with 0

$(".card-text").each(function(){ //loop through each card paragraph
   var findHeight = $(this).height(); //find the height
   if(findHeight > largest){ //see if this height is greater than "largest" height
      largest = findHeight; //if it is greater, set largest height to this one 
   }  
});

$(".card-text").css({"height":largest+"px"});

$(function() {
    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();
        
        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text
        $(formMessages).empty();
        $(formMessages).removeClass('alert-danger');

        var formData = form.serialize();

        // Submit the form using AJAX.
        $.ajax({
        type    : 'POST',
        url     : $(form).attr('action'),
        data    : formData,
        dataType: 'json',
        encode  : true
        })
        .done(function(data) {
        if ( ! data.success) {
                
            $(".submit").addClass("hide-loading");
            $(".failed").addClass("finish");
            setTimeout(function() {
              $(".submit").removeClass("loading");
              $(".submit").removeClass("hide-loading");
              $(".done").removeClass("finish");
              $(".failed").removeClass("finish");
            }, 2000);
            $(formMessages).removeClass('alert-success');
            $(formMessages).addClass('alert-danger');
        
            // Set the message text.
            if (data.errors !== '') {
                $(formMessages).text(data.errors.reason);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }

            // handle errors for name ---------------
            if (data.errors.name) {
                $('#name-group').addClass('has-error'); // add the error class to show red input
                $('#name-group').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
            }

            // handle errors for email ---------------
            if (data.errors.email) {
                $('#email-group').addClass('has-error'); // add the error class to show red input
                $('#email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
            }

            // handle errors for message ---------------
            if (data.errors.message) {
                $('#message-group').addClass('has-error'); // add the error class to show red input
                $('#message-group').append('<div class="help-block">' + data.errors.message + '</div>'); // add the actual error message under our input
            }

        } else {

            // Make sure that the formMessages div has the 'success' class.
            $(".submit").addClass("hide-loading");
            $(".done").addClass("finish");
            setTimeout(function() {
              $(".submit").removeClass("loading");
              $(".submit").removeClass("hide-loading");
              $(".done").removeClass("finish");
              $(".failed").removeClass("finish");
            }, 2000);
            $(formMessages).removeClass('alert-danger');
            $(formMessages).addClass('alert-success');
        
            // Set the message text.
            $(formMessages).text(data.message);
        
            // Clear the form.
            $('#name').val('');
            $('#email').val('');
            $('#message').val('');

        }
        })
        .fail(function(data) {
        // show any errors
        console.log(data);
    });
    });
});


$(document).ready(function() {
  $(".submit").click(function() {
    $('#ajax-contact').submit();
    $(".submit").addClass("loading");
  })
});
