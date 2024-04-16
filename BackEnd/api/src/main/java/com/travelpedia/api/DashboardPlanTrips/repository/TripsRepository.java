package com.travelpedia.api.DashboardPlanTrips.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelpedia.api.DashboardPlanTrips.model.Trips;
public interface TripsRepository extends JpaRepository<Trips,Integer>
{

//	Trips findById(Long id);


//
	Optional<Trips> findById(Long id);

//	Trips updateTrip(Long id, Trips trips);
	
	
}

