package com.example.send_mail.controller;
import com.example.send_mail.excepciones.MiException;
import com.example.send_mail.service.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.ModelMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MailController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    //instancia del Logger
    private static final Logger logger = LoggerFactory.getLogger(MailController.class);

    @Autowired
    private MailService mailService;

    @PostMapping("/sendMail")
    public ResponseEntity<Map<String, String>> sendMail(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String subject,
            @RequestParam String body) {

        Map<String, String> response = new HashMap<>();

        if (name == null || name.trim().isEmpty() ||
                email == null || email.trim().isEmpty() ||
                subject == null || subject.trim().isEmpty() ||
                body == null || body.trim().isEmpty()) {

            response.put("messageHtml", "<div class='modal_wrap mensaje_error'><div class='mensaje_modal'><h3>Complete los campos</h3><p>Todos los campos son requeridos. Por favor, completa todos los campos e intenta de nuevo.</p><span id='btnClose'>Cerrar</span></div></div>");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String message = body + "\n\nDatos de contacto:\nNombre: " + name + "\nE-mail: " + email;
            mailService.sendMail("contacto.diegomendia@gmail.com", "diegomendia21@gmail.com", subject, email, subject, message);

            response.put("messageHtml", "<div class='modal_wrap mensaje_exito'><div class='mensaje_modal'><h3>Mensaje enviado</h3><p>Gracias por contactarme. Me pondré en contacto contigo lo antes posible.</p><span id='btnClose2'>Cerrar</span></div></div>");
            return ResponseEntity.ok(response);
        } catch (MiException ex) {
            logger.error("Error al enviar el correo: " + ex.getMessage(), ex);

            response.put("messageHtml", "<div class='modal_wrap mensaje_error'><div class='mensaje_modal'><h3>Error</h3><p>Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.</p><span id='btnClose'>Cerrar</span></div></div>");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception ex) {
            logger.error("Error inesperado: " + ex.getMessage(), ex);

            response.put("messageHtml", "<div class='modal_wrap mensaje_error'><div class='mensaje_modal'><h3>Error inesperado</h3><p>Ocurrió un error inesperado al procesar tu solicitud. Por favor, intenta de nuevo más tarde. Si el problema persiste, contacta al administrador.</p><span id='btnClose'>Cerrar</span></div></div>");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
