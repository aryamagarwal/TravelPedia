package com.travelpedia.api.traveldocs.service;

import com.travelpedia.api.traveldocs.model.DocModel;

import java.util.List;

public interface DocService {
    DocModel createDoc(DocModel docModel);
    DocModel getDocById(int docId);
    List<DocModel> getAllDocs();
    void deleteDocById(int docId);
    void deleteAllDocs();
}
