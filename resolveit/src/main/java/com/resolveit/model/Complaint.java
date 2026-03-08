package com.resolveit.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "complaints")
public class Complaint {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String category;

@Column(length = 2000)
private String description;

private String urgency;

private String status = "NEW";

private boolean anonymous;

@ManyToOne
@JoinColumn(name = "user_id", nullable = true)
private User user;

private Long assignedStaffId;

@Column(length = 500)
private String attachment;

private LocalDateTime createdAt = LocalDateTime.now();

}