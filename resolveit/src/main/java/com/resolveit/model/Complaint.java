package com.resolveit.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Complaint {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

/* USER DETAILS */

private boolean anonymous;

@Column(name="user_id")
private Long userId;

/* COMPLAINT DETAILS */

private String category;

@Column(length = 2000)
private String description;

private String urgency;

/* STATUS */

@Column(name="status_type")
private String statusType;

/* STAFF ASSIGNMENT */

@Column(name="assigned_staff_id")
private Long assignedStaffId;

/* STAFF NAME (NOT STORED IN DB) */

@Transient
private String assignedStaffName;

/* FILE ATTACHMENT */

@Column(name="attachment")
private String attachment;

/* CREATED TIME */

@Column(name="created_at")
private LocalDateTime createdAt;

}