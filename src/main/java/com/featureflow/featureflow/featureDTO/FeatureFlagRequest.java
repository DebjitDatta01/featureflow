package com.featureflow.featureflow.featureDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FeatureFlagRequest (
        @NotNull(message = "Id is required")
        Long id,
        @NotBlank(message = "Flag name cannot be empty")
        String name,
        Boolean value)
{}
