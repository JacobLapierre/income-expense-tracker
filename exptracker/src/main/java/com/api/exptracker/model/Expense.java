package com.api.exptracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.persistence.*;


@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Expense {

    //Expense variables: id is auto generated, database using variables is also auto generated
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Long cost;
    private String type;

    //ManytoOne relationship with user class, creates user_id column for foreign key
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
