// JSON array for projects info
var projects = [
    {
        "imgsrc" : "img/fresh-tomatoes.jpg",
        "previewurl" : "#",
        "githuburl" : "https://github.com/zlateff/movie-trailer-website",
        "description" : 'Simple web application written in Python that serves' +
                        ' an HTML page showing posters of movies and allowing' +
                        ' users to play their trailers.',
        "skills" : "Python"
    },
    {
        "imgsrc" : "img/portfolio.jpg",
        "previewurl" : "#",
        "githuburl" : "https://github.com/zlateff/portfolio-site",
        "description" : "My Portfolio site you are currently browsing. The Bootstrap framework was used to make it responsive.",
        "skills" : "HTML, CSS, Bootstrap, JavaScript, PHP"
    },
    {
        "imgsrc" : "img/comingsoon.jpg",
        "previewurl" : "#",
        "githuburl" : "#",
        "description" : "This is a placeholder card for my future projects. Come back again to check what else I'll be working on.",
        "skills" : "TBD"
    },
];

for (var i = 0; i < projects.length; i++) {
    $("#projectcards").append(
        '<div class="col-lg-4 col-md-6">' +
            '<div class="card mb-4 box-shadow">' +
                `<a href="${projects[i]["previewurl"]}" target="_blank">` +
                    `<img class="card-img-top img-fluid img-thumbnail" src="${projects[i]["imgsrc"]}" alt="Project image"></a>` +
                '<div class="card-body">' +
                    '<p class="card-text">'+ projects[i]["description"] +'</p>' +
                    '<div class="d-flex flex-wrap flex-row">' +
                        '<div class="btn-group p-2">' +
                            `<a href="${projects[i]["previewurl"]}" class="btn btn-sm btn-info" target="_blank">View Project</a>` +
                        '</div>' +
                        '<div class="btn-group p-2">' +
                            `<a href="${projects[i]["githuburl"]}" class="btn btn-sm btn-dark" target="_blank">` +
                                'View Source <i class="fab fa-github"></i></a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="d-flex flex-row-reverse">' +
                        '<small class="text-muted">'+ projects[i]["skills"] +'</small>' +
        '</div></div></div></div>'
    );
};

// Set project card elements with same height
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
