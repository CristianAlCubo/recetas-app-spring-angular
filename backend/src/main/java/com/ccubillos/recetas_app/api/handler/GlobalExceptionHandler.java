package com.ccubillos.recetas_app.api.handler;

import com.ccubillos.recetas_app.api.response.HTTPAPISingleResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Manejo de validaciones
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<HTTPAPISingleResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(field, message);
        });

        HTTPAPISingleResponse<Object> response = HTTPAPISingleResponse.builder()
                .data(errors)
                .success(false)
                .statusCode(400)
                .message("Validation failed")
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Manejo de errores genéricos
    @ExceptionHandler(Exception.class)
    public ResponseEntity<HTTPAPISingleResponse<Object>> handleAllExceptions(Exception ex) {
        HTTPAPISingleResponse<Object> response = HTTPAPISingleResponse.builder()
                .data(null)
                .success(false)
                .statusCode(500)
                .message("Internal Server Error: " + ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
