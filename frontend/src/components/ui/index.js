import React, { useState } from "react";

export const TopBar = props => {
	return (
		<div className="sticky-top">
			<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
				<span>{props.title}</span>
				<span>{props.funcGroup}</span>
			</div>
		</div>
	);
};

export const Select = props => {
	const [opened, setOpened] = useState(false);

	return (
		<div>
			<div
				className="text-white bg-primary c-select"
				style={{ cursor: "pointer" }}
				onClick={() => setOpened(!opened)}
			>
				Select a service
			</div>
			<div className={`drop position-absolute ${opened ? "" : "d-none"}`}>
				<input
					type="text"
					onChange={e => props.setQuery(e.target.value)}
				/>
				{props.elements.map((elem, i) => (
					<div
						onClick={() => {
							props.onSelect(elem);
							setOpened(false);
						}}
						key={i}
					>
						{elem.name}
					</div>
				))}
			</div>
		</div>
	);
};

export const Autocomplete = ({
	className,
	inputClass,
	onChange,
	results,
	placeholder,
	value,
	id
}) => {
	const [opened, setopened] = useState(false);

	return (
		<div className={className}>
			<input
				onClick={() => setopened(!opened)}
				className={`form-control ${inputClass}`}
				type="text"
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
			<div className={`autocomplete ${opened ? "" : "d-none"}`}>
				{results.map((res, i) => (
					<div
						onClick={() => {
							onChange(res);
							setopened(false);
						}}
						key={i}
					>
						{res}
					</div>
				))}
			</div>
		</div>
	);
};

export const CheckboxSwitch = ({
	active,
	onSwitchChange,
	switchProps,
	checkboxProps,
	onCheckboxChange
}) => {
	return (
		<div className="custom-control custom-radio mr-4 custom-control-inline">
			<Checkbox
				onChange={e => onCheckboxChange(e)}
				active={active}
				props={checkboxProps}
			/>

			<Switch
				left={switchProps.left}
				right={switchProps.right}
				onChange={v => onSwitchChange(v)}
				disabled={!active}
				className={switchProps.className}
				id={switchProps.id}
			/>
		</div>
	);
};

export const Checkbox = ({ props, active, onChange }) => {
	return (
		<span>
			<input
				type="radio"
				id={props.id}
				onChange={e => onChange(e)}
				checked={active}
				name={props.name}
				className="custom-control-input"
			/>
			<label className="custom-control-label" htmlFor={props.id}>
				{props.value}
			</label>
		</span>
	);
};

export const Switch = ({
	left,
	leftValue,
	right,
	rightValue,
	className,
	onChange,
	id,
	disabled
}) => (
	<div className={`d-flex ${disabled ? "disabled" : ""} ${className}`}>
		{left}
		<div
			className="custom-control custom-switch"
			style={{ marginLeft: "0.3rem" }}
		>
			<input
				onChange={e =>
					!e.target.checked
						? onChange(leftValue || left)
						: onChange(rightValue || right)
				}
				disabled={disabled}
				type="checkbox"
				className="custom-control-input"
				id={id}
			/>
			<label className="custom-control-label" htmlFor={id}>
				{right}
			</label>
		</div>
	</div>
);

export const Radio = ({ props }) => {
	return (
		<div className="custom-control custom-radio custom-control-inline">
			<input
				type="radio"
				id={props.id}
				checked={props.checked}
				name={props.name}
				value={props.value}
				onChange={e => props.onChange(e)}
				className="custom-control-input"
			/>
			<label className="custom-control-label" htmlFor={props.id}>
				{props.value}
			</label>
		</div>
	);
};
