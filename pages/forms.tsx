import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Forms() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onValid = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input
                type='text'
                placeholder='Username'
                {...register("username", { required: true, minLength: 5 })}
            />
            <input
                type='email'
                placeholder='Email'
                {...register("email", { required: true })}
            />
            <input
                type='password'
                placeholder='Password'
                {...register("password", { required: true })}
            />
            <input type='submit' value='Create Account' />
        </form>
    );
}
