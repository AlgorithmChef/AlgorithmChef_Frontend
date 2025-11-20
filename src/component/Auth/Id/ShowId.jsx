import { FaIdCard, FaCheckCircle } from "react-icons/fa";
import Box from "../../../UI/Box";
import Button from "../../../UI/Button";
import Title from "../../../UI/Title";
import { useNavigate } from "react-router-dom";
function ShowId({ userId, onLogin }) {
    const navigate = useNavigate();
    function onPassword(){
        navigate("/auth/findPassword");
    }
    return (
        <div className="flex flex-col items-center gap-6 animate-fadeIn">
            <div className="flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full">
                <FaIdCard className="text-5xl text-orange-500" />
            </div>

            <div className="text-center space-y-2">
                <div className="flex flex-row">
                    <FaCheckCircle className="text-green-500 text-2xl m-auto" />
                    <Title>아이디 찾기 성공!</Title>
                </div>
                <p className="text-gray-500">회원님의 정보와 일치하는 아이디입니다.</p>
            </div>

            <Box className="w-full py-6 text-2xl font-bold text-center text-gray-800 bg-gray-50 border-2 border-orange-100 rounded-2xl">
                {userId}
            </Box>

            <Button onClick={onLogin} cssClass="w-full py-3 font-bold bg-orange-500 text-white hover:bg-orange-600">
                로그인 하러 가기
            </Button>
            <Button onClick={onPassword} cssClass="w-full py-3 font-bold bg-orange-500 text-white hover:bg-orange-600">
                    비밀번호도 잊으셨나요?
            </Button>
        </div>
    );
}

export default ShowId;