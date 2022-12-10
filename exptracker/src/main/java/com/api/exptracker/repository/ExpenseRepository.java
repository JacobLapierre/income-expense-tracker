package com.api.exptracker.repository;

import com.api.exptracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//Expense Repository using JpaRepository that extends Expense class w/ long id
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    //method allows for expenses to be found by foreign key
    public List<Expense> findByUser_Id(Long id);
}
