package com.featureflow.featureflow.featureController;

import com.featureflow.featureflow.entity.FeatureFlag;
import com.featureflow.featureflow.featureDTO.FeatureFlagRequest;
import com.featureflow.featureflow.service.FeatureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feature-flags")
@RequiredArgsConstructor
public class FeatureSwitchController {

    private final FeatureService featureService;

    @GetMapping("/{id}/value")
    public ResponseEntity<Boolean> getFeatureFlagValue(@PathVariable Long id){
        return ResponseEntity.ok(featureService.getFeatureFlagValue(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureFlag> getFeatureFlagById(@PathVariable Long id){
        return ResponseEntity.ok(featureService.getFeatureFlag(id));
    }

    @GetMapping
    public ResponseEntity<List<FeatureFlag>> getAllFeatureFlags(){
        return ResponseEntity.ok(featureService.getAllFeatureFlags());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteFeatureFlag(@PathVariable Long id){
        FeatureFlag flag = featureService.getFeatureFlag(id);
        featureService.deleteFeatureFlag(id);
        return ResponseEntity.ok(Map.of(
            "message", "Feature flag deleted successfully",
            "id", flag.getId(),
            "name", flag.getName()
        ));
    }

    @PostMapping
    public ResponseEntity<Void> createFeatureFlag(@Valid @RequestBody FeatureFlagRequest request){
        featureService.createFeatureFlag(request.name(), request.value());
        return ResponseEntity.status(201).build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateFeatureFlag(@PathVariable Long id, @Valid @RequestBody FeatureFlagRequest request){
        if (request.id() != null && !request.id().equals(id)) {
            throw new IllegalArgumentException("ID in path (" + id + ") does not match ID in body (" + request.id() + "). ID cannot be changed.");
        }
        featureService.updateFeatureFlag(id, request.name(), request.value());
        return ResponseEntity.ok().build();
    }
}
