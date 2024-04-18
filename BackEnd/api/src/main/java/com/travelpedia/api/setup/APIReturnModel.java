package com.travelpedia.api.setup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Vector;

@Getter
@Setter
@NoArgsConstructor // Lombok will generate a constructor with no arguments
@AllArgsConstructor // Lombok will generate a constructor with all properties in the class
public class APIReturnModel {
    private String status = "fail";
    private String message = "Something Went Wrong !!";
    private Vector<?> data; // "?" means any type of data
    private int count = 0; // count of data
}
