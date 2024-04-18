package com.travelpedia.api.DashboardPlanTrips.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Trips")
public class Trips {
	@Column
	private String dest;
	@Column
	private String user;
	@Column
	private int bud;
	@Column
	private String days;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	
	public Trips(String dest, String user, int bud, String days, int id) {
		super();
		this.dest = dest;
		this.user = user;
		this.bud = bud;
		this.days = days;
		this.id = id;
	}
	
	public Trips(String dest, String user, int bud, String days) {
		super();
		this.dest = dest;
		this.user = user;
		this.bud = bud;
		this.days = days;
	}
	
	

	public Trips() {
		super();
	}

	public String getDest() {
		return dest;
	}
	public void setDest(String dest) {
		this.dest = dest;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public int getBud() {
		return bud;
	}
	public void setBud(int bud) {
		this.bud = bud;
	}
	public String getDays() {
		return days;
	}
	public void setDays(String days) {
		this.days = days;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return "Trips [dest=" + dest + ", user=" + user + ", bud=" + bud + ", days=" + days + ", id=" + id + "]";
	}
	
	
	
	
	
	

}
