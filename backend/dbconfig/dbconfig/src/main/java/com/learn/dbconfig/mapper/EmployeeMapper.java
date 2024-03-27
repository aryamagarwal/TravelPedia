package com.learn.dbconfig.mapper;

import com.learn.dbconfig.dto.EmplyoeeDto;
import com.learn.dbconfig.entity.employee;

public class EmployeeMapper {
public static EmplyoeeDto mapToDto (employee employee)
{
	return new EmplyoeeDto(
			employee.getId(),
			employee.getFirstName(),
			employee.getLastName(),
			employee.getEmail());
}
public static employee mapToEntity (EmplyoeeDto em)
{
	return new employee(
			em.getId(),
			em.getFirstName(),
			em.getLastName(),
			em.getEmail());
}
}
