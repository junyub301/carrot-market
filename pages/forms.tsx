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
        formState: { errors },
    } = useForm<LoginForm>({
        mode: "onChange",
    });
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
                {...register("email", {
                    required: "Email is required",
                    validate: {
                        notGmail: (value) =>
                            !value.includes("@gmail.com") ||
                            "Gmail is not allowed",
                    },
                })}
            />
            {errors.email?.message}

            <input
                type='password'
                placeholder='Password'
                {...register("password", { required: "Password is required" })}
            />
            <input type='submit' value='Create Account' />
        </form>
    );
}
