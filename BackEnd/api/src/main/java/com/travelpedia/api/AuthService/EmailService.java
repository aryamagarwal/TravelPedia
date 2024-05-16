package com.travelpedia.api.AuthService;

//package com.example.travelediabackendjwt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
	
	@Autowired
    private JavaMailSender mailSender;

    @Async
    public Boolean send(String to, String subject, String body) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(body, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("${app.mailFrom}");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
//            TODO :  logging as sending email failed
//            throw new IllegalStateException("failed to send email");
            return false;
        }
        return true;
    }

	public Boolean sendOtpVerificationEmail(String email, String userName, String otp) {
		// TODO Auto-generated method stub
		String subject="Confirm your Travelpedia Account";
		String body="<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "\t<title></title>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <p> Hi "+ userName + ", <br/><br/>\n" +
                "     <b>" + otp + "</b> is the OTP for your <b><i>travelpedia</i></b> account verification. <br/>\n" +
                "     Please keep in mind, this OTP is valid only for 5 minutes. <br/>\n" +
                "     Welcome to travelpedia. <br/>\n" +
                "     <br/>\n" +
                "     Thanks and Regards, <br/>\n" +
                "     Priyanshu @ Team Travelpedia" +
                "    </p>\n" +
                "</body>\n" +
                "</html>";
//				+ "Please click <a href=\"${app.url}/api/auth/verifyEmail?token="+token+"\"> here </a> to verify your travelpedia account.";
		return send(email, subject, body);
	}

}
