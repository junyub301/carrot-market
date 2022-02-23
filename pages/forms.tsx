import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
    username: string;
    password: string;
    email: string;
}

export default function Forms() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginForm>();
    const onValid = (data: LoginForm) => console.log(data);
    const onInvalid = (errors: FieldErrors) => console.log(errors);

    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <input
                type='text'
                placeholder='Username'
                {...register("username", {
                    required: "Username is required",
                    minLength: {
                        message: "The username should be longer than 5 chars.",
                        value: 5,
                    },
                })}
            />
            <input
                type='email'
                placeholder='Email'
                {...register("email", { required: "Email is required" })}
            />
            <input
                type='password'
                placeholder='Password'
                {...register("password", { required: "Password is required" })}
            />
            <input type='submit' value='Create Account' />
        </form>
    );
}
