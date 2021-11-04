import { useState } from "react";
import { TwoPartBox, CenterBox } from "../common/layout";
import { Button, Typography } from "@mui/material";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { getSecurityQuestion, verifyForgetPass } from "../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormRecord } from "../common/inputField";
import { useForm } from "react-hook-form";
import { NavJustLogo } from "../common/nav";

const Forget = () => {
    const [question, setQuestion] = useState(null);
    const [userId, setUserId] = useState("");

    return (
        <TwoPartBox>
            <NavJustLogo/>
            {question ? (
                <VerifyAns
                    question={question}
                    setQuestion={setQuestion}
                    userId={userId}
                />
            ) : (
                <CheckId setQuestion={setQuestion} setUserId={setUserId} />
            )}
        </TwoPartBox>
    );
};

const CheckId = ({ setQuestion, setUserId }) => {
    const Schema = yup.object().shape({
        UserID: yup
            .string()
            .ensure()
            .required("userId is required")
            .min(8, "userId must at least 8 characters")
            .max(16, "userId must not exceed 16 characters"),
    });
    let history = useHistory();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            UserID: "",
        },
    });

    const onSubmit = (data) => {
        getSecurityQuestion(data).then((res) => {
            if (res.msg) {
                setUserId(data.UserID);
                setQuestion(res.securityQuestion);
            } else {
                alert(res);
            }
        });
    };

    return (
        <CenterBox>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Check UserID
            </Typography>
            <FormRecord control={control} name="UserID" viewOnly={false} />
            <Button variant="contained" onClick={() => history.goBack()}>
                cancel
            </Button>
            <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ float: "right" }}
            >
                next
            </Button>
        </CenterBox>
    );
};

const VerifyAns = ({ setQuestion, question, userId }) => {
    const Schema = yup.object().shape({
        UserID: yup
            .string()
            .ensure()
            .required("userId is required")
            .min(8, "userId must at least 8 characters")
            .max(16, "userId must not exceed 16 characters"),
        Answer: yup
            .string()
            .ensure()
            .required("answer is required")
            .max(40, "answer must not exceed 40 characters"),
        NewPassword: yup
            .string()
            .ensure()
            .required("password is required")
            .min(8, "password must at least 8 characters")
            .max(16, "password must not exceed 16 characters"),
        ConfirmPassword: yup
            .string()
            .test(
                "passwords-match",
                "confirm password must match password",
                function (value) {
                    return this.parent.NewPassword === value;
                }
            ),
    });
    let history = useHistory();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {
            Question: question,
            UserID: userId,
            Answer: "",
            NewPassword: "",
            ConfirmPassword: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);

        verifyForgetPass(data).then((res) => {
            alert(res);
            history.push("/user/login");
        });
    };

    return (
        <CenterBox>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                Change password
            </Typography>
            <FormRecord control={control} name="Question" viewOnly={true} />
            <FormRecord control={control} name="Answer" viewOnly={false} />
            <FormRecord control={control} name="NewPassword" viewOnly={false} />
            <FormRecord
                control={control}
                name="ConfirmPassword"
                viewOnly={false}
                labelWidth="280px"
            />
            <Button variant="contained" onClick={() => setQuestion(null)}>
                cancel
            </Button>
            <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ float: "right" }}
            >
                confirm
            </Button>
        </CenterBox>
    );
};

export default Forget;
