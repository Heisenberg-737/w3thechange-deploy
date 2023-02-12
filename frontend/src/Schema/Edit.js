import * as Yup from "yup";

const EditSchema = Yup.object().shape({
  email: Yup.string().required("Wallet address required"),
  userName: Yup.string().required("user name required"),
  desc: Yup.string()
});

export default EditSchema