package com.email.writer;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Service class responsible for generating AI-powered email replies using the
 * Gemini API.
 */
@Service
public class EmailGeneratorService {

	private final WebClient webClient;

	// API URL for the Gemini AI service, injected from application properties
	@Value("${gemini.api.url}")
	private String geminiApiUrl;

	// API key for authentication with the Gemini AI service
	@Value("${gemini.api.key}")
	private String geminiApiKey;

	/**
	 * Constructor to initialize WebClient for making API calls.
	 * 
	 * @param webClientBuilder WebClient builder used to create WebClient instances.
	 */
	public EmailGeneratorService(WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder.build();
	}

	/**
	 * Generates an AI-powered email reply based on the given email content and
	 * tone.
	 * 
	 * @param emailRequest Object containing email content and tone.
	 * @return The generated AI email reply as a String.
	 */
	public String generateEmailReply(EmailRequest emailRequest) {
		// Build the prompt to send to the AI model
		String prompt = buildPrompt(emailRequest);

		// Construct the request body for the API call
		Map<String, Object> requestBody = Map.of(
				"contents", new Object[] {
						Map.of("parts", new Object[] {
								Map.of("text", prompt)
						})
				});

		// Make a POST request to the Gemini API and retrieve the response
		String response = webClient.post()
				.uri(geminiApiUrl + "?key=" + geminiApiKey)
				.header("Content-Type", "application/json")
				.bodyValue(requestBody)
				.retrieve()
				.bodyToMono(String.class)
				.block(); // Blocking call to get the response synchronously

		// Extract and return the generated reply from the API response
		return extractResponseContent(response);
	}

	/**
	 * Extracts the generated email reply from the API response JSON.
	 * 
	 * @param response JSON response received from the Gemini API.
	 * @return Extracted email reply text.
	 */
	private String extractResponseContent(String response) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode rootNode = mapper.readTree(response);
			return rootNode.path("candidates")
					.get(0)
					.path("content")
					.path("parts")
					.get(0)
					.path("text")
					.asText();
		} catch (Exception e) {
			return "Error processing request: " + e.getMessage();
		}
	}

	/**
	 * Builds a structured prompt for the AI model based on the given email content
	 * and tone.
	 * 
	 * @param emailRequest Object containing email content and tone preference.
	 * @return Formatted prompt string to be sent to the AI model.
	 */
	private String buildPrompt(EmailRequest emailRequest) {
		StringBuilder prompt = new StringBuilder();
		prompt.append(
				"Generate a professional email reply for the following email content. Please do not generate the subject line. ");

		// Append tone preference if provided
		if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
			prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
		}

		prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());
		return prompt.toString();
	}
}
