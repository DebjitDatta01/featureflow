package com.featureflow.featureflow.featureDTO;

import jakarta.validation.constraints.NotBlank;

public record FeatureFlagRequest (
        Long id,
        @NotBlank(message = "Flag name cannot be empty")
        String name,
        Boolean value,
        String ownerId)
{}
