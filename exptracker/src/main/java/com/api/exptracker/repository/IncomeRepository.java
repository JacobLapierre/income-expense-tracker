package com.api.exptracker.repository;

import com.api.exptracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//Income Repository using JpaRepository that extends Income class w/ long id
public interface IncomeRepository extends JpaRepository<Income, Long> {
    //method allows for incomes to be found by foreign key
    public List<Income> findByUser_Id(Long id);
}