package com.fitVision.FitVision.Controllers;

import com.fitVision.FitVision.Models.Enums.EnumResponse;
import com.fitVision.FitVision.Models.Enums.FitnessEquipment;
import com.fitVision.FitVision.Models.Enums.FitnessGoal;
import com.fitVision.FitVision.Models.Enums.FitnessLevel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController("/api/enums")
public class EnumController {

    @GetMapping("/getAllEnums")
    public EnumResponse getAllEnums(){
        return new EnumResponse(Arrays.asList(FitnessEquipment.values()),Arrays.asList(FitnessGoal.values()),Arrays.asList(FitnessLevel.values()));
    }
}
