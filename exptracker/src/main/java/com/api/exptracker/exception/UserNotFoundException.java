package com.api.exptracker.exception;

public class UserNotFoundException extends RuntimeException{
    //if user id not found, send message
    public UserNotFoundException(Long id){
        super("Could not find the values with the id: " + id);
    }
}

