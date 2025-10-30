package com.ccubillos.recetas_app.service;

import com.ccubillos.recetas_app.api.dto.recipe.RecipeDTO;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class PDFGeneratorService {

    private final TemplateEngine templateEngine;

    public PDFGeneratorService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }


    public byte[] generatePDF(RecipeDTO recipeDTO) throws IOException {
        // Cargar la plantilla HTML
        Context context = new Context();
        context.setVariable("recipe", recipeDTO);
        String html = templateEngine.process("recipe", context);

        // Generar PDF desde HTML
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.withHtmlContent(html, null);
        builder.toStream(buffer);
        builder.run();
        return buffer.toByteArray(); // Representación en bytes del PDF
    }
}
