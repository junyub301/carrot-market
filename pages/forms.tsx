import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Forms() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                placeholder='Username'
                {...register("username", { required: true })}
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
