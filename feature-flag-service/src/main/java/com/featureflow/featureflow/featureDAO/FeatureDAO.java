package com.featureflow.featureflow.featureDAO;

import com.featureflow.featureflow.entity.FeatureFlag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeatureDAO extends JpaRepository<FeatureFlag, Long> {
    List<FeatureFlag> findAllByOwnerId(String ownerId);
}
