// Email regex: /\S+@\S+\.\S+/
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";

import { Flag } from "../../ui/Flag";

import { useCountry } from "../../hooks/useCountry";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../../customHooks/useRegister/useRegister";
import { toast } from "react-toastify";
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

function RegisterForm() {
  const [countries, setCountries] = useState([]);

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isRegistering, register: registerFunc } = useRegister();

  useEffect(() => {
    const FetchCountries = async () => {
      try {
        const data = await useCountry();
        setCountries(data.data);
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
      }
    };

    FetchCountries();
  }, []);

  const onSubmit = async (data) => {
    try {
      const { country } = data;
      const targetCountry = countries.find(
        (item) => item.name.common === country
      );
      const countryFlag = targetCountry
        ? targetCountry.flags.png || targetCountry.flags.svg
        : null;

      const retrivedData = {
        fullName: data.fullName,
        passWord: data.passWord,
        email: data.email,
        country: data.country,
        countryFlag,
      };

      // If success, reset all values in form
      const response = await registerFunc(retrivedData, {
        onSuccess: () => {
          reset();
        },
      });

      // Display toast
      if (response && +response.EC === 0) {
        toast.success(response.EM);
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Full name"
              name="name"
              autoFocus
              {...register("fullName", {
                required: "Full name field is required",
              })}
            />
            {errors?.fullName?.message && (
              <Typography variant="h6" color="error">
                {errors?.fullName?.message}
              </Typography>
            )}

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              {...register("email", {
                required: "Email field is required",
              })}
            />
            {errors?.email?.message && (
              <Typography variant="h6" color="error">
                {errors?.email?.message}
              </Typography>
            )}

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              {...register("passWord", {
                required: "Password field is required",
              })}
            />
            {errors?.passWord?.message && (
              <Typography variant="h6" color="error">
                {errors?.passWord?.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Confirm password"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password field is required",
                validate: (value) =>
                  value === getValues().passWord ||
                  "Confirm password is not correct",
              })}
            />
            {errors?.confirmPassword?.message && (
              <Typography variant="h6" color="error">
                {errors?.confirmPassword?.message}
              </Typography>
            )}
            <TextField
              margin="normal"
              fullWidth
              label="Country"
              name="country"
              select
              {...register("country", {
                required: "Country field is required",
              })}
            >
              {countries.map((country) => (
                <MenuItem key={country.name.common} value={country.name.common}>
                  <Grid container>
                    <Flag
                      src={country.flags.png || country.flasgs.svg}
                      alt={`Flag of ${country.name.common}`}
                      style={{ marginRight: "1rem" }}
                    />
                    <Typography style={{ display: "inline-block" }}>
                      {country.name.common}
                    </Typography>
                  </Grid>
                </MenuItem>
              ))}
            </TextField>
            {errors?.country?.message && (
              <Typography variant="h6" color="error">
                {errors?.country?.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isRegistering}
            >
              Submit
            </Button>
            <Grid container alignItems="center">
              <Grid>
                <NavLink to="/login" variant="body2">
                  Log in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default RegisterForm;
