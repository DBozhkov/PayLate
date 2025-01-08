package com.paylateapp.controllers;

import com.paylateapp.services.CSVService;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/csv")
public class CSVController {

    private final CSVService csvService;

    @Autowired
    public CSVController(CSVService csvService) {
        this.csvService = csvService;
    }

    @GetMapping("/aliProducts")
    public String getCsvDataAli() {
        JSONArray jsonData = csvService.getCsvDataAsJsonAli();
        return jsonData.toString(2);
    }

    @GetMapping("/olxProducts")
    public String getCsvDataOlx() {
        JSONArray jsonData = csvService.getCsvDataAsJsonOlx();
        return jsonData.toString(2);
    }

    @GetMapping("/amazonProducts")
    public String getCsvDataAmazon() {
        JSONArray jsonData = csvService.getCsvDataAsJsonAmazon();
        return jsonData.toString(2);
    }
}
