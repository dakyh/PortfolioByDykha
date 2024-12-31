<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Vérifier si la méthode de requête est POST (le formulaire a été soumis)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation des champs
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            header('Location: contact.html?status=invalid_email');
            exit();
        }

        $mail = new PHPMailer(true);

        try {
            // Paramètres du serveur SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'votre_email@gmail.com';  // Remplacez par votre adresse Gmail
            $mail->Password = 'votre_mot_de_passe';  // Remplacez par votre mot de passe Gmail
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Destinataire
            $mail->setFrom('votre_email@gmail.com', 'Khady DIAGNE');  // Adresse fixe comme expéditeur
            $mail->addReplyTo($email, $name);  // Permet de répondre à l'utilisateur
            $mail->addAddress('mamekhadydiagne27@gmail.com');  // L'email de réception

            // Contenu de l'email
            $mail->isHTML(false);
            $mail->Subject = $subject;
            $mail->Body = "Nom: $name\nEmail: $email\nMessage: $message";

            // Envoi de l'email
            $mail->send();
            header('Location: contact.html?status=success');
        } catch (Exception $e) {
            error_log("Erreur lors de l'envoi de l'email : {$mail->ErrorInfo}");
            header('Location: contact.html?status=error');
        }
    } else {
        header('Location: contact.html?status=missing');
    }
}
?>
