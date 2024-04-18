package com.travelpedia.api.traveldocs.controller;

import com.travelpedia.api.setup.APIReturnModel;
import com.travelpedia.api.traveldocs.model.DocModel;
import com.travelpedia.api.traveldocs.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Vector;
@CrossOrigin(origins= "http://localhost:5173")
@RestController
@RequestMapping("/doc")
public class DocController {
    @Autowired
    private DocService docService;
    APIReturnModel apiReturnModel;
    private Vector<DocModel> docVec;

    @PostMapping("/")
    public ResponseEntity<?> createDoc(@RequestBody  DocModel docModel) {
        apiReturnModel = new APIReturnModel();
        docVec = new Vector<>();
        try {
            DocModel doc = this.docService.createDoc(docModel);
            docVec.add(doc);

            apiReturnModel.setStatus("success");
            apiReturnModel.setMessage("Doc Created Successfully");
            apiReturnModel.setData(docVec);
            apiReturnModel.setCount(docVec.size());
        } catch (Exception e) {
            apiReturnModel.setStatus("fail");
            apiReturnModel.setMessage(e.getMessage());
            apiReturnModel.setCount(0);

        }
        return ResponseEntity.ok(apiReturnModel);
    }

    // Bulk post using for loop from array of objects
    @PostMapping("/bulk")
    public ResponseEntity<?> createBulkDocs(@RequestBody List<DocModel> docModels) {
        apiReturnModel = new APIReturnModel();
        docVec = new Vector<>();
        try {
            for (DocModel docModel : docModels) {
                DocModel doc = this.docService.createDoc(docModel);
                docVec.add(doc);
            }

            apiReturnModel.setStatus("success");
            apiReturnModel.setMessage("Docs Created Successfully");
            apiReturnModel.setData(docVec);
            apiReturnModel.setCount(docVec.size());
        } catch (Exception e) {
            apiReturnModel.setStatus("fail");
            apiReturnModel.setMessage(e.getMessage());
            apiReturnModel.setCount(0);

        }
        return ResponseEntity.ok(apiReturnModel);
    }



    @GetMapping("/")
    public ResponseEntity<?> getAllDocs() {
        apiReturnModel = new APIReturnModel();
        try {
            List<DocModel> allDocs = this.docService.getAllDocs();
            docVec = new Vector<>(allDocs);

            apiReturnModel.setStatus("Success");
            apiReturnModel.setMessage("All docs retrieved");
            apiReturnModel.setCount(docVec.size());
            apiReturnModel.setData(docVec);
        } catch (Exception e) {
            apiReturnModel.setStatus("fail");
            apiReturnModel.setMessage("Something went Wrong !!");
            apiReturnModel.setCount(0);
        }
        return ResponseEntity.ok(apiReturnModel);
    }

    @GetMapping("/{docId}")
    public ResponseEntity<?> getDocById(@PathVariable int docId) {
        apiReturnModel = new APIReturnModel();
        docVec = new Vector<>();
        try {
            DocModel doc = this.docService.getDocById(docId);
            docVec.add(doc);

            apiReturnModel.setStatus("success");
            apiReturnModel.setMessage("Doc Retrieved Successfully");
            apiReturnModel.setData(docVec);
            apiReturnModel.setCount(docVec.size());
        } catch (Exception e) {
            apiReturnModel.setStatus("fail");
            apiReturnModel.setMessage(e.getMessage());
            apiReturnModel.setCount(0);

        }
        return ResponseEntity.ok(apiReturnModel);
    }

    @DeleteMapping("/{docId}")
    public ResponseEntity<?> deleteDocById(@PathVariable int docId) {
        apiReturnModel = new APIReturnModel();
        try {
            this.docService.deleteDocById(docId);
            apiReturnModel.setMessage("Doc deleted successfully.");
            return ResponseEntity.ok(apiReturnModel);
        } catch (Exception e) {
            apiReturnModel.setMessage(e.getMessage());
            return ResponseEntity.status(500).body(apiReturnModel);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteAllDocs() {
        apiReturnModel = new APIReturnModel();
        try {
            this.docService.deleteAllDocs();
            apiReturnModel.setMessage("All docs deleted successfully.");
            return ResponseEntity.ok(apiReturnModel);
        } catch (Exception e) {
            apiReturnModel.setMessage(e.getMessage());
            return ResponseEntity.status(500).body(apiReturnModel);
        }
    }



}
