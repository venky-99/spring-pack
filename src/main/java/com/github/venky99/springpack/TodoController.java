package com.github.venky99.springpack;

import com.github.venky99.springpack.data.TodoItem;
import com.github.venky99.springpack.data.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class TodoController {

    Logger logger = LoggerFactory.getLogger(TodoController.class);

    @Autowired
    TodoRepository todoRepository;

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<TodoItem> getTodoItems() {
        return (List<TodoItem>) todoRepository.findAll();
    }

    @RequestMapping(value = "/put", method = RequestMethod.POST)
    public void saveTodoItems(@RequestBody List<TodoItem> todoItems) {

        todoRepository.deleteAll();

        for(TodoItem todoItem:todoItems) {
            todoRepository.save(todoItem);
        }
    }

}
