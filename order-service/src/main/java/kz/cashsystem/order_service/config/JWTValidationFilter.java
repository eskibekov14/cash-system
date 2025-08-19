package kz.cashsystem.order_service.config;

import feign.FeignException;
import jakarta.servlet.ServletException;
import kz.cashsystem.order_service.services.AuthClient;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class JWTValidationFilter extends OncePerRequestFilter {


    private final AuthClient authClient;
    // Public paths are allowed without token
    private final Set<String> publicPaths = Stream.of(
            "/api/tables"
    ).collect(Collectors.toSet());

    @Override
    protected void doFilterInternal(@NonNull jakarta.servlet.http.HttpServletRequest request,
                                    @NonNull jakarta.servlet.http.HttpServletResponse response,
                                    @NonNull jakarta.servlet.FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        // Public endpoint: list guest tables for dine-in selection
        if (path.startsWith("/api/order/tables") || path.startsWith("/api/tables")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                authClient.validateToken(authHeader); // проверяем токен через Auth Service
                filterChain.doFilter(request, response); // токен валиден — продолжаем
            } else {
                response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED);
            }
        } catch (FeignException.Unauthorized e) {
            response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED);
        } catch (FeignException e) {
            response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
