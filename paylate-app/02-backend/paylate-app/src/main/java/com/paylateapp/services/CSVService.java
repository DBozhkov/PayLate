package com.paylateapp.services;

import com.paylateapp.Utils.CSVRunner;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CSVService {

    private final CSVRunner csvRunner;

    @Value("${csv.file.pathAli}")
    private String csvFilePathOne;

    @Value("${csv.file.pathOlx}")
    private String csvFilePathTwo;

    @Value("${csv.file.pathAmazon}")
    private String csvFilePathThree;

    public CSVService(CSVRunner csvRunner) {
        this.csvRunner = csvRunner;
    }

    public JSONArray getCsvDataAsJsonAli() {
        return csvRunner.readCsvToJson(csvFilePathOne);
    }

    public JSONArray getCsvDataAsJsonOlx() {
        return csvRunner.readCsvToJson(csvFilePathTwo);
    }

    public JSONArray getCsvDataAsJsonAmazon() {
        return csvRunner.readCsvToJson(csvFilePathThree);
    }
}
