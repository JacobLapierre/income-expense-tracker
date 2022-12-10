package com.api.exptracker.controller;

import com.api.exptracker.exception.UserNotFoundException;
import com.api.exptracker.model.User;
import com.api.exptracker.repository.ExpenseRepository;
import com.api.exptracker.repository.UserRepository;
import com.api.exptracker.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    //Repositories used by this class
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    //Create a new user
    @PostMapping("/user/new")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    //Get all users
    @GetMapping("/user/all")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //Get a specific user by user id
    @GetMapping("/user/getById/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    //Update the values of a user by a user id
    @PutMapping("/user/update/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id){
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setIncome(newUser.getIncome());
                    user.setSavings(newUser.getSavings());
                    user.setSavingGoal(newUser.getSavingGoal());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    //Delete a specific user by a user id
    @DeleteMapping("/user/delete/{id}")
    void deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).get();
        for(int i = user.getExpense().size()-1; i >= 0; i--){
            user.getExpense().get(i).setUser(null);
            expenseRepository.deleteById(user.getExpense().get(i).getId());
        }
//        for(int i = user.getIncome().size()-1; i >= 0; i--){
//            user.getIncome().get(i).setUser(null);
//            incomeRepository.deleteById(user.getIncome().get(i).getId());
//        }
        userRepository.deleteById(id);
    }
}
