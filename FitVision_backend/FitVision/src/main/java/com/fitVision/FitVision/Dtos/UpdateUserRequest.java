package com.fitVision.FitVision.Dtos;

import com.fitVision.FitVision.Models.Enums.FitnessEquipment;
import com.fitVision.FitVision.Models.Enums.FitnessGoal;
import com.fitVision.FitVision.Models.Enums.FitnessLevel;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {

    @NotNull
    private Long id;
    private String username;
    @Email
    private String email;
    @Enumerated(EnumType.STRING)
    private FitnessLevel level;
    @Enumerated(EnumType.STRING)
    private FitnessGoal goal;
    @Enumerated(EnumType.STRING)
    private FitnessEquipment equipment;
}
