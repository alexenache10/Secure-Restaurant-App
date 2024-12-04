
import LoginForm from "../forms/user-profile-form/LoginForm"; // Assume LoginForm component is created
import hero from "../assets/hero.png"
const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url(${hero})`, backgroundPosition: 'center' }}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
