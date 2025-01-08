package com.paylateapp.controllers;

import com.paylateapp.services.OlxScraperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/scraper")
public class OlxScraperController {

    private final OlxScraperService olxScraperService;

    @Autowired
    public OlxScraperController(OlxScraperService olxScraperService) {
        this.olxScraperService = olxScraperService;
    }

    @GetMapping("/saveProducts")
    public ResponseEntity<String> scrapeAndSaveProducts() {
        olxScraperService.scrapeAndSaveToCsv();
        return ResponseEntity.ok("Products scraped and saved to CSV.");
    }
}
