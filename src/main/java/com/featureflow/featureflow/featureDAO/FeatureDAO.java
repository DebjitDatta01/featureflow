package com.featureflow.featureflow.featureDAO;

import com.featureflow.featureflow.entity.FeatureFlag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureDAO extends JpaRepository<FeatureFlag, Long> {}
