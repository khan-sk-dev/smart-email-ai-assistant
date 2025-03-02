package com.email.writer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class for the Smart Email Assistant application.
 * This is the entry point for the Spring Boot application.
 */
@SpringBootApplication // Enables Spring Boot auto-configuration and component scanning
public class SmartEmailAssistantWithAiApplication {

	/**
	 * Main method that launches the Spring Boot application.
	 * 
	 * @param args Command-line arguments passed during application startup.
	 */
	public static void main(String[] args) {
		SpringApplication.run(SmartEmailAssistantWithAiApplication.class, args);
	}
}
