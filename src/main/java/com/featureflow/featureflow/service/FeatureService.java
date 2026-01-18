package com.featureflow.featureflow.service;


import com.featureflow.featureflow.entity.FeatureFlag;
import com.featureflow.featureflow.featureDAO.FeatureDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeatureService {

    private final FeatureDAO featureDAO;

    public Boolean getFeatureFlagValue(Long id){
        return featureDAO.findById(id).get().getValue();
    }
    public List<FeatureFlag> getAllFeatureFlags(){
        return featureDAO.findAll();
    }

    public void deleteFeatureFlag(Long id){
        featureDAO.deleteById(id);
    }

    public void createFeatureFlag(String name){
        FeatureFlag featureFlag = new FeatureFlag(name);
        featureDAO.save(featureFlag);
    }

    public Optional<FeatureFlag> getFeatureFlag(Long id){
        return featureDAO.findById(id);
    }

    public void updateFeatureFlag(Long id, String name, Boolean value){
        Optional<FeatureFlag> featureFlagOptional = getFeatureFlag(id);
        if(!featureFlagOptional.isEmpty()){
            FeatureFlag featureFlag = featureFlagOptional.get();
            featureFlag.setName(name);
            featureFlag.setValue(value);
            featureDAO.save(featureFlag);
        }
    }


}
