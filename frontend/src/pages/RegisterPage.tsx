import RegisterForm from "../forms/user-profile-form/RegisterForm";

import hero from "../assets/hero.png";

const RegisterPage = () => {
  const success = () => {
    console.log('Registration success!');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url(${hero})`, backgroundPosition: 'center' }}>
      <RegisterForm onSuccess={success} />
    </div>
  );
};

export default RegisterPage;