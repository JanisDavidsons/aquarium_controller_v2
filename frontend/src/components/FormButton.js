import { Button, styled } from "@mui/material"

const FormButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  '&:last-child': {
    marginRight: 0,
  },
  '&:first-child': {
    marginLeft: 0,
  }
}));

export default FormButton;
