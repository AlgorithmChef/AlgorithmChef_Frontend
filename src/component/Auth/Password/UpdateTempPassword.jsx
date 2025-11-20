import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import Form from "../../../UI/Form";
import Modal from "../../Layout/Modal";
import Input from "../../../UI/Input";
import Title from "../../../UI/Title";
import Button from "../../../UI/Button";

import { isPasswordValid, isEqualToOtherValue } from "../../../util/validation";

function UpdateTempPassword() {
    const navigate = useNavigate();

    async function updatePasswordAction(prevFormState, formData) {
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        
        const errors = {};

        if (!isPasswordValid(password)) {
            errors.password = "영문, 숫자, 특수문자를 포함해 8~20자로 입력해주세요.";
        }

        if (!isEqualToOtherValue(password, confirmPassword)) {
            errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        // --- 검증 통과 시 로직 ---
        // await api.updatePassword(password);
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
        navigate('/auth/login');

        return { errors: {} };
    }

    const [formState, formAction] = useActionState(updatePasswordAction, { errors: {} });

    return (
        <Modal>
            <Title>임시비밀번호 변경</Title>
            
            <Form action={formAction}>
                <Input 
                    type="password" 
                    label="새 비밀번호" 
                    name="password"
                    placeholder="새 비밀번호 입력"
                    error={formState.errors?.password}
                />
                
                <Input 
                    type="password" 
                    label="비밀번호 확인" 
                    name="confirmPassword"
                    placeholder="비밀번호 다시 입력"
                    error={formState.errors?.confirmPassword}
                />
                
                <div className="flex justify-center mt-6">
                    <Button cssClass="px-8 py-3 font-bold hover:bg-orange-100">
                        변경 완료
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default UpdateTempPassword;

