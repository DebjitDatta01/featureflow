package com.featureflow.featureflow.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "feature_flags", indexes = @Index(columnList = "ownerId"))
public class FeatureFlag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Boolean value;

    @Column(nullable = false)
    private String ownerId; // Stores the UUID or Username from the User Service

    public FeatureFlag(String name, String ownerId){
        this.name = name;
        this.value = false;
        this.ownerId = ownerId;
    }

    public FeatureFlag(String name, Boolean value, String ownerId) {
        this.name = name;
        this.value = value;
        this.ownerId = ownerId;
    }
}
