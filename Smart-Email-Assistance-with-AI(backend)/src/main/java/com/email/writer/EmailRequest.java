package com.email.writer;

import lombok.Data;

/**
 * Represents a request payload for generating an AI-powered email reply.
 * This class holds the email content and the preferred tone for the reply.
 */
@Data // Lombok annotation to generate boilerplate code like getters, setters, and
		// toString()
public class EmailRequest {

	private String emailContent; // The original email content that needs a reply
	private String tone; // The desired tone of the generated reply (e.g., professional, casual)

	/**
	 * Gets the email content.
	 * 
	 * @return The email content.
	 */
	public String getEmailContent() {
		return emailContent;
	}

	/**
	 * Sets the email content.
	 * 
	 * @param emailContent The email content to be set.
	 */
	public void setEmailContent(String emailContent) {
		this.emailContent = emailContent;
	}

	/**
	 * Gets the tone of the email reply.
	 * 
	 * @return The tone of the email.
	 */
	public String getTone() {
		return tone;
	}

	/**
	 * Sets the tone of the email reply.
	 * 
	 * @param tone The desired tone of the reply.
	 */
	public void setTone(String tone) {
		this.tone = tone;
	}

}
