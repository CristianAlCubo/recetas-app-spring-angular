package com.ccubillos.recetas_app.api.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class HTTPAPISingleResponse<T> {
    private T data;
    private String message;
    private Integer statusCode;
    private Boolean success;
}
