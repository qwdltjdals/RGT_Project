package com.book;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
                .allowedOrigins("http://localhost:3000", "http://qw2645.dothome.co.kr") // 허용할 Origin 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 설정
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // 자격 증명(쿠키, 인증 헤더 등) 허용
    }
}
