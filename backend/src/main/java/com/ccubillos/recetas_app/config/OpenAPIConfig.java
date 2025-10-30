package com.ccubillos.recetas_app.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI recetasOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Recetas API")
                        .description("API REST para gestión de recetas, ingredientes y pasos de preparación")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Camilo Cubillos")
                                .email("camilo@ejemplo.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                        .description("Repositorio GitHub")
                        .url("https://github.com/tuusuario/recetas-app"));
    }
}
