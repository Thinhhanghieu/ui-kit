import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import userApi from "../../api/module/user.api";
import { API_STATUS } from "../../constants/general.constant";
import { IFormLogin } from "../../interface/form.interface";
import "./dashboard.scss";
import { Button, Input } from "antd";
import ButtonSecondary from "../../components/common/ButtonSecondary";
import DynamicForm, { FieldConfig } from "../../components/common/DynamicForm";
import * as yup from "yup";
import FormMui from "../../components/form-mui/FormMui";
import privateClient from "../../api/client/private.client";

const formFields: FieldConfig[] = [
	{
		name: "firstName",
		label: "First Name",
		type: "text",
		validation: yup.string().required("First Name is required"),
	},
	{
		name: "lastName",
		label: "Last Name",
		type: "text",
		validation: yup.string().required("Last Name is required"),
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		validation: yup.string().email("Invalid email").required("Email is required"),
	},
	{
		name: "age",
		label: "Age",
		type: "number",
		validation: yup
			.number()
			.positive("Age must be positive")
			.required("Age is required"),
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		validation: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
	},
	{
		name: "gender",
		label: "Gender",
		type: "select",
		options: [
			{ value: "male", label: "Male" },
			{ value: "female", label: "Female" },
			{ value: "other", label: "Other" },
		],
		validation: yup.string().required("Gender is required"),
	},
];
const Dashboard = () => {

	useEffect(() => {
		const fetchData = async () => {
			const response = await privateClient.get('/321312')
			// use response here
		}
		fetchData()
	}, [])
	
	const methods = useForm<IFormLogin>({
		defaultValues: {
			example: "",
			exampleRequired: "",
			email: "",
			password: "",
		},
	});
	const onSubmit = (data: IFormLogin) => alert(JSON.stringify(data));

	useEffect(() => {
		getListUser();
	}, []);

	const handleFormSubmit = (data: any) => {
		console.log(data);
	};
	const getListUser = async () => {
		try {
			const response = await userApi.getList({
				// To do push to state
				page: 1,
				pageSize: 10,
			});
			if (response.meta[0].code !== API_STATUS.SUCCESS) {
				// show err, or do st
				return;
			}
			// set state
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="dashboard">
			<div className="flex">
				<Button type="primary">
					<Link to={"/csv-reader"}>Import Csv</Link>
				</Button>
			</div>
			<h1 className="text-xl text-center mb-2">React Hook Form</h1>
			<FormProvider {...methods}>
				<form
					className="section container mx-auto"
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<div className="container mx-auto">
						<div className="flex flex-col w-1/3 gap-2 mx-auto">
							<input
								{...methods.register("example", { required: "Example is required" })}
								placeholder="Example"
							/>
							{methods.formState.errors.example && (
								<p className="text-danger">{methods.formState.errors.example.message}</p>
							)}
							<input
								{...methods.register("exampleRequired", { required: "This is required" })}
								placeholder="Example Required"
							/>
							{methods.formState.errors.exampleRequired && (
								<p className="text-danger">
									{methods.formState.errors.exampleRequired.message}
								</p>
							)}
							<input
								{...methods.register("email", {
									required: "Email is required",
									pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								})}
								placeholder="Email"
							/>
							{methods.formState.errors.email && (
								<p className="text-danger">{methods.formState.errors.email.message}</p>
							)}
							<input
								{...methods.register("password", {
									required: "Password is required",
									minLength: 8,
								})}
								type="password"
								placeholder="Password"
							/>
							{methods.formState.errors.password && (
								<p className="text-danger">{methods.formState.errors.password.message}</p>
							)}

							<Button htmlType="submit" type="primary">
								Submit
							</Button>

							<Input></Input>

							<ButtonSecondary> Btn secondary</ButtonSecondary>
							{/* <DynamicForm formFields={formFields} onSubmit={handleFormSubmit}></DynamicForm> */}
						</div>
					</div>
				</form>
				<FormMui></FormMui>
				{process.env.REACT_APP_API_URL}
			</FormProvider>
		</div>
	);
};

export default Dashboard;
