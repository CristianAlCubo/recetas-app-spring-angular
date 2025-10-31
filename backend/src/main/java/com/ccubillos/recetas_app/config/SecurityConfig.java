package com.ccubillos.recetas_app.config;

import com.ccubillos.recetas_app.api.filter.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final String[] SWAGGER_WHITELIST = {
            "/swagger-ui.html", "/swagger-ui/**",
            "/v3/api-docs/**", "/swagger-resources/**",
            "/webjars/**", "/swagger-ui/index.html",
            "**/swagger-config", "**/api-docs/**"
    };

    /**
     * Creates a matcher that matches if any of the swagger paths match, regardless of API prefix
     */
    private RequestMatcher swaggerEndpoints() {
        List<RequestMatcher> matchers = new ArrayList<>();

        // Add paths without and with potential API prefix
        for (String pattern : SWAGGER_WHITELIST) {
            matchers.add(new AntPathRequestMatcher(pattern));
            matchers.add(new AntPathRequestMatcher("/**" + pattern));
        }

        return new OrRequestMatcher(matchers.toArray(new RequestMatcher[0]));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   AuthenticationProvider authProvider,
                                                   JwtAuthFilter jwtAuthFilter) throws Exception {
        RequestMatcher swaggerMatcher = swaggerEndpoints();

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {}) // Dejar que com.ccubillos.config.WebConfig maneje la configuración CORS
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/public/**", ApiPrefixConfig.API_VERSION + "/auth/**").permitAll()
                        .requestMatchers(swaggerMatcher).permitAll()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService,
                                                         PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
