import { useNavigate } from "react-router-dom";
import { useActionState } from "react"; // 1. 훅 추가
import Modal from "../../Layout/Modal";
import CloseButton from "../../../UI/CloseButton";
import Title from "../../../UI/Title";
import Form from "../../../UI/Form";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";

import { isNotEmpty, isIdValid } from "../../../util/validation";

function FindPassword() {
    const navigate = useNavigate();

    function closeHandler() {
        navigate('/auth/login');
    }

    async function findPasswordAction(prevFormState, formData) {
        const id = formData.get("id");
        const errors = {};

        if (!isNotEmpty(id)) {
            errors.id = "아이디를 입력해주세요.";
        } else if (!isIdValid(id)) {
            errors.id = "아이디 형식이 올바르지 않습니다.";
        }

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        alert("입력하신 아이디로 임시 비밀번호를 발송했습니다.");
        navigate('/auth/login');
        
        return { errors: {} };
    }

    const [formState, formAction] = useActionState(findPasswordAction, { errors: {} });

    return (
        <Modal onClick={closeHandler}>
            <CloseButton onClick={closeHandler} />
            <Title>비밀번호 찾기</Title>
            
            <Form action={formAction}>
                <Input 
                    label="아이디" 
                    type="text" 
                    name="id" 
                    placeholder="아이디를 입력하세요"
                    error={formState.errors?.id} 
                />
                
                <div className="flex justify-center mt-6">
                    <Button cssClass="px-8 py-3 font-bold hover:bg-orange-100">
                        비밀번호 찾기
                    </Button>
                </div>
            </Form>
            
        </Modal>
    )
}

export default FindPassword;