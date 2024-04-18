package com.travelpedia.api.DashboardPlanTrips.service;
import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelpedia.api.DashboardPlanTrips.model.Trips;
import com.travelpedia.api.DashboardPlanTrips.repository.TripsRepository;



@Service
public class TripsServiceImpl implements TripsService{
	@Autowired
	 TripsRepository er;
	   
	    @Override
	    public Trips updateTrip(Long id, Trips trip) {
	    	 java.util.Optional<Trips> optionalOldTrip = er.findById(id);
	    	if (optionalOldTrip.isPresent()) {
	            Trips old = optionalOldTrip.get();
	            old.setBud(trip.getBud());
	            old.setDest(trip.getDest());
	            old.setDays(trip.getDays());
	            old.setUser(trip.getUser());
	            return er.save(old);
	        }
	        return null;
	    }
}

	
