package com.ccubillos.recetas_app.api.response;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResponseFactory {

    public <T> ResponseEntity<HTTPAPISingleResponse<T>> success(T data, int status, String message) {
        HTTPAPISingleResponse<T> response = HTTPAPISingleResponse.<T>builder()
                .data(data)
                .success(true)
                .statusCode(status)
                .message(message)
                .build();
        return ResponseEntity.status(status).body(response);
    }

    public <T> ResponseEntity<HTTPAPISingleResponse<T>> failure(int status, String message) {
        HTTPAPISingleResponse<T> response = HTTPAPISingleResponse.<T>builder()
                .data(null)
                .success(false)
                .statusCode(status)
                .message(message)
                .build();
        return ResponseEntity.status(status).body(response);
    }

    public <T> ResponseEntity<HTTPAPIListResponse<T>> listSuccess(List<T> data, String message) {
        HTTPAPIListResponse<T> response = HTTPAPIListResponse.<T>builder()
                .data(data)
                .success(true)
                .statusCode(200)
                .message(message)
                .build();
        return ResponseEntity.ok(response);
    }
}
