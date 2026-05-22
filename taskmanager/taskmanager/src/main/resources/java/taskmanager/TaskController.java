package taskmanager;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private List<Task> tasks = new ArrayList<>();
    private int nextId = 1;

    @GetMapping
    public List<Task> getAllTasks() {
        return tasks;
    }

    @PostMapping
    public String addTask(@RequestBody Map<String, String> body) {
        String title = body.get("title");

        if (title == null || title.trim().isEmpty()) {
            return "Task title cannot be empty";
        }

        tasks.add(new Task(nextId++, title, false));
        return "Task added successfully";
    }

    @PutMapping("/{id}")
    public String updateTask(@PathVariable int id, @RequestBody Map<String, String> body) {
        String title = body.get("title");

        if (title == null || title.trim().isEmpty()) {
            return "Task title cannot be empty";
        }

        for (Task task : tasks) {
            if (task.getId() == id) {
                task.setTitle(title);
                return "Task updated successfully";
            }
        }

        return "Task not found";
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable int id) {
        Iterator<Task> iterator = tasks.iterator();

        while (iterator.hasNext()) {
            Task task = iterator.next();

            if (task.getId() == id) {
                iterator.remove();
                return "Task deleted successfully";
            }
        }

        return "Task not found";
    }

    @PatchMapping("/{id}/toggle")
    public String toggleTask(@PathVariable int id) {
        for (Task task : tasks) {
            if (task.getId() == id) {
                task.setCompleted(!task.isCompleted());
                return "Task status changed successfully";
            }
        }

        return "Task not found";
    }
}