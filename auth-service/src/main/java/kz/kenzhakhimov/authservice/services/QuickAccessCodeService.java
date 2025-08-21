package kz.kenzhakhimov.authservice.services;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;

@Service
public class QuickAccessCodeService {
    
    private static final String CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int CODE_LENGTH = 6;
    private static final SecureRandom RANDOM = new SecureRandom();
    
    // В реальном приложении это должно храниться в базе данных
    private final Set<String> usedCodes = new HashSet<>();
    
    /**
     * Генерирует уникальный код доступа
     */
    public String generateUniqueCode() {
        String code;
        do {
            code = generateCode();
        } while (usedCodes.contains(code));
        
        usedCodes.add(code);
        return code;
    }
    
    /**
     * Генерирует случайный код заданной длины
     */
    private String generateCode() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return code.toString();
    }
    
    /**
     * Проверяет, используется ли код
     */
    public boolean isCodeUsed(String code) {
        return usedCodes.contains(code);
    }
    
    /**
     * Освобождает код (удаляет из использованных)
     */
    public void releaseCode(String code) {
        usedCodes.remove(code);
    }
}
