package com.featureflow.featureflow.service;

import com.featureflow.featureflow.entity.FeatureFlag;
import com.featureflow.featureflow.exception.ResourceNotFoundException;
import com.featureflow.featureflow.featureDAO.FeatureDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeatureService {

    private final FeatureDAO featureDAO;

    public Boolean getFeatureFlagValue(Long id){
        FeatureFlag featureFlag = featureDAO.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feature Flag not found with id: " + id));
        return featureFlag.getValue();
    }

    public List<FeatureFlag> getAllFeatureFlags(){
        return featureDAO.findAll();
    }

    public void deleteFeatureFlag(Long id){
        if (!featureDAO.existsById(id)) {
            throw new ResourceNotFoundException("Feature Flag not found with id: " + id);
        }
        featureDAO.deleteById(id);
    }

    public void createFeatureFlag(String name){
        FeatureFlag featureFlag = new FeatureFlag(name);
        featureDAO.save(featureFlag);
    }

    public void createFeatureFlag(String name, Boolean value){
        FeatureFlag featureFlag = new FeatureFlag(name, value != null ? value : false);
        featureDAO.save(featureFlag);
    }

    public FeatureFlag getFeatureFlag(Long id){
        return featureDAO.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feature Flag not found with id: " + id));
    }

    @Transactional
    public void updateFeatureFlag(Long id, String name, Boolean value){
        FeatureFlag featureFlag = featureDAO.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Feature Flag not found with id: " + id));
        
        featureFlag.setName(name);
        featureFlag.setValue(value);
        featureDAO.save(featureFlag);
    }
}
