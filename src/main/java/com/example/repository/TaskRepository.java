package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

	public List<Task> getByIsComplete(Boolean isComplete);

}
