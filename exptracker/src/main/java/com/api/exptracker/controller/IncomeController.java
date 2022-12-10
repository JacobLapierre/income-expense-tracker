package com.api.exptracker.controller;

import com.api.exptracker.exception.UserNotFoundException;
import com.api.exptracker.model.Income;
import com.api.exptracker.repository.IncomeRepository;
import com.api.exptracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class IncomeController {

    //Repositories used by this class
    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
    private UserRepository userRepository;

    //Create new income assigned to a specific user with a user id
    @PostMapping("/inc/new/{id}")
    public Income newIncome(@PathVariable Long id, @RequestBody Income income){
        income.setUser(userRepository.findById(id).get());
        return incomeRepository.save(income);
    }

    //Get all incomes
    @GetMapping("/inc/all")
    List<Income> getAllIncomes(){
        return incomeRepository.findAll();
    }

    //Get all incomes with a specific foreign key
    @GetMapping("/inc/getAll/fk/{fk}")
    List<Income> getAllIncFK(@PathVariable Long fk) {
        return incomeRepository.findByUser_Id(fk);
    }

    //Get an income by income id
    @GetMapping("/inc/getById/{id}")
    Income getIncomeById(@PathVariable Long id){
        return incomeRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    //Update the values of an income by an income id
    @PutMapping("/inc/update/{id}")
    Income updateIncome(@RequestBody Income newIncome, @PathVariable Long id){
        return incomeRepository.findById(id)
                .map(income -> {
                    income.setName(newIncome.getName());
                    income.setAmount(newIncome.getAmount());
                    income.setType(newIncome.getType());
                    return incomeRepository.save(income);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    //Delete a specific income by an income id
    @DeleteMapping("/inc/delete/{id}")
    void deleteIncome(@PathVariable Long id) {
        incomeRepository.findById(id).get().setUser(null);
        incomeRepository.deleteById(id);
    }
}