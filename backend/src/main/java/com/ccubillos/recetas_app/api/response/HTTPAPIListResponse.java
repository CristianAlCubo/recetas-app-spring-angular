package com.ccubillos.recetas_app.api.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class HTTPAPIListResponse<T> {
    private List<T> data;
    private String message;
    private Integer statusCode;
    private Boolean success;
}

