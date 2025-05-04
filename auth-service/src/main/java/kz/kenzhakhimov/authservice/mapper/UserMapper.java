package kz.kenzhakhimov.authservice.mapper;

import kz.kenzhakhimov.authservice.dto.RegisterDTO;
import kz.kenzhakhimov.authservice.dto.RegisterResponse;
import kz.kenzhakhimov.authservice.entitites.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterDTO dto);
    RegisterResponse toRegisterResponse(User user);
}
