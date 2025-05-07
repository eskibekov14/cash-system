package kz.cashsystem.order_service.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<JWTValidationFilter> jwtFilter(JWTValidationFilter filter) {
        FilterRegistrationBean<JWTValidationFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns("/api/*"); // защищаем только эти эндпоинты
        return registrationBean;
    }
}
