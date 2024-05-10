package com.travelpedia.api.experiences.repository;

import com.travelpedia.api.experiences.model.ExperienceModel;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;
import java.util.List;

public interface ExperienceRepository extends JpaRepository<ExperienceModel, Long> {
    ExperienceModel findByTitle(String title);
    ExperienceModel findByRegion(String region);
    ExperienceModel findByExperienceId(Long id);
//    @Query(value = "SELECT e FROM ExperienceModel e ORDER BY e.amount ASC" , nativeQuery = true)
//    Iterable<ExperienceModel> findAllSortedByAmount();
    @Query(value = "SELECT e from ExperienceModel e WHERE e.region IN ?1 AND e.amount<=?2 AND e.days<=?3" )
    Page<ExperienceModel> findAllFiltered(List<String> regions, Integer amount, Integer days , Pageable pageable);
    @Query(value = "SELECT e from ExperienceModel e WHERE (lower(e.region) like lower(concat('%',?1,'%')))")
    List<ExperienceModel> searchExperiences(String region);
}
