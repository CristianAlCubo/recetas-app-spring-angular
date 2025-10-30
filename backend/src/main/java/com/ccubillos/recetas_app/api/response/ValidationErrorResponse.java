package com.ccubillos.recetas_app.api.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ValidationErrorResponse {
    private final String message = "Validation Error";
    private final Integer statusCode = 400;
    private final Boolean success = false;
    private Object errors;
}
