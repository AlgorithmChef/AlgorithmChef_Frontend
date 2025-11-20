import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import CloseButton from "../../../UI/CloseButton";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import Modal from "../../Layout/Modal";
import Title from "../../../UI/Title";
import Form from "../../../UI/Form";
import { isEmail, isNotEmpty } from "../../../util/validation";

import ShowId from "./ShowId"; 

function FindId() {
    const navigate = useNavigate();

    function closeHandler() {
        navigate('/auth/login');
    }

    async function findIdAction(prevFormState, formData) {
        const email = formData.get("email");
        const birthDate = formData.get("birthDate");

        const errors = {};

        if (!isEmail(email) || !isNotEmpty(email)) {
            errors.email = "올바르지 않은 이메일 형식입니다.";
        }

        if (!isNotEmpty(birthDate)) {
            errors.birthDate = "생년월일을 선택해주세요.";
        }

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        // --- [가상 로직] 백엔드 API 통신 ---
        // const response = await fetch('/api/find-id', ...);
        // const result = await response.json();
        
        // 테스트를 위해 임시 아이디 지정 (실제로는 서버에서 받은 값 사용)
        const foundUserId = "AlgorithmChef123"; 

        return { 
            errors: {}, 
            success: true, 
            userId: foundUserId 
        };
    }

    const [formState, formAction] = useActionState(findIdAction, { errors: {} });

    return (
        <Modal onClick={closeHandler}>
            <CloseButton onClick={closeHandler} />

            {formState.success ? (
                <ShowId 
                    userId={formState.userId} 
                    onLogin={() => navigate('/auth/login')} 
                />
            ) : (
                <>
                    <Title>아이디 찾기</Title>
                    <Form action={formAction}>
                        <Input 
                            type="text" 
                            label="이메일" 
                            name="email" 
                            placeholder="example@email.com"
                            error={formState.errors?.email}
                        />
                        <Input 
                            type="date" 
                            label="생년월일" 
                            name="birthDate"
                            error={formState.errors?.birthDate}
                        />
                        <div className="flex justify-center mt-4">
                            <Button cssClass="px-8 py-3 font-bold hover:bg-orange-100">
                                아이디 불러오기
                            </Button>
                        </div>
                    </Form>
                </>
            )}

        </Modal>
    )
}

export default FindId;
