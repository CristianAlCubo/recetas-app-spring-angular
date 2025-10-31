package com.ccubillos.recetas_app.api.filter;

import com.ccubillos.recetas_app.api.response.HTTPAPISingleResponse;
import com.ccubillos.recetas_app.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.ccubillos.recetas_app.config.ApiPrefixConfig.API_VERSION;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RequestMatcher publicEndpoints;

    private static final String[] SWAGGER_WHITELIST = {
            "/swagger-ui.html", "/swagger-ui/**",
            "/v3/api-docs/**", "/swagger-resources/**",
            "/webjars/**", "/swagger-ui/index.html",
            "**/swagger-config", "**/api-docs/**"
    };

    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.publicEndpoints = createPublicEndpointsMatcher();
    }

    private RequestMatcher createPublicEndpointsMatcher() {
        List<RequestMatcher> matchers = new ArrayList<>();

        // Add Swagger paths without and with potential API prefix
        for (String pattern : SWAGGER_WHITELIST) {
            matchers.add(new AntPathRequestMatcher(pattern));
            matchers.add(new AntPathRequestMatcher("/**" + pattern));
        }

        // Add other public endpoints
        matchers.add(new AntPathRequestMatcher(API_VERSION + "/auth/**"));
        matchers.add(new AntPathRequestMatcher("/public/**"));

        return new OrRequestMatcher(matchers.toArray(new RequestMatcher[0]));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // No hay token
            writeErrorResponse(response, HttpStatus.FORBIDDEN, "No token provided");
            return;
        }

        final String jwt = authHeader.substring(7);
        final String username;

        try {
            username = jwtService.extractUsername(jwt);
        } catch (ExpiredJwtException ex) {
            // Token expirado
            writeErrorResponse(response, HttpStatus.FORBIDDEN, "Expired token");
            return;
        } catch (Exception ex) {
            // Token inválido u otro error asociado al token
            writeErrorResponse(response, HttpStatus.FORBIDDEN, "Invalid token");
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                writeErrorResponse(response, HttpStatus.FORBIDDEN, "Invalid token");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return publicEndpoints.matches(request);
    }

    private void writeErrorResponse(HttpServletResponse response, HttpStatus status, String message) throws IOException {
        HTTPAPISingleResponse<Object> apiResponse = HTTPAPISingleResponse.builder()
                .data(null)
                .success(false)
                .statusCode(status.value())
                .message(message)
                .build();

        response.setStatus(status.value());
        response.setContentType("application/json");
        objectMapper.writeValue(response.getWriter(), apiResponse);
    }
}
