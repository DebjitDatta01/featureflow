package com.featureflow.featureflow.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FeatureFlag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private Boolean value;

    public FeatureFlag(String name){
        this.name = name;
        this.value = false;
    }

    public FeatureFlag(String name, Boolean value) {
        this.name = name;
        this.value = value;
    }
}
