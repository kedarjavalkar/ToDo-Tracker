package com.example.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.controller.dto.TaskDTO;
import com.example.entity.Task;
import com.example.repository.TaskRepository;
import com.example.utils.DateUtils;
import com.example.utils.JsonUtils;

@Controller
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@RequestMapping(value = "/task", method = RequestMethod.GET)
	public @ResponseBody List<Task> getByIsComplete(
			@RequestParam(value = "isComplete", required = true) boolean isComplete) {
		return taskRepository.getByIsComplete(isComplete);
	}

	@RequestMapping(value = "/task", method = RequestMethod.POST)
	public @ResponseBody String saveTask(@RequestBody @Valid TaskDTO taskDTO) {
		Task task = new Task();
		task.setNote(taskDTO.getNote());
		task.setPriority(taskDTO.getPriority());
		task.setDueDate(DateUtils.get().truncateTime(taskDTO.getDueDate()));
		task.setCreatedDate(new Date());
		task.setIsComplete(false);
		taskRepository.save(task);
		return JsonUtils.getMessage("Task created successfully");
	}

	@RequestMapping(value = "/task/{id}/complete", method = RequestMethod.POST)
	public @ResponseBody String markCompleted(@PathVariable Long id) {
		Task task = taskRepository.findOne(id);
		if (task != null) {
			task.setIsComplete(true);
			task.setCompletedDate(new Date());
			taskRepository.save(task);
			return JsonUtils.getMessage("Congratulation on task completion");
		} else {
			return JsonUtils.getMessage("Invalid task");
		}
	}

	@RequestMapping(value = "/task/{id}", method = RequestMethod.DELETE)
	public @ResponseBody String deleteTask(@PathVariable Long id) {
		Task task = taskRepository.findOne(id);
		if (task != null) {
			taskRepository.delete(task);
			return JsonUtils.getMessage("Task removed successfully");
		} else {
			return JsonUtils.getMessage("Invalid task");
		}
	}

}
