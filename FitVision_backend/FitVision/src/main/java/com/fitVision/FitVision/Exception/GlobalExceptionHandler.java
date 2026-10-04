package com.fitVision.FitVision.Exception;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(WorkoutNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleWorkoutNotFoundException(WorkoutNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailExistException.class)
    public ResponseEntity<ErrorResponse> handleEmailExistsException(EmailExistException ex) {
        ErrorResponse error = new ErrorResponse(ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(WorkoutGenerationException.class)
    public ResponseEntity<ErrorResponse> handleWorkoutGenerationException(WorkoutGenerationException ex) {
        log.error("Workout generation failed", ex);
        ErrorResponse error = new ErrorResponse("Failed to generate workout plans. Please try again later.", LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleGeneric(RuntimeException ex) {
        ErrorResponse error = new ErrorResponse("An unexpected error occurred", LocalDateTime.now());
        log.error("Error occurred: ", ex);
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
        String message = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .collect(Collectors.joining(", "));
        ErrorResponse errorResponse = new ErrorResponse(message, LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleNotValidArgument(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        ErrorResponse errorResponse = new ErrorResponse(message, LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ResponseEntity<ErrorResponse> handleMethodValidation(HandlerMethodValidationException ex) {
        String message = ex.getParameterValidationResults().stream()
                .flatMap(result -> result.getResolvableErrors().stream()
                        .map(error -> result.getMethodParameter().getParameterName() + ": " + error.getDefaultMessage()))
                .collect(Collectors.joining(", "));
        ErrorResponse errorResponse = new ErrorResponse(message, LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getName() + ": invalid value '" + ex.getValue() + "'", LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleUnreadableBody(HttpMessageNotReadableException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Malformed or invalid request body", LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    class ErrorResponse {
        private String message;
        private LocalDateTime time;

        public ErrorResponse(String message, LocalDateTime time) {
            this.message = message;
            this.time = time;
        }

        public String getMessage() {
            return this.message;
        }

        public LocalDateTime getTime() {
            return this.time;
        }
    }

}
