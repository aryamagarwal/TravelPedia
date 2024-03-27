package com.learn.dbconfig.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.dbconfig.entity.employee;

public interface EmployeeRepository extends JpaRepository<employee, Long>{

}
