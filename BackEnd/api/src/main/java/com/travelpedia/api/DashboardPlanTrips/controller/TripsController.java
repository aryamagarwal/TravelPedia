package com.travelpedia.api.DashboardPlanTrips.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.travelpedia.api.DashboardPlanTrips.Trips;
import com.travelpedia.api.DashboardPlanTrips.repository.TripsRepository;



@RestController

public class TripsController {
	@Autowired
	TripsRepository repo;
	@CrossOrigin(origins = "http://localhost:5173")
	
	@GetMapping("/trips")
	public List<Trips> getAllTrips(){
		List<Trips> trips=repo.findAll();
		return trips;
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("trips/{id}")
	public Trips getTrip(@PathVariable int id) {
		Trips trips=repo.findById(id).get();
		return trips;
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/trips/add")
	@ResponseStatus(code=HttpStatus.CREATED)
	public void createTrip(@RequestBody Trips trips) {
		repo.save(trips);
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("/trips/update")
	public void updateTrip(@RequestBody Trips trips) {
		repo.save(trips);
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@DeleteMapping("/trips/delete/{id}")
	public void deleteTrip(@PathVariable int id) {
		Trips trip=repo.findById(id).get();
		repo.delete(trip);
	}
	
	
	
	
	
	
	

}
