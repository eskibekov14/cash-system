// SerialCommService.java
package kz.cashsystem.order_service.services;

import com.fazecast.jSerialComm.SerialPort;
import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

@Service
public class SerialCommService {
    private final SerialPort port;

    public SerialCommService(SerialPort port) {
        this.port = port;
        if (port == null) {
            throw new IllegalStateException("Serial port configuration is missing!");
        }
    }

    public synchronized byte[] sendCommand(byte[] command) {
        try {
            OutputStream os = port.getOutputStream();
            InputStream is = port.getInputStream();

            os.write(command);
            os.flush();

            ByteArrayOutputStream response = new ByteArrayOutputStream();
            byte[] buffer = new byte[256];
            int bytesRead;

            while ((bytesRead = is.read(buffer)) > 0) {
                response.write(buffer, 0, bytesRead);
                if (bytesRead < buffer.length) break;
            }

            return response.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Serial communication error", e);
        }
    }
}