import { useState } from "react";
import telephone from "../assets/telephone.png";
import communication from "../assets/communication.png";
import location from "../assets/location.png";
import cookingbackground from "../assets/cookingbackground.png";
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    message: ""
  });
  const [notification, setNotification] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const templateParams = {
        email: localStorage.getItem('userEmail'),
        full_name: formData.fullName,
        message: formData.message,
      };

      await emailjs.send('service_1o2mx05', 'template_ve6w6up', templateParams, 'J_s7CA1LsAQH-5pmh');
      setNotification("Message sent successfully!");
      setTimeout(() => {
        setNotification("");
      }, 3000);

      setFormData({
        fullName: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center" style={{backgroundImage: `url(${cookingbackground})`}}>
      <div className="container mx-auto bg-white bg-opacity-75 rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Send us a feedback!</h1>
        {notification && (
          <div className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md text-center">
            {notification}
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name:</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" />
              </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">Send Message</button>
              </div>
            </form>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white bg-opacity-75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-center mb-4 text-gray-800 font-bold text-xl">Contact Details</h1>
              <div className="contact-info mb-4">
                <img src={communication} alt="Email" className="w-6 h-6 mr-2" />
                <p><a href="mailto:quickbytesformal@gmail.com" className="contact-link hover:font-bold">quickbytesformal@gmail.com</a></p>
              </div>
              <div className="contact-info mb-4">
                <img src={telephone} alt="Phone" className="w-6 h-6 mr-2" />
                <p><a href="tel:+40743912677" className="contact-link hover:font-bold">+40743912677</a></p>
              </div>
              <div className="contact-info">
                <img src={location} alt="Location" className="w-6 h-6 mr-2" />
                <p className="hover:font-bold">Strada Victoriei 15A, Târnăveni 545600</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-full">
              <div className="mt-4">
                <iframe
                  title="Google Maps Location"
                  className="w-full h-64 rounded shadow"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2746.1358330139926!2d24.23914991569592!3d46.32526767912026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474a3d8a6f6c12f7%3A0xe4a53a3a831b9a4f!2sStrada%20Victoriei%2015A%2C%20T%C3%A2rn%C4%83veni%20545600%2C%20Rom%C3%A2nia!5e0!3m2!1sro!2sro!4v1623300517877!5m2!1sro!2sro"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
