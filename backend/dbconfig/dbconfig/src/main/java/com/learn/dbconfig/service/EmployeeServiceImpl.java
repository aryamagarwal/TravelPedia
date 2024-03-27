package com.learn.dbconfig.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn.dbconfig.dto.EmplyoeeDto;
import com.learn.dbconfig.entity.employee;
import com.learn.dbconfig.exception.ResourceNotFoundException;
import com.learn.dbconfig.mapper.EmployeeMapper;
import com.learn.dbconfig.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
	private EmployeeRepository er;
	
	@Override
	public EmplyoeeDto createEmployee(EmplyoeeDto em) {
		employee data=EmployeeMapper.mapToEntity(em);
		employee sdata = er.save(data);
		return EmployeeMapper.mapToDto(sdata);
	}

	@Override
	public EmplyoeeDto getEmployeeById(Long id) {
		employee data=er.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("id not found: " + id));
		return EmployeeMapper.mapToDto(data);
	}

	@Override
	public List<EmplyoeeDto> getAllEmployee() {
		List<employee> le= er.findAll();
		return le.stream().map((em)->EmployeeMapper.mapToDto(em)).collect(Collectors.toList());
				}

	@Override
	public EmplyoeeDto updateEmployee(Long id, EmplyoeeDto e) {
		employee d=er.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("id not found: " + id));
		d.setFirstName(e.getFirstName());
		d.setLastName(e.getLastName());
		d.setEmail(e.getEmail());
		d = er.save(d);
		return EmployeeMapper.mapToDto(d);
	}
	public void deleteEmployee(Long id)
	{
		employee e=er.findById(id).orElseThrow(()-> new ResourceNotFoundException("id not found"+id));
		er.delete(e);
		
	}

}
