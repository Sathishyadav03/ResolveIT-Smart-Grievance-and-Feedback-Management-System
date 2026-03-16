package com.resolveit.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="comments")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Comment {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long commentId;

@Column(name="complaints_id")
private Long complaintsId;

private LocalDate date;

private String description;

@Column(name="status_type")
private String statusType;

@Column(name="user_id")
private Long userId;

}
