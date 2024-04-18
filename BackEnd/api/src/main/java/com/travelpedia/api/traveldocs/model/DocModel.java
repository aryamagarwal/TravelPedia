package com.travelpedia.api.traveldocs.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Doc2")
public class DocModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int docId;

   private String title;

    private String body;

    private String image;

    private String author;

    private String Date;

    private String ReadTime;
}
