// CashRegisterService.java
package kz.cashsystem.order_service.services;

import kz.cashsystem.order_service.dtos.SaleRequest;
import kz.cashsystem.order_service.dtos.SaleResponse;
import kz.cashsystem.order_service.dtos.ShiftResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Arrays;

@Service
public class CashRegisterService {
    private static final Logger log = LoggerFactory.getLogger(CashRegisterService.class);
    private final SerialCommService serial;

    public CashRegisterService(SerialCommService serial) {
        this.serial = serial;
    }

    public Mono<ShiftResponse> openShift() {
//        return Mono.fromCallable(() -> {
//            byte STX = 0x02, ETX = 0x03, CMD_OPEN_SHIFT = 0x30, operatorId = 0x01;
//            ByteArrayOutputStream baos = new ByteArrayOutputStream();
//            baos.write(STX);
//            baos.write(CMD_OPEN_SHIFT);
//            baos.write(operatorId);
//            baos.write(ETX);
//
//            byte[] withoutLrc = baos.toByteArray();
//            byte lrc = calculateLRC(withoutLrc);
//            byte[] fullFrame = Arrays.copyOf(withoutLrc, withoutLrc.length + 1);
//            fullFrame[fullFrame.length - 1] = lrc;
//
//            log.debug("Sending open shift command");
//            byte[] resp = serial.sendCommand(fullFrame);
//
//            if (resp == null || resp.length < 15) {
//                throw new IllegalStateException("Invalid response from device");
//            }
//
//            return parseShiftResponse(resp);
//        }).onErrorMap(e -> {
//            log.error("Error opening shift", e);
//            return new RuntimeException("Failed to open shift", e);
//        });
        return Mono.empty();
    }

    private byte calculateLRC(byte[] data) {
        byte lrc = 0x00;
        for (byte b : data) {
            lrc ^= b;
        }
        return lrc;
    }

    private ShiftResponse parseShiftResponse(byte[] resp) {
        if (resp.length < 15) {
            throw new IllegalArgumentException("Invalid response length");
        }

        String shiftId = new String(resp, 2, 4, StandardCharsets.US_ASCII);
        LocalDateTime ts = parseBcdTimestamp(resp, 6);
        String status = resp[14] == 0x30 ? "OPENED" : "ERROR";

        return new ShiftResponse(shiftId, ts, status);
    }

    private LocalDateTime parseBcdTimestamp(byte[] data, int offset) {
        int year = bcdToInt(data[offset]) + 2000;
        int month = bcdToInt(data[offset + 1]);
        int day = bcdToInt(data[offset + 2]);
        int hour = bcdToInt(data[offset + 3]);
        int min = bcdToInt(data[offset + 4]);
        int sec = bcdToInt(data[offset + 5]);
        return LocalDateTime.of(year, month, day, hour, min, sec);
    }

    private int bcdToInt(byte b) {
        return ((b >> 4) & 0x0F) * 10 + (b & 0x0F);
    }

    public Mono<SaleResponse> registerSale(SaleRequest request) {
        // Реализация продажи
        return Mono.empty();
    }

    public Mono<Void> closeShift() {
        // Реализация закрытия смены
        return Mono.empty();
    }
}