import { Box, TextField, Typography } from "@mui/material";
import React, { FC, SyntheticEvent } from "react";

interface IMemoizedInput {
  label: string;
  name: string;
  type: string;
  required: boolean;
  helperText: string;
  touched: boolean | undefined;
  error: string | undefined;
  value: string | number | undefined;
  onChange: (e: SyntheticEvent) => void;
  onBlur: (e: SyntheticEvent) => void;
}

export const MemoizedInput: FC<IMemoizedInput> = React.memo(
  ({
    label,
    name,
    type,
    required,
    helperText,
    touched,
    error,
    value,
    onChange,
    onBlur,
  }) => {
    return (
      <Box key={name} minWidth={500}>
        <TextField
          label={label}
          name={name}
          type={type}
          required={required}
          helperText={touched && Boolean(error) ? "" : helperText}
          error={touched && Boolean(error)}
          fullWidth
          margin="normal"
          variant="standard"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {touched && Boolean(error) ? (
          <Typography component="span" variant="body2" color="error">
            {error}
          </Typography>
        ) : null}
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.error === nextProps.error &&
      prevProps.touched === nextProps.touched
    );
  }
);
