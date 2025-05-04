package kz.kenzhakhimov.authservice.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTUtil {

    private String SECRET_KEY = "TaK+HaV^uvCHEFsEVfypW#7g9^k*Z8$V";  // Secret key для подписи JWT

    // Генерация секретного ключа для подписи
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Извлечение имени пользователя из токена
    public String extractUsername(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    // Извлечение времени истечения из токена
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    // Извлечение всех утверждений (claims) из токена
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Проверка, истек ли токен
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Генерация нового токена
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    // Создание токена с заявленными данными
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims) // Добавляем утверждения
                .setSubject(subject) // Устанавливаем subject (например, имя пользователя)
                .setIssuedAt(new Date()) // Время выпуска токена
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 50)) // Время истечения (например, 50 минут)
                .signWith(getSigningKey()) // Устанавливаем ключ для подписи
                .compact();
    }

    // Валидация токена (проверка на истечение)
    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }
}
