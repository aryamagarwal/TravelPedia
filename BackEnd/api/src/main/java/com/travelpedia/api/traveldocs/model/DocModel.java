package com.travelpedia.api.traveldocs.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Doc")
public class DocModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int docId;

//    @NotBlank(message = "Title can't be Null")
    private String title;

    private String body;

    private String image;

    private String author;

    private String Date;

    private String ReadTime;
}
