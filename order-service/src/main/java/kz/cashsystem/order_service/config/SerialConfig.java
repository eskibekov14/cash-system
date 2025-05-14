package kz.cashsystem.order_service.config;

import com.fazecast.jSerialComm.SerialPort;
import kz.cashsystem.order_service.entity.CashRegisterSerialProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@EnableConfigurationProperties(CashRegisterSerialProperties.class)
public class SerialConfig {
    private static final Logger log = LoggerFactory.getLogger(SerialConfig.class);

    @Bean(destroyMethod = "closePort")
    @ConditionalOnProperty(name = "cashregister.serial.enabled", havingValue = "true")
    public SerialPort cashRegisterSerialPort(CashRegisterSerialProperties props) {
        log.info("Checking available COM ports...");
        SerialPort[] ports = SerialPort.getCommPorts();

        if (ports.length == 0) {
            log.warn("No COM ports found!");
            return null;
        }

        log.info("Available COM ports:");
        Arrays.stream(ports).forEach(p ->
                log.info("  - {} | {} | {}",
                        p.getSystemPortName(),
                        p.getDescriptivePortName(),
                        p.getPortDescription())
        );

        SerialPort port = Arrays.stream(ports)
                .filter(p -> p.getSystemPortName().equalsIgnoreCase(props.getPortName()))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(
                        "Port " + props.getPortName() + " not found! Available ports: " +
                                Arrays.toString(Arrays.stream(ports)
                                        .map(SerialPort::getSystemPortName)
                                        .toArray())
                ));

        if (!port.openPort()) {
            throw new IllegalStateException("Failed to open port " + props.getPortName() +
                    ". Possible reasons:\n" +
                    "1. Port is already in use\n" +
                    "2. Insufficient permissions\n" +
                    "3. Device not connected");
        }

        log.info("Successfully opened port {}", props.getPortName());
        configurePort(port, props);
        return port;
    }

    private void configurePort(SerialPort port, CashRegisterSerialProperties props) {
        port.setComPortParameters(
                props.getBaudRate(),
                props.getDataBits(),
                props.getStopBits(),
                props.getParity()
        );
        port.setComPortTimeouts(
                SerialPort.TIMEOUT_READ_BLOCKING,
                0,
                0
        );
    }
}