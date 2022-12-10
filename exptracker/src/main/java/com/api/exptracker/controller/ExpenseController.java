package com.api.exptracker.controller;

import com.api.exptracker.exception.UserNotFoundException;
import com.api.exptracker.model.Expense;
import com.api.exptracker.repository.ExpenseRepository;
import com.api.exptracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ExpenseController {

    //Repositories used by this class
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    //Create new expense assigned to a specific user with a user id
    @PostMapping("/exp/new/{id}")
    public Expense newExpense(@PathVariable Long id, @RequestBody Expense expense){
        expense.setUser(userRepository.findById(id).get());
        return expenseRepository.save(expense);
    }

    //Get all expenses
    @GetMapping("/exp/all")
    List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    //Get all expenses with a specific foreign key
    @GetMapping("/exp/getAll/fk/{fk}")
    List<Expense> getAllExpFK(@PathVariable Long fk) {
        return expenseRepository.findByUser_Id(fk);
    }

    //Get a specific expense by expense id
    @GetMapping("/exp/getById/{id}")
    Expense getExpenseById(@PathVariable Long id){
        return expenseRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    //Update the values of an expense by an expense id
    @PutMapping("/exp/update/{id}")
    Expense updateExpense(@RequestBody Expense newExpense, @PathVariable Long id){
        return expenseRepository.findById(id)
                .map(expense -> {
                    expense.setName(newExpense.getName());
                    expense.setCost(newExpense.getCost());
                    expense.setType(newExpense.getType());
                    return expenseRepository.save(expense);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    //Delete a specific expense by an expense id
    @DeleteMapping("/exp/delete/{id}")
    void deleteExpense(@PathVariable Long id) {
        expenseRepository.findById(id).get().setUser(null);
        expenseRepository.deleteById(id);
    }
}
