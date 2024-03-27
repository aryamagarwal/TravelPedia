package com.learn.dbconfig.service;

import java.util.List;

import com.learn.dbconfig.dto.EmplyoeeDto;

public interface EmployeeService {
EmplyoeeDto createEmployee(EmplyoeeDto em);
EmplyoeeDto getEmployeeById(Long id);
List<EmplyoeeDto> getAllEmployee();
EmplyoeeDto updateEmployee(Long id , EmplyoeeDto e);
void deleteEmployee(Long id);
}

