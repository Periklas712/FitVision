package com.fitVision.FitVision.Exception;

public class EmailExistException extends RuntimeException {
    public EmailExistException(String email) {
        super("Email : " + email + " already exists");
    }
}
