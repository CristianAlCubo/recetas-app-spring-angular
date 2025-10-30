package com.ccubillos.recetas_app.api.controller;

import com.ccubillos.recetas_app.api.response.HTTPAPIListResponse;
import com.ccubillos.recetas_app.api.response.HTTPAPISingleResponse;
import com.ccubillos.recetas_app.api.response.ResponseFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ccubillos.recetas_app.model.enums.FoodCategory;

import java.util.List;

@RestController
@RequestMapping("/food-category")
public class FoodCategoryController {

    private final ResponseFactory responseFactory;

    public FoodCategoryController(ResponseFactory responseFactory) {
        this.responseFactory = responseFactory;
    }

    @RequestMapping
    public ResponseEntity<HTTPAPIListResponse<FoodCategory>> getAllFoodCategories() {
        return responseFactory.listSuccess(List.of(FoodCategory.values()), "Food categories retrieved successfully");
    }

}
