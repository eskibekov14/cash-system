//package kz.cashsystem.order_service.config;
//
//import com.fazecast.jSerialComm.SerialPort;
//import kz.cashsystem.order_service.entity.CashRegisterSerialProperties;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
//import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableConfigurationProperties(CashRegisterSerialProperties.class)
//public class SerialConfig {
//    private static final Logger log = LoggerFactory.getLogger(SerialConfig.class);
//
//
//    @Bean(destroyMethod = "closePort")
//    @ConditionalOnProperty(name = "cashregister.serial.enabled", havingValue = "true")
//    public SerialPort cashRegisterSerialPort(CashRegisterSerialProperties props) {
//        log.info("Looking for serial port: {}", props.getPortName());
//
//        SerialPort[] ports = SerialPort.getCommPorts();
//
//        if (ports.length == 0) {
//            throw new IllegalStateException("No serial ports found! Check connection or permissions.");
//        }
//
//        log.info("Available serial ports:");
//        Arrays.stream(ports).forEach(p ->
//                log.info("  - {} | {} | {}",
//                        p.getSystemPortName(),
//                        p.getDescriptivePortName(),
//                        p.getPortDescription())
//        );
//
//        // Поддержка частичного совпадения (например, ttyUSB -> ttyUSB0)
//        SerialPort port = Arrays.stream(ports)
//                .filter(p -> p.getSystemPortName().equalsIgnoreCase(props.getPortName())
//                        || p.getSystemPortName().toLowerCase().contains(props.getPortName().toLowerCase()))
//                .findFirst()
//                .orElseThrow(() -> new IllegalStateException(
//                        "Port '" + props.getPortName() + "' not found! Available: " +
//                                Arrays.toString(Arrays.stream(ports)
//                                        .map(SerialPort::getSystemPortName)
//                                        .toArray())
//                ));
//
//        if (!port.openPort()) {
//            throw new IllegalStateException("Could not open port '" + port.getSystemPortName() + "'. Check if it's in use or permissions.");
//        }
//
//        log.info("Opened serial port: {}", port.getSystemPortName());
//        configurePort(port, props);
//        return port;
//    }
//
//    private void configurePort(SerialPort port, CashRegisterSerialProperties props) {
//        port.setComPortParameters(
//                props.getBaudRate(),
//                props.getDataBits(),
//                props.getStopBits(),
//                props.getParity()
//        );
//        port.setComPortTimeouts(
//                SerialPort.TIMEOUT_READ_BLOCKING,
//                0,
//                0
//        );
//    }
//}