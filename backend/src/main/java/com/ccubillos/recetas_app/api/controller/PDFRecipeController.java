package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.mapper.RecipeMapper;
import com.ccubillos.recetas_app.api.response.ResponseFactory;
import com.ccubillos.recetas_app.model.entity.Recipe;
import com.ccubillos.recetas_app.service.PDFGeneratorService;
import com.ccubillos.recetas_app.service.RecipeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/pdf-recipe")
public class PDFRecipeController {

    private final PDFGeneratorService pdfGeneratorService;
    private final RecipeService recipeService;
    private final ResponseFactory responseFactory;

    public PDFRecipeController(PDFGeneratorService pdfGeneratorService, RecipeService recipeService, ResponseFactory responseFactory) {
        this.pdfGeneratorService = pdfGeneratorService;
        this.recipeService = recipeService;
        this.responseFactory = responseFactory;
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getPDFRecipe(@PathVariable Long id) throws IOException {
        Recipe recipe = recipeService.getRecipeById(id);
        if(recipe == null) {
            return ResponseEntity.status(404).body(null);
        }
        byte[] pdf = pdfGeneratorService.generatePDF(RecipeMapper.fromEntityToDTO(recipe));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "receta.pdf");

        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
