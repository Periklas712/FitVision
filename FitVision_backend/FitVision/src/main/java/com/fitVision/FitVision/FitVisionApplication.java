package com.fitVision.FitVision;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class FitVisionApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitVisionApplication.class, args);
	}

}
