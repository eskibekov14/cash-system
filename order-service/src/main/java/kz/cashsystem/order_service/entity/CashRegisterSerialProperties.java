// CashRegisterSerialProperties.java
package kz.cashsystem.order_service.entity;

import com.fazecast.jSerialComm.SerialPort;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "cashregister.serial")
public class CashRegisterSerialProperties {
    private boolean enabled = true;
    private String portName;
    private int baudRate = 9600;
    private int dataBits = 8;
    private int stopBits = SerialPort.ONE_STOP_BIT;
    private int parity = SerialPort.NO_PARITY;
}