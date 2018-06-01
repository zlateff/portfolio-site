﻿<?php
require("../PHPMailer_5.2.0/class.phpmailer.php");

$mail = new PHPMailer();

if($_POST) {

    $errors = array();      // array to hold validation errors
    $data   = array();      // array to pass back data
    
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (!$name) {
        $errors['name'] = 'Name is required.';
    }
    if (!$email OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Valid Email is required.';
    }
    if (!$message) {
        $errors['message'] = 'Message is required.';
    }
        
    // return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false
    if ( ! empty($errors)) {
        $errors['reason'] = 'Please complete the form.';
        // if there are items in our errors array, return those errors
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {

        // if there are no errors process our form, then return a message

        // Set the email subject.
        $subject = "New zlateff.com contact from $name";
        
        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";
        
        $mail->IsSMTP();                  // set mailer to use SMTP
        $mail->Host = "smtp.gmail.com";  // specify main and backup server
        $mail->Port = 465;              // Set the SMTP port
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
        $mail->SMTPAuth = true;     // turn on SMTP authentication
        // $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
        $mail->Username = "SENDING-EMAIL";  // SMTP username
        $mail->Password = "PASSWORD"; // SMTP password
        $mail->SetFrom = "SENDING-EMAIL";
        $mail->FromName = $name;
        $mail->AddAddress("RECEIVING-EMAIL");        
        $mail->AddReplyTo($email, "Sender's Email");
        
        $mail->WordWrap = 50;               // set word wrap to 50 characters
        //$mail->AddAttachment("/var/tmp/file.tar.gz");         // add attachments
        //$mail->AddAttachment("/tmp/image.jpg", "new.jpg");    // optional name
        $mail->IsHTML(true); // set email format to HTML
        
        $mail->Subject = $subject;
        $mail->Body    = "Name: $name<br>Email: $email<br>Message:<br>$message<br>";
        $mail->AltBody = $email_content;
    
        if($mail->Send())
        {
           // show a message of success and provide a true success variable
            $data['success'] = true;
            $data['message'] = 'Thank you! Your message has been sent.';
        } else {
            $data['success'] = false;
            $data['errors']['reason']  = "Oops! Something went wrong and we couldn't send your message.";
        }
    }

    // return all our data to an AJAX call
    echo json_encode($data);

} else {
    // Not a POST request, set an error response code.
    $errors = array();  
    $data   = array();  
    $data['success'] = false;
    $data['errors']['reason']  = "There was a problem with your submission, please try again.";
    echo json_encode($data);
}

?>