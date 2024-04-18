package com.travelpedia.api.traveldocs.service;

import com.travelpedia.api.traveldocs.model.DocModel;
import com.travelpedia.api.traveldocs.repository.DocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocServiceImpl implements DocService {
    @Autowired
    private DocRepository docRepo;

    public DocModel createDoc(DocModel docModel) {
        return this.docRepo.save(docModel);
    }

    public DocModel getDocById(int docId) {
        return this.docRepo.findByDocId(docId);
    }

    public List<DocModel> getAllDocs() {
        return this.docRepo.findAll();
    }

    public void deleteDocById(int docId) {
        docRepo.deleteById(docId);
    }

    public void deleteAllDocs() {
        docRepo.deleteAll();
    }
}
