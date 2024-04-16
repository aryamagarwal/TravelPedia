package com.travelpedia.api.DashboardPlanTrips.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.travelpedia.api.DashboardPlanTrips.Trips;
public interface TripsRepository extends JpaRepository<Trips,Integer>
{
	
	
}

