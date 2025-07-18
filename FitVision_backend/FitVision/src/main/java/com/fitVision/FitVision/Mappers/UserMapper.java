package com.fitVision.FitVision.Mappers;
import com.fitVision.FitVision.Dtos.UserDto;
import com.fitVision.FitVision.Models.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "id", target = "id")
    UserDto map(User user);

    @InheritInverseConfiguration
    @Mapping(source = "id", target = "id")
    User map(UserDto userDto);
}
