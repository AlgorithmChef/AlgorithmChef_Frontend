import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import CloseButton from "../../UI/CloseButton";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import TextButton from "../../UI/TextButton";
import { 
    isEmail, 
    isNotEmpty, 
    hasMinLength, 
    isEqualToOtherValue,
    isIdValid,
    isPasswordValid 
} from "../../util/validation";
import Modal from "../Layout/Modal";
import Title from "../../UI/Title";
import Form from "../../UI/Form";

function SignUp() {
    const navigate = useNavigate();

    function closeHandler() {
        navigate("/auth/login");
    }

    async function signUpAction(prevFormState, formData) {
        const id = formData.get("id");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const email = formData.get("email");
        const gender = formData.get("gender");
        const birthDate = formData.get("birthDate");
        
        const errors = {};
        
        if (!isEmail(email) || !isNotEmpty(email)) {
            errors.email = "올바르지 않은 이메일 형식입니다.";
        }

        if (!isIdValid(id) || !hasMinLength(id, 4)) {
            errors.id = "아이디는 4자 이상 영문/숫자 조합이어야 합니다.";
        }

        if (!isNotEmpty(gender)) {
            errors.gender = "성별을 입력하세요.";
        }
        if (!isNotEmpty(birthDate)) {
            errors.birthDate = "생년월일을 입력하세요.";
        }

        if (!isPasswordValid(password)) {
            errors.password = "영문/숫자/특수문자 포함 8~20자여야 합니다.";
        }

        if (!isEqualToOtherValue(password, confirmPassword)) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }

        if (Object.keys(errors).length > 0) {
            return { errors }; 
        }

        // 에러가 없으면 성공 처리 (여기서 API 호출 등 수행)
        // 예: await signupApi(...)
        alert("회원가입 성공!");
        navigate("/auth/login");
        return { errors: {} };
    }

    const [formState, formAction] = useActionState(signUpAction, { errors: {} });

    return (
        <Modal onClick={closeHandler}>
            <CloseButton onClick={closeHandler} />
            <Title>회원가입</Title>
            <Form action={formAction}>
                <div className="flex flex-row items-end gap-3">
                    <div className="flex-1">
                        <Input 
                            label="ID" 
                            type="text" 
                            placeholder="아이디 입력" 
                            name="id" 
                            error={formState.errors?.id} 
                        />
                    </div>
                    <Button cssClass="w-24 py-3 h-fit whitespace-nowrap text-sm hover:bg-orange-100 mb-[2px]">
                        중복확인
                    </Button>
                </div>
                <Input 
                    label="PASSWORD" 
                    type="password" 
                    name="password" 
                    error={formState.errors?.password} 
                />
                <Input 
                    label="PASSWORD CONFIRM" 
                    type="password" 
                    name="confirmPassword" 
                    error={formState.errors?.confirmPassword} 
                />
                <Input 
                    label="EMAIL" 
                    type="email" 
                    name="email" 
                    error={formState.errors?.email} 
                />
                <div className="flex flex-row items-start gap-3">
                    <div className="flex-1">
                            <Input 
                            label="GENDER" 
                            type="text" 
                            name="gender" 
                            error={formState.errors?.gender} 
                            />
                    </div>
                    <div className="flex-1">
                        <Input 
                            label="BIRTH DATE" 
                            type="date" 
                            name="birthDate" 
                            error={formState.errors?.birthDate} 
                        />
                    </div>
                </div>
                <Button cssClass="w-full py-3 mt-4 bg-orange-500 text-white font-bold hover:bg-orange-600">
                    가입하기
                </Button>
                <TextButton to="/auth/login" className="text-center w-full block mt-2">
                    이미 계정이 있으신가요? 로그인하기
                </TextButton>
            </Form>
        </Modal>

    )
}

export default SignUp;