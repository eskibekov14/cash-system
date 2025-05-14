// SystemController.java
package kz.cashsystem.order_service.controllers;

import com.fazecast.jSerialComm.SerialPort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system")
public class SystemController {
    private final SerialPort port;

    public SystemController(SerialPort port) {
        this.port = port;
    }

    @GetMapping("/port-status")
    public ResponseEntity<String> portStatus() {
//        return ResponseEntity.ok(port.isOpen() ? "OPEN" : "CLOSED");
        return ResponseEntity.ok("OPEN-Testimator");
    }
}