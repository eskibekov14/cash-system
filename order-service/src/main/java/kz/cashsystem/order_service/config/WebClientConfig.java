// WebClientConfig.java
package kz.cashsystem.order_service.config;

import kz.cashsystem.order_service.entity.CashRegisterProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import java.time.Duration;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient cashRegisterWebClient(CashRegisterProperties props) {
        return WebClient.builder()
                .baseUrl(props.getUrl())
                .defaultHeaders(h ->
                        h.setBasicAuth(props.getLogin(), props.getPassword()))
                .clientConnector(new ReactorClientHttpConnector(
                        HttpClient.create()
                                .responseTimeout(Duration.ofMillis(props.getTimeout()))
                ))
                .build();
    }
}