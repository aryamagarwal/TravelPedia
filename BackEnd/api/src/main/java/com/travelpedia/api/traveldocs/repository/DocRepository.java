package com.travelpedia.api.traveldocs.repository;

import com.travelpedia.api.traveldocs.model.DocModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocRepository extends JpaRepository<DocModel, Integer> {
    DocModel findByDocId(int docId);
//    List<DocModel> findAll();

}
