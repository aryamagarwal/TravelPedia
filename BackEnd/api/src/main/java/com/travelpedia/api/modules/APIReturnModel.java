package com.tool.erp.modules;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Vector;

// Following Getter and Setter annotations are from Lombok library
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class APIReturnModel {
    private String status = "fail";
    private String message = "Something went wrong";
    private Vector<?> data;
    private int count = 0;


}
