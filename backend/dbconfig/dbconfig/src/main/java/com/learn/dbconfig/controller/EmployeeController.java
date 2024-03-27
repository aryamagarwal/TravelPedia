package com.learn.dbconfig.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn.dbconfig.dto.EmplyoeeDto;
import com.learn.dbconfig.service.EmployeeService;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    @Autowired
	private EmployeeService es;
	
	//add request
	@PostMapping
	public ResponseEntity<EmplyoeeDto> createEmployee(@RequestBody EmplyoeeDto em)
	{
		EmplyoeeDto sd=es.createEmployee(em);
		return new ResponseEntity<>(sd , HttpStatus.CREATED);
	}
	
	//get request 
	@GetMapping("{id}")
	public ResponseEntity<EmplyoeeDto> getEmployeeById(@PathVariable("id") Long id)
	{
		EmplyoeeDto d=es.getEmployeeById(id);
		return ResponseEntity.ok(d);
	}
	@GetMapping
	public ResponseEntity<List<EmplyoeeDto>> getAllEmplloyee()
	{
		List<EmplyoeeDto> d=es.getAllEmployee();
		return ResponseEntity.ok(d);
	}
	@PutMapping("{id}")
	public ResponseEntity<EmplyoeeDto> updateEmployee(@PathVariable("id") Long id, @RequestBody EmplyoeeDto e ) {
		EmplyoeeDto ne=es.updateEmployee(id, e);
		return ResponseEntity.ok(ne);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id")Long id)
	{
		es.deleteEmployee(id);
		return ResponseEntity.ok("Deleted Successfully");
	}
}
