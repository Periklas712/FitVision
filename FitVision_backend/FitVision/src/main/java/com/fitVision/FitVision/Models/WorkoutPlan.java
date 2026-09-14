package com.fitVision.FitVision.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

@Entity
@Table(name = "WorkoutPlans")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @NotEmpty
    @Column(length = 10000, columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    private int duration;
    private int daysPerWeek;

    // Rating fields
    private String comment;
    @Max(10)
    @Min(0)
    private int stars;
    private LocalDate ratedAt;

    public WorkoutPlan() {
    }

    public WorkoutPlan(String title, String description, User user, int duration, int daysPerWeek) {
        this.title = title;
        this.description = description;
        this.user = user;
        this.duration = duration;
        this.daysPerWeek = daysPerWeek;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public int getDuration() {
        return duration;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getDaysPerWeek() {
        return daysPerWeek;
    }
    public void setDaysPerWeek(int daysPerWeek) {
        this.daysPerWeek = daysPerWeek;
    }

    public @NotEmpty String getDescription() {
        return description;
    }
    public void setDescription(@NotEmpty String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public int getStars() { return stars; }
    public void setStars(int stars) { this.stars = stars; }

    public LocalDate getRatedAt() { return ratedAt; }
    public void setRatedAt(LocalDate ratedAt) { this.ratedAt = ratedAt; }
}
