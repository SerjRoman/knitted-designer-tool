import { Button as MButton, type ButtonProps } from "@mui/material";

export function Button(props: ButtonProps) {
	return <MButton variant="contained" color="primary" {...props}></MButton>;
}
