// MockKkmServer.java
package kz.cashsystem.order_service.services;

import com.fazecast.jSerialComm.SerialPort;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@Component
public class MockKkmServer {
    private static final Logger log = LoggerFactory.getLogger(MockKkmServer.class);
    private final SerialPort port;
    private volatile boolean running = true;

    @Autowired
    public MockKkmServer() {
        this.port = SerialPort.getCommPort("COM8"); // Указали явно
        this.port.setBaudRate(9600); // Пример: настрой скорость
        this.port.setNumDataBits(8);
        this.port.setNumStopBits(SerialPort.ONE_STOP_BIT);
        this.port.setParity(SerialPort.NO_PARITY);
        this.port.openPort(); // Важно: открыть порт вручную
    }

    @PostConstruct
    public void start() {
        if (port == null || !port.isOpen()) {
            log.warn("Mock server disabled - no valid COM port available");
            return;
        }
        Thread serverThread = new Thread(() -> {
            try (InputStream is = port.getInputStream();
                 OutputStream os = port.getOutputStream()) {

                byte[] buffer = new byte[256];
                log.info("Mock KKM server started on {}", port.getSystemPortName());

                while (running) {
                    int bytesRead = is.read(buffer);
                    if (bytesRead > 0) {
                        processCommand(buffer, bytesRead, os);
                    }
                }
            } catch (IOException e) {
                log.error("Communication error", e);
            } finally {
                closePort();
            }
        });

        serverThread.setDaemon(true);
        serverThread.start();
    }

    private void processCommand(byte[] buffer, int length, OutputStream os) throws IOException {
        log.debug("Received command: {}", buffer[1]);
        if (length >= 2 && buffer[1] == 0x30) {
            byte[] response = createOpenShiftResponse();
            os.write(response);
            os.flush();
        }
    }

    private byte[] createOpenShiftResponse() throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // STX + Command + Data + ETX + LRC
        out.write(0x02);
        out.write(0x30);
        out.write("A123".getBytes(StandardCharsets.US_ASCII));

        LocalDateTime now = LocalDateTime.now();
        out.write(toBcd(now.getYear() - 2000));
        out.write(toBcd(now.getMonthValue()));
        out.write(toBcd(now.getDayOfMonth()));
        out.write(toBcd(now.getHour()));
        out.write(toBcd(now.getMinute()));
        out.write(toBcd(now.getSecond()));
        out.write(0x03);

        byte[] frame = out.toByteArray();
        byte lrc = calculateLRC(frame);
        out.write(lrc);

        return out.toByteArray();
    }

    private byte toBcd(int val) {
        return (byte) (((val / 10) << 4) | (val % 10));
    }

    private byte calculateLRC(byte[] data) {
        byte lrc = 0x00;
        for (byte b : data) {
            lrc ^= b;
        }
        return lrc;
    }

    @PreDestroy
    public void closePort() {
        running = false;
        if (port != null && port.isOpen()) {
            port.closePort();
            log.info("Closed COM port {}", port.getSystemPortName());
        }
    }
}