package com.email_writer.app;

public class EmailRequest {
private String emailContent;
private String tone;
@Override
public String toString() {
	return "EmailRequest [emailContent=" + emailContent + ", tone=" + tone + "]";
}
public String getEmailContent() {
	return emailContent;
}
public void setEmailContent(String emailContent) {
	this.emailContent = emailContent;
}
public String getTone() {
	return tone;
}
public void setTone(String tone) {
	this.tone = tone;
}
}
