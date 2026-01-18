package com.featureflow.featureflow.featureController;

import com.featureflow.featureflow.entity.FeatureFlag;
import com.featureflow.featureflow.featureDTO.FeatureFlagRequest;
import com.featureflow.featureflow.service.FeatureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/featureflow")
@RequiredArgsConstructor
public class FeatureSwitchController {

    private final FeatureService featureService;

    @GetMapping("/myFlagValue")
    public Boolean getFeatureFlagValue(@RequestParam("id") Long id){
        return featureService.getFeatureFlagValue(id);
    }

    @GetMapping("/myFlag/{id}")
    public ResponseEntity<FeatureFlag> getFeatureFlagById(@PathVariable Long id){
        return  ResponseEntity.ok(featureService.getFeatureFlag(id).get());
    }

    @GetMapping("/myAllFlags")
    public ResponseEntity<List<FeatureFlag>> getAllFeatureFlags(){
        return ResponseEntity.ok(featureService.getAllFeatureFlags());
    }

    @DeleteMapping("/deleteMyFlag/{id}")
    public void deleteFeatureFlag(@PathVariable Long id){
        featureService.deleteFeatureFlag(id);
    }

    @PostMapping("/createFlag")
    public void createFeatureFlag(@RequestParam("name") String name){
        featureService.createFeatureFlag(name);
    }
    @PutMapping("/editMyFlag")
    public void updateFeatureFlag(@Valid @RequestBody FeatureFlagRequest featureFlagRequest){
        featureService.updateFeatureFlag(featureFlagRequest.id(), featureFlagRequest.name(), featureFlagRequest.value());
    }
}
