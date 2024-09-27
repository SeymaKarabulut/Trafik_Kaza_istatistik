import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import './ContactForm.css'; // Stil dosyasını ekleyin ve uygun şekilde düzenleyin

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      question: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // API'ye isteği gönder
        await axios.post('http://localhost:5001/api/faq', values);
        
        console.log('Soru başarıyla gönderildi!');
        
        // Form değerlerini sıfırla
        resetForm();
      } catch (error) {
        console.error('Soru gönderme hatası:', error.message);
        // Hata yönetimi, örneğin kullanıcıya bir hata mesajı gösterme.
      }
    },
  });

  return (
    <form className="contact-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">Adınız:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Soyadınız:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-posta Adresiniz:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Konu:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="question">Mesajınız:</label>
        <textarea
          id="question"
          name="question"
          value={formik.values.question}
          onChange={formik.handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Gönder</button>
    </form>
  );
};

export default ContactForm;
