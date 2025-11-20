import Button from "../../UI/Button";
import CloseButton from "../../UI/CloseButton";
import Input from "../../UI/Input";
import { LuLock } from "react-icons/lu"; 
import { useNavigate } from "react-router-dom";
import TextButton from "../../UI/TextButton";
import Modal from "../Layout/Modal";
import Form from "../../UI/Form";

function Login() {
    const navigate = useNavigate();
    function closeHandler() {
        navigate('/');
    }

    return (
    <Modal onClick={closeHandler}>
        <CloseButton onClick={closeHandler}/>
        <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto">
            <LuLock className="text-4xl text-gray-600" />
        </div>
        <Form>
            <Input label="ID" type="text" />
            <Input label="PASSWORD" type="password" />
            <Button cssClass="w-full py-3 bg-orange-500 text-white hover:bg-orange-600 font-bold text-lg transition-all shadow-lg shadow-orange-500/40">
                로그인
            </Button>
        </Form>
        
        <div className="flex flex-row justify-center items-center gap-4 pt-6 text-sm text-gray-500">
            <TextButton to="/auth/signup">회원가입</TextButton>
            
            <span className="w-[1px] h-3 bg-gray-300"></span>
            
            <TextButton to="/auth/findUserId">
                아이디 찾기
            </TextButton>
            
            <span className="w-[1px] h-3 bg-gray-300"></span>
            
            <TextButton to="/auth/findPassword">
                비밀번호 찾기
            </TextButton>
        </div>
    </Modal>
    )
}

export default Login;